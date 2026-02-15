import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Anti-Pattern Library',
  description: 'Common LLM failure modes and corrected pattern instructions for Pat Lib Online.',
  alternates: {
    canonical: '/anti-patterns',
  },
};

const ANTI_PATTERNS = [
  {
    title: 'Generic Hero Text',
    generated: '"Welcome to Our Company. We Provide Solutions."',
    fails: ['No value proposition', 'No specificity', 'No differentiation'],
    correctedPattern: 'CutoutHero',
    correctedFormula: '[OUTCOME] in [TIMEFRAME] with [METHOD]',
    example: 'Custom cabinets installed in 2 weeks with zero-touch measurement',
    instruction:
      'Never use: "Welcome", "Solutions", "Services", "Your Partner". Always include specific outcome + timeframe/method + audience qualifier.',
  },
  {
    title: 'Animation Overload Above the Fold',
    generated: 'Hero includes mesh motion + parallax + cursor effects + looping text all at once.',
    fails: ['Competing focal points', 'Higher motion sensitivity risk', 'Reduced conversion clarity'],
    correctedPattern: 'DiagonalSplitHero + SectionTransition',
    correctedFormula: 'One dominant visual effect + one CTA + one trust artifact',
    example: 'Static split hero with clear dental outcome, one CTA, and rating chip',
    instruction:
      'Never stack more than one high-motion pattern in first viewport. Always provide reduced-motion fallback.',
  },
  {
    title: 'Placeholder Trust Claims',
    generated: '"1000+ happy customers" with no source and no context.',
    fails: ['Unverifiable proof', 'Trust erosion', 'Compliance risk in regulated industries'],
    correctedPattern: 'AnimatedCounter or TestimonialCarousel with verified data only',
    correctedFormula: '[VERIFIED_METRIC] + [SOURCE_CONTEXT] + [TIMEFRAME]',
    example: '4.9★ from 300+ Portland patients in 2025 Google reviews',
    instruction:
      'Never invent numbers. If verified metrics are unavailable, use qualitative proof patterns instead.',
  },
];

export default function AntiPatternsPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <header>
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">Anti-Pattern Library</h1>
          <p className="text-lg text-gray-600">
            Negative examples for LLMs and prompt engineers, with deterministic corrections.
          </p>
        </header>

        {ANTI_PATTERNS.map((item) => (
          <section key={item.title} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <h2 className="text-2xl font-bold">Anti-Pattern: {item.title}</h2>
            <div>
              <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-1">What LLMs often generate</h3>
              <p className="font-mono text-sm bg-gray-100 rounded-md p-3">{item.generated}</p>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-1">Why it fails</h3>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                {item.fails.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-1">Correct pattern ({item.correctedPattern} example)</h3>
              <p className="text-sm text-gray-700">{item.correctedFormula}</p>
              <p className="text-sm font-medium mt-1">Example: {item.example}</p>
            </div>
            <div className="border border-red-200 bg-red-50 rounded-md p-3">
              <h3 className="text-sm uppercase tracking-wide text-red-700 mb-1">LLM instruction</h3>
              <p className="text-sm text-red-900">{item.instruction}</p>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
