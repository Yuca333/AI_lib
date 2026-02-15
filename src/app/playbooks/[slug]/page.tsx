import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PlaybookViewer } from '@/components/library/playbook-viewer';
import { getPlaybookBySlug } from '@/lib/library-knowledge';

export default async function PlaybookDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const playbook = getPlaybookBySlug(params.slug);

    if (!playbook) notFound();

    return (
        <div className="min-h-screen bg-gray-50 font-sans pb-12">
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/playbooks" className="text-gray-500 hover:text-gray-900 transition-colors">
                        &larr; Back to Playbooks
                    </Link>
                    <span className="text-sm font-mono text-gray-400">{playbook.slug}</span>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                <section>
                    <div className="mb-2">
                        <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700">
                            {playbook.industry}
                        </span>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-3">{playbook.title}</h1>
                    <p className="text-lg text-gray-600 max-w-3xl">{playbook.summary}</p>
                </section>

                <PlaybookViewer promptGuide={playbook.promptGuide} codeGuide={playbook.codeGuide} />

                <section className="bg-white border border-gray-200 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Pattern Stack</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {playbook.patterns.map((pattern) => (
                            <Link
                                key={pattern.id}
                                href={`/library/${pattern.id}`}
                                className="block rounded-lg border border-gray-200 p-4 hover:border-blue-400 hover:bg-blue-50/30 transition-colors"
                            >
                                <div className="text-xs text-gray-500 mb-1">#{pattern.id} • {pattern.category}</div>
                                <h3 className="text-base font-semibold text-gray-900">{pattern.name}</h3>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{pattern.description}</p>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="bg-white border border-gray-200 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Supporting References</h2>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                        {playbook.references.map((referenceId) => (
                            <li key={referenceId}>
                                <Link href={`/reference/${referenceId}`} className="text-blue-600 hover:underline">
                                    {referenceId}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
}
