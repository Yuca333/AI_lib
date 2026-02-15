'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { EnrichedPattern } from '@/lib/library-knowledge';

interface FeaturedPatternCardProps {
  pattern: EnrichedPattern;
}

export function FeaturedPatternCard({ pattern }: FeaturedPatternCardProps) {
  const [copied, setCopied] = useState<'code' | 'prompt' | null>(null);

  const copy = async (text: string, label: 'code' | 'prompt') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      window.setTimeout(() => setCopied((current) => (current === label ? null : current)), 1800);
    } catch {
      setCopied(null);
    }
  };

  return (
    <article className="border p-4 rounded-lg bg-white h-full flex flex-col gap-3">
      <h3 className="text-lg font-semibold">
        <Link href={`/library/${pattern.id}`} className="hover:underline">
          {pattern.name}
        </Link>
      </h3>
      <p className="text-sm text-gray-600 line-clamp-3">{pattern.description}</p>
      <p className="text-xs text-gray-500">{pattern.category}</p>

      <div className="pattern-meta flex flex-wrap gap-2 text-xs">
        <span className="llm-tokens px-2 py-1 rounded-full bg-slate-100 text-slate-700" title="Approximate tokens to implement">
          ~{pattern.llmMetadata.meta.estimated_tokens} tokens
        </span>
        <span className="complexity px-2 py-1 rounded-full bg-amber-100 text-amber-800" data-level={pattern.llmMetadata.meta.implementation_complexity}>
          Complexity: {pattern.llmMetadata.meta.implementation_complexity}
        </span>
        <span className="dependencies px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">
          Dependencies: {pattern.llmMetadata.meta.dependencies.length > 0 ? pattern.llmMetadata.meta.dependencies.join(', ') : 'None'}
        </span>
        <span className="llm-reliability px-2 py-1 rounded-full bg-indigo-100 text-indigo-800" title="Success rate in AI generation">
          AI Success Rate: {Math.round(pattern.llmMetadata.meta.ai_success_rate * 100)}%
        </span>
      </div>

      <details className="llm-code-block border border-gray-200 rounded-md p-3">
        <summary className="text-sm font-medium cursor-pointer">View Implementation Code</summary>
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={() => copy(pattern.llmMetadata.code_blocks.runnable, 'code')}
            className="text-xs text-blue-700 hover:underline"
          >
            {copied === 'code' ? 'Copied' : 'Copy Code'}
          </button>
        </div>
        <pre className="mt-2"><code className="language-html text-xs whitespace-pre-wrap">{pattern.llmMetadata.code_blocks.runnable}</code></pre>
      </details>

      <div className="llm-prompt-blueprint border border-blue-200 bg-blue-50 rounded-md p-3" data-copyable="true">
        <div className="flex items-center justify-between gap-3">
          <h4 className="font-semibold text-blue-900 text-sm">Prompt Blueprint</h4>
          <button
            type="button"
            onClick={() => copy(pattern.llmMetadata.prompt_blueprint, 'prompt')}
            className="text-xs text-blue-700 hover:underline"
          >
            {copied === 'prompt' ? 'Copied' : 'Copy Prompt'}
          </button>
        </div>
        <pre className="text-xs text-blue-900 whitespace-pre-wrap mt-2">{pattern.llmMetadata.prompt_blueprint}</pre>
      </div>
    </article>
  );
}
