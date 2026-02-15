import { NextResponse } from 'next/server';
import { getReferenceLibrary } from '@/lib/library-knowledge';

export async function GET() {
    try {
        const references = getReferenceLibrary();

        return NextResponse.json({
            count: references.length,
            references: references.map((doc) => ({
                id: doc.id,
                title: doc.title,
                fileName: doc.fileName,
                summary: doc.summary,
                sections: doc.sections.length,
                href: `/api/llm/references/${doc.id}`,
            })),
        });
    } catch (error) {
        console.error('Failed to load references', error);
        return NextResponse.json({ error: 'Failed to load references' }, { status: 500 });
    }
}
