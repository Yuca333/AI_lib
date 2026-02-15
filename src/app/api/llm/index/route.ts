import { NextResponse } from 'next/server';
import { getPatternLibrary, getPlaybooks, getReferenceLibrary } from '@/lib/library-knowledge';

export async function GET() {
    try {
        const patterns = getPatternLibrary();
        const playbooks = getPlaybooks();
        const references = getReferenceLibrary();

        const categories = patterns.reduce<Record<string, number>>((acc, pattern) => {
            acc[pattern.category] = (acc[pattern.category] || 0) + 1;
            return acc;
        }, {});

        return NextResponse.json({
            version: '1.0',
            generatedAt: new Date().toISOString(),
            modes: ['prompt', 'code'],
            navigation: {
                ui: {
                    home: '/',
                    patterns: '/library',
                    playbooks: '/playbooks',
                    references: '/reference',
                },
                api: {
                    index: '/api/llm/index',
                    patterns: '/api/llm/patterns',
                    playbooks: '/api/llm/playbooks',
                    references: '/api/llm/references',
                },
            },
            counts: {
                patterns: patterns.length,
                playbooks: playbooks.length,
                references: references.length,
            },
            patternCategories: categories,
            playbookIndex: playbooks.map((playbook) => ({
                slug: playbook.slug,
                title: playbook.title,
                industry: playbook.industry,
                patterns: playbook.recommendedPatternIds,
                href: `/api/llm/playbooks/${playbook.slug}`,
            })),
            referenceIndex: references.map((doc) => ({
                id: doc.id,
                title: doc.title,
                fileName: doc.fileName,
                sections: doc.sections.length,
                href: `/api/llm/references/${doc.id}`,
            })),
        });
    } catch (error) {
        console.error('Failed to build LLM index', error);
        return NextResponse.json({ error: 'Failed to build LLM index' }, { status: 500 });
    }
}
