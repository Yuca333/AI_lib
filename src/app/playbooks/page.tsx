import Link from 'next/link';
import { getPlaybooks } from '@/lib/library-knowledge';

export const metadata = {
    title: 'LLM Playbooks - Pat Lib Online',
    description: 'Industry playbooks with prompt mode and code mode integration plans.',
};

export default function PlaybooksPage() {
    const playbooks = getPlaybooks();

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="mb-10">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
                        Industry Playbooks
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl">
                        Pick a playbook to get both outputs: a prompt-ready blueprint and a direct code integration plan.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {playbooks.map((playbook) => (
                        <article
                            key={playbook.slug}
                            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="mb-3">
                                <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700">
                                    {playbook.industry}
                                </span>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">{playbook.title}</h2>
                            <p className="text-sm text-gray-600 mb-6">{playbook.summary}</p>
                            <p className="text-xs text-gray-500 mb-5">
                                {playbook.patterns.length} recommended patterns
                            </p>
                            <Link href={`/playbooks/${playbook.slug}`} className="text-sm font-medium text-blue-600 hover:underline">
                                Open Playbook &rarr;
                            </Link>
                        </article>
                    ))}
                </div>
            </main>
        </div>
    );
}
