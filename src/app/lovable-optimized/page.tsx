import type { Metadata } from 'next';
import { getPatternLibrary } from '@/lib/library-knowledge';

export const metadata: Metadata = {
  title: 'Lovable Optimized',
  description: 'Pattern guidance optimized for Lovable.dev component generation workflow.',
  alternates: {
    canonical: '/lovable-optimized',
  },
};

export default function LovableOptimizedPage() {
  const patterns = getPatternLibrary().slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <header>
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">/lovable-optimized</h1>
          <p className="text-lg text-gray-600">Patterns tested with Lovable.dev and structured for low-iteration refinement.</p>
        </header>

        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-3">What each pattern includes</h2>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li>Lovable-specific prompt format</li>
            <li>Component structure recommendations</li>
            <li>Asset upload instructions</li>
            <li>Iteration commands for deterministic refinements</li>
          </ul>
        </section>

        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="text-2xl font-bold">Example: CutoutHero for Lovable</h2>
          <div>
            <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-1">Initial prompt</h3>
            <pre className="text-xs whitespace-pre-wrap bg-gray-50 border border-gray-200 rounded-md p-3">Create a React component called HeroCutout with props for:
- heroColor (HSL format)
- cutoutImageUrl
- headline
- trustIndicator
- ctaText

Use Tailwind CSS. Follow the CutoutHero spec from Pat Lib Online exactly. The background must be a flat solid color matching the cutout image background.</pre>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-1">Follow-up refinement</h3>
            <pre className="text-xs whitespace-pre-wrap bg-gray-50 border border-gray-200 rounded-md p-3">The cutout image background (#F2EDE2) doesn&apos;t match the hero section. Update the hero background to exactly hsl(40, 35%, 91%) and verify no seam is visible.</pre>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {patterns.map((pattern) => (
            <article key={pattern.id} className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
              <h3 className="text-lg font-semibold">{pattern.name}</h3>
              <p className="text-sm text-gray-600">{pattern.llmMetadata.lovable_optimized.prompt_format}</p>
              <div>
                <h4 className="text-sm font-medium mb-1">Component structure</h4>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  {pattern.llmMetadata.lovable_optimized.component_structure.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Iteration commands</h4>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  {pattern.llmMetadata.lovable_optimized.iteration_commands.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
