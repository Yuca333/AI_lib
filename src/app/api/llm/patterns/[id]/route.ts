import { jsonError, jsonWithMeta } from '@/lib/api-response';
import { resolvePatternByAnyId } from '@/lib/library-knowledge';
import {
  applyFieldProjection,
  getRetrievalResponseFormat,
  parseFieldProjection,
} from '@/lib/llm-response-controls';

export const revalidate = 3600;

function isTruthy(value: string | null): boolean {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'on';
}

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const url = new URL(request.url);
    const format = getRetrievalResponseFormat(url.searchParams);
    const fields = parseFieldProjection(url.searchParams);
    const includeLegacyCode = isTruthy(url.searchParams.get('legacyCode'));

    const params = await props.params;
    const pattern = resolvePatternByAnyId(params.id);

    if (!pattern) {
      return jsonError('Pattern not found', 404);
    }

    const fullPayload = {
      id: pattern.id,
      canonicalId: pattern.taxonomy.canonicalId,
      slug: pattern.taxonomy.slug,
      name: pattern.name,
      category: pattern.category,
      oneSentenceDescription: pattern.oneSentenceDescription,
      objective: pattern.objective,
      whenToUse: pattern.whenToUse,
      avoidWhen: pattern.avoidWhen,
      failureModes: pattern.failureModes,
      score: pattern.score,
      scoreValue: pattern.scoreValue,
      desktopOnly: pattern.desktopOnly,
      focalRating: pattern.focalRating,
      taxonomy: pattern.taxonomy,
      selection_criteria: pattern.llmMetadata.selection_criteria,
      llm_integration: pattern.llmMetadata.llm_integration,
      compatibility: pattern.llmMetadata.compatibility,
      llm_meta: pattern.llmMetadata.meta,
      prompt_blueprint: pattern.llmMetadata.prompt_blueprint,
      prompt_templates: pattern.llmMetadata.prompt_templates,
      code_blocks: pattern.llmMetadata.code_blocks,
      lovable_optimized: pattern.llmMetadata.lovable_optimized,
      modes: {
        prompt: {
          context: pattern.oneSentenceDescription,
          contextDetails: pattern.description,
          example: pattern.promptExample,
          usageNotes: pattern.usageNotes,
          pack: pattern.promptPack,
        },
        code: {
          implementationRawHref: pattern.implementationRawHref,
          implementationExcerpt: pattern.implementationExcerpt,
          implementationHash: pattern.implementationHash,
          pack: pattern.codePack,
          ...(includeLegacyCode ? { implementation: pattern.code } : {}),
        },
      },
      agentContract: {
        retrievalHints: {
          tags: pattern.taxonomy.tags,
          intents: pattern.taxonomy.intents,
          industries: pattern.taxonomy.industries,
        },
        oneSentenceDescription: pattern.oneSentenceDescription,
        objective: pattern.objective,
        whenToUse: pattern.whenToUse,
        avoidWhen: pattern.avoidWhen,
        failureModes: pattern.failureModes,
        fallbackPatternIds: pattern.taxonomy.fallbackPatternIds,
        selectionCriteria: pattern.llmMetadata.selection_criteria,
        compatibilityMatrix: pattern.llmMetadata.compatibility,
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
        rawImplementation: pattern.implementationRawHref,
      },
      retrievalControls: {
        format: 'full|compact',
        packOnly: 'true|false',
        fields: 'comma-separated projection',
      },
    } satisfies Record<string, unknown>;

    const compactPayload = {
      id: pattern.id,
      canonicalId: pattern.taxonomy.canonicalId,
      slug: pattern.taxonomy.slug,
      name: pattern.name,
      category: pattern.category,
      oneSentenceDescription: pattern.oneSentenceDescription,
      objective: pattern.objective,
      whenToUse: pattern.whenToUse,
      avoidWhen: pattern.avoidWhen,
      failureModes: pattern.failureModes,
      modes: {
        prompt: {
          pack: {
            objective: pattern.promptPack.objective,
            contextBlock: pattern.promptPack.contextBlock,
            constraints: pattern.promptPack.constraints,
            qualityChecks: pattern.promptPack.qualityChecks,
            failureHandling: pattern.promptPack.failureHandling,
            outputContract: pattern.promptPack.outputContract,
          },
        },
        code: {
          implementationRawHref: pattern.implementationRawHref,
          implementationExcerpt: pattern.implementationExcerpt,
          implementationHash: pattern.implementationHash,
          pack: pattern.codePack,
        },
      },
      links: {
        self: `/api/llm/patterns/${pattern.id}`,
        rawImplementation: pattern.implementationRawHref,
      },
      retrievalControls: fullPayload.retrievalControls,
    } satisfies Record<string, unknown>;

    const payload = format === 'compact' ? compactPayload : fullPayload;
    return jsonWithMeta(applyFieldProjection(payload, fields));
  } catch (error) {
    console.error('Failed to load pattern detail', error);
    return jsonError('Failed to load pattern detail');
  }
}
