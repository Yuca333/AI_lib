import Link from 'next/link';
import { getReferenceLibrary } from '@/lib/library-knowledge';

export const metadata = {
    title: 'Reference Docs - Pat Lib Online',
    description: 'Structured references from /lib-files for prompt strategy and code integration.',
};

const modeColors: Record<string, string> = {
    prompt: 'bg-purple-50 text-purple-700',
    code: 'bg-emerald-50 text-emerald-700',
    mixed: 'bg-slate-100 text-slate-700',
};

export default function ReferenceIndexPage() {
    const references = getReferenceLibrary();

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="mb-10">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-3">Reference Library</h1>
                    <p className="text-lg text-gray-600 max-w-3xl">
                        Every `lib-files` guide is indexed here so LLMs can retrieve rules, pattern selection logic, and integration details.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {references.map((doc) => {
                        const primaryMode = doc.sections[0]?.mode || 'mixed';
                        return (
                            <article key={doc.id} className="bg-white border border-gray-200 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-3 gap-4">
                                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${modeColors[primaryMode]}`}>
                                        {primaryMode.toUpperCase()}
                                    </span>
                                    <span className="text-xs font-mono text-gray-500">{doc.fileName}</span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2">{doc.title}</h2>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{doc.summary}</p>
                                <p className="text-xs text-gray-500 mb-5">{doc.sections.length} indexed sections</p>
                                <Link href={`/reference/${doc.id}`} className="text-sm font-medium text-blue-600 hover:underline">
                                    Open Reference &rarr;
                                </Link>
                            </article>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
