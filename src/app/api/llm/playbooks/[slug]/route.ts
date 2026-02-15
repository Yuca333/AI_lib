import { jsonError, jsonWithMeta } from '@/lib/api-response';
import { getPlaybookBySlug } from '@/lib/library-knowledge';

export const revalidate = 3600;

export async function GET(_: Request, props: { params: Promise<{ slug: string }> }) {
  try {
    const params = await props.params;
    const playbook = getPlaybookBySlug(params.slug);

    if (!playbook) {
      return jsonError('Playbook not found', 404);
    }

    return jsonWithMeta({
      slug: playbook.slug,
      title: playbook.title,
      industry: playbook.industry,
      summary: playbook.summary,
      modes: {
        prompt: {
          guide: playbook.promptGuide,
          pack: playbook.promptPack,
        },
        code: {
          guide: playbook.codeGuide,
          pack: playbook.codePack,
        },
      },
      recommendedPatterns: playbook.patterns.map((pattern) => ({
        id: pattern.id,
        canonicalId: pattern.taxonomy.canonicalId,
        name: pattern.name,
        category: pattern.category,
        description: pattern.description,
        tags: pattern.taxonomy.tags,
        href: `/api/llm/patterns/${pattern.id}`,
      })),
      references: playbook.references.map((referenceId) => ({
        id: referenceId,
        href: `/api/llm/references/${referenceId}`,
      })),
      links: {
        self: `/api/llm/playbooks/${playbook.slug}`,
        ui: `/playbooks/${playbook.slug}`,
        collection: '/playbooks',
      },
    });
  } catch (error) {
    console.error('Failed to load playbook detail', error);
    return jsonError('Failed to load playbook detail');
  }
}
