import fs from 'fs';
import path from 'path';
import { parsePatterns, Pattern } from './pattern-parser';

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
}

export interface PatternPlaybook {
    slug: string;
    title: string;
    industry: string;
    summary: string;
    recommendedPatternIds: string[];
    references: string[];
    promptGuide: string;
    codeGuide: string;
}

export interface ResolvedPlaybook extends PatternPlaybook {
    patterns: Pattern[];
}

type PlaybookDefinition = PatternPlaybook;

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
    { id: 'power-quality', fileName: 'lib-power-quality.md' },
    { id: 'prompt-vocabulary', fileName: 'lib-prompt-vocabulary-reference.md' },
    { id: 'visual-vocabulary', fileName: 'lib-visual-vocabulary.md' },
];

const PLAYBOOKS: PlaybookDefinition[] = [
    {
        slug: 'dentist-landing',
        title: 'Dentist Landing Playbook',
        industry: 'Dental Clinic',
        summary: 'Trust-first local clinic landing page focused on credibility, clarity, and easy booking.',
        recommendedPatternIds: ['1.4', '10.1', '10.2', '6.1', '10.3', '10.4', '7.1'],
        references: ['core-rules', 'pattern-select', 'implementation-blocks', 'visual-vocabulary', 'css-bridge'],
        promptGuide: [
            'Build a conversion-focused landing page for a local dental clinic.',
            'Hero pattern: DiagonalSplitHero with high-contrast clinical colors and direct booking CTA.',
            'Trust block: use ServiceCard for treatments, then TestimonialCarousel and AnimatedCounter for proof.',
            'End-of-page conversion: ContactCTA plus BusinessHours with highlightToday=true.',
            'Use one transition family only, and keep motion subtle with reduced-motion fallback.',
            'Reject playful effects that reduce trust (no magnetic text, no heavy neon glows).',
        ].join('\n'),
        codeGuide: [
            '1. Render DiagonalSplitHero with text on a solid high-contrast zone and explicit CTA button.',
            '2. Add a ServiceCard grid for top treatments (clean cards, no visual noise).',
            '3. Add AnimatedCounter only for real numeric proof values.',
            '4. Add TestimonialCarousel (3+ entries) with keyboard-accessible controls.',
            '5. Add ContactCTA and BusinessHours as final conversion modules.',
            '6. Apply SectionTransition with explicit SECTION_COLORS hsl() values.',
            '7. Add reduced-motion handling for all animated components.',
        ].join('\n'),
    },
    {
        slug: 'restaurant-landing',
        title: 'Restaurant Landing Playbook',
        industry: 'Restaurant',
        summary: 'Image-led restaurant landing page balancing atmosphere, menu discovery, and reservation CTA.',
        recommendedPatternIds: ['1.2', '2.2', '3.2', '10.2', '10.3', '7.1'],
        references: ['pattern-select', 'implementation-blocks', 'css-bridge', 'visual-vocabulary'],
        promptGuide: [
            'Build a local restaurant landing page with strong food imagery and clear reservation flow.',
            'Hero pattern: DicedHero for immediate visual appetite appeal.',
            'Use PlaceCard or ExpandableGallery for menu spaces and signature dishes.',
            'Use TestimonialCarousel for trust and ContactCTA for booking conversion.',
            'Apply one ambient system only; avoid stacking multiple heavy hero effects.',
        ].join('\n'),
        codeGuide: [
            '1. Implement DicedHero with mobile-safe image layout and readable headline contrast.',
            '2. Add PlaceCard or ExpandableGallery with resilient image fallback behavior.',
            '3. Add TestimonialCarousel with touch-friendly controls and pause on interaction.',
            '4. Place ContactCTA above footer with direct reservation action.',
            '5. Keep section transitions consistent and seam-free.',
        ].join('\n'),
    },
    {
        slug: 'contractor-landing',
        title: 'Contractor Landing Playbook',
        industry: 'Contractor / Trades',
        summary: 'Trust and speed focused service page emphasizing process clarity and quote conversion.',
        recommendedPatternIds: ['1.1', '10.1', '3.3', '6.1', '10.3'],
        references: ['core-rules', 'pattern-select', 'implementation-blocks', 'prompt-vocabulary'],
        promptGuide: [
            'Build a local contractor landing page for fast quote conversion and trust.',
            'Use MeshGradientHero only with restrained motion and legible text over gradients.',
            'Show services in ServiceCard blocks with clear scope and pricing signal.',
            'Use ScrollStack for process narrative only if reduced-motion fallback is included.',
            'Use ContactCTA as the primary conversion endpoint with phone + form options.',
        ].join('\n'),
        codeGuide: [
            '1. Implement MeshGradientHero with reduced-motion support and high contrast overlays.',
            '2. Add ServiceCard grid with concise value bullets and clear CTA labels.',
            '3. Add ScrollStack using native window scroll and a static fallback mode.',
            '4. Add AnimatedCounter for measurable proof points.',
            '5. End with ContactCTA and optional sticky mobile call button.',
        ].join('\n'),
    },
];

function classifyGuidanceMode(text: string): GuidanceMode {
    const lower = text.toLowerCase();
    const codeMatch = /(implement|code|tsx|typescript|jsx|css|keyframe|component|api|install|usage)/.test(lower);
    const promptMatch = /(prompt|vocabulary|selection|quality|rules|guardrail|heuristic|art direction|copy)/.test(lower);

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
        lines.find((line) => line.toLowerCase().startsWith('**purpose:**'))?.replace(/^\*\*Purpose:\*\*\s*/i, '').trim() ??
        '';

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

    const summary = purpose || sections[0]?.body.split('\n').find((line) => line.trim())?.trim() || '';

    return {
        id: config.id,
        fileName: config.fileName,
        title,
        purpose,
        summary,
        sections,
    };
}

export function getPatternLibrary(): Pattern[] {
    return parsePatterns(PATTERN_FILE);
}

export function getPatternById(id: string): Pattern | undefined {
    return getPatternLibrary().find((pattern) => pattern.id === id);
}

export function getReferenceLibrary(): ReferenceDocument[] {
    return REFERENCE_DOCS.map(parseReferenceDocument);
}

export function getReferenceById(id: string): ReferenceDocument | undefined {
    return getReferenceLibrary().find((doc) => doc.id === id);
}

export function getPlaybooks(): ResolvedPlaybook[] {
    const patternMap = new Map(getPatternLibrary().map((pattern) => [pattern.id, pattern]));

    return PLAYBOOKS.map((playbook) => ({
        ...playbook,
        patterns: playbook.recommendedPatternIds
            .map((id) => patternMap.get(id))
            .filter((pattern): pattern is Pattern => Boolean(pattern)),
    }));
}

export function getPlaybookBySlug(slug: string): ResolvedPlaybook | undefined {
    return getPlaybooks().find((playbook) => playbook.slug === slug);
}
