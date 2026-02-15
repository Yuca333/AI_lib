import fs from 'fs';
import crypto from 'crypto';
import path from 'path';
import { parsePatterns, Pattern } from '@/lib/pattern-parser';
import { buildPatternTaxonomy, PatternTaxonomy } from '@/lib/pattern-taxonomy';
import {
  buildPatternMetadataBundle,
  type PatternMetadataBundle,
} from '@/lib/llm-pattern-metadata';
import { getLibrarySnapshot } from '@/lib/library-index-metadata';
import {
  LIBRARY_CONTENT_VERSION,
  LIBRARY_DEPRECATION_POLICY_VERSION,
  SITE_URL,
} from '@/lib/site-config';

export type GuidanceMode = 'prompt' | 'code' | 'mixed';

export interface ReferenceSection {
  sectionId: string;
  heading: string;
  body: string;
  mode: GuidanceMode;
  tokenEstimate: number;
}

export interface ReferenceDocument {
  id: string;
  fileName: string;
  title: string;
  purpose: string;
  summary: string;
  sections: ReferenceSection[];
  canonicalUrl: string;
  rawHref: string;
  rawHash: string;
  rawContent: string;
}

export interface PatternFailureMode {
  symptom: string;
  fix: string;
  fallbackPatternId: string | null;
}

export interface PatternPromptPack {
  objective: string;
  contextBlock: string[];
  constraints: string[];
  qualityChecks: string[];
  failureHandling: string[];
  outputContract: string[];
  productionPrompt: string;
}

export interface PatternCodePack {
  integrationGoals: string[];
  implementationChecklist: string[];
  compatibilityChecks: string[];
  fallbackPlan: string[];
}

export interface EnrichedPattern extends Pattern {
  canonicalUrl: string;
  taxonomy: PatternTaxonomy;
  oneSentenceDescription: string;
  objective: string;
  whenToUse: string[];
  avoidWhen: string[];
  failureModes: PatternFailureMode[];
  implementationRawHref: string;
  implementationExcerpt: string;
  implementationHash: string;
  promptPack: PatternPromptPack;
  codePack: PatternCodePack;
  llmMetadata: PatternMetadataBundle;
}

export interface PlaybookPromptVariable {
  key: string;
  required: boolean;
  description: string;
}

export interface PlaybookPromptPack {
  objective: string;
  contextBlock: string[];
  constraints: string[];
  qualityChecks: string[];
  failureHandling: string[];
  outputContract: string[];
  variables?: PlaybookPromptVariable[];
  promptTemplate: string;
}

export interface PlaybookCodePack {
  integrationSequence: string[];
  compatibilityChecks: string[];
  fallbackPlan: string[];
  qaChecklist: string[];
}

export interface PatternPlaybook {
  slug: string;
  title: string;
  industry: string;
  summary: string;
  recommendedPatternIds: string[];
  references: string[];
  promptPack: PlaybookPromptPack;
  codePack: PlaybookCodePack;
  promptGuide: string;
  codeGuide: string;
}

export interface ResolvedPlaybook extends PatternPlaybook {
  patterns: EnrichedPattern[];
}

interface ReferenceDocConfig {
  id: string;
  fileName: string;
}

const LIB_DIR = path.join(process.cwd(), 'lib-files');
const PATTERN_FILE = path.join(LIB_DIR, 'lib-patterns.md');

const REFERENCE_DOCS: ReferenceDocConfig[] = [
  { id: 'core-rules', fileName: 'lib-core-rules.md' },
  { id: 'css-bridge', fileName: 'lib-css-bridge.md' },
  { id: 'implementation-blocks', fileName: 'lib-implementation-blocks.md' },
  { id: 'pattern-select', fileName: 'lib-pattern-select.md' },
  { id: 'pattern-quality-system', fileName: 'lib-pattern-quality-system.md' },
  { id: 'pattern-lifecycle', fileName: 'lib-pattern-lifecycle.md' },
  { id: 'power-quality', fileName: 'lib-power-quality.md' },
  { id: 'prompt-vocabulary', fileName: 'lib-prompt-vocabulary-reference.md' },
  { id: 'retrieval-contracts', fileName: 'lib-retrieval-contracts.md' },
  { id: 'visual-vocabulary', fileName: 'lib-visual-vocabulary.md' },
];

