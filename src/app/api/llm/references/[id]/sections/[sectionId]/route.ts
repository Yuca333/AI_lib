import { jsonError, jsonWithMeta } from '@/lib/api-response';
import { getReferenceById, getReferenceSectionById } from '@/lib/library-knowledge';
import { applyFieldProjection, parseFieldProjection } from '@/lib/llm-response-controls';

export const revalidate = 3600;

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string; sectionId: string }> }
) {
  try {
    const params = await props.params;
    const url = new URL(request.url);
    const fields = parseFieldProjection(url.searchParams);
    const reference = getReferenceById(params.id);

    if (!reference) {
      return jsonError('Reference not found', 404);
    }

    const section = getReferenceSectionById(params.id, params.sectionId);
    if (!section) {
      return jsonError('Reference section not found', 404);
    }

    const payload = {
      id: reference.id,
      title: reference.title,
      section: {
        sectionId: section.sectionId,
        heading: section.heading,
        mode: section.mode,
        tokenEstimate: section.tokenEstimate,
        body: section.body,
      },
      links: {
        self: `/api/llm/references/${reference.id}/sections/${section.sectionId}`,
        sections: `/api/llm/references/${reference.id}/sections`,
        reference: `/api/llm/references/${reference.id}`,
      },
    } satisfies Record<string, unknown>;

    return jsonWithMeta(applyFieldProjection(payload, fields));
  } catch (error) {
    console.error('Failed to load reference section detail', error);
    return jsonError('Failed to load reference section detail');
  }
}

