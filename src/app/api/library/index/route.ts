import { NextResponse } from 'next/server';
import { getPatternLibrary } from '@/lib/library-knowledge';

export async function GET() {
    try {
        const patterns = getPatternLibrary();

        // Return a lightweight version for the index
        const indexData = patterns.map(p => ({
            id: p.id,
            name: p.name,
            category: p.category,
            score: p.score,
            description: p.description || p.usageNotes || "No description available.",
        }));

        return NextResponse.json({
            count: patterns.length,
            patterns: indexData
        });
    } catch (error) {
        console.error('Failed to parse patterns:', error);
        return NextResponse.json({ error: 'Failed to load patterns' }, { status: 500 });
    }
}
