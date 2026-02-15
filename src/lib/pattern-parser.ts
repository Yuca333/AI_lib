import fs from 'fs';

export interface Pattern {
    id: string;
    name: string;
    category: string;
    score: string;
    description: string;
    code: string;
    promptExample: string;
    usageNotes: string;
}

function cleanMarkdown(lines: string[]): string {
    const filtered = lines
        .map((line) => line.replace(/\r$/, ''))
        .filter((line) => line.trim() !== '---')
        .map((line) => line.replace(/\s+$/, ''));

    // Compress repeated blank lines to single blank lines for readability.
    const normalized: string[] = [];
    let previousBlank = false;
    for (const line of filtered) {
        const isBlank = line.trim() === '';
        if (isBlank && previousBlank) continue;
        normalized.push(line);
        previousBlank = isBlank;
    }

    return normalized.join('\n').trim();
}

function extractFirstMeaningfulSentence(text: string): string {
    const candidates: string[] = [];
    let inFence = false;

    for (const rawLine of text.split('\n')) {
        const line = rawLine.trim();
        if (!line) continue;
        if (line.startsWith('```')) {
            inFence = !inFence;
            continue;
        }
        if (inFence) continue;
        if (line.startsWith('**Usage**')) continue;
        if (line.startsWith('**Required CSS')) continue;
        if (line.startsWith('**AI Prompter Example:**')) continue;
        if (line.startsWith('**Optional')) continue;
        if (line.startsWith('#')) continue;
        candidates.push(line);
    }

    const first = candidates[0] ?? '';
    if (!first) return '';
    return first.replace(/^\*\*What it does\*\*:\s*/i, '').trim();
}

function buildPromptFallback(patternName: string, description: string, usageNotes: string): string {
    const promptingNote = usageNotes.match(/\*\*Prompting note for Lovable\.dev\*\*:\s*(.+)/i)?.[1]?.trim();
    if (promptingNote) {
        return `Implement ${patternName}.\n- ${promptingNote}`;
    }

    const summary = description || extractFirstMeaningfulSentence(usageNotes);
    return `Implement ${patternName}.\n- Goal: ${summary || 'Apply this pattern with clear visual hierarchy.'}\n- Include reduced-motion fallback.\n- Keep semantic HTML and visible focus states.`;
}

