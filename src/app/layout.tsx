import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pat Lib Online - AI-Optimized Web Elements",
  description: "LLM-first pattern library with prompt blueprints and code integration guides.",
  authors: [{ name: "Pat Lib Online" }],
  openGraph: {
    title: "Pat Lib Online",
    description: "AI-Optimized Web Elements Documentation",
    type: "website",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Pat Lib Online",
    "url": "https://pat-lib-online.vercel.app/",
    "description": "A structured library of web elements optimized for artificial intelligence processing.",
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
                <p> optimized for machine reading. &copy; {new Date().getFullYear()} Pat Lib Online</p>
            </footer>
        </main>
      </body>
    </html>
  );
}
