'use client';

import React, { useMemo, useState } from 'react';
import type { EnrichedPattern } from '@/lib/library-knowledge';

interface PatternViewerProps {
  pattern: EnrichedPattern;
}

function scalar(value: unknown): string {
  if (typeof value === 'string') {
    const escaped = value.replace(/"/g, '\\"');
    return /[:#\-\n]/.test(escaped) ? `"${escaped}"` : escaped;
  }
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (value === null || value === undefined) return 'null';
  return JSON.stringify(value);
}

function toYaml(value: unknown, indent = 0): string {
  const prefix = ' '.repeat(indent);

  if (Array.isArray(value)) {
    if (value.length === 0) return `${prefix}[]`;

    return value
      .map((item) => {
        if (typeof item === 'object' && item !== null) {
          const nested = toYaml(item, indent + 2);
          const nestedLines = nested.split('\n');
          return `${prefix}- ${nestedLines[0].trimStart()}${nestedLines
            .slice(1)
            .map((line) => `\n${line}`)
            .join('')}`;
        }
        return `${prefix}- ${scalar(item)}`;
      })
      .join('\n');
  }

  if (typeof value === 'object' && value !== null) {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return `${prefix}{}`;

    return entries
      .map(([key, item]) => {
        if (typeof item === 'object' && item !== null) {
          return `${prefix}${key}:\n${toYaml(item, indent + 2)}`;
        }
        return `${prefix}${key}: ${scalar(item)}`;
      })
      .join('\n');
  }

  return `${prefix}${scalar(value)}`;
}

export function PatternViewer({ pattern }: PatternViewerProps) {
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  const selectionCriteriaYaml = useMemo(
    () => ['---', toYaml({ selection_criteria: pattern.llmMetadata.selection_criteria }), '---'].join('\n'),
    [pattern.llmMetadata.selection_criteria]
  );

  const llmIntegrationYaml = useMemo(
    () => ['---', toYaml({ llm_integration: pattern.llmMetadata.llm_integration }), '---'].join('\n'),
    [pattern.llmMetadata.llm_integration]
  );

  const compatibilityJson = useMemo(
    () => JSON.stringify({ compatibility: pattern.llmMetadata.compatibility }, null, 2),
    [pattern.llmMetadata.compatibility]
  );

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLabel(label);
      window.setTimeout(() => setCopiedLabel((current) => (current === label ? null : current)), 2000);
    } catch {
      setCopiedLabel(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 md:p-8 space-y-10">
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">TL;DR (for LLM quick scan)</h2>
          <p className="text-gray-700">{pattern.llmMetadata.tl_dr}</p>
          <div className="pattern-meta flex flex-wrap gap-2 text-sm">
            <span className="llm-tokens px-2.5 py-1 rounded-full bg-slate-100 text-slate-700" title="Approximate tokens to implement">
              ~{pattern.llmMetadata.meta.estimated_tokens} tokens
            </span>
            <span className="complexity px-2.5 py-1 rounded-full bg-amber-100 text-amber-800" data-level={pattern.llmMetadata.meta.implementation_complexity}>
              Complexity: {pattern.llmMetadata.meta.implementation_complexity}
            </span>
            <span className="dependencies px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
              Dependencies: {pattern.llmMetadata.meta.dependencies.length > 0 ? pattern.llmMetadata.meta.dependencies.join(', ') : 'None'}
            </span>
            <span className="llm-reliability px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800" title="Success rate in AI generation">
              AI Success Rate: {Math.round(pattern.llmMetadata.meta.ai_success_rate * 100)}%
            </span>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Quick Start (30 seconds)</h2>
          <details className="llm-code-block border border-gray-200 rounded-lg p-3" open>
            <summary className="font-medium text-gray-900 cursor-pointer">View Implementation Code</summary>
            <div className="mt-3 space-y-2">
              <button
                onClick={() => copyToClipboard(pattern.llmMetadata.code_blocks.runnable, 'quickstart-code')}
                className="text-xs text-blue-700 hover:underline"
                type="button"
              >
                {copiedLabel === 'quickstart-code' ? 'Copied' : 'Copy runnable HTML + CSS'}
              </button>
              <pre className="text-xs bg-gray-950 text-emerald-200 rounded-md p-3 overflow-x-auto">
                <code className="language-html">{pattern.llmMetadata.code_blocks.runnable}</code>
              </pre>
            </div>
          </details>

          <div className="llm-prompt-blueprint border border-blue-200 bg-blue-50 rounded-lg p-4" data-copyable="true">
            <div className="flex items-center justify-between gap-4 mb-2">
              <h4 className="font-semibold text-blue-900">Prompt Blueprint</h4>
              <button
                onClick={() => copyToClipboard(pattern.llmMetadata.prompt_blueprint, 'prompt-blueprint')}
                className="text-xs text-blue-700 hover:underline"
                type="button"
              >
                {copiedLabel === 'prompt-blueprint' ? 'Copied' : 'Copy blueprint'}
              </button>
            </div>
            <pre className="text-sm text-blue-900 whitespace-pre-wrap">{pattern.llmMetadata.prompt_blueprint}</pre>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">The Catch (Read This First)</h2>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            {pattern.llmMetadata.the_catch.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">Full Specification</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p>{pattern.description}</p>
            {pattern.usageNotes && (
              <details className="border border-gray-200 rounded-lg p-3">
                <summary className="font-medium cursor-pointer">Expanded usage notes</summary>
                <pre className="mt-3 whitespace-pre-wrap text-xs text-gray-700 bg-gray-50 rounded-md p-3 overflow-x-auto">
                  {pattern.usageNotes}
                </pre>
              </details>
            )}
            <details className="border border-gray-200 rounded-lg p-3">
              <summary className="font-medium cursor-pointer">React / TypeScript skeleton</summary>
              <pre className="mt-3 text-xs bg-gray-950 text-emerald-200 rounded-md p-3 overflow-x-auto">{pattern.code}</pre>
            </details>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Prompt Templates</h2>
          <div className="space-y-3">
            <article className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">For Claude/GPT</h3>
              <pre className="text-xs whitespace-pre-wrap text-gray-800">{pattern.llmMetadata.prompt_templates.claude_gpt}</pre>
            </article>
            <article className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">For Lovable.dev</h3>
              <pre className="text-xs whitespace-pre-wrap text-gray-800">{pattern.llmMetadata.prompt_templates.lovable}</pre>
            </article>
            <article className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">For Bolt.new</h3>
              <pre className="text-xs whitespace-pre-wrap text-gray-800">{pattern.llmMetadata.prompt_templates.bolt_new}</pre>
            </article>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">Troubleshooting</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            {pattern.llmMetadata.llm_integration.common_llm_errors.map((item) => (
              <li key={item.error} className="border border-gray-200 rounded-lg p-3">
                <p className="font-medium text-gray-900">{item.error}</p>
                <p className="mt-1">Fix: {item.fix}</p>
              </li>
            ))}
          </ul>
          <div className="rounded-lg border border-gray-200 p-3">
            <p className="font-medium text-gray-900 mb-2 text-sm">Validation prompts</p>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {pattern.llmMetadata.llm_integration.validation_prompts.map((prompt) => (
                <li key={prompt}>{prompt}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Machine-Readable Blocks</h2>
          <details className="border border-gray-200 rounded-lg p-3" open>
            <summary className="font-medium cursor-pointer">selection_criteria YAML</summary>
            <pre className="mt-3 text-xs bg-gray-950 text-green-200 rounded-md p-3 overflow-x-auto">{selectionCriteriaYaml}</pre>
          </details>
          <details className="border border-gray-200 rounded-lg p-3">
            <summary className="font-medium cursor-pointer">llm_integration YAML</summary>
            <pre className="mt-3 text-xs bg-gray-950 text-green-200 rounded-md p-3 overflow-x-auto">{llmIntegrationYaml}</pre>
          </details>
          <details className="border border-gray-200 rounded-lg p-3">
            <summary className="font-medium cursor-pointer">compatibility JSON</summary>
            <pre className="mt-3 text-xs bg-gray-950 text-sky-200 rounded-md p-3 overflow-x-auto">{compatibilityJson}</pre>
          </details>
        </section>
      </div>
    </div>
  );
}
