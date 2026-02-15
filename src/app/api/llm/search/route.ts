import { jsonError, jsonWithMeta } from '@/lib/api-response';
import { getPatternLibrary, getPlaybooks, getReferenceLibrary } from '@/lib/library-knowledge';
import { searchPatterns, searchPlaybooks, searchReferences } from '@/lib/llm-retrieval';

export const revalidate = 1800;
export const dynamic = 'force-dynamic';

type Scope = 'all' | 'patterns' | 'playbooks' | 'references';

function parseScope(value: string | null): Scope {
  if (value === 'patterns' || value === 'playbooks' || value === 'references') return value;
  return 'all';
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const q = url.searchParams.get('q')?.trim() || '';
    const scope = parseScope(url.searchParams.get('scope'));
    const mode = url.searchParams.get('mode');
    const category = url.searchParams.get('category')?.trim();
    const industry = url.searchParams.get('industry')?.trim();
    const limit = Number(url.searchParams.get('limit') || '10');
    const tag = url.searchParams.get('tag')?.trim();

    const patterns = getPatternLibrary();
    const playbooks = getPlaybooks();
    const references = getReferenceLibrary();

    const patternResults =
      scope === 'all' || scope === 'patterns'
        ? searchPatterns(patterns, {
            query: q,
            mode: mode === 'prompt' || mode === 'code' ? mode : undefined,
            category,
            industry,
            tags: tag ? [tag] : undefined,
            limit,
          }).map((entry) => ({
            id: entry.pattern.id,
            canonicalId: entry.pattern.taxonomy.canonicalId,
            type: 'pattern',
            title: entry.pattern.name,
            summary: entry.pattern.description,
            category: entry.pattern.category,
            tags: entry.pattern.taxonomy.tags,
            href: `/api/llm/patterns/${entry.pattern.id}`,
            ui: `/library/${entry.pattern.id}`,
            score: entry.score,
            reasons: entry.reasons,
          }))
        : [];

    const playbookResults =
      scope === 'all' || scope === 'playbooks'
        ? searchPlaybooks(playbooks, {
            query: q,
            industry,
            mode: mode === 'prompt' || mode === 'code' ? mode : undefined,
            limit,
          }).map((entry) => ({
            id: entry.playbook.slug,
            type: 'playbook',
            title: entry.playbook.title,
            summary: entry.playbook.summary,
            industry: entry.playbook.industry,
            href: `/api/llm/playbooks/${entry.playbook.slug}`,
            ui: `/playbooks/${entry.playbook.slug}`,
            score: entry.score,
            reasons: entry.reasons,
          }))
        : [];

    const referenceResults =
      scope === 'all' || scope === 'references'
        ? searchReferences(references, {
            query: q,
            mode:
              mode === 'prompt' || mode === 'code' || mode === 'mixed'
                ? mode
                : undefined,
            limit,
          }).map((entry) => ({
            id: entry.reference.id,
            type: 'reference',
            title: entry.reference.title,
            summary: entry.reference.summary,
            href: `/api/llm/references/${entry.reference.id}`,
            ui: `/reference/${entry.reference.id}`,
            score: entry.score,
            reasons: entry.reasons,
          }))
        : [];

    return jsonWithMeta({
      query: q,
      scope,
      mode: mode || null,
      count: patternResults.length + playbookResults.length + referenceResults.length,
      results: {
        patterns: patternResults,
        playbooks: playbookResults,
        references: referenceResults,
      },
      nextActions: [
        'Read top pattern result detail for full prompt/code packs.',
        'Read playbook detail for integration sequence if industry match is high.',
        'Read reference docs for guardrails before generating final output.',
      ],
    });
  } catch (error) {
    console.error('Failed to perform retrieval search', error);
    return jsonError('Failed to perform retrieval search');
  }
}
