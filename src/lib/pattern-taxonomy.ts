import type { Pattern } from '@/lib/pattern-parser';

type Cost = 'low' | 'medium' | 'high';
type Complexity = 'low' | 'medium' | 'high';
type PatternStatus = 'active' | 'experimental' | 'deprecated';

interface CategoryProfile {
  tags: string[];
  intents: string[];
  industries: string[];
  complexity: Complexity;
  renderingCost: Cost;
  interactionCost: Cost;
  whenToUse: string[];
  avoidWhen: string[];
}

interface PatternOverride {
  status?: PatternStatus;
  tags?: string[];
  intents?: string[];
  industries?: string[];
  complexity?: Complexity;
  renderingCost?: Cost;
  interactionCost?: Cost;
  whenToUse?: string[];
  avoidWhen?: string[];
  fallbackPatternIds?: string[];
  compatibleWith?: string[];
  incompatibleWith?: string[];
}

export interface PatternTaxonomy {
  id: string;
  canonicalId: string;
  slug: string;
  taxonomyVersion: string;
  status: PatternStatus;
  tags: string[];
  intents: string[];
  industries: string[];
  complexity: Complexity;
  renderingCost: Cost;
  interactionCost: Cost;
  whenToUse: string[];
  avoidWhen: string[];
  fallbackPatternIds: string[];
  compatibleWith: string[];
  incompatibleWith: string[];
}

const TAXONOMY_VERSION = '2026.02.0';

const DEFAULT_PROFILE: CategoryProfile = {
  tags: ['ui-pattern'],
  intents: ['visual-clarity'],
  industries: ['general'],
  complexity: 'medium',
  renderingCost: 'medium',
  interactionCost: 'medium',
  whenToUse: ['Use when the page needs a reusable visual module.'],
  avoidWhen: ['Avoid when content requirements are still unknown.'],
};

