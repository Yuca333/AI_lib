import Link from 'next/link';

export const metadata = {
    title: 'LLM Index - Pat Lib Online',
    description: 'Machine-first index for patterns, playbooks, and references.',
};

export default function LlmPage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
                <header>
                    <h1 className="text-4xl font-extrabold tracking-tight mb-3">LLM Integration Index</h1>
                    <p className="text-lg text-gray-600">
                        Use this page to choose between Prompt Mode and Code Mode retrieval workflows.
                    </p>
                </header>

                <section className="bg-white border border-gray-200 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-3">Prompt Mode</h2>
                    <p className="text-sm text-gray-700 mb-4">
                        Retrieve playbooks and prompt-oriented references first, then pull pattern-specific prompt examples.
                    </p>
                    <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
                        <li><Link href="/api/llm/playbooks">/api/llm/playbooks</Link></li>
                        <li><Link href="/api/llm/references">/api/llm/references</Link></li>
                        <li><Link href="/api/llm/patterns">/api/llm/patterns</Link></li>
                    </ul>
                </section>

                <section className="bg-white border border-gray-200 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-3">Code Mode</h2>
                    <p className="text-sm text-gray-700 mb-4">
                        Retrieve pattern implementation and integration plans directly from the API detail endpoints.
                    </p>
                    <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
                        <li><Link href="/api/llm/patterns/1.4">/api/llm/patterns/1.4</Link></li>
                        <li><Link href="/api/llm/playbooks/dentist-landing">/api/llm/playbooks/dentist-landing</Link></li>
                        <li><Link href="/api/llm/references/implementation-blocks">/api/llm/references/implementation-blocks</Link></li>
                    </ul>
                </section>
            </main>
        </div>
    );
}
