import React from 'react';
import { PatternCard } from '@/components/library/pattern-card';
import { getPatternLibrary } from '@/lib/library-knowledge';
import Link from 'next/link';

// Server Component
export default async function LibraryPage() {
    const patterns = getPatternLibrary();

    // Group patterns by category
    const categories = Array.from(new Set(patterns.map(p => p.category)));

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        Lib Files <span className="text-gray-400 font-light">/ Library</span>
                    </h1>
                    <div className="text-sm text-gray-500">
                        {patterns.length} Patterns Available
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
                        Design Pattern Library
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl">
                        A collection of premium UI patterns and components for LLMs.
                        Copy the prompt context for AI generators or use the code directly.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3 text-sm">
                        <Link href="/playbooks" className="text-blue-600 hover:underline">
                            Industry Playbooks
                        </Link>
                        <Link href="/reference" className="text-blue-600 hover:underline">
                            Reference Guides
                        </Link>
                        <Link href="/api/llm/index" className="text-blue-600 hover:underline">
                            LLM API Index
                        </Link>
                    </div>
                </div>

                {categories.map(category => (
                    <section key={category} className="mb-16">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 border-l-4 border-blue-500 pl-4 uppercase tracking-wider">
                            {category}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {patterns
                                .filter(p => p.category === category)
                                .map(pattern => (
                                    <PatternCard key={pattern.id} pattern={pattern} />
                                ))}
                        </div>
                    </section>
                ))}
            </main>
        </div>
    );
}
