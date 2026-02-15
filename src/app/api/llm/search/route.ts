import { jsonError, jsonWithMeta } from '@/lib/api-response';
import { getPatternLibrary, getPlaybooks, getReferenceLibrary } from '@/lib/library-knowledge';
import {
  applyFieldProjection,
  getRetrievalResponseFormat,
  parseFieldProjection,
} from '@/lib/llm-response-controls';
import { searchPatterns, searchPlaybooks, searchReferences } from '@/lib/llm-retrieval';

export const revalidate = 1800;
export const dynamic = 'force-dynamic';

type Scope = 'all' | 'patterns' | 'playbooks' | 'references';

function parseScope(value: string | null): Scope {
  if (value === 'patterns' || value === 'playbooks' || value === 'references') return value;
  return 'all';
}

function normalizeScore(score: number, maxScore: number): number {
  if (maxScore <= 0) return 0.5;
  const normalized = score / maxScore;
  return Math.max(0, Math.min(1, Math.round(normalized * 100) / 100));
}

function mapReason(reason: string): string {
  const map: Record<string, string> = {
    name: 'Pattern name directly matches the query intent.',
    tags: 'Pattern taxonomy tags align with the requested design goals.',
    intent: 'Intent classification overlap detected for this task.',
    industry: 'Industry context overlap detected in pattern profile.',
    description: 'Pattern description contains relevant task language.',
    'industry-filter': 'Industry filter matched this pattern.',
    'tag-filter': 'Requested tag matched this pattern.',
    category: 'Category filter matched this pattern.',
    'prompt-mode': 'Prompt mode requested; prompt coverage prioritized.',
    'code-mode': 'Code mode requested; implementation readiness prioritized.',
    'experimental-penalty': 'Pattern is marked experimental and ranking was reduced.',
  };

  return map[reason] || `Retrieval signal: ${reason}`;
}

