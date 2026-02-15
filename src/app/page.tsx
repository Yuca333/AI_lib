import Link from "next/link";
import { elements } from "@/lib/elements";
import { getPatternLibrary, getPlaybooks } from "@/lib/library-knowledge";

export default function Home() {
  const patterns = getPatternLibrary();
  const playbooks = getPlaybooks();
  const featuredPatterns = patterns.slice(0, 6);

  return (
    <div className="space-y-8">
      <section className="bg-slate-900 text-white rounded-xl p-8 md:p-10">
        <p className="text-xs uppercase tracking-widest text-slate-300 mb-3">LLM-First Design Library</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Learn patterns in two modes: Prompt Mode and Code Mode.
        </h2>
        <p className="text-slate-200 max-w-3xl mb-6">
          This site is optimized so an LLM can quickly decide what to use, then either generate a prompt blueprint or integrate code directly.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/library" className="bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg px-4 py-3 text-sm">
            Browse Pattern Library
          </Link>
          <Link href="/playbooks" className="bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg px-4 py-3 text-sm">
            Open Industry Playbooks
          </Link>
          <Link href="/reference" className="bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg px-4 py-3 text-sm">
            Read Reference Guides
          </Link>
          <Link href="/llm" className="bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg px-4 py-3 text-sm">
            LLM API Entry
          </Link>
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-2">Prompt Mode Workflow</h2>
        <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
          <li>Pick an industry playbook from <Link className="text-blue-600 hover:underline" href="/playbooks">/playbooks</Link>.</li>
          <li>Copy the prompt blueprint and refine content details.</li>
          <li>Use pattern prompt examples from <Link className="text-blue-600 hover:underline" href="/library">/library</Link>.</li>
        </ol>
      </section>

      <section className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-2">Code Mode Workflow</h2>
        <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
          <li>Call <code>/api/llm/patterns/:id</code> for implementation blocks.</li>
          <li>Use <code>/api/llm/references/:id</code> for CSS and guardrail docs.</li>
          <li>Follow integration steps from <code>/api/llm/playbooks/:slug</code>.</li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Featured Patterns</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredPatterns.map((pattern) => (
            <article key={pattern.id} className="border p-4 rounded-lg bg-white">
              <h3 className="text-lg font-semibold mb-2">
                <Link href={`/library/${pattern.id}`} className="hover:underline">
                  {pattern.name}
                </Link>
              </h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-3">{pattern.description}</p>
              <p className="text-xs text-gray-500">{pattern.category}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Industry Playbooks</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {playbooks.map((playbook) => (
            <article key={playbook.slug} className="border p-4 rounded-lg bg-white">
              <h3 className="text-lg font-semibold mb-2">
                <Link href={`/playbooks/${playbook.slug}`} className="hover:underline">
                  {playbook.title}
                </Link>
              </h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-3">{playbook.summary}</p>
              <p className="text-xs text-gray-500">{playbook.industry}</p>
            </article>
          ))}
        </div>
      </section>

      {Object.entries(
        elements.reduce((acc, el) => {
          (acc[el.category] = acc[el.category] || []).push(el);
          return acc;
        }, {} as Record<string, typeof elements>)
      ).map(([category, items]) => (
        <section key={category} className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">{category}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((el) => (
              <article key={el.slug} className="border p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-medium mb-2">
                  <Link href={`/elements/${el.slug}`} className="hover:underline">
                    {el.name}
                  </Link>
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-3">{el.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="inline-block bg-gray-200 rounded px-2 py-1 text-xs font-mono">
                    {el.category}
                  </span>
                  <Link href={`/elements/${el.slug}`} className="text-sm text-blue-600 hover:underline">
                    View Spec &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section className="bg-gray-100 p-6 rounded-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-2">For AI Crawlers</h2>
        <p className="text-sm font-mono mb-2">
          This content is structured for optimal extraction.
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600 font-mono">
          <li><strong>JSON-LD</strong>: Included on every page.</li>
          <li><strong>Semantic HTML</strong>: Strictly enforced.</li>
          <li><strong>Code Blocks</strong>: Pre-formatted for parsing.</li>
          <li><strong>LLM API</strong>: <code>/api/llm/index</code> contains the machine-first map.</li>
        </ul>
      </section>
    </div>
  );
}
