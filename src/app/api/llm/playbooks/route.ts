import { NextResponse } from 'next/server';
import { getPlaybooks } from '@/lib/library-knowledge';

export async function GET() {
    try {
        const playbooks = getPlaybooks();

        return NextResponse.json({
            count: playbooks.length,
            playbooks: playbooks.map((playbook) => ({
                slug: playbook.slug,
                title: playbook.title,
                industry: playbook.industry,
                summary: playbook.summary,
                recommendedPatternIds: playbook.recommendedPatternIds,
                href: `/api/llm/playbooks/${playbook.slug}`,
            })),
        });
    } catch (error) {
        console.error('Failed to load playbooks', error);
        return NextResponse.json({ error: 'Failed to load playbooks' }, { status: 500 });
    }
}
