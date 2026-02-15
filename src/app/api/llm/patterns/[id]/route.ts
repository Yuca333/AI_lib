import { NextResponse } from 'next/server';
import { getPatternById } from '@/lib/library-knowledge';

export async function GET(_: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;
        const pattern = getPatternById(params.id);

        if (!pattern) {
            return NextResponse.json({ error: 'Pattern not found' }, { status: 404 });
        }

        return NextResponse.json({
            id: pattern.id,
            name: pattern.name,
            category: pattern.category,
            score: pattern.score,
            modes: {
                prompt: {
                    context: pattern.description,
                    example: pattern.promptExample,
                    usageNotes: pattern.usageNotes,
                },
                code: {
                    implementation: pattern.code,
                },
            },
            links: {
                ui: `/library/${pattern.id}`,
                collection: '/library',
            },
        });
    } catch (error) {
        console.error('Failed to load pattern detail', error);
        return NextResponse.json({ error: 'Failed to load pattern detail' }, { status: 500 });
    }
}
