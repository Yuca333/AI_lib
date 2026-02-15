import React from 'react';
import Link from 'next/link';

interface PatternCardProps {
    pattern: {
        id: string;
        name: string;
        category: string;
        score?: string;
        description: string;
        llmMetadata?: {
            meta: {
                estimated_tokens: number;
                implementation_complexity: string;
                dependencies: string[];
                ai_success_rate: number;
            };
        };
    };
}

export function PatternCard({ pattern }: PatternCardProps) {
    return (
        <Link href={`/library/${pattern.id}`} className="group block h-full">
            <div className="h-full border border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-200 bg-white flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-gray-100 text-gray-600 rounded-full">
                        {pattern.category}
                    </span>
                    <span className="text-sm font-mono text-gray-400">
                        #{pattern.id}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {pattern.name}
                </h3>

                <p className="text-gray-600 line-clamp-3 text-sm flex-grow">
                    {pattern.description}
                </p>

                {pattern.llmMetadata && (
                    <div className="pattern-meta mt-4 flex flex-wrap gap-1.5 text-[11px]">
                        <span className="llm-tokens px-2 py-0.5 rounded-full bg-slate-100 text-slate-700" title="Approximate tokens to implement">
                            ~{pattern.llmMetadata.meta.estimated_tokens} tokens
                        </span>
                        <span className="complexity px-2 py-0.5 rounded-full bg-amber-100 text-amber-800" data-level={pattern.llmMetadata.meta.implementation_complexity}>
                            {pattern.llmMetadata.meta.implementation_complexity}
                        </span>
                        <span className="llm-reliability px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800" title="Success rate in AI generation">
                            {Math.round(pattern.llmMetadata.meta.ai_success_rate * 100)}%
                        </span>
                    </div>
                )}

                {pattern.score && (
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-500">Score:</span>
                        <span className="text-sm font-bold text-green-600">{pattern.score}</span>
                    </div>
                )}
            </div>
        </Link>
    );
}
