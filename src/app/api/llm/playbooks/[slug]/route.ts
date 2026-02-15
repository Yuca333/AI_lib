import { NextResponse } from 'next/server';
import { getPlaybookBySlug } from '@/lib/library-knowledge';

export async function GET(_: Request, props: { params: Promise<{ slug: string }> }) {
    try {
        const params = await props.params;
        const playbook = getPlaybookBySlug(params.slug);

        if (!playbook) {
            return NextResponse.json({ error: 'Playbook not found' }, { status: 404 });
        }

        return NextResponse.json({
            slug: playbook.slug,
            title: playbook.title,
            industry: playbook.industry,
            summary: playbook.summary,
            modes: {
                prompt: playbook.promptGuide,
                code: playbook.codeGuide,
            },
            recommendedPatterns: playbook.patterns.map((pattern) => ({
                id: pattern.id,
                name: pattern.name,
                category: pattern.category,
                description: pattern.description,
                href: `/api/llm/patterns/${pattern.id}`,
            })),
            references: playbook.references.map((referenceId) => ({
                id: referenceId,
                href: `/api/llm/references/${referenceId}`,
            })),
            links: {
                ui: `/playbooks/${playbook.slug}`,
                collection: '/playbooks',
            },
        });
    } catch (error) {
        console.error('Failed to load playbook detail', error);
        return NextResponse.json({ error: 'Failed to load playbook detail' }, { status: 500 });
    }
}