const CATEGORY_PROFILES: Array<{ match: RegExp; profile: CategoryProfile }> = [
  {
    match: /hero/i,
    profile: {
      tags: ['hero', 'above-the-fold', 'conversion'],
      intents: ['first-impression', 'cta-clarity', 'brand-signal'],
      industries: ['saas', 'medical', 'local-services', 'hospitality'],
      complexity: 'high',
      renderingCost: 'medium',
      interactionCost: 'medium',
      whenToUse: [
        'Use when you need immediate message clarity and a dominant CTA.',
        'Use for pages where trust and value must be understood in under 5 seconds.',
      ],
      avoidWhen: [
        'Avoid when the page has no clear CTA hierarchy.',
        'Avoid when headline/copy is unresolved and likely to change rapidly.',
      ],
    },
  },
  {
    match: /card/i,
    profile: {
      tags: ['cards', 'content-grouping', 'scannability'],
      intents: ['module-consistency', 'feature-display'],
      industries: ['saas', 'local-services', 'ecommerce'],
      complexity: 'medium',
      renderingCost: 'low',
      interactionCost: 'low',
      whenToUse: [
        'Use when the UI needs repeatable, scannable content modules.',
        'Use when each item has similar data shape and priority.',
      ],
      avoidWhen: [
        'Avoid when each item requires different layout logic.',
        'Avoid when card density harms readability on mobile.',
      ],
    },
  },
  {
    match: /gallery/i,
    profile: {
      tags: ['gallery', 'media', 'visual-proof'],
      intents: ['media-narrative', 'visual-depth'],
      industries: ['hospitality', 'food', 'portfolio'],
      complexity: 'high',
      renderingCost: 'medium',
      interactionCost: 'medium',
      whenToUse: [
        'Use when image quality is strong and visual proof drives conversion.',
        'Use when users benefit from comparing media side by side.',
      ],
      avoidWhen: [
        'Avoid when media is sparse or inconsistent quality.',
        'Avoid when bandwidth constraints make heavy media unacceptable.',
      ],
    },
  },
  {
    match: /interactive/i,
    profile: {
      tags: ['interactive', 'engagement', 'selection'],
      intents: ['active-exploration', 'option-clarity'],
      industries: ['saas', 'education', 'services'],
      complexity: 'high',
      renderingCost: 'medium',
      interactionCost: 'high',
      whenToUse: [
        'Use when users must compare options or states before acting.',
        'Use when controlled interaction can improve comprehension.',
      ],
      avoidWhen: [
        'Avoid when a static list is enough to communicate choices.',
        'Avoid when interaction overhead can block conversion speed.',
      ],
    },
  },
  {
    match: /text/i,
    profile: {
      tags: ['typography', 'attention-steering'],
      intents: ['headline-emphasis', 'micro-motion'],
      industries: ['saas', 'agency', 'media'],
      complexity: 'medium',
      renderingCost: 'low',
      interactionCost: 'medium',
      whenToUse: [
        'Use when you need a single emphasis effect in key copy.',
        'Use for controlled attention steering in hero or section headers.',
      ],
      avoidWhen: [
        'Avoid stacking multiple animated text systems in the same viewport.',
        'Avoid in high-trust industries where playful motion can reduce credibility.',
      ],
    },
  },
  {
    match: /stats/i,
    profile: {
      tags: ['proof', 'metrics', 'trust'],
      intents: ['credibility', 'social-proof'],
      industries: ['saas', 'medical', 'local-services'],
      complexity: 'low',
      renderingCost: 'low',
      interactionCost: 'low',
      whenToUse: [
        'Use when verified quantitative proof exists.',
        'Use when buyers need confidence before engaging.',
      ],
      avoidWhen: [
        'Avoid with invented or placeholder numbers.',
        'Avoid when qualitative proof fits better than metrics.',
      ],
    },
  },
  {
    match: /transition/i,
    profile: {
      tags: ['transitions', 'section-flow'],
      intents: ['pacing', 'visual-cohesion'],
      industries: ['general'],
      complexity: 'medium',
      renderingCost: 'low',
      interactionCost: 'low',
      whenToUse: [
        'Use when section boundaries need intentional pacing.',
        'Use when color shifts between sections must feel seamless.',
      ],
      avoidWhen: [
        'Avoid when separators become decorative clutter.',
        'Avoid nesting transitions with additional divider bands.',
      ],
    },
  },
  {
    match: /ambient/i,
    profile: {
      tags: ['ambient', 'background-depth', 'atmosphere'],
      intents: ['mood-setting', 'premium-feel'],
      industries: ['saas', 'wellness', 'hospitality'],
      complexity: 'medium',
      renderingCost: 'medium',
      interactionCost: 'low',
      whenToUse: [
        'Use one ambient system per page to add depth and material feel.',
        'Use when foreground contrast stays high under all conditions.',
      ],
      avoidWhen: [
        'Avoid stacking multiple ambient systems in the same section.',
        'Avoid when ambient effects lower text readability.',
      ],
    },
  },
  {
    match: /layout/i,
    profile: {
      tags: ['layout', 'composition', 'information-architecture'],
      intents: ['content-organization', 'scan-efficiency'],
      industries: ['general'],
      complexity: 'medium',
      renderingCost: 'low',
      interactionCost: 'medium',
      whenToUse: [
        'Use when page information architecture needs stronger structure.',
        'Use when section order and rhythm impact comprehension.',
      ],
      avoidWhen: [
        'Avoid when simpler linear layout already solves the use case.',
        'Avoid when layout complexity hides primary CTA.',
      ],
    },
  },
  {
    match: /conversion/i,
    profile: {
      tags: ['conversion', 'local-business', 'trust'],
      intents: ['lead-generation', 'decision-confidence'],
      industries: ['medical', 'contractor', 'restaurant', 'local-services'],
      complexity: 'low',
      renderingCost: 'low',
      interactionCost: 'low',
      whenToUse: [
        'Use when contact actions and trust artifacts drive business outcomes.',
        'Use on local-service pages where speed-to-action matters.',
      ],
      avoidWhen: [
        'Avoid when key business details (hours, service list, contact methods) are incomplete.',
        'Avoid decorative styling that weakens trust signals.',
      ],
    },
  },
];

