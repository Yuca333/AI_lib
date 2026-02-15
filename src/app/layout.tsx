import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site-config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - LLM-First Pattern Library`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "LLM pattern library",
    "prompt engineering UI",
    "design system retrieval",
    "web UI patterns",
    "agent-readable API",
  ],
  authors: [{ name: SITE_NAME }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/api/llm/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: `${SITE_NAME} Dataset`,
      description:
        "Structured dataset of UI patterns, playbooks, and retrieval contracts for agent-driven prompt and code generation.",
      creator: {
        "@type": "Organization",
        name: SITE_NAME,
      },
      distribution: [
        {
          "@type": "DataDownload",
          contentUrl: `${SITE_URL}/api/llm/index`,
          encodingFormat: "application/json",
        },
        {
          "@type": "DataDownload",
          contentUrl: `${SITE_URL}/api/llm/patterns`,
          encodingFormat: "application/json",
        },
      ],
    },
  ];

  return (
    <html lang="en">
      <body className={inter.className}>
        {jsonLd.map((entry, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
          />
        ))}
        <main className="min-h-screen bg-white text-black p-8">
            <header className="mb-8 border-b pb-4">
                <h1 className="text-3xl font-bold mb-2">Pat Lib Online</h1>
                <p className="text-gray-600 mb-4">AI-First Web Element Documentation</p>
                <nav className="flex flex-wrap gap-4 text-sm text-blue-600">
                  <Link href="/">Home</Link>
                  <Link href="/library">Patterns</Link>
                  <Link href="/playbooks">Playbooks</Link>
                  <Link href="/reference">Reference</Link>
                  <Link href="/llm">LLM Index</Link>
                </nav>
            </header>
            {children}
            <footer className="mt-12 border-t pt-4 text-sm text-gray-500">
                <p>Structured for machine retrieval and high-quality UI generation. &copy; {new Date().getFullYear()} Pat Lib Online</p>
            </footer>
        </main>
      </body>
    </html>
  );
}