export function parsePatterns(filePath: string): Pattern[] {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const patterns: Pattern[] = [];

    let currentPattern: Partial<Pattern> | null = null;
    let currentCategory = 'Uncategorized';

    let parsePhase: 'preCode' | 'postCode' = 'preCode';
    let pendingPromptBlock = false;

    let inFence = false;
    let fenceBuffer: string[] = [];
    let fenceTarget: 'none' | 'code' | 'prompt' | 'notes' = 'none';

    let preCodeNotes: string[] = [];
    let postCodeNotes: string[] = [];

    // Regex to identify start of a pattern
    // ### 1.1 MeshGradientHero
    const patternHeaderRegex = /^###\s+(\d+\.\d+)\s+(.+)$/;

    // Regex for Section Headers to identify Category
    // ## SECTION 1: HERO PATTERNS
    const sectionHeaderRegex = /^##\s+SECTION\s+\d+:\s+(.+)$/;
    const scoreRegex = /^\*\*Score\*\*:/;

    const finalizeCurrentPattern = () => {
        if (!currentPattern || !currentPattern.id || !currentPattern.name) return;

        const description = cleanMarkdown(preCodeNotes);
        const usageNotes = cleanMarkdown(postCodeNotes);

        currentPattern.description =
            description ||
            extractFirstMeaningfulSentence(usageNotes) ||
            `Implementation guidance for ${currentPattern.name}.`;
        currentPattern.usageNotes = usageNotes;
        currentPattern.code = (currentPattern.code ?? '').trim();
        currentPattern.promptExample = (currentPattern.promptExample ?? '').trim();
        if (!currentPattern.promptExample) {
            currentPattern.promptExample = buildPromptFallback(
                currentPattern.name,
                currentPattern.description || '',
                usageNotes
            );
        }
        currentPattern.score = (currentPattern.score ?? '').trim();
        patterns.push(currentPattern as Pattern);
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Check for Section Header
        const sectionMatch = line.match(sectionHeaderRegex);
        if (sectionMatch) {
            currentCategory = sectionMatch[1].trim();
            continue;
        }

        // Check for Pattern Header
        const patternMatch = line.match(patternHeaderRegex);
        if (patternMatch) {
            // Finalize an open fence before starting a new pattern.
            if (inFence && currentPattern) {
                const blockContent = cleanMarkdown(fenceBuffer);
                if (fenceTarget === 'code' && !currentPattern.code) {
                    currentPattern.code = blockContent;
                    parsePhase = 'postCode';
                } else if (fenceTarget === 'prompt' && !currentPattern.promptExample) {
                    currentPattern.promptExample = blockContent;
                } else if (blockContent) {
                    if (parsePhase === 'preCode') preCodeNotes.push(`\`\`\`\n${blockContent}\n\`\`\``);
                    else postCodeNotes.push(`\`\`\`\n${blockContent}\n\`\`\``);
                }
            }

            finalizeCurrentPattern();

            // Start new pattern
            currentPattern = {
                id: patternMatch[1].trim(),
                name: patternMatch[2].trim(),
                category: currentCategory,
                score: '',
                description: '',
                code: '',
                promptExample: '',
                usageNotes: ''
            };

            parsePhase = 'preCode';
            pendingPromptBlock = false;
            inFence = false;
            fenceBuffer = [];
            fenceTarget = 'none';
            preCodeNotes = [];
            postCodeNotes = [];
            continue;
        }

        if (!currentPattern) continue;

        // Inside fenced block content.
        if (inFence) {
            if (line.trim() === '```') {
                const blockContent = cleanMarkdown(fenceBuffer);
                if (fenceTarget === 'code' && !currentPattern.code) {
                    currentPattern.code = blockContent;
                    parsePhase = 'postCode';
                } else if (fenceTarget === 'prompt' && !currentPattern.promptExample) {
                    currentPattern.promptExample = blockContent;
                } else if (blockContent) {
                    if (parsePhase === 'preCode') preCodeNotes.push(`\`\`\`\n${blockContent}\n\`\`\``);
                    else postCodeNotes.push(`\`\`\`\n${blockContent}\n\`\`\``);
                }

                inFence = false;
                fenceBuffer = [];
                fenceTarget = 'none';
                continue;
            }

            fenceBuffer.push(line);
            continue;
        }

        // Extract Score / Metadata line
        if (scoreRegex.test(line.trim())) {
            currentPattern.score = line.trim();
            continue;
        }

        // Capture Prompt Example Start
        if (line.includes('**AI Prompter Example:**')) {
            pendingPromptBlock = true;
            continue;
        }

        // Start fenced blocks and decide their target deterministically.
        const fenceStart = line.trim().match(/^```([a-zA-Z0-9_-]+)?$/);
        if (fenceStart) {
            const lang = (fenceStart[1] || '').toLowerCase();
            inFence = true;
            fenceBuffer = [];

            if (pendingPromptBlock) {
                fenceTarget = 'prompt';
                pendingPromptBlock = false;
            } else if (!currentPattern.code && (lang === 'tsx' || lang === 'typescript' || lang === 'jsx' || lang === 'javascript')) {
                fenceTarget = 'code';
            } else {
                fenceTarget = 'notes';
            }

            continue;
        }

        // Treat non-empty prose as notes split by phase.
        if (line.trim() !== '') {
            if (parsePhase === 'preCode') preCodeNotes.push(line);
            else postCodeNotes.push(line);
        } else {
            // Preserve intentional paragraph spacing.
            if (parsePhase === 'preCode') preCodeNotes.push('');
            else postCodeNotes.push('');
        }
    }

    // Finalize the last open fence and pattern.
    if (inFence && currentPattern) {
        const blockContent = cleanMarkdown(fenceBuffer);
        if (fenceTarget === 'code' && !currentPattern.code) {
            currentPattern.code = blockContent;
        } else if (fenceTarget === 'prompt' && !currentPattern.promptExample) {
            currentPattern.promptExample = blockContent;
        } else if (blockContent) {
            if (parsePhase === 'preCode') preCodeNotes.push(`\`\`\`\n${blockContent}\n\`\`\``);
            else postCodeNotes.push(`\`\`\`\n${blockContent}\n\`\`\``);
        }
    }

    finalizeCurrentPattern();
    return patterns;
}
