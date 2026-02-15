import { getElement, elements } from "@/lib/elements";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
    params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const element = getElement(params.slug);
    if (!element) return { title: "Not Found" };

    return {
        title: `${element.name} - Pat Lib Online`,
        description: element.description,
    };
}

export function generateStaticParams() {
    return elements.map((el) => ({
        slug: el.slug,
    }));
}

export default function ElementPage({ params }: PageProps) {
    const element = getElement(params.slug);

    if (!element) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": element.name,
        "description": element.description,
        "articleSection": element.category,
        "about": {
            "@type": "SoftwareSourceCode",
            "codeSampleType": "full snippet",
            "programmingLanguage": "typescript",
            "text": element.implementation
        }
    };

    return (
        <article className="max-w-4xl mx-auto">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <header className="mb-8 border-b pb-4">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{element.category}</span>
                    <span className="text-sm text-gray-500">Slug: {element.slug}</span>
                </div>
                <h1 className="text-4xl font-bold mb-4">{element.name}</h1>
                <p className="text-xl text-gray-700">{element.description}</p>
            </header>

            <div className="grid gap-12">
                <section>
                    <h2 className="text-2xl font-semibold mb-4 border-l-4 border-blue-500 pl-3">Implementation</h2>
                    <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
                        <pre><code>{element.implementation}</code></pre>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 border-l-4 border-green-500 pl-3">Usage Example</h2>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <pre className="text-sm overflow-x-auto"><code>{element.usage}</code></pre>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 border-l-4 border-purple-500 pl-3">Accessibility Notes</h2>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                        {element.accessibility.map((note, idx) => (
                            <li key={idx}>{note}</li>
                        ))}
                    </ul>
                </section>
            </div>

            <div className="mt-16 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-2">Raw Data (For AI)</h3>
                <textarea
                    className="w-full h-32 p-4 text-xs font-mono bg-gray-50 border rounded"
                    readOnly
                    value={JSON.stringify(element, null, 2)}
                />
            </div>
        </article>
    );
}
