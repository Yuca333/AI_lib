import { jsonError, jsonWithMeta } from '@/lib/api-response';
import { getPatternById, getPatternLibrary } from '@/lib/library-knowledge';

export const revalidate = 3600;

function resolvePattern(id: string) {
  const direct = getPatternById(id);
  if (direct) return direct;

  const normalized = id.trim().toLowerCase();
  return getPatternLibrary().find((pattern) => {
    if (pattern.taxonomy.canonicalId.toLowerCase() === normalized) return true;
    if (pattern.taxonomy.slug.toLowerCase() === normalized) return true;
    return false;
  });
}

export async function GET(_: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const pattern = resolvePattern(params.id);

    if (!pattern) {
      return jsonError('Pattern not found', 404);
    }

    return jsonWithMeta({
      id: pattern.id,
      canonicalId: pattern.taxonomy.canonicalId,
      slug: pattern.taxonomy.slug,
      name: pattern.name,
      category: pattern.category,
      score: pattern.score,
      scoreValue: pattern.scoreValue,
      desktopOnly: pattern.desktopOnly,
      focalRating: pattern.focalRating,
      taxonomy: pattern.taxonomy,
      modes: {
        prompt: {
          context: pattern.description,
          example: pattern.promptExample,
          usageNotes: pattern.usageNotes,
          pack: pattern.promptPack,
        },
        code: {
          implementation: pattern.code,
          pack: pattern.codePack,
        },
      },
      agentContract: {
        retrievalHints: {
          tags: pattern.taxonomy.tags,
          intents: pattern.taxonomy.intents,
          industries: pattern.taxonomy.industries,
        },
        whenToUse: pattern.taxonomy.whenToUse,
        avoidWhen: pattern.taxonomy.avoidWhen,
        fallbackPatternIds: pattern.taxonomy.fallbackPatternIds,
        compatibility: {
          compatibleWith: pattern.taxonomy.compatibleWith,
          incompatibleWith: pattern.taxonomy.incompatibleWith,
        },
      },
      links: {
        self: `/api/llm/patterns/${pattern.id}`,
        ui: `/library/${pattern.id}`,
        collection: '/library',
        canonical: pattern.canonicalUrl,
      },
    });
  } catch (error) {
    console.error('Failed to load pattern detail', error);
    return jsonError('Failed to load pattern detail');
  }
}