function splitDependencies(dependencies: string[]): string[] {
  return dependencies.length > 0 ? dependencies : ['none'];
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const format = getRetrievalResponseFormat(url.searchParams);
    const fields = parseFieldProjection(url.searchParams);
    const q = url.searchParams.get('q')?.trim() || '';
    const scope = parseScope(url.searchParams.get('scope'));
    const mode = url.searchParams.get('mode');
    const category = url.searchParams.get('category')?.trim();
    const industry = url.searchParams.get('industry')?.trim();
    const limit = Number(url.searchParams.get('limit') || '10');
    const tag = url.searchParams.get('tag')?.trim();

    const patterns = getPatternLibrary();
    const playbooks = getPlaybooks();
    const references = getReferenceLibrary();

    const patternSearch =
      scope === 'all' || scope === 'patterns'
        ? searchPatterns(patterns, {
            query: q,
            mode: mode === 'prompt' || mode === 'code' ? mode : undefined,
            category,
            industry,
            tags: tag ? [tag] : undefined,
            limit,
          })
        : [];

    const maxScore = patternSearch.reduce((max, item) => Math.max(max, item.score), 0);

    const results = patternSearch.map(({ pattern, score, reasons }) => ({
      pattern_id: pattern.id,
      name: pattern.name,
      relevance_score: normalizeScore(score, maxScore),
      match_reasons: reasons.map(mapReason),
      implementation_complexity: pattern.llmMetadata.meta.implementation_complexity,
      code_blocks: {
        html: pattern.llmMetadata.code_blocks.html,
        css: pattern.llmMetadata.code_blocks.css,
        js: pattern.llmMetadata.code_blocks.js,
      },
      prompt_template: pattern.llmMetadata.prompt_templates.claude_gpt,
      required_assets: splitDependencies(pattern.llmMetadata.meta.dependencies),
      estimated_tokens: pattern.llmMetadata.meta.estimated_tokens,
      ai_success_rate: pattern.llmMetadata.meta.ai_success_rate,
      selection_criteria: pattern.llmMetadata.selection_criteria,
      compatibility: pattern.llmMetadata.compatibility,
      links: {
        detail: `/api/llm/patterns/${pattern.id}`,
        ui: `/library/${pattern.id}`,
      },
    }));

    const playbookResults =
      scope === 'all' || scope === 'playbooks'
        ? searchPlaybooks(playbooks, {
            query: q,
            industry,
            mode: mode === 'prompt' || mode === 'code' ? mode : undefined,
            limit,
          }).map((entry) => ({
            id: entry.playbook.slug,
            title: entry.playbook.title,
            industry: entry.playbook.industry,
            score: entry.score,
            reasons: entry.reasons,
            href: `/api/llm/playbooks/${entry.playbook.slug}`,
            ui: `/playbooks/${entry.playbook.slug}`,
          }))
        : [];

    const referenceResults =
      scope === 'all' || scope === 'references'
        ? searchReferences(references, {
            query: q,
            mode:
              mode === 'prompt' || mode === 'code' || mode === 'mixed'
                ? mode
                : undefined,
            limit,
          }).map((entry) => ({
            id: entry.reference.id,
            title: entry.reference.title,
            score: entry.score,
            reasons: entry.reasons,
            href: `/api/llm/references/${entry.reference.id}`,
            ui: `/reference/${entry.reference.id}`,
          }))
        : [];

    const totalCount =
      scope === 'patterns'
        ? results.length
        : scope === 'playbooks'
        ? playbookResults.length
        : scope === 'references'
        ? referenceResults.length
        : results.length + playbookResults.length + referenceResults.length;

    const supplemental =
      scope === 'patterns'
        ? undefined
        : {
            playbooks: playbookResults,
            references: referenceResults,
          };

    const fullPayload = {
      query: q,
      scope,
      mode: mode || null,
      count: totalCount,
      results,
      supplemental,
      schema: {
        result_shape: {
          pattern_id: 'string',
          name: 'string',
          relevance_score: 'number(0..1)',
          match_reasons: 'string[]',
          implementation_complexity: 'low|medium|high',
          code_blocks: { html: 'string', css: 'string', js: 'string' },
          prompt_template: 'string',
          required_assets: 'string[]',
          estimated_tokens: 'number',
        },
      },
      nextActions: [
        'Select the top result with acceptable estimated_tokens and ai_success_rate.',
        'Open /api/llm/patterns/:id for full prompt templates and troubleshooting metadata.',
        'Apply fallback alternatives when selection_criteria avoid_when conditions are present.',
      ],
      legacy_results: {
        patterns: results.map((item) => ({
          id: item.pattern_id,
          title: item.name,
          score: item.relevance_score,
          href: item.links.detail,
          ui: item.links.ui,
        })),
        playbooks: playbookResults,
        references: referenceResults,
      },
      retrievalControls: {
        format: 'full|compact',
        packOnly: 'true|false',
        fields: 'comma-separated projection',
      },
    } satisfies Record<string, unknown>;

    const compactPayload = {
      query: q,
      scope,
      mode: mode || null,
      count: totalCount,
      results: results.map((item) => ({
        pattern_id: item.pattern_id,
        name: item.name,
        relevance_score: item.relevance_score,
        match_reasons: item.match_reasons,
        implementation_complexity: item.implementation_complexity,
        estimated_tokens: item.estimated_tokens,
        ai_success_rate: item.ai_success_rate,
        links: item.links,
      })),
      supplemental,
      nextActions: fullPayload.nextActions,
      retrievalControls: fullPayload.retrievalControls,
    } satisfies Record<string, unknown>;

    const payload = format === 'compact' ? compactPayload : fullPayload;
    return jsonWithMeta(applyFieldProjection(payload, fields));
  } catch (error) {
    console.error('Failed to perform retrieval search', error);
    return jsonError('Failed to perform retrieval search');
  }
}
