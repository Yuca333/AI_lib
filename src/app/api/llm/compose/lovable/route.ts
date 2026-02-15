import { jsonError, jsonWithMeta } from '@/lib/api-response';
import { getPlaybookBySlug, type EnrichedPattern, type PlaybookPromptVariable } from '@/lib/library-knowledge';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

interface ComposeRequestBody {
  playbookSlug?: string;
  selectedPatternIds?: string[];
  variables?: Record<string, unknown>;
}

const PLACEHOLDER_PATTERN = /\b(tbd|todo|placeholder)\b|{{[^}]+}}|\[\s*insert[^\]]*\]/i;

function valueToLine(value: unknown): string {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean).join(', ');
  }
  return String(value ?? '').trim();
}

function isPlaceholderValue(value: unknown): boolean {
  const rendered = valueToLine(value);
  if (!rendered) return true;
  return PLACEHOLDER_PATTERN.test(rendered);
}

function findPattern(patterns: EnrichedPattern[], id: string): EnrichedPattern | undefined {
  const normalized = id.trim().toLowerCase();
  return patterns.find((pattern) => {
    if (pattern.id.toLowerCase() === normalized) return true;
    if (pattern.taxonomy.canonicalId.toLowerCase() === normalized) return true;
    if (pattern.taxonomy.slug.toLowerCase() === normalized) return true;
    return false;
  });
}

function resolveSelectedPatterns(
  patterns: EnrichedPattern[],
  selectedPatternIds: string[] | undefined,
  assumptions: string[]
): EnrichedPattern[] {
  if (!selectedPatternIds || selectedPatternIds.length === 0) {
    assumptions.push('No selectedPatternIds were supplied, so the playbook defaults were used.');
    return patterns;
  }

  const resolved: EnrichedPattern[] = [];
  for (const candidate of selectedPatternIds) {
    const pattern = findPattern(patterns, candidate);
    if (!pattern) {
      assumptions.push(`Pattern "${candidate}" was not found in this playbook and was skipped.`);
      continue;
    }
    resolved.push(pattern);
  }

  if (resolved.length === 0) {
    assumptions.push('No requested pattern IDs matched this playbook, so the playbook defaults were used.');
    return patterns;
  }

  return resolved;
}

function listVariables(
  variableDefinitions: PlaybookPromptVariable[],
  providedVariables: Record<string, unknown>,
  assumptions: string[]
): { lines: string[]; missingRequired: string[] } {
  const lines: string[] = [];
  const missingRequired: string[] = [];

  for (const variable of variableDefinitions) {
    const value = providedVariables[variable.key];
    if (value === undefined || value === null || valueToLine(value).length === 0) {
      if (variable.required) {
        missingRequired.push(variable.key);
        assumptions.push(
          `Required variable "${variable.key}" is missing; prompt instructs lovable.dev to omit related claims.`
        );
      }
      continue;
    }
    lines.push(`- ${variable.key}: ${valueToLine(value)}`);
  }

  const unusedKeys = Object.keys(providedVariables).filter(
    (key) => !variableDefinitions.some((variable) => variable.key === key)
  );
  for (const key of unusedKeys) {
    const value = providedVariables[key];
    if (value === undefined || value === null || valueToLine(value).length === 0) continue;
    lines.push(`- ${key}: ${valueToLine(value)}`);
  }

  return { lines, missingRequired };
}

function buildPrompt(
  playbookTitle: string,
  industry: string,
  summary: string,
  objective: string,
  variableLines: string[],
  missingRequired: string[],
  selectedPatterns: EnrichedPattern[],
  promptTemplate: string
): string {
  const patternLines = selectedPatterns.map(
    (pattern, index) =>
      `${index + 1}. ${pattern.id} ${pattern.name} -> ${pattern.objective} (raw TSX: ${pattern.implementationRawHref})`
  );

  const missingPolicy =
    missingRequired.length > 0
      ? [
          'Missing required inputs:',
          ...missingRequired.map((key) => `- ${key}`),
          'If a claim depends on missing input, omit that claim and associated UI copy.',
        ]
      : ['All required variables are present.'];

  return [
    `Build a production-ready React + Tailwind page in lovable.dev using the "${playbookTitle}" playbook.`,
    `Industry: ${industry}.`,
    `Summary: ${summary}`,
    `Objective: ${objective}`,
    '',
    'Provided variables:',
    ...(variableLines.length > 0 ? variableLines : ['- none provided']),
    '',
    ...missingPolicy,
    '',
    'Selected pattern stack:',
    ...patternLines,
    '',
    'Critical rules:',
    '- Use only the provided facts. Do not invent claims, credentials, statistics, or testimonials.',
    '- Do not emit placeholders, bracketed filler, TODO, or TBD text.',
    '- Keep one dominant focal point per section and preserve clear CTA hierarchy.',
    '- Maintain WCAG AA contrast and a reduced-motion fallback.',
    '',
    'Playbook prompt template:',
    promptTemplate,
  ].join('\n');
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ComposeRequestBody;
    const playbookSlug = body.playbookSlug?.trim();

    if (!playbookSlug) {
      return jsonError('playbookSlug is required', 400);
    }

    const playbook = getPlaybookBySlug(playbookSlug);
    if (!playbook) {
      return jsonError('Playbook not found', 404);
    }

    const variables = body.variables || {};
    for (const [key, value] of Object.entries(variables)) {
      if (isPlaceholderValue(value)) {
        return jsonError(`Variable "${key}" contains placeholder-like content`, 400);
      }
    }

    const assumptions: string[] = [];
    const selectedPatterns = resolveSelectedPatterns(playbook.patterns, body.selectedPatternIds, assumptions);
    const variableDefinitions = playbook.promptPack.variables || [];
    const variableList = listVariables(variableDefinitions, variables, assumptions);

    const prompt = buildPrompt(
      playbook.title,
      playbook.industry,
      playbook.summary,
      playbook.promptPack.objective,
      variableList.lines,
      variableList.missingRequired,
      selectedPatterns,
      playbook.promptPack.promptTemplate
    );

    return jsonWithMeta({
      playbookSlug: playbook.slug,
      prompt,
      assumptions,
      selectedPatternIds: selectedPatterns.map((pattern) => pattern.id),
    });
  } catch (error) {
    console.error('Failed to compose lovable prompt', error);
    return jsonError('Failed to compose lovable prompt');
  }
}

