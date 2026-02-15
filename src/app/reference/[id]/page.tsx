import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getReferenceById } from '@/lib/library-knowledge';

const modeStyles: Record<string, string> = {
    prompt: 'bg-purple-50 text-purple-700 border-purple-100',
    code: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    mixed: 'bg-slate-100 text-slate-700 border-slate-200',
};

export default async function ReferenceDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const doc = getReferenceById(params.id);

    if (!doc) notFound();

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-12">
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/reference" className="text-gray-500 hover:text-gray-900 transition-colors">
                        &larr; Back to Reference
                    </Link>
                    <span className="text-sm font-mono text-gray-400">{doc.fileName}</span>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                <section className="bg-white border border-gray-200 rounded-xl p-6">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">{doc.title}</h1>
                    <p className="text-gray-600">{doc.purpose || doc.summary}</p>
                </section>

                {doc.sections.map((section, index) => (
                    <section key={`${section.heading}-${index}`} className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between gap-4 mb-3">
                            <h2 className="text-xl font-bold text-gray-900">{section.heading}</h2>
                            <span
                                className={`inline-flex px-2.5 py-1 rounded-full border text-xs font-semibold ${modeStyles[section.mode]}`}
                            >
                                {section.mode}
                            </span>
                        </div>
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap overflow-x-auto">
                            {section.body}
                        </pre>
                    </section>
                ))}
            </main>
        </div>
    );
}