const PLAYBOOKS: Omit<PatternPlaybook, 'promptGuide' | 'codeGuide'>[] = [
  {
    slug: 'dentist-landing',
    title: 'Dentist Landing Playbook',
    industry: 'Dental Clinic',
    summary:
      'Trust-first local clinic landing page focused on credibility, clarity, and easy booking.',
    recommendedPatternIds: ['1.4', '10.1', '10.2', '6.1', '10.3', '10.4', '7.1'],
    references: [
      'core-rules',
      'pattern-select',
      'pattern-quality-system',
      'implementation-blocks',
      'visual-vocabulary',
      'css-bridge',
      'retrieval-contracts',
    ],
    promptPack: {
      objective:
        'Generate a premium, high-trust dental landing page prompt that converts first-time visitors into booked appointments.',
      contextBlock: [
        'Audience: local patients comparing clinics quickly on mobile.',
        'Priority order: trust proof > treatment clarity > booking speed.',
        'Visual tone: clinical confidence, restrained motion, no playful gimmicks.',
      ],
      constraints: [
        'Use one hero system and one transition family max.',
        'Do not invent certifications, treatment outcomes, or numeric claims.',
        'Ensure contact actions are visible above the fold and near footer.',
      ],
      qualityChecks: [
        'Hero CTA is visible on first mobile screen.',
        'At least one trust module appears before pricing/treatment cards.',
        'No section has competing focal points.',
        'Reduced-motion fallback keeps all essential information visible.',
      ],
      failureHandling: [
        'If reliable testimonials are missing, switch testimonial carousel to trust badges + process clarity.',
        'If real metric values are unavailable, replace AnimatedCounter with static qualitative proof copy.',
        'If hero media quality is weak, use typography-led DiagonalSplitHero with service imagery deferred lower.',
      ],
      outputContract: [
        'Return one prompt block with: foundation, section plan, quality gate, and fallback instructions.',
        'Include explicit placement of booking CTA and contact methods.',
        'Use HSL token references, not hardcoded random color values.',
      ],
      promptTemplate: [
        'Build a premium dental clinic landing page.',
        'Context: Local patients need immediate trust and frictionless appointment booking.',
        'Primary outcome: Increase consultation bookings with clear service proof.',
        'Design system: Clinical trust palette, crisp typography hierarchy, restrained motion.',
        'Sections: Hero -> service cards -> trust proof -> testimonials -> contact CTA -> hours.',
        'Quality gate: no placeholders, no low-contrast text, no decorative noise around trust content.',
      ].join('\n'),
    },
    codePack: {
      integrationSequence: [
        'Render `DiagonalSplitHero` with explicit booking CTA and phone shortcut.',
        'Render `ServiceCard` grid with top treatments and concise value bullets.',
        'Render `AnimatedCounter` only if verified metrics exist; otherwise skip.',
        'Render `TestimonialCarousel` with accessible controls and pause-on-interaction.',
        'Render `ContactCTA` and `BusinessHours` as final conversion modules.',
        'Optionally apply `SectionTransition` once between hero and services.',
      ],
      compatibilityChecks: [
        'Hero text contrast ratio >= 4.5:1 on all breakpoints.',
        'No more than 2 animated elements above the fold.',
        'All interactive controls keyboard reachable with visible focus state.',
      ],
      fallbackPlan: [
        'Fallback hero: typography-first split layout with static image.',
        'Fallback proof: replace counters with trust badges and plain-language claims.',
      ],
      qaChecklist: [
        'No horizontal overflow at 320px width.',
        'Primary CTA appears at least twice on page.',
        'Contact methods are actionable links (`tel:`, `mailto:`).',
      ],
    },
  },
  {
    slug: 'restaurant-landing',
    title: 'Restaurant Landing Playbook',
    industry: 'Restaurant',
    summary:
      'Image-led restaurant landing page balancing atmosphere, menu discovery, and reservation CTA.',
    recommendedPatternIds: ['1.2', '2.2', '3.2', '10.2', '10.3', '7.1'],
    references: [
      'pattern-select',
      'pattern-quality-system',
      'implementation-blocks',
      'css-bridge',
      'visual-vocabulary',
      'retrieval-contracts',
    ],
    promptPack: {
      objective:
        'Generate a restaurant landing page prompt with strong visual appetite cues and clear reservation intent.',
      contextBlock: [
        'Audience: mobile-first local diners evaluating atmosphere + menu quickly.',
        'Priority order: appetite imagery > menu trust > reservation action.',
        'Visual tone: warm, editorial, image-led, controlled depth.',
      ],
      constraints: [
        'Do not use more than one ambient background system.',
        'Do not place low-quality or repeated stock imagery in hero.',
        'Ensure reservation CTA remains visible after first scroll.',
      ],
      qualityChecks: [
        'Hero includes immediate dining-value message + reservation CTA.',
        'At least 4 high-quality images are present before gallery expansion.',
        'Menu/service cards remain readable over image backgrounds.',
      ],
      failureHandling: [
        'If image quality is insufficient, switch to text-forward hero with one featured image.',
        'If testimonials are missing, use review summary + rating sources instead.',
        'If gallery load fails, degrade to static card grid with alt text and captions.',
      ],
      outputContract: [
        'Return one production prompt with section order, media placement, and CTA logic.',
        'Include explicit fallback paths for missing images and unavailable testimonials.',
      ],
      promptTemplate: [
        'Build a premium local restaurant landing page.',
        'Context: users decide quickly based on image quality and reservation clarity.',
        'Use DicedHero with immediate reservation CTA and supporting trust cues.',
        'Follow with PlaceCard / gallery system for dishes and atmosphere.',
        'End with ContactCTA and business details for conversion confidence.',
      ].join('\n'),
    },
    codePack: {
      integrationSequence: [
        'Implement `DicedHero` using validated image assets and clear reservation CTA.',
        'Implement `PlaceCard` or `ExpandableGallery` with resilient image fallback.',
        'Implement `TestimonialCarousel` for social proof with touch-friendly controls.',
        'Implement `ContactCTA` near footer and `BusinessHours` if hours drive conversion.',
      ],
      compatibilityChecks: [
        'No visual conflict between hero image overlays and headline contrast.',
        'Gallery interactions support keyboard and touch navigation.',
        'Total animation load remains within motion budget.',
      ],
      fallbackPlan: [
        'Fallback hero: split layout with static hero image and strong copy.',
        'Fallback gallery: fixed 2-column image cards with caption rail.',
      ],
      qaChecklist: [
        'Reservation CTA is present above fold and near footer.',
        'Image alt text is meaningful, not generic.',
        'No blank media tiles render on load failure.',
      ],
    },
  },
  {
    slug: 'contractor-landing',
    title: 'Contractor Landing Playbook',
    industry: 'Contractor / Trades',
    summary:
      'Trust and speed focused service page emphasizing process clarity and quote conversion.',
    recommendedPatternIds: ['1.4', '10.1', '3.3', '6.1', '10.3'],
    references: [
      'core-rules',
      'pattern-select',
      'pattern-quality-system',
      'implementation-blocks',
      'prompt-vocabulary',
      'retrieval-contracts',
    ],
    promptPack: {
      objective:
        'Generate a contractor landing page prompt optimized for quote requests, trust proof, and fast contact.',
      contextBlock: [
        'Audience: homeowners looking for reliable, fast-response local contractors.',
        'Priority order: trust and reliability > scope clarity > fast quote request.',
        'Visual tone: practical premium, strong hierarchy, low ornament.',
      ],
      constraints: [
        'Avoid playful or abstract hero effects that weaken trust.',
        'Show service scope before advanced motion interactions.',
        'Do not force scroll-stack narrative unless process complexity requires it.',
      ],
      qualityChecks: [
        'Quote CTA is visible above fold and sticky on mobile where appropriate.',
        'At least one proof module appears before contact section.',
        'Service cards communicate scope, not vague marketing language.',
      ],
      failureHandling: [
        'If process steps are short (<=5), replace ScrollStack with static process list.',
        'If proof metrics are unavailable, use project-count ranges with explicit source note.',
        'If hero imagery is weak, pivot to typography-led hero with trust badges.',
      ],
      outputContract: [
        'Return a single production prompt with clear section-by-section intent.',
        'Include anti-pattern guardrails and explicit fallback conditions.',
      ],
      promptTemplate: [
        'Build a premium contractor landing page focused on quote conversion.',
        'Use a high-clarity hero with immediate trust and contact options.',
        'Follow with service cards and process narrative (scroll only if justified).',
        'Close with a strong contact CTA including call and form actions.',
      ].join('\n'),
    },
    codePack: {
      integrationSequence: [
        'Implement `DiagonalSplitHero` with trust chips and quote CTA.',
        'Implement `ServiceCard` grid for core offerings and scope bullets.',
        'Use `ScrollStack` only when narrative depth warrants it; otherwise static steps.',
        'Implement `AnimatedCounter` only with verified data points.',
        'Implement `ContactCTA` with phone and form pathways.',
      ],
      compatibilityChecks: [
        'Process module does not block quick quote action.',
        'Headline and CTA remain readable under all visual states.',
        'Reduced-motion fallback preserves step-by-step process comprehension.',
      ],
      fallbackPlan: [
        'Fallback process: static timeline cards instead of sticky scroll stack.',
        'Fallback proof: testimonial cards and badges instead of counters.',
      ],
      qaChecklist: [
        'No empty service cards.',
        'Quote CTA present at least twice.',
        'Mobile view has zero horizontal overflow.',
      ],
    },
  },
];

