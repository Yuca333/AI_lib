import React from 'react';
import { PatternViewer } from '@/components/library/pattern-viewer';
import { getPatternLibrary } from '@/lib/library-knowledge';
import Link from 'next/link';

// Next.js 16+ requires awaiting params
export default async function PatternDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const patterns = getPatternLibrary();
    const pattern = patterns.find(p => p.id === params.id);

    if (!pattern) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Pattern Not Found</h1>
                <p className="text-gray-600 mb-8">The pattern with ID &quot;{params.id}&quot; could not be found.</p>
                <Link href="/library" className="text-blue-600 hover:underline">
                    &larr; Back to Library
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans pb-12">
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/library" className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2">
                        &larr; <span className="font-medium">Back to Library</span>
                    </Link>
                    <div className="text-sm font-mono text-gray-400">
                        {pattern.id}
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full uppercase tracking-wider">
                            {pattern.category}
                        </span>
                        {pattern.score && (
                            <span className="text-sm font-medium text-green-600">
                                {pattern.score}
                            </span>
                        )}
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                        {pattern.name}
                    </h1>
                </div>

                <PatternViewer pattern={pattern} />
            </main>
        </div>
    );
}
