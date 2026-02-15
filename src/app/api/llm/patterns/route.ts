import { jsonError, jsonWithMeta } from '@/lib/api-response';
import { getPatternLibrary } from '@/lib/library-knowledge';
import {
  applyFieldProjection,
  getRetrievalResponseFormat,
  parseFieldProjection,
} from '@/lib/llm-response-controls';
import { searchPatterns } from '@/lib/llm-retrieval';

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

function normalizeTags(rawValues: string[]): string[] {
  return rawValues
    .flatMap((value) => value.split(','))
    .map((value) => value.trim())
    .filter(Boolean);
}

export async function GET(request: Request) {
  try {
    const patterns = getPatternLibrary();
    const url = new URL(request.url);
    const format = getRetrievalResponseFormat(url.searchParams);
    const fields = parseFieldProjection(url.searchParams);
    const query = url.searchParams.get('q')?.trim() || '';
    const mode = url.searchParams.get('mode');
    const category = url.searchParams.get('category')?.trim();
    const industry = url.searchParams.get('industry')?.trim();
    const limit = Number(url.searchParams.get('limit') || '100');
    const tags = normalizeTags(url.searchParams.getAll('tag'));
    const includeDebug = url.searchParams.get('debug') === '1';

    const hasFilters = Boolean(query || mode || category || industry || tags.length > 0);

    const rankedResults = hasFilters
      ? searchPatterns(patterns, {
          query,
          mode: mode === 'prompt' || mode === 'code' ? mode : undefined,
          category,
          industry,
          tags,
          limit,
        })
      : patterns.map((pattern) => ({
          pattern,
          score: 0,
          reasons: [],
        }));

    const toPackOnlyShape = (pattern: (typeof patterns)[number]) => ({
      promptPack: {
        objective: pattern.promptPack.objective,
        contextBlock: pattern.promptPack.contextBlock,
        constraints: pattern.promptPack.constraints,
        qualityChecks: pattern.promptPack.qualityChecks,
        failureHandling: pattern.promptPack.failureHandling,
        outputContract: pattern.promptPack.outputContract,
      },
      codePack: pattern.codePack,
    });

    const fullPayload = {
      total: patterns.length,
      count: rankedResults.length,
      appliedFilters: {
        q: query || null,
        mode: mode || null,
        category: category || null,
        industry: industry || null,
        tag: tags,
      },
      patterns: rankedResults.map(({ pattern, score, reasons }) => ({
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
        description: pattern.oneSentenceDescription,
        promptPack: pattern.promptPack,
        codePack: pattern.codePack,
        implementationRawHref: pattern.implementationRawHref,
        implementationExcerpt: pattern.implementationExcerpt,
        implementationHash: pattern.implementationHash,
        promptPreview: pattern.promptPack.productionPrompt.split('\n').slice(0, 3).join('\n'),
        taxonomy: pattern.taxonomy,
        selectionCriteria: pattern.llmMetadata.selection_criteria,
        llmMeta: pattern.llmMetadata.meta,
        compatibility: pattern.llmMetadata.compatibility,
        promptBlueprint: pattern.llmMetadata.prompt_blueprint,
        promptTemplates: pattern.llmMetadata.prompt_templates,
        codeBlocks: pattern.llmMetadata.code_blocks,
        href: `/api/llm/patterns/${pattern.id}`,
        canonicalUrl: pattern.canonicalUrl,
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
      patterns: rankedResults.map(({ pattern, score, reasons }) => ({
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
        implementationRawHref: pattern.implementationRawHref,
        implementationHash: pattern.implementationHash,
        ...toPackOnlyShape(pattern),
        href: `/api/llm/patterns/${pattern.id}`,
        ...(includeDebug ? { retrieval: { score, reasons } } : {}),
      })),
      retrievalControls: fullPayload.retrievalControls,
    } satisfies Record<string, unknown>;

    const payload = format === 'compact' ? compactPayload : fullPayload;
    return jsonWithMeta(applyFieldProjection(payload, fields));
  } catch (error) {
    console.error('Failed to build pattern index', error);
    return jsonError('Failed to build pattern index');
  }
}
