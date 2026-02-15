import React from 'react';
import Link from 'next/link';

interface PatternCardProps {
    pattern: {
        id: string;
        name: string;
        category: string;
        score?: string;
        description: string;
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
