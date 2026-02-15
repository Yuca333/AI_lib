import { NextResponse } from 'next/server';
import { getReferenceById } from '@/lib/library-knowledge';

export async function GET(_: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;
        const doc = getReferenceById(params.id);

        if (!doc) {
            return NextResponse.json({ error: 'Reference not found' }, { status: 404 });
        }

        return NextResponse.json({
            id: doc.id,
            title: doc.title,
            fileName: doc.fileName,
            purpose: doc.purpose,
            summary: doc.summary,
            sections: doc.sections,
            links: {
                ui: `/reference/${doc.id}`,
                collection: '/reference',
            },
        });
    } catch (error) {
        console.error('Failed to load reference detail', error);
        return NextResponse.json({ error: 'Failed to load reference detail' }, { status: 500 });
    }
}
