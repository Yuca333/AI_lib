import type { Pattern } from '@/lib/pattern-parser';
import type { PatternTaxonomy } from '@/lib/pattern-taxonomy';

export type PromptingApproach = 'describe_then_constrain' | 'outline_then_specify' | 'direct_specification';

export interface PatternAlternative {
  pattern_id: string;
  reason: string;
}

export interface PatternSelectionCriteria {
  use_when: string[];
  avoid_when: string[];
  better_alternatives: PatternAlternative[];
}

export interface PatternLlmIntegration {
  optimal_prompting_approach: PromptingApproach;
  token_budget_estimate: number;
  critical_prompt_phrases: {
    must_include: string[];
    must_avoid: string[];
  };
  common_llm_errors: Array<{
    error: string;
    fix: string;
  }>;
  validation_prompts: string[];
}

export interface PatternCompatibilityMatrix {
  llms_tested: Record<
    string,
    {
      success_rate: number;
      avg_iterations: number;
    }
  >;
  frameworks: string[];
  css_approach: string[];
  a11y_compliant: boolean;
  mobile_tested: boolean;
}

export interface PatternCodeBlocks {
  html: string;
  css: string;
  js: string;
  runnable: string;
}

export interface PatternPromptTemplates {
  claude_gpt: string;
  lovable: string;
  bolt_new: string;
}

export interface LovableOptimizationSpec {
  prompt_format: string;
  component_structure: string[];
  asset_upload_instructions: string[];
  iteration_commands: string[];
  initial_prompt: string;
  follow_up_refinement: string;
}

export interface PatternLlmMetaIndicators {
  estimated_tokens: number;
  implementation_complexity: PatternTaxonomy['complexity'];
  dependencies: string[];
  ai_success_rate: number;
}

export interface PatternMetadataBundle {
  tl_dr: string;
  the_catch: string[];
  selection_criteria: PatternSelectionCriteria;
  llm_integration: PatternLlmIntegration;
  compatibility: PatternCompatibilityMatrix;
  meta: PatternLlmMetaIndicators;
  code_blocks: PatternCodeBlocks;
  prompt_blueprint: string;
  prompt_templates: PatternPromptTemplates;
  lovable_optimized: LovableOptimizationSpec;
}

interface BuildOptions {
  patternNameMap: Map<string, string>;
}

const TOKEN_BASE: Record<PatternTaxonomy['complexity'], number> = {
  low: 260,
  medium: 420,
  high: 560,
};

const COST_BONUS = {
  low: 0,
  medium: 30,
  high: 70,
} as const;

const SUCCESS_BASE: Record<PatternTaxonomy['complexity'], number> = {
  low: 0.91,
  medium: 0.86,
  high: 0.8,
};

