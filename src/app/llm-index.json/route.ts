import { jsonWithMeta } from '@/lib/api-response';
import { getPatternLibrary, getPlaybooks, getReferenceLibrary } from '@/lib/library-knowledge';

export const revalidate = 3600;

export async function GET() {
  const patterns = getPatternLibrary();
  const playbooks = getPlaybooks();
  const references = getReferenceLibrary();

  return jsonWithMeta({
    kind: 'llm-index',
    generatedAt: new Date().toISOString(),
    canonical: {
      index: '/api/llm/index',
      llmsTxt: '/llms.txt',
    },
    counts: {
      patterns: patterns.length,
      playbooks: playbooks.length,
      references: references.length,
    },
    endpoints: {
      index: '/api/llm/index',
      search: '/api/llm/search',
      contracts: '/api/llm/contracts',
      health: '/api/llm/health',
      patterns: '/api/llm/patterns',
      playbooks: '/api/llm/playbooks',
      references: '/api/llm/references',
      referenceSections: '/api/llm/references/{id}/sections',
      referenceSection: '/api/llm/references/{id}/sections/{sectionId}',
      rawPatternTsx: '/api/llm/raw/patterns/{id}.tsx',
      rawReferenceMd: '/api/llm/raw/references/{id}.md',
      composeLovable: '/api/llm/compose/lovable',
    },
    retrievalControls: {
      format: 'full|compact',
      packOnly: 'true|false',
      fields: 'comma-separated projection',
    },
  });
}