let patternCache: EnrichedPattern[] | null = null;
let referenceCache: ReferenceDocument[] | null = null;
let playbookCache: ResolvedPlaybook[] | null = null;

const DEFAULT_PLAYBOOK_VARIABLES: PlaybookPromptVariable[] = [
  { key: 'clinicName', required: true, description: 'Clinic or business display name.' },
  { key: 'city', required: true, description: 'Primary service city or neighborhood.' },
  { key: 'phone', required: true, description: 'Public phone number in dialable format.' },
  { key: 'bookingUrl', required: true, description: 'Live booking or reservation URL.' },
  { key: 'treatments', required: true, description: 'Top services/treatments/menu highlights.' },
  {
    key: 'proofsAvailable',
    required: true,
    description: 'Only verifiable trust proof items (review source, certifications, awards, years).',
  },
  { key: 'primaryCta', required: true, description: 'Primary CTA text shown in hero and footer.' },
  { key: 'businessHours', required: false, description: 'Structured opening hours for conversion support.' },
];

const PLACEHOLDER_TEXT_PATTERNS = [
  /\btodo\b/i,
  /\btbd\b/i,
  /\bplaceholder\b/i,
  /{{[^}]+}}/,
  /\[\s*insert[^\]]*\]/i,
  /^\*\*key design principles/i,
];

