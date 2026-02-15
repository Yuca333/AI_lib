'use client';

import React, { useState } from 'react';

interface PatternViewerProps {
    pattern: {
        id: string;
        name: string;
        category: string;
        score: string;
        description: string;
        code: string;
        promptExample: string;
        usageNotes: string;
    };
}

export function PatternViewer({ pattern }: PatternViewerProps) {
    const [activeTab, setActiveTab] = useState<'prompt' | 'code'>('prompt');

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Could add toast here
        alert('Copied to clipboard!');
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 flex">
                <button
                    onClick={() => setActiveTab('prompt')}
                    className={`flex-1 py-4 text-center font-medium text-sm transition-colors ${activeTab === 'prompt'
                            ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                            : 'bg-gray-50 text-gray-600 hover:text-gray-900'
                        }`}
                >
                    For AI Prompters
                </button>
                <button
                    onClick={() => setActiveTab('code')}
                    className={`flex-1 py-4 text-center font-medium text-sm transition-colors ${activeTab === 'code'
                            ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                            : 'bg-gray-50 text-gray-600 hover:text-gray-900'
                        }`}
                >
                    For Developers (Code)
                </button>
            </div>

            <div className="p-6">
                {activeTab === 'prompt' && (
                    <div className="space-y-6">
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                            <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wide mb-2">
                                Context & Behavior
                            </h3>
                            <p className="text-blue-800 whitespace-pre-wrap">{pattern.description}</p>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                                    Prompt Example
                                </h3>
                                <button
                                    onClick={() => copyToClipboard(pattern.promptExample)}
                                    className="text-xs text-blue-600 hover:underline cursor-pointer"
                                >
                                    Copy Prompt
                                </button>
                            </div>
                            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto relative group">
                                <pre className="text-gray-100 font-mono text-sm whitespace-pre-wrap">
                                    {pattern.promptExample || "// No specific prompt example provided."}
                                </pre>
                            </div>
                        </div>

                        {pattern.usageNotes && (
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">
                                    Usage Notes
                                </h3>
                                <pre className="text-gray-600 whitespace-pre-wrap font-sans text-sm">
                                    {pattern.usageNotes}
                                </pre>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'code' && (
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                                React / TypeScript Skeleton
                            </h3>
                            <button
                                onClick={() => copyToClipboard(pattern.code)}
                                className="text-xs text-blue-600 hover:underline cursor-pointer"
                            >
                                Copy Code
                            </button>
                        </div>
                        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                            <pre className="text-green-400 font-mono text-sm">
                                {pattern.code || "// No code skeleton provided."}
                            </pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
