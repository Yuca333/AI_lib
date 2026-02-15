import { jsonWithMeta } from '@/lib/api-response';
import { getPatternLibrary, getPlaybooks, getReferenceLibrary } from '@/lib/library-knowledge';

export const revalidate = 3600;

export async function GET() {
  const patterns = getPatternLibrary();
  const playbooks = getPlaybooks();
  const references = getReferenceLibrary();

  return jsonWithMeta({
    kind: 'llm-index',
    counts: {
      patterns: patterns.length,
      playbooks: playbooks.length,
      references: references.length,
    },
    endpoints: {
      index: '/api/llm/index',
      search: '/api/llm/search',
      contracts: '/api/llm/contracts',
      patterns: '/api/llm/patterns',
      playbooks: '/api/llm/playbooks',
      references: '/api/llm/references',
    },
  });
}
