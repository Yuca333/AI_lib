'use client';

import React, { useState } from 'react';

interface PlaybookViewerProps {
    promptGuide: string;
    codeGuide: string;
}

export function PlaybookViewer({ promptGuide, codeGuide }: PlaybookViewerProps) {
    const [activeTab, setActiveTab] = useState<'prompt' | 'code'>('prompt');

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
        alert('Copied to clipboard.');
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
                    Prompt Mode
                </button>
                <button
                    onClick={() => setActiveTab('code')}
                    className={`flex-1 py-4 text-center font-medium text-sm transition-colors ${activeTab === 'code'
                        ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                        : 'bg-gray-50 text-gray-600 hover:text-gray-900'
                        }`}
                >
                    Code Mode
                </button>
            </div>

            <div className="p-6">
                {activeTab === 'prompt' && (
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                                Prompt Blueprint
                            </h3>
                            <button
                                onClick={() => copyToClipboard(promptGuide)}
                                className="text-xs text-blue-600 hover:underline cursor-pointer"
                            >
                                Copy Prompt Guide
                            </button>
                        </div>
                        <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm whitespace-pre-wrap">
                            {promptGuide}
                        </pre>
                    </div>
                )}

                {activeTab === 'code' && (
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                                Integration Plan
                            </h3>
                            <button
                                onClick={() => copyToClipboard(codeGuide)}
                                className="text-xs text-blue-600 hover:underline cursor-pointer"
                            >
                                Copy Code Guide
                            </button>
                        </div>
                        <pre className="bg-gray-900 text-green-300 rounded-lg p-4 text-sm whitespace-pre-wrap">
                            {codeGuide}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}
