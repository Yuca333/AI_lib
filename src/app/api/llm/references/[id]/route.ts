import { jsonError, jsonWithMeta } from '@/lib/api-response';
import { getReferenceById } from '@/lib/library-knowledge';
import {
  applyFieldProjection,
  getRetrievalResponseFormat,
  parseFieldProjection,
} from '@/lib/llm-response-controls';

export const revalidate = 3600;

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const url = new URL(request.url);
    const format = getRetrievalResponseFormat(url.searchParams);
    const fields = parseFieldProjection(url.searchParams);

    const params = await props.params;
    const doc = getReferenceById(params.id);

    if (!doc) {
      return jsonError('Reference not found', 404);
    }

    const fullPayload = {
      id: doc.id,
      title: doc.title,
      fileName: doc.fileName,
      purpose: doc.purpose,
      summary: doc.summary,
      sections: doc.sections,
      rawHref: doc.rawHref,
      rawHash: doc.rawHash,
      canonicalUrl: doc.canonicalUrl,
      links: {
        self: `/api/llm/references/${doc.id}`,
        ui: `/reference/${doc.id}`,
        collection: '/reference',
        sections: `/api/llm/references/${doc.id}/sections`,
        raw: doc.rawHref,
      },
      retrievalControls: {
        format: 'full|compact',
        packOnly: 'true|false',
        fields: 'comma-separated projection',
      },
    } satisfies Record<string, unknown>;

    const compactPayload = {
      id: doc.id,
      title: doc.title,
      summary: doc.summary,
      sections: doc.sections.map((section) => ({
        sectionId: section.sectionId,
        heading: section.heading,
        mode: section.mode,
        tokenEstimate: section.tokenEstimate,
      })),
      rawHref: doc.rawHref,
      rawHash: doc.rawHash,
      links: fullPayload.links,
      retrievalControls: fullPayload.retrievalControls,
    } satisfies Record<string, unknown>;

    const payload = format === 'compact' ? compactPayload : fullPayload;
    return jsonWithMeta(applyFieldProjection(payload, fields));
  } catch (error) {
    console.error('Failed to load reference detail', error);
    return jsonError('Failed to load reference detail');
  }
}
