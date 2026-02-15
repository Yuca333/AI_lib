import { NextResponse } from 'next/server';
import { getPatternLibrary } from '@/lib/library-knowledge';

export async function GET() {
    try {
        const patterns = getPatternLibrary();

        return NextResponse.json({
            count: patterns.length,
            patterns: patterns.map((pattern) => ({
                id: pattern.id,
                name: pattern.name,
                category: pattern.category,
                score: pattern.score,
                description: pattern.description,
                promptPreview: pattern.promptExample.split('\n')[0],
                href: `/api/llm/patterns/${pattern.id}`,
            })),
        });
    } catch (error) {
        console.error('Failed to build pattern index', error);
        return NextResponse.json({ error: 'Failed to build pattern index' }, { status: 500 });
    }
}