const PATTERN_OVERRIDES: Record<string, PatternOverride> = {
  '1.1': {
    tags: ['mesh-gradient', 'hero', 'premium'],
    industries: ['saas', 'tech-services', 'agency', 'contractor'],
    renderingCost: 'high',
    whenToUse: [
      'Use when the brand needs premium motion with a modern tone.',
      'Use when gradient depth supports positioning without reducing legibility.',
    ],
    avoidWhen: ['Avoid in strict low-motion/high-trust contexts unless motion is heavily reduced.'],
    fallbackPatternIds: ['1.4'],
    compatibleWith: ['6.1', '10.3', '7.1'],
    incompatibleWith: ['8.1', '8.2'],
  },
  '1.2': {
    tags: ['image-grid', 'food', 'hospitality'],
    industries: ['restaurant', 'hospitality', 'retail'],
    fallbackPatternIds: ['1.4', '9.3'],
    compatibleWith: ['3.2', '10.2', '10.3'],
  },
  '1.3': {
    tags: ['cutout', 'product-focus', 'editorial'],
    industries: ['ecommerce', 'boutique', 'product-brand'],
    complexity: 'high',
    renderingCost: 'medium',
    whenToUse: ['Use only when background-color seam matching can be guaranteed.'],
    avoidWhen: [
      'Avoid AI-generated cutouts without exact background match.',
      'Avoid human-hair/fuzzy-edge subjects when halo risks are high.',
    ],
    fallbackPatternIds: ['1.4', '1.2'],
    compatibleWith: ['10.3', '3.2'],
    incompatibleWith: ['8.1', '8.2', '8.4'],
  },
  '1.4': {
    tags: ['trust-hero', 'split-layout', 'high-clarity'],
    industries: ['medical', 'legal', 'contractor', 'local-services'],
    whenToUse: [
      'Use when conversion and trust clarity outweigh visual experimentation.',
      'Use when hero content needs explicit value proposition + CTA hierarchy.',
    ],
    fallbackPatternIds: ['9.3'],
    compatibleWith: ['10.1', '10.2', '10.3', '7.1'],
  },
  '2.1': {
    tags: ['hover-glow', 'cards'],
    compatibleWith: ['10.1', '9.3'],
  },
  '2.2': {
    tags: ['place', 'image-card', 'hospitality'],
    industries: ['restaurant', 'travel', 'hospitality'],
    compatibleWith: ['3.2', '10.3'],
  },
  '2.3': {
    status: 'experimental',
    tags: ['spotlight', 'pointer-tracking'],
    interactionCost: 'high',
    avoidWhen: [
      'Avoid on touch-first traffic when desktop hover effect is not critical.',
      'Avoid if pointer tracking can cause battery/performance issues.',
    ],
    fallbackPatternIds: ['2.1'],
  },
  '3.1': {
    status: 'experimental',
    tags: ['expanding-panels', 'desktop-first'],
    interactionCost: 'high',
    avoidWhen: ['Avoid when mobile is the dominant traffic source.'],
    fallbackPatternIds: ['3.2', '9.3'],
  },
  '3.2': {
    tags: ['expandable-gallery', 'lightbox'],
    compatibleWith: ['1.2', '1.3', '2.2'],
  },
  '3.3': {
    tags: ['scroll-narrative', 'sticky-story'],
    complexity: 'high',
    interactionCost: 'high',
    whenToUse: ['Use when process storytelling requires stage-by-stage focus.'],
    avoidWhen: ['Avoid when reduced-motion fallback is not implemented first.'],
    fallbackPatternIds: ['9.3'],
  },
  '4.1': {
    tags: ['selector', 'comparison'],
    interactionCost: 'high',
    fallbackPatternIds: ['4.2', '9.3'],
  },
  '4.2': {
    tags: ['tabs', 'content-switching'],
    fallbackPatternIds: ['9.3'],
  },
  '4.3': {
    status: 'experimental',
    tags: ['hover-button', 'micro-interaction'],
    avoidWhen: ['Avoid as primary CTA in accessibility-first flows.'],
    fallbackPatternIds: ['10.3'],
  },
  '5.1': {
    status: 'experimental',
    tags: ['magnetic-text', 'playful'],
    industries: ['creative', 'portfolio'],
    interactionCost: 'high',
    avoidWhen: ['Avoid for medical/legal/dental and other trust-sensitive pages.'],
    fallbackPatternIds: ['5.4', '5.2'],
    incompatibleWith: ['10.4'],
  },
  '5.2': {
    tags: ['flip-words', 'headline-emphasis'],
    whenToUse: ['Use only at sentence-final headline position to avoid grammar breaks.'],
    fallbackPatternIds: ['5.4'],
  },
  '5.3': {
    tags: ['text-loop', 'status-rotation'],
    fallbackPatternIds: ['5.4'],
  },
  '5.4': {
    tags: ['text-reveal', 'editorial'],
    compatibleWith: ['1.4', '9.3'],
  },
  '5.5': {
    status: 'experimental',
    tags: ['cursor-text', 'pointer-dependent'],
    interactionCost: 'high',
    avoidWhen: ['Avoid when a coarse pointer is expected for most sessions.'],
    fallbackPatternIds: ['5.4'],
  },
  '6.1': {
    tags: ['counter', 'social-proof'],
    industries: ['medical', 'contractor', 'saas', 'local-services'],
    whenToUse: ['Use only with verified figures and defined suffix units.'],
    avoidWhen: ['Avoid if metrics are stale, estimated, or unverifiable.'],
    fallbackPatternIds: ['10.2'],
  },
  '7.1': {
    tags: ['separator', 'section-transition'],
    compatibleWith: ['1.4', '9.3', '10.1'],
    avoidWhen: ['Avoid combining with hard borders and extra decorative separators.'],
  },
  '8.1': {
    tags: ['aurora', 'ambient'],
    renderingCost: 'high',
    fallbackPatternIds: ['8.4', '8.2'],
    incompatibleWith: ['1.1'],
  },
  '8.2': {
    tags: ['blobs', 'ambient-depth'],
    renderingCost: 'medium',
    fallbackPatternIds: ['8.4'],
  },
  '8.3': {
    tags: ['parallax-glass', 'signature-moment'],
    renderingCost: 'high',
    interactionCost: 'medium',
    fallbackPatternIds: ['9.3'],
  },
  '8.4': {
    tags: ['shape-blur', 'lightweight-ambient'],
    renderingCost: 'low',
    fallbackPatternIds: ['8.2'],
  },
  '9.1': {
    tags: ['parallax', 'layered-layout'],
    renderingCost: 'medium',
    interactionCost: 'medium',
    fallbackPatternIds: ['9.3'],
  },
  '9.2': {
    tags: ['marquee', 'logos', 'social-proof'],
    interactionCost: 'low',
    fallbackPatternIds: ['10.2'],
  },
  '9.3': {
    tags: ['bento', 'layout', 'modular'],
    complexity: 'medium',
    fallbackPatternIds: ['10.1', '2.1'],
    compatibleWith: ['10.1', '10.2', '10.3'],
  },
  '10.1': {
    tags: ['service-card', 'offer-clarity'],
    industries: ['medical', 'contractor', 'legal', 'local-services'],
    compatibleWith: ['1.4', '10.3', '10.4'],
  },
  '10.2': {
    tags: ['testimonials', 'trust-proof'],
    industries: ['medical', 'restaurant', 'contractor', 'saas'],
    compatibleWith: ['1.4', '10.3', '6.1'],
  },
  '10.3': {
    tags: ['contact-cta', 'conversion-endpoint'],
    industries: ['medical', 'restaurant', 'contractor', 'local-services'],
    whenToUse: ['Use near the end of narrative flow and repeat after proof-heavy sections.'],
    fallbackPatternIds: ['10.1'],
  },
  '10.4': {
    tags: ['business-hours', 'local-seo', 'operational-info'],
    industries: ['medical', 'restaurant', 'local-services'],
    whenToUse: ['Use when operating hours materially impact conversion decisions.'],
    fallbackPatternIds: ['10.3'],
  },
};

