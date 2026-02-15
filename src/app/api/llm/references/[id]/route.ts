import { jsonError, jsonWithMeta } from '@/lib/api-response';
import { getReferenceById } from '@/lib/library-knowledge';

export const revalidate = 3600;

export async function GET(_: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const doc = getReferenceById(params.id);

    if (!doc) {
      return jsonError('Reference not found', 404);
    }

    return jsonWithMeta({
      id: doc.id,
      title: doc.title,
      fileName: doc.fileName,
      purpose: doc.purpose,
      summary: doc.summary,
      sections: doc.sections,
      canonicalUrl: doc.canonicalUrl,
      links: {
        self: `/api/llm/references/${doc.id}`,
        ui: `/reference/${doc.id}`,
        collection: '/reference',
      },
    });
  } catch (error) {
    console.error('Failed to load reference detail', error);
    return jsonError('Failed to load reference detail');
  }
}