function ensureAbsoluteUrl(pathname: string): string {
  return `${SITE_URL}${pathname}`;
}

function hashContent(content: string): string {
  return crypto.createHash('sha256').update(content).digest('hex');
}

function excerptLines(content: string, maxLines = 30): string {
  return content.split('\n').slice(0, maxLines).join('\n').trimEnd();
}

function estimateTokenCount(text: string): number {
  const words = text.split(/\s+/).map((token) => token.trim()).filter(Boolean).length;
  return Math.max(1, Math.ceil(words * 1.3));
}

function stripMarkdownInline(value: string): string {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[*_~>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeLine(value: string): string {
  return stripMarkdownInline(value.replace(/^[-*]\s*/, '')).replace(/\s+/g, ' ').trim();
}

function looksLikePlaceholder(value: string): boolean {
  if (!value) return true;
  return PLACEHOLDER_TEXT_PATTERNS.some((pattern) => pattern.test(value));
}

function normalizeSentence(text: string, fallback: string): string {
  const lines = text
    .split('\n')
    .map((line) => normalizeLine(line))
    .filter((line) => line.length > 0 && !looksLikePlaceholder(line));

  if (lines.length === 0) return fallback;

  const joined = lines.join(' ');
  const sentence = joined.match(/[^.!?]+[.!?]?/)?.[0]?.trim() || lines[0];
  if (!sentence) return fallback;
  const withPunctuation = /[.!?]$/.test(sentence) ? sentence : `${sentence}.`;
  return withPunctuation;
}

function compactTextList(values: string[], max = 3): string[] {
  const compacted = values
    .map((value) => normalizeLine(value))
    .filter((value) => value.length > 0 && !looksLikePlaceholder(value))
    .map((value) => value.replace(/\.$/, '').trim());

  return Array.from(new Set(compacted)).slice(0, max);
}

function mapIntentToOutcome(intent: string): string {
  const normalized = intent.toLowerCase();
  if (normalized.includes('cta')) return 'drive a clear primary action';
  if (normalized.includes('trust') || normalized.includes('credibility')) return 'increase trust before action';
  if (normalized.includes('first-impression')) return 'create immediate first-impression clarity';
  if (normalized.includes('lead-generation')) return 'increase qualified inbound leads';
  return `improve ${normalized.replace(/-/g, ' ')}`;
}

function buildPatternObjective(
  pattern: Pattern,
  taxonomy: PatternTaxonomy,
  oneSentenceDescription: string
): string {
  const outcome = mapIntentToOutcome(taxonomy.intents[0] || 'visual clarity');
  const baseline = normalizeSentence(
    oneSentenceDescription,
    `Use ${pattern.name} to ${outcome} with one dominant focal point and a clear CTA.`
  );

  if (!looksLikePlaceholder(baseline)) {
    return baseline;
  }

  return `Use ${pattern.name} to ${outcome} with one dominant focal point and a clear CTA.`;
}

function buildPatternFailureModes(pattern: Pattern, taxonomy: PatternTaxonomy): PatternFailureMode[] {
  const fallbackPrimary = taxonomy.fallbackPatternIds[0] || null;
  const fallbackSecondary = taxonomy.fallbackPatternIds[1] || fallbackPrimary;

  const modes: PatternFailureMode[] = [
    {
      symptom: 'Primary action is hard to find above the fold.',
      fix: 'Reduce competing visual treatments and enforce one dominant focal point with one CTA.',
      fallbackPatternId: fallbackPrimary,
    },
    {
      symptom: 'Motion or interaction reduces readability on mobile.',
      fix: 'Switch to reduced-motion behavior and simplify interactions to static states.',
      fallbackPatternId: fallbackSecondary,
    },
    {
      symptom: 'Required assets are missing or low quality.',
      fix: 'Use text-first layout and verified trust proof while deferring weak media.',
      fallbackPatternId: fallbackPrimary,
    },
  ];

  if (pattern.desktopOnly) {
    modes.push({
      symptom: 'Desktop-only behavior fails on touch devices.',
      fix: 'Provide stacked mobile layout and remove hover-only controls.',
      fallbackPatternId: fallbackPrimary,
    });
  }

  return modes.slice(0, 4);
}

function slugifySectionId(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'section';
}

function ensurePlaybookVariables(pack: PlaybookPromptPack): PlaybookPromptVariable[] {
  if (pack.variables && pack.variables.length > 0) {
    return pack.variables;
  }
  return DEFAULT_PLAYBOOK_VARIABLES;
}

function buildPasteReadyPromptTemplate(
  template: string,
  variables: PlaybookPromptVariable[],
  constraints: string[]
): string {
  const variableLines = variables.map(
    (variable) => `- ${variable.key}${variable.required ? ' (required)' : ' (optional)'}: ${variable.description}`
  );

  return [
    'You are generating a production React + Tailwind page in lovable.dev.',
    'Variables:',
    ...variableLines,
    '',
    'Rules:',
    '- Use only provided facts. Do not invent claims, credentials, or metrics.',
    '- Do not output placeholders or bracketed filler tokens.',
    ...constraints.map((line) => `- ${normalizeLine(line)}`),
    '',
    'Builder brief:',
    template,
  ].join('\n');
}

function normalizePlaybookPromptPack(pack: PlaybookPromptPack): PlaybookPromptPack {
  const objective = normalizeSentence(pack.objective, 'Generate a reliable conversion-focused landing page prompt.');
  const variables = ensurePlaybookVariables(pack);
  return {
    ...pack,
    objective,
    variables,
    promptTemplate: buildPasteReadyPromptTemplate(pack.promptTemplate, variables, pack.constraints),
  };
}

function compactLines(lines: string[]): string[] {
  return lines.map((line) => line.trim()).filter(Boolean);
}

function stringifyPromptPack(pack: PlaybookPromptPack): string {
  const variables = ensurePlaybookVariables(pack);
  return [
    `Objective: ${pack.objective}`,
    '',
    'Variables:',
    ...variables.map(
      (variable) =>
        `- ${variable.key}${variable.required ? ' (required)' : ' (optional)'}: ${variable.description}`
    ),
    '',
    'Context Block:',
    ...pack.contextBlock.map((line) => `- ${line}`),
    '',
    'Constraints:',
    ...pack.constraints.map((line) => `- ${line}`),
    '',
    'Quality Checks:',
    ...pack.qualityChecks.map((line) => `- ${line}`),
    '',
    'Failure Handling:',
    ...pack.failureHandling.map((line) => `- ${line}`),
    '',
    'Output Contract:',
    ...pack.outputContract.map((line) => `- ${line}`),
    '',
    'Prompt Template:',
    pack.promptTemplate,
  ].join('\n');
}

function stringifyCodePack(pack: PlaybookCodePack): string {
  return [
    'Integration Sequence:',
    ...pack.integrationSequence.map((line, index) => `${index + 1}. ${line}`),
    '',
    'Compatibility Checks:',
    ...pack.compatibilityChecks.map((line) => `- ${line}`),
    '',
    'Fallback Plan:',
    ...pack.fallbackPlan.map((line) => `- ${line}`),
    '',
    'QA Checklist:',
    ...pack.qaChecklist.map((line) => `- ${line}`),
  ].join('\n');
}

function buildPatternPromptPack(pattern: Pattern, taxonomy: PatternTaxonomy): PatternPromptPack {
  const oneSentenceDescription = normalizeSentence(
    pattern.description,
    `${pattern.name} provides a reusable, high-clarity section pattern for production pages.`
  );
  const summary = buildPatternObjective(pattern, taxonomy, oneSentenceDescription);
  const usageHighlights = compactLines(pattern.usageNotes.split('\n')).slice(0, 3);
  const avoidWhen = compactTextList(taxonomy.avoidWhen, 3);
  const whenToUse = compactTextList(taxonomy.whenToUse, 3);

  const contextBlock = [
    `Pattern: ${pattern.name} (${pattern.id}) in ${pattern.category}.`,
    `Intent tags: ${taxonomy.intents.join(', ') || 'visual-clarity'}.`,
    `Use cases: ${whenToUse.join(' | ')}`,
  ];

  const constraints = [
    'Keep semantic structure and visible keyboard focus states.',
    pattern.desktopOnly ? 'Provide explicit mobile fallback behavior.' : 'Optimize mobile first before desktop enhancements.',
    ...avoidWhen.map((line) => line),
  ];

  const qualityChecks = [
    'No placeholder data or empty modules are rendered.',
    'Primary CTA remains clear against all backgrounds.',
    'Reduced-motion users still receive full content.',
    ...(pattern.focalRating && pattern.focalRating >= 4
      ? ['Section has exactly one dominant focal point.']
      : []),
  ];

  const failureHandling = [
    taxonomy.fallbackPatternIds.length > 0
      ? `If implementation constraints fail, fallback to: ${taxonomy.fallbackPatternIds.join(', ')}.`
      : 'If implementation constraints fail, fallback to a static high-contrast layout block.',
    'If media assets fail, remove broken tiles and reflow layout immediately.',
    'If animation degrades performance, switch to static final states.',
  ];

  const outputContract = [
    'Return: context summary, implementation plan, and final prompt text.',
    'Include exact placement guidance and fallback behavior.',
    'Keep constraints explicit and testable.',
  ];

  const productionPrompt = [
    `Build a premium web section using the "${pattern.name}" pattern.`,
    `Objective: ${summary}`,
    '',
    'Context:',
    ...contextBlock.map((line) => `- ${line}`),
    '',
    'Constraints:',
    ...constraints.map((line) => `- ${line}`),
    '',
    'Quality Checks:',
    ...qualityChecks.map((line) => `- ${line}`),
    '',
    'Failure Handling:',
    ...failureHandling.map((line) => `- ${line}`),
    '',
    'Usage Notes:',
    ...(usageHighlights.length > 0
      ? usageHighlights.map((line) => `- ${line}`)
      : ['- Keep implementation concise and production-ready.']),
  ].join('\n');

  return {
    objective: summary,
    contextBlock,
    constraints,
    qualityChecks,
    failureHandling,
    outputContract,
    productionPrompt,
  };
}

function buildPatternCodePack(pattern: Pattern, taxonomy: PatternTaxonomy): PatternCodePack {
  return {
    integrationGoals: [
      `Implement ${pattern.name} with stable semantic structure.`,
      'Preserve readability and keyboard accessibility.',
      'Keep implementation compatible with existing design tokens.',
    ],
    implementationChecklist: [
      'Define props/state and default values before styling.',
      'Implement visual hierarchy first, then progressive enhancements.',
      'Add reduced-motion path for animated behaviors.',
      'Test overflow and focus order on small screens.',
    ],
    compatibilityChecks: [
      taxonomy.compatibleWith.length > 0
        ? `Preferred companion patterns: ${taxonomy.compatibleWith.join(', ')}.`
        : 'Pattern can be composed with neutral layout/supporting modules.',
      taxonomy.incompatibleWith.length > 0
        ? `Avoid combining with: ${taxonomy.incompatibleWith.join(', ')}.`
        : 'Avoid stacking multiple high-motion systems in one viewport.',
      'Validate contrast and pointer/keyboard interaction parity.',
    ],
    fallbackPlan: [
      taxonomy.fallbackPatternIds.length > 0
        ? `Fallback IDs: ${taxonomy.fallbackPatternIds.join(', ')}.`
        : 'Fallback to static block implementation preserving content order.',
      'If interactive behavior fails, render static equivalent with same information.',
    ],
  };
}

function buildPatternImplementationFields(pattern: Pattern) {
  const source = pattern.code || '';
  return {
    implementationRawHref: `/api/llm/raw/patterns/${encodeURIComponent(pattern.id)}.tsx`,
    implementationExcerpt: excerptLines(source, 30),
    implementationHash: hashContent(source),
  };
}

function enrichPattern(pattern: Pattern, patternNameMap: Map<string, string>): EnrichedPattern {
  const taxonomy = buildPatternTaxonomy(pattern);
  const oneSentenceDescription = normalizeSentence(
    pattern.description,
    `${pattern.name} is a reusable section pattern for production interfaces.`
  );
  const objective = buildPatternObjective(pattern, taxonomy, oneSentenceDescription);
  const whenToUse = compactTextList(taxonomy.whenToUse, 3);
  const avoidWhen = compactTextList(taxonomy.avoidWhen, 3);
  const failureModes = buildPatternFailureModes(pattern, taxonomy);
  const implementation = buildPatternImplementationFields(pattern);

  return {
    ...pattern,
    taxonomy,
    canonicalUrl: ensureAbsoluteUrl(`/library/${pattern.id}`),
    oneSentenceDescription,
    objective,
    whenToUse,
    avoidWhen,
    failureModes,
    implementationRawHref: implementation.implementationRawHref,
    implementationExcerpt: implementation.implementationExcerpt,
    implementationHash: implementation.implementationHash,
    promptPack: buildPatternPromptPack(pattern, taxonomy),
    codePack: buildPatternCodePack(pattern, taxonomy),
    llmMetadata: buildPatternMetadataBundle(pattern, taxonomy, { patternNameMap }),
  };
}

function classifyGuidanceMode(text: string): GuidanceMode {
  const lower = text.toLowerCase();
  const codeMatch =
    /(implement|code|tsx|typescript|jsx|css|keyframe|component|api|install|usage|schema|contract|endpoint)/.test(
      lower
    );
  const promptMatch =
    /(prompt|vocabulary|selection|quality|rules|guardrail|heuristic|art direction|copy|fallback|acceptance)/.test(
      lower
    );

  if (codeMatch && promptMatch) return 'mixed';
  if (codeMatch) return 'code';
  if (promptMatch) return 'prompt';
  return 'mixed';
}

function parseReferenceDocument(config: ReferenceDocConfig): ReferenceDocument {
  const filePath = path.join(LIB_DIR, config.fileName);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const sectionIdCounter = new Map<string, number>();

  const title = lines.find((line) => line.startsWith('# '))?.replace(/^#\s+/, '').trim() ?? config.fileName;
  const purpose =
    lines
      .find((line) => line.toLowerCase().startsWith('**purpose:**'))
      ?.replace(/^\*\*Purpose:\*\*\s*/i, '')
      .trim() ?? '';

  const sections: ReferenceSection[] = [];
  let currentHeading = 'Overview';
  let currentBody: string[] = [];

  const flush = () => {
    const body = currentBody.join('\n').trim();
    if (!body) return;
    const baseSectionId = slugifySectionId(currentHeading);
    const nextCount = (sectionIdCounter.get(baseSectionId) || 0) + 1;
    sectionIdCounter.set(baseSectionId, nextCount);
    const sectionId = nextCount === 1 ? baseSectionId : `${baseSectionId}-${nextCount}`;
    sections.push({
      sectionId,
      heading: currentHeading,
      body,
      mode: classifyGuidanceMode(`${currentHeading}\n${body}`),
      tokenEstimate: estimateTokenCount(`${currentHeading}\n${body}`),
    });
  };

  for (const line of lines) {
    const headingMatch = line.match(/^##\s+(.+)$/);
    if (headingMatch) {
      flush();
      currentHeading = headingMatch[1].trim();
      currentBody = [];
      continue;
    }
    currentBody.push(line);
  }
  flush();

  const summary =
    purpose || sections[0]?.body.split('\n').find((line) => line.trim())?.trim() || '';

  return {
    id: config.id,
    fileName: config.fileName,
    title,
    purpose,
    summary,
    sections,
    canonicalUrl: ensureAbsoluteUrl(`/reference/${config.id}`),
    rawHref: `/api/llm/raw/references/${config.id}.md`,
    rawHash: hashContent(content),
    rawContent: content,
  };
}

function buildPlaybooks(): ResolvedPlaybook[] {
  const patternMap = new Map(getPatternLibrary().map((pattern) => [pattern.id, pattern]));
  return PLAYBOOKS.map((playbook) => {
    const promptPack = normalizePlaybookPromptPack(playbook.promptPack);
    return {
      ...playbook,
      promptPack,
      promptGuide: stringifyPromptPack(promptPack),
      codeGuide: stringifyCodePack(playbook.codePack),
      patterns: playbook.recommendedPatternIds
        .map((id) => patternMap.get(id))
        .filter((pattern): pattern is EnrichedPattern => Boolean(pattern)),
    };
  });
}

export function getPatternLibrary(): EnrichedPattern[] {
  if (!patternCache) {
    const parsedPatterns = parsePatterns(PATTERN_FILE);
    const patternNameMap = new Map(parsedPatterns.map((pattern) => [pattern.id, pattern.name]));
    patternCache = parsedPatterns.map((pattern) => enrichPattern(pattern, patternNameMap));
  }
  return patternCache;
}

export function getPatternById(id: string): EnrichedPattern | undefined {
  return getPatternLibrary().find((pattern) => pattern.id === id);
}

export function resolvePatternByAnyId(id: string): EnrichedPattern | undefined {
  const normalized = id.trim().toLowerCase();
  return getPatternLibrary().find((pattern) => {
    if (pattern.id.toLowerCase() === normalized) return true;
    if (pattern.taxonomy.canonicalId.toLowerCase() === normalized) return true;
    if (pattern.taxonomy.slug.toLowerCase() === normalized) return true;
    return false;
  });
}

export function getReferenceLibrary(): ReferenceDocument[] {
  if (!referenceCache) {
    referenceCache = REFERENCE_DOCS.map(parseReferenceDocument);
  }
  return referenceCache;
}

export function getReferenceById(id: string): ReferenceDocument | undefined {
  return getReferenceLibrary().find((doc) => doc.id === id);
}

export function getReferenceSectionById(referenceId: string, sectionId: string): ReferenceSection | undefined {
  const reference = getReferenceById(referenceId);
  if (!reference) return undefined;
  return reference.sections.find((section) => section.sectionId === sectionId);
}

export function getPlaybooks(): ResolvedPlaybook[] {
  if (!playbookCache) {
    playbookCache = buildPlaybooks();
  }
  return playbookCache;
}

export function getPlaybookBySlug(slug: string): ResolvedPlaybook | undefined {
  return getPlaybooks().find((playbook) => playbook.slug === slug);
}

export function getLibraryMeta() {
  const snapshot = getLibrarySnapshot();
  return {
    contentVersion: LIBRARY_CONTENT_VERSION,
    deprecationPolicyVersion: LIBRARY_DEPRECATION_POLICY_VERSION,
    contentDigest: snapshot.digest,
    indexedAt: snapshot.lastModifiedIso,
    indexedFiles: snapshot.indexedFiles,
  };
}