function unique(items: string[]): string[] {
  return Array.from(new Set(items.filter(Boolean)));
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function profileForCategory(category: string): CategoryProfile {
  const matched = CATEGORY_PROFILES.find((entry) => entry.match.test(category));
  return matched ? matched.profile : DEFAULT_PROFILE;
}

function mergeText(base: string[], extra?: string[]) {
  return unique([...(base || []), ...(extra || [])]);
}

export function buildPatternTaxonomy(pattern: Pattern): PatternTaxonomy {
  const profile = profileForCategory(pattern.category);
  const overrides = PATTERN_OVERRIDES[pattern.id] || {};

  return {
    id: pattern.id,
    canonicalId: `patlib.pattern.${pattern.id}`,
    slug: slugify(pattern.name),
    taxonomyVersion: TAXONOMY_VERSION,
    status: overrides.status ?? 'active',
    tags: mergeText(profile.tags, overrides.tags),
    intents: mergeText(profile.intents, overrides.intents),
    industries: mergeText(profile.industries, overrides.industries),
    complexity: overrides.complexity ?? profile.complexity,
    renderingCost: overrides.renderingCost ?? profile.renderingCost,
    interactionCost: overrides.interactionCost ?? profile.interactionCost,
    whenToUse: mergeText(profile.whenToUse, overrides.whenToUse),
    avoidWhen: mergeText(profile.avoidWhen, overrides.avoidWhen),
    fallbackPatternIds: unique(overrides.fallbackPatternIds || []),
    compatibleWith: unique(overrides.compatibleWith || []),
    incompatibleWith: unique(overrides.incompatibleWith || []),
  };
}

export function getTaxonomyVersions() {
  return {
    taxonomy: TAXONOMY_VERSION,
  };
}
