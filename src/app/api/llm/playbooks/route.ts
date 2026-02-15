import { jsonError, jsonWithMeta } from '@/lib/api-response';
import { getPlaybooks } from '@/lib/library-knowledge';
import { searchPlaybooks } from '@/lib/llm-retrieval';

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const playbooks = getPlaybooks();
    const url = new URL(request.url);
    const q = url.searchParams.get('q')?.trim() || '';
    const industry = url.searchParams.get('industry')?.trim();
    const mode = url.searchParams.get('mode');
    const limit = Number(url.searchParams.get('limit') || '100');
    const includeDebug = url.searchParams.get('debug') === '1';

    const ranked = searchPlaybooks(playbooks, {
      query: q,
      industry,
      mode: mode === 'prompt' || mode === 'code' ? mode : undefined,
      limit,
    });

    return jsonWithMeta({
      total: playbooks.length,
      count: ranked.length,
      appliedFilters: {
        q: q || null,
        industry: industry || null,
        mode: mode || null,
      },
      playbooks: ranked.map(({ playbook, score, reasons }) => ({
        slug: playbook.slug,
        title: playbook.title,
        industry: playbook.industry,
        summary: playbook.summary,
        recommendedPatternIds: playbook.recommendedPatternIds,
        promptObjective: playbook.promptPack.objective,
        codeSequenceLength: playbook.codePack.integrationSequence.length,
        href: `/api/llm/playbooks/${playbook.slug}`,
        ...(includeDebug ? { retrieval: { score, reasons } } : {}),
      })),
    });
  } catch (error) {
    console.error('Failed to load playbooks', error);
    return jsonError('Failed to load playbooks');
  }
}
