import fs from 'fs';
import path from 'path';
import { parsePatterns, Pattern } from '@/lib/pattern-parser';
import { buildPatternTaxonomy, PatternTaxonomy } from '@/lib/pattern-taxonomy';
import { getLibrarySnapshot } from '@/lib/library-index-metadata';
import {
  LIBRARY_CONTENT_VERSION,
  LIBRARY_DEPRECATION_POLICY_VERSION,
  SITE_URL,
} from '@/lib/site-config';

export type GuidanceMode = 'prompt' | 'code' | 'mixed';

export interface ReferenceSection {
  heading: string;
  body: string;
  mode: GuidanceMode;
}

export interface ReferenceDocument {
  id: string;
  fileName: string;
  title: string;
  purpose: string;
  summary: string;
  sections: ReferenceSection[];
  canonicalUrl: string;
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
  promptPack: PatternPromptPack;
  codePack: PatternCodePack;
}

export interface PlaybookPromptPack {
  objective: string;
  contextBlock: string[];
  constraints: string[];
  qualityChecks: string[];
  failureHandling: string[];
  outputContract: string[];
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

function ensureAbsoluteUrl(pathname: string): string {
  return `${SITE_URL}${pathname}`;
}

function compactLines(lines: string[]): string[] {
  return lines.map((line) => line.trim()).filter(Boolean);
}

function toSentence(text: string): string {
  const line = text.split('\n').map((row) => row.trim()).find(Boolean) || '';
  return line.replace(/^[-*]\s*/, '');
}

function stringifyPromptPack(pack: PlaybookPromptPack): string {
  return [
    `Objective: ${pack.objective}`,
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
  const summary = toSentence(pattern.description) || `Apply ${pattern.name} with clear hierarchy.`;
  const usageHighlights = compactLines(pattern.usageNotes.split('\n')).slice(0, 3);
  const avoidWhen = taxonomy.avoidWhen.slice(0, 3);
  const whenToUse = taxonomy.whenToUse.slice(0, 3);

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

function enrichPattern(pattern: Pattern): EnrichedPattern {
  const taxonomy = buildPatternTaxonomy(pattern);
  return {
    ...pattern,
    taxonomy,
    canonicalUrl: ensureAbsoluteUrl(`/library/${pattern.id}`),
    promptPack: buildPatternPromptPack(pattern, taxonomy),
    codePack: buildPatternCodePack(pattern, taxonomy),
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
    sections.push({
      heading: currentHeading,
      body,
      mode: classifyGuidanceMode(`${currentHeading}\n${body}`),
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
  };
}

function buildPlaybooks(): ResolvedPlaybook[] {
  const patternMap = new Map(getPatternLibrary().map((pattern) => [pattern.id, pattern]));
  return PLAYBOOKS.map((playbook) => ({
    ...playbook,
    promptGuide: stringifyPromptPack(playbook.promptPack),
    codeGuide: stringifyCodePack(playbook.codePack),
    patterns: playbook.recommendedPatternIds
      .map((id) => patternMap.get(id))
      .filter((pattern): pattern is EnrichedPattern => Boolean(pattern)),
  }));
}

export function getPatternLibrary(): EnrichedPattern[] {
  if (!patternCache) {
    patternCache = parsePatterns(PATTERN_FILE).map(enrichPattern);
  }
  return patternCache;
}

export function getPatternById(id: string): EnrichedPattern | undefined {
  return getPatternLibrary().find((pattern) => pattern.id === id);
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