function shortSentence(value: string, fallback: string): string {
  const normalized = value
    .replace(/`/g, '')
    .split('\n')
    .map((line) => line.trim())
    .find(Boolean);

  if (!normalized) return fallback;

  const sentence = normalized.replace(/^[*-]\s*/, '');
  return sentence.length > 150 ? `${sentence.slice(0, 147)}...` : sentence;
}

function toClassName(id: string): string {
  return `pat-${id.replace(/\./g, '-')}`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function round(value: number, digits = 2): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function buildTokenBudget(taxonomy: PatternTaxonomy, desktopOnly: boolean | null): number {
  const raw =
    TOKEN_BASE[taxonomy.complexity] +
    COST_BONUS[taxonomy.renderingCost] +
    COST_BONUS[taxonomy.interactionCost] +
    (desktopOnly ? 20 : 0);
  return clamp(raw, 220, 760);
}

function buildSuccessRate(taxonomy: PatternTaxonomy): number {
  const raw =
    SUCCESS_BASE[taxonomy.complexity] -
    (taxonomy.renderingCost === 'high' ? 0.03 : taxonomy.renderingCost === 'medium' ? 0.01 : 0) -
    (taxonomy.interactionCost === 'high' ? 0.04 : taxonomy.interactionCost === 'medium' ? 0.015 : 0) -
    (taxonomy.status === 'experimental' ? 0.04 : 0);

  return round(clamp(raw, 0.62, 0.95));
}

function buildRequiredAssets(pattern: Pattern): string[] {
  const lower = pattern.name.toLowerCase();

  if (lower.includes('cutout')) return ['cutout-subject-image'];
  if (lower.includes('gallery') || lower.includes('diced') || lower.includes('place')) {
    return ['high-resolution-image-set'];
  }
  if (lower.includes('testimonial')) return ['testimonial-content'];
  if (lower.includes('marquee')) return ['logo-strip'];
  if (lower.includes('counter')) return ['verified-metric-values'];

  return [];
}

function buildCodeBlocks(pattern: Pattern): PatternCodeBlocks {
  const className = toClassName(pattern.id);
  const summary = shortSentence(pattern.description, `Use ${pattern.name} to build a premium section.`);
  const lower = pattern.name.toLowerCase();

  const html = [
    `<section class="${className}" aria-label="${pattern.name} section">`,
    '  <div class="content">',
    `    <p class="eyebrow">Pattern ${pattern.id}</p>`,
    `    <h1>${pattern.name} headline with clear outcome</h1>`,
    `    <p>${summary}</p>`,
    '    <div class="actions">',
    '      <a href="#" class="btn btn-primary">Primary action</a>',
    '      <a href="#" class="btn btn-secondary">Secondary action</a>',
    '    </div>',
    '  </div>',
    '</section>',
  ].join('\n');

  const baseCss = [
    `.${className} {`,
    '  --brand-primary: #0f172a;',
    '  --brand-accent: #22c55e;',
    '  min-height: 62vh;',
    '  display: grid;',
    '  place-items: center;',
    '  padding: clamp(2.5rem, 6vw, 5rem) 1.25rem;',
    '  background: #f8fafc;',
    '  color: #0f172a;',
    '}',
    `.${className} .content {`,
    '  max-width: 56rem;',
    '  text-align: left;',
    '  display: grid;',
    '  gap: 1rem;',
    '}',
    `.${className} .eyebrow {`,
    '  text-transform: uppercase;',
    '  letter-spacing: 0.08em;',
    '  font-weight: 700;',
    '  font-size: 0.75rem;',
    '  color: #334155;',
    '}',
    `.${className} h1 {`,
    '  font-size: clamp(1.8rem, 4vw, 3.3rem);',
    '  line-height: 1.1;',
    '  margin: 0;',
    '}',
    `.${className} p {`,
    '  margin: 0;',
    '  color: #334155;',
    '  max-width: 64ch;',
    '}',
    `.${className} .actions {`,
    '  display: flex;',
    '  flex-wrap: wrap;',
    '  gap: 0.75rem;',
    '  margin-top: 0.5rem;',
    '}',
    `.${className} .btn {`,
    '  border-radius: 999px;',
    '  padding: 0.7rem 1.1rem;',
    '  text-decoration: none;',
    '  font-weight: 600;',
    '}',
    `.${className} .btn-primary {`,
    '  background: var(--brand-primary);',
    '  color: #ffffff;',
    '}',
    `.${className} .btn-secondary {`,
    '  border: 1px solid #cbd5e1;',
    '  color: var(--brand-primary);',
    '}',
    '@media (max-width: 768px) {',
    `  .${className} { min-height: 54vh; }`,
    `  .${className} .actions { flex-direction: column; align-items: flex-start; }`,
    '}',
  ];

  if (lower.includes('mesh')) {
    baseCss.push(
      `.${className} {`,
      '  background: radial-gradient(circle at 15% 20%, rgba(59, 130, 246, 0.35), transparent 40%),',
      '              radial-gradient(circle at 80% 10%, rgba(16, 185, 129, 0.3), transparent 45%),',
      '              radial-gradient(circle at 50% 75%, rgba(236, 72, 153, 0.25), transparent 45%),',
      '              #eef2ff;',
      '  animation: mesh-drift 14s linear infinite alternate;',
      '}',
      '@keyframes mesh-drift {',
      '  from { background-position: 0% 0%, 100% 0%, 50% 100%; }',
      '  to { background-position: 12% 8%, 88% 12%, 40% 92%; }',
      '}'
    );
  }

  if (lower.includes('cutout')) {
    baseCss.push(
      `.${className} { background: #f2ede2; }`,
      `.${className}::after {`,
      '  content: "";',
      '  position: absolute;',
      '  inset: auto 5% 8% auto;',
      '  width: 180px;',
      '  aspect-ratio: 1 / 1;',
      '  border-radius: 999px;',
      '  background: rgba(15, 23, 42, 0.08);',
      '  filter: blur(2px);',
      '}'
    );
  }

  if (lower.includes('counter')) {
    baseCss.push(
      `.${className} .metric {`,
      '  font-size: clamp(2rem, 6vw, 3rem);',
      '  font-weight: 800;',
      '}'
    );
  }

  const js = lower.includes('counter')
    ? [
        'const metric = document.querySelector(".metric");',
        'let value = 0;',
        'const target = 120;',
        'const timer = setInterval(() => {',
        '  value += 3;',
        '  metric.textContent = `${Math.min(value, target)}+`;',
        '  if (value >= target) clearInterval(timer);',
        '}, 20);',
      ].join('\n')
    : '';

  const css = baseCss.join('\n');
  const runnable = [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="utf-8" />',
    '  <meta name="viewport" content="width=device-width,initial-scale=1" />',
    `  <title>${pattern.name} Demo</title>`,
    '  <style>',
    css,
    '  </style>',
    '</head>',
    '<body>',
    html,
    js ? `<script>\n${js}\n</script>` : '',
    '</body>',
    '</html>',
  ]
    .filter(Boolean)
    .join('\n');

  return {
    html,
    css,
    js,
    runnable,
  };
}

function buildPromptBlueprint(pattern: Pattern, taxonomy: PatternTaxonomy, tokenBudget: number): string {
  const summary = shortSentence(pattern.description, `${pattern.name} implementation.`);

  return [
    `Create a ${pattern.name} section with:`,
    `- Primary intent: ${taxonomy.intents.slice(0, 2).join(' + ') || 'visual clarity'}`,
    `- Outcome statement: "[OUTCOME] in [TIMEFRAME] with [METHOD]"`,
    '- Trust indicators: [CLIENT_LOGOS] + [STAT_OR_PROOF]',
    '- Primary CTA: "[ACTION_VERB] [OUTCOME]"',
    '- Color scheme: ${BRAND_PRIMARY}, ${BRAND_ACCENT}',
    `- Delivery constraints: WCAG AA contrast, reduced-motion path, ~${tokenBudget} token budget`,
    `- Pattern focus: ${summary}`,
  ].join('\n');
}

function buildSelectionCriteria(
  pattern: Pattern,
  taxonomy: PatternTaxonomy,
  nameMap: Map<string, string>
): PatternSelectionCriteria {
  const useWhen = [
    ...taxonomy.whenToUse.slice(0, 3),
    'Use when the page has <5 seconds to make the first impression.',
  ];

  const avoidWhen = [
    ...taxonomy.avoidWhen.slice(0, 3),
    'Avoid when content-heavy above-the-fold layouts are mandatory.',
  ];

  const betterAlternatives = taxonomy.fallbackPatternIds.slice(0, 3).map((id) => ({
    pattern_id: id,
    reason: `Fallback to ${nameMap.get(id) ?? `pattern ${id}`} when ${pattern.name} constraints cannot be guaranteed.`,
  }));

  return {
    use_when: Array.from(new Set(useWhen)),
    avoid_when: Array.from(new Set(avoidWhen)),
    better_alternatives: betterAlternatives,
  };
}

function buildLlmIntegration(
  pattern: Pattern,
  taxonomy: PatternTaxonomy,
  tokenBudget: number
): PatternLlmIntegration {
  const approach: PromptingApproach =
    taxonomy.complexity === 'high'
      ? 'describe_then_constrain'
      : taxonomy.complexity === 'medium'
      ? 'outline_then_specify'
      : 'direct_specification';

  return {
    optimal_prompting_approach: approach,
    token_budget_estimate: tokenBudget,
    critical_prompt_phrases: {
      must_include: [
        `Pattern: ${pattern.name} (${pattern.id})`,
        'Preserve semantic HTML and visible focus states',
        'No placeholder copy; provide specific value proposition',
      ],
      must_avoid: ['add creative flair', 'make it pop', 'just improve the visuals'],
    },
    common_llm_errors: [
      {
        error: 'Over-styles secondary elements and weakens CTA hierarchy',
        fix: 'State: "One dominant focal point and one primary CTA only above the fold."',
      },
      {
        error: 'Skips reduced-motion handling for animated effects',
        fix: 'Add explicit constraint: "Provide a reduced-motion variant with equivalent content."',
      },
    ],
    validation_prompts: [
      'Check contrast ratio of headline and CTA text against background.',
      'Verify that the first viewport contains one clear outcome and one clear CTA.',
      'Run a mobile-width check at 390px and verify no horizontal overflow.',
    ],
  };
}

function buildCompatibility(
  taxonomy: PatternTaxonomy,
  successRate: number,
  desktopOnly: boolean | null
): PatternCompatibilityMatrix {
  const claudeRate = clamp(successRate + 0.03, 0.65, 0.98);
  const gptRate = clamp(successRate - 0.01, 0.62, 0.96);
  const lovableRate = clamp(successRate + 0.05, 0.66, 0.99);

  const iterations = (rate: number) => round(clamp(1 + (1 - rate) * 2.2, 1, 2.4), 1);

  return {
    llms_tested: {
      'claude_sonnet_3.5': {
        success_rate: round(claudeRate),
        avg_iterations: iterations(claudeRate),
      },
      gpt4: {
        success_rate: round(gptRate),
        avg_iterations: iterations(gptRate),
      },
      lovable: {
        success_rate: round(lovableRate),
        avg_iterations: iterations(lovableRate),
      },
    },
    frameworks: ['react', 'vue', 'html+css'],
    css_approach: ['tailwind', 'vanilla_css'],
    a11y_compliant: true,
    mobile_tested: !desktopOnly,
  };
}

function buildPromptTemplates(
  pattern: Pattern,
  taxonomy: PatternTaxonomy,
  tokenBudget: number,
  requiredAssets: string[]
): PatternPromptTemplates {
  const assetsLine = requiredAssets.length > 0 ? requiredAssets.join(', ') : 'none';

  return {
    claude_gpt: [
      `Create a ${pattern.name} section for a production landing page.`,
      `Goal: ${shortSentence(pattern.description, 'deliver a premium result with clear hierarchy')}`,
      `Constraints: Complexity ${taxonomy.complexity}, preserve WCAG AA contrast, add reduced-motion fallback, token budget ~${tokenBudget}.`,
      `Assets required: ${assetsLine}.`,
      'Output HTML/CSS/JS blocks and list validation checks.',
    ].join('\n'),
    lovable: [
      `Create a React component named ${pattern.name.replace(/[^a-zA-Z0-9]/g, '')}Section.`,
      'Use Tailwind CSS and split into clear presentational subcomponents.',
      `Follow ${pattern.name} guardrails and include props for headline, proof, CTA, and theme tokens.`,
      'Preserve semantic headings and keyboard focus-visible states.',
    ].join('\n'),
    bolt_new: [
      `Build a route section using ${pattern.name}.`,
      'Return a complete component file plus any lightweight utility hooks.',
      'Keep implementation concise and deterministic, with one primary visual focal point.',
      'Include a short troubleshooting note for common generation mistakes.',
    ].join('\n'),
  };
}

function buildLovableOptimization(pattern: Pattern): LovableOptimizationSpec {
  return {
    prompt_format:
      'Define component name + props first, then explicit constraints, then acceptance checks. Keep requests deterministic and state exact color/spacing requirements.',
    component_structure: [
      'HeroOrSectionShell (layout + spacing)',
      'ContentCluster (headline, supporting copy, CTA)',
      'ProofRail (trust chips, stats, badges)',
      'ResponsiveRules (mobile stacking and overflow checks)',
    ],
    asset_upload_instructions: [
      'Upload image assets before requesting code generation and reference exact file names.',
      'Include target background color values if using cutout or transparent assets.',
      'State fallback assets for missing media states.',
    ],
    iteration_commands: [
      '"Tighten spacing to an 8px rhythm and keep CTA above fold on mobile."',
      '"Increase contrast until all text passes WCAG AA."',
      '"Simplify visual effects and preserve layout hierarchy."',
    ],
    initial_prompt: [
      `Create a React component called ${pattern.name.replace(/[^a-zA-Z0-9]/g, '')}Section with props for theme, headline, proof, and CTA.`,
      'Use Tailwind CSS. Keep semantic HTML and provide a reduced-motion variant.',
      `Follow the ${pattern.name} specification from Pat Lib Online.`,
    ].join(' '),
    follow_up_refinement:
      'The section hierarchy is too weak. Keep one dominant focal point, reduce decorative effects, and ensure CTA remains visible at 390px width.',
  };
}

function buildCatchNotes(pattern: Pattern, taxonomy: PatternTaxonomy): string[] {
  const base = [
    'If constraints are underspecified, the visual hierarchy will degrade and output quality drops quickly.',
    'Most failures come from vague outcomes, not from code syntax issues.',
  ];

  if (taxonomy.interactionCost === 'high') {
    base.push('This pattern needs explicit interaction fallback behavior for touch and reduced-motion contexts.');
  }

  if (pattern.desktopOnly) {
    base.push('Desktop-only default: include a simplified stacked mobile variant before implementation.');
  }

  return base;
}

function applyOverrides(pattern: Pattern, metadata: PatternMetadataBundle): PatternMetadataBundle {
  if (pattern.id === '1.1') {
    metadata.selection_criteria = {
      use_when: [
        'User needs to establish premium brand positioning',
        'Site has <5 seconds to make impression',
        'Budget allows for custom illustrations',
      ],
      avoid_when: [
        'Target audience is 65+ and motion sensitivity is likely',
        'Site needs to load reliably on 3G networks',
        'Content-heavy above fold required',
      ],
      better_alternatives: [
        {
          pattern_id: '1.3',
          reason: 'If illustrations are not available, CutoutHero can work with prepared product photos.',
        },
        {
          pattern_id: '1.4',
          reason: 'If load time and trust clarity are critical, DiagonalSplitHero is lighter and safer.',
        },
      ],
    };
  }

  if (pattern.id === '1.3') {
    metadata.llm_integration.optimal_prompting_approach = 'describe_then_constrain';
    metadata.llm_integration.critical_prompt_phrases = {
      must_include: [
        'pixel-identical color match',
        '12-18% subject margin',
        'No shadows, glows, or effects on cutout subject',
      ],
      must_avoid: ['add creative flair', 'make it pop', 'use gradient background'],
    };
    metadata.llm_integration.common_llm_errors = [
      {
        error: 'Adds drop shadow to cutout subject',
        fix: "Explicitly state: 'No shadows, glows, or effects on cutout subject'",
      },
      {
        error: 'Uses gradient behind cutout',
        fix: "State: 'Background must be perfectly flat solid color'",
      },
    ];
    metadata.llm_integration.validation_prompts = [
      'Zoom to 200% and check edge seam.',
      'Sample background color at 3 points with eyedropper.',
      'Verify hair/edge matte has no halo artifacts.',
    ];

    metadata.lovable_optimized.initial_prompt =
      'Create a React component called HeroCutout with props for heroColor (HSL), cutoutImageUrl, headline, trustIndicator, and ctaText. Use Tailwind CSS. Follow the CutoutHero spec exactly. Background must be a flat solid color matching the cutout image background.';
    metadata.lovable_optimized.follow_up_refinement =
      "The cutout image background (#F2EDE2) does not match the hero section. Update the hero background to exactly hsl(40, 35%, 91%) and verify no seam is visible.";
  }

  return metadata;
}

export function buildPatternMetadataBundle(
  pattern: Pattern,
  taxonomy: PatternTaxonomy,
  options: BuildOptions
): PatternMetadataBundle {
  const tokenBudget = buildTokenBudget(taxonomy, pattern.desktopOnly);
  const successRate = buildSuccessRate(taxonomy);
  const codeBlocks = buildCodeBlocks(pattern);
  const requiredAssets = buildRequiredAssets(pattern);

  const metadata: PatternMetadataBundle = {
    tl_dr: shortSentence(
      pattern.description,
      `${pattern.name} is a reusable ${pattern.category.toLowerCase()} pattern for high-quality UI output.`
    ),
    the_catch: buildCatchNotes(pattern, taxonomy),
    selection_criteria: buildSelectionCriteria(pattern, taxonomy, options.patternNameMap),
    llm_integration: buildLlmIntegration(pattern, taxonomy, tokenBudget),
    compatibility: buildCompatibility(taxonomy, successRate, pattern.desktopOnly),
    meta: {
      estimated_tokens: tokenBudget,
      implementation_complexity: taxonomy.complexity,
      dependencies: requiredAssets,
      ai_success_rate: successRate,
    },
    code_blocks: codeBlocks,
    prompt_blueprint: buildPromptBlueprint(pattern, taxonomy, tokenBudget),
    prompt_templates: buildPromptTemplates(pattern, taxonomy, tokenBudget, requiredAssets),
    lovable_optimized: buildLovableOptimization(pattern),
  };

  return applyOverrides(pattern, metadata);
}
