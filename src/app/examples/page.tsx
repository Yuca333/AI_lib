import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Real-World Examples',
  description: 'Production examples showing pattern combinations and exact prompts used with LLMs.',
  alternates: {
    canonical: '/examples',
  },
};

const EXAMPLES = [
  {
    title: 'Smile Dental - Complete Landing Page',
    industry: 'Dentistry',
    patterns: ['CutoutHero', 'GlowCard', 'SemanticButton'],
    resultQuality: '9/10 (minor spacing adjustment needed)',
    llm: 'Claude Sonnet 3.5',
    prompt: `Create a dentist landing page for "Smile Dental" in Portland:\n\nPRIMARY SECTION (CutoutHero):\n- Hero color: #F2EDE2 (warm cream)\n- Cutout subject: Modern dental tools arranged artistically\n- Headline: "Pain-free crowns in one visit with CEREC technology"\n- Trust: Display "4.9★ from 300+ patients"\n- CTA: "Book Free Consultation"\n\nSERVICES SECTION (GlowCard x3):\n- Cards for: Cleanings, Cosmetic, Emergency\n- Each card: Icon + 2-sentence description + "Learn More" link\n\nCONSTRAINTS:\n- Use CutoutHero seam protocol exactly\n- All text must pass WCAG AA contrast\n- Mobile: hero switches to stacked layout\n- Budget: Keep under 500 lines total`,
  },
  {
    title: 'Northline Remodeling - Lead Generation Page',
    industry: 'Contractor',
    patterns: ['DiagonalSplitHero', 'ServiceCard', 'ContactCTA'],
    resultQuality: '8.8/10 (testimonial cadence improved on iteration 2)',
    llm: 'GPT-4',
    prompt: `Build a contractor landing page for "Northline Remodeling" with a trust-first hierarchy:\n- Hero with outcome-focused headline and quote CTA\n- Service cards for Kitchens, Bathrooms, Additions\n- Trust band with license and years in business\n- Contact CTA repeated after proof section\n\nConstraints:\n- Keep above-the-fold under 420 tokens\n- Use one accent color only\n- No animation in first viewport\n- Mobile must preserve CTA without horizontal overflow`,
  },
];

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <header>
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">Real-World Example Gallery with Prompts</h1>
          <p className="text-lg text-gray-600">
            Proven prompts and pattern stacks that produced strong first drafts.
          </p>
        </header>

        {EXAMPLES.map((example) => (
          <section key={example.title} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <h2 className="text-2xl font-bold">Example: {example.title}</h2>
            <div className="grid gap-2 sm:grid-cols-2 text-sm">
              <p>
                <strong>Industry:</strong> {example.industry}
              </p>
              <p>
                <strong>Patterns Used:</strong> {example.patterns.join(' + ')}
              </p>
              <p>
                <strong>Result Quality:</strong> {example.resultQuality}
              </p>
              <p>
                <strong>LLM Used:</strong> {example.llm}
              </p>
            </div>
            <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
              <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">Exact prompt used</h3>
              <pre className="text-xs whitespace-pre-wrap text-gray-800">{example.prompt}</pre>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
