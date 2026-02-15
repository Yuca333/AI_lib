import { NextResponse } from 'next/server';
import { getPatternLibrary } from '@/lib/library-knowledge';

export async function GET(_request: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;
        const patterns = getPatternLibrary();
        const id = params.id;

        const pattern = patterns.find(p => p.id === id);

        if (!pattern) {
            return NextResponse.json({ error: 'Pattern not found' }, { status: 404 });
        }

        return NextResponse.json(pattern);
    } catch (error) {
        console.error('Failed to parse patterns:', error);
        return NextResponse.json({ error: 'Failed to load patterns' }, { status: 500 });
    }
}
