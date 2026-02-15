import { jsonError, jsonWithMeta } from '@/lib/api-response';
import { getPatternLibrary } from '@/lib/library-knowledge';
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

    return jsonWithMeta({
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
        score: pattern.score,
        scoreValue: pattern.scoreValue,
        desktopOnly: pattern.desktopOnly,
        focalRating: pattern.focalRating,
        description: pattern.description,
        promptPreview: pattern.promptPack.productionPrompt.split('\n').slice(0, 3).join('\n'),
        taxonomy: pattern.taxonomy,
        href: `/api/llm/patterns/${pattern.id}`,
        canonicalUrl: pattern.canonicalUrl,
        ...(includeDebug ? { retrieval: { score, reasons } } : {}),
      })),
    });
  } catch (error) {
    console.error('Failed to build pattern index', error);
    return jsonError('Failed to build pattern index');
  }
}
