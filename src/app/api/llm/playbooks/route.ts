import { jsonError, jsonWithMeta } from '@/lib/api-response';
import { getPlaybooks } from '@/lib/library-knowledge';
import {
  applyFieldProjection,
  getRetrievalResponseFormat,
  parseFieldProjection,
} from '@/lib/llm-response-controls';
import { searchPlaybooks } from '@/lib/llm-retrieval';

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const playbooks = getPlaybooks();
    const url = new URL(request.url);
    const format = getRetrievalResponseFormat(url.searchParams);
    const fields = parseFieldProjection(url.searchParams);
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

    const fullPayload = {
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
        variables: playbook.promptPack.variables || [],
        promptPack: playbook.promptPack,
        codePack: playbook.codePack,
        codeSequenceLength: playbook.codePack.integrationSequence.length,
        href: `/api/llm/playbooks/${playbook.slug}`,
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
      playbooks: ranked.map(({ playbook, score, reasons }) => ({
        slug: playbook.slug,
        title: playbook.title,
        industry: playbook.industry,
        summary: playbook.summary,
        recommendedPatternIds: playbook.recommendedPatternIds,
        promptObjective: playbook.promptPack.objective,
        variables: playbook.promptPack.variables || [],
        promptPack: {
          objective: playbook.promptPack.objective,
          contextBlock: playbook.promptPack.contextBlock,
          constraints: playbook.promptPack.constraints,
          qualityChecks: playbook.promptPack.qualityChecks,
          failureHandling: playbook.promptPack.failureHandling,
          outputContract: playbook.promptPack.outputContract,
          variables: playbook.promptPack.variables || [],
        },
        codePack: playbook.codePack,
        href: `/api/llm/playbooks/${playbook.slug}`,
        ...(includeDebug ? { retrieval: { score, reasons } } : {}),
      })),
      retrievalControls: fullPayload.retrievalControls,
    } satisfies Record<string, unknown>;

    const payload = format === 'compact' ? compactPayload : fullPayload;
    return jsonWithMeta(applyFieldProjection(payload, fields));
  } catch (error) {
    console.error('Failed to load playbooks', error);
    return jsonError('Failed to load playbooks');
  }
}
