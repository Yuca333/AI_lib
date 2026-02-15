import { jsonError, jsonWithMeta } from '@/lib/api-response';
import { getReferenceLibrary } from '@/lib/library-knowledge';
import { searchReferences } from '@/lib/llm-retrieval';

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const references = getReferenceLibrary();
    const url = new URL(request.url);
    const q = url.searchParams.get('q')?.trim() || '';
    const mode = url.searchParams.get('mode');
    const limit = Number(url.searchParams.get('limit') || '100');
    const includeDebug = url.searchParams.get('debug') === '1';

    const ranked = searchReferences(references, {
      query: q,
      mode: mode === 'prompt' || mode === 'code' || mode === 'mixed' ? mode : undefined,
      limit,
    });

    return jsonWithMeta({
      total: references.length,
      count: ranked.length,
      appliedFilters: {
        q: q || null,
        mode: mode || null,
      },
      references: ranked.map(({ reference, score, reasons }) => ({
        id: reference.id,
        title: reference.title,
        fileName: reference.fileName,
        summary: reference.summary,
        sections: reference.sections.length,
        canonicalUrl: reference.canonicalUrl,
        href: `/api/llm/references/${reference.id}`,
        ...(includeDebug ? { retrieval: { score, reasons } } : {}),
      })),
    });
  } catch (error) {
    console.error('Failed to load references', error);
    return jsonError('Failed to load references');
  }
}
