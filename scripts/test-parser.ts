import { parsePatterns } from '../src/lib/pattern-parser';
import path from 'path';

const libFile = path.join(process.cwd(), 'lib-files/lib-patterns.md');

try {
    console.log(`Parsing patterns from: ${libFile}`);
    const patterns = parsePatterns(libFile);

    console.log(`Successfully parsed ${patterns.length} patterns.`);

    if (patterns.length > 0) {
        console.log('--- Sample Pattern 1 ---');
        console.log('ID:', patterns[0].id);
        console.log('Name:', patterns[0].name);
        console.log('Category:', patterns[0].category);
        console.log('Code Length:', patterns[0].code.length);
        console.log('Prompt Length:', patterns[0].promptExample.length);
        // console.log('Parsed Code Snippet:', patterns[0].code.substring(0, 50) + '...');
    }

    // Check for potentially missing data
    const missingCode = patterns.filter(p => !p.code);
    if (missingCode.length > 0) {
        console.warn(`WARNING: ${missingCode.length} patterns are missing code blocks:`, missingCode.map(p => p.id));
    }

    const missingPrompt = patterns.filter(p => !p.promptExample);
    if (missingPrompt.length > 0) {
        console.warn(`WARNING: ${missingPrompt.length} patterns are missing prompt examples:`, missingPrompt.map(p => p.id));
    }

} catch (error) {
    console.error('Error parsing patterns:', error);
}
