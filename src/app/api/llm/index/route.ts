import { jsonError, jsonWithMeta } from '@/lib/api-response';
import { getPatternLibrary, getPlaybooks, getReferenceLibrary } from '@/lib/library-knowledge';
import { SITE_URL } from '@/lib/site-config';

export const revalidate = 3600;

export async function GET() {
  try {
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

    return jsonWithMeta({
      generatedAt: new Date().toISOString(),
      modes: ['prompt', 'code'],
      canonical: {
        index: `${SITE_URL}/api/llm/index`,
        llmsTxt: `${SITE_URL}/llms.txt`,
      },
      navigation: {
        ui: {
          home: '/',
          patterns: '/library',
          playbooks: '/playbooks',
          references: '/reference',
          llm: '/llm',
        },
        api: {
          index: '/api/llm/index',
          patterns: '/api/llm/patterns',
          playbooks: '/api/llm/playbooks',
          references: '/api/llm/references',
          search: '/api/llm/search',
          contracts: '/api/llm/contracts',
        },
      },
      retrievalModes: {
        prompt: {
          recommendedSequence: [
            '/api/llm/playbooks?mode=prompt',
            '/api/llm/patterns?mode=prompt',
            '/api/llm/references?mode=prompt',
          ],
        },
        code: {
          recommendedSequence: [
            '/api/llm/patterns?mode=code',
            '/api/llm/playbooks?mode=code',
            '/api/llm/references?mode=code',
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
      })),
    });
  } catch (error) {
    console.error('Failed to build LLM index', error);
    return jsonError('Failed to build LLM index');
  }
}
