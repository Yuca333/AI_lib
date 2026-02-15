import { jsonError, jsonWithMeta } from '@/lib/api-response';
import { getReferenceLibrary } from '@/lib/library-knowledge';
import {
  applyFieldProjection,
  getRetrievalResponseFormat,
  parseFieldProjection,
} from '@/lib/llm-response-controls';
import { searchReferences } from '@/lib/llm-retrieval';

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const references = getReferenceLibrary();
    const url = new URL(request.url);
    const format = getRetrievalResponseFormat(url.searchParams);
    const fields = parseFieldProjection(url.searchParams);
    const q = url.searchParams.get('q')?.trim() || '';
    const mode = url.searchParams.get('mode');
    const limit = Number(url.searchParams.get('limit') || '100');
    const includeDebug = url.searchParams.get('debug') === '1';

    const ranked = searchReferences(references, {
      query: q,
      mode: mode === 'prompt' || mode === 'code' || mode === 'mixed' ? mode : undefined,
      limit,
    });

    const fullPayload = {
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
        tokenEstimate: reference.sections.reduce((total, section) => total + section.tokenEstimate, 0),
        canonicalUrl: reference.canonicalUrl,
        href: `/api/llm/references/${reference.id}`,
        sectionsHref: `/api/llm/references/${reference.id}/sections`,
        rawHref: reference.rawHref,
        rawHash: reference.rawHash,
        ...(includeDebug ? { retrieval: { score, reasons } } : {}),
      })),
      retrievalControls: {
        format: 'full|compact',
        packOnly: 'true|false',
        fields: 'comma-separated projection',
      },
    } satisfies Record<string, unknown>;

    const compactPayload = {
      total: fullPayload.total,
      count: fullPayload.count,
      appliedFilters: fullPayload.appliedFilters,
      references: ranked.map(({ reference, score, reasons }) => ({
        id: reference.id,
        title: reference.title,
        summary: reference.summary,
        sections: reference.sections.length,
        sectionsHref: `/api/llm/references/${reference.id}/sections`,
        rawHref: reference.rawHref,
        ...(includeDebug ? { retrieval: { score, reasons } } : {}),
      })),
      retrievalControls: fullPayload.retrievalControls,
    } satisfies Record<string, unknown>;

    const payload = format === 'compact' ? compactPayload : fullPayload;
    return jsonWithMeta(applyFieldProjection(payload, fields));
  } catch (error) {
    console.error('Failed to load references', error);
    return jsonError('Failed to load references');
  }
}
