import { jsonError, jsonWithMeta } from '@/lib/api-response';
import { getPatternLibrary, getPlaybooks, getReferenceLibrary } from '@/lib/library-knowledge';
import {
  applyFieldProjection,
  getRetrievalResponseFormat,
  parseFieldProjection,
} from '@/lib/llm-response-controls';

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const format = getRetrievalResponseFormat(url.searchParams);
    const fields = parseFieldProjection(url.searchParams);
    const patterns = getPatternLibrary();
    const playbooks = getPlaybooks();
    const references = getReferenceLibrary();

    const categories = patterns.reduce<Record<string, number>>((acc, pattern) => {
      acc[pattern.category] = (acc[pattern.category] || 0) + 1;
      return acc;
    }, {});

    const industries = Array.from(
      new Set(playbooks.map((playbook) => playbook.industry).concat(patterns.flatMap((p) => p.taxonomy.industries)))
    ).sort();
    const intents = Array.from(new Set(patterns.flatMap((pattern) => pattern.taxonomy.intents))).sort();
    const tags = Array.from(new Set(patterns.flatMap((pattern) => pattern.taxonomy.tags))).sort();

    const fullPayload = {
      generatedAt: new Date().toISOString(),
      modes: ['prompt', 'code'],
      canonical: {
        index: '/api/llm/index',
        llmsTxt: '/llms.txt',
        host: url.origin,
      },
      navigation: {
        ui: {
          home: '/',
          patterns: '/library',
          playbooks: '/playbooks',
          references: '/reference',
          llm: '/llm',
          antiPatterns: '/anti-patterns',
          examples: '/examples',
          lovableOptimized: '/lovable-optimized',
        },
        api: {
          index: '/api/llm/index',
          patterns: '/api/llm/patterns',
          playbooks: '/api/llm/playbooks',
          references: '/api/llm/references',
          search: '/api/llm/search',
          contracts: '/api/llm/contracts',
          health: '/api/llm/health',
          composeLovable: '/api/llm/compose/lovable',
          rawPatternTsx: '/api/llm/raw/patterns/{id}.tsx',
          rawReferenceMd: '/api/llm/raw/references/{id}.md',
        },
      },
      retrievalModes: {
        prompt: {
          recommendedSequence: [
            '/api/llm/playbooks?mode=prompt&format=compact',
            '/api/llm/patterns?mode=prompt&format=compact',
            '/api/llm/references?mode=prompt&format=compact',
          ],
        },
        code: {
          recommendedSequence: [
            '/api/llm/patterns?mode=code&format=compact',
            '/api/llm/playbooks?mode=code&format=compact',
            '/api/llm/references?mode=code&format=compact',
          ],
        },
      },
      counts: {
        patterns: patterns.length,
        playbooks: playbooks.length,
        references: references.length,
      },
      taxonomy: {
        categories,
        industries,
        intents,
        tags,
      },
      playbookIndex: playbooks.map((playbook) => ({
        slug: playbook.slug,
        title: playbook.title,
        industry: playbook.industry,
        patterns: playbook.recommendedPatternIds,
        href: `/api/llm/playbooks/${playbook.slug}`,
      })),
      referenceIndex: references.map((doc) => ({
        id: doc.id,
        title: doc.title,
        fileName: doc.fileName,
        sections: doc.sections.length,
        href: `/api/llm/references/${doc.id}`,
        sectionsHref: `/api/llm/references/${doc.id}/sections`,
        rawHref: doc.rawHref,
      })),
      retrievalControls: {
        format: 'full|compact',
        packOnly: 'true|false',
        fields: 'comma-separated projection',
      },
    } satisfies Record<string, unknown>;

    const compactPayload = {
      generatedAt: fullPayload.generatedAt,
      canonical: fullPayload.canonical,
      counts: fullPayload.counts,
      endpoints: fullPayload.navigation.api,
      retrievalControls: fullPayload.retrievalControls,
    } satisfies Record<string, unknown>;

    const payload = format === 'compact' ? compactPayload : fullPayload;
    return jsonWithMeta(applyFieldProjection(payload, fields));
  } catch (error) {
    console.error('Failed to build LLM index', error);
    return jsonError('Failed to build LLM index');
  }
}
