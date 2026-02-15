import { jsonError, jsonWithMeta } from '@/lib/api-response';

export const revalidate = 86400;

export async function GET() {
  try {
    return jsonWithMeta({
      contracts: {
        patternSummary: {
          required: ['id', 'canonicalId', 'name', 'category', 'description', 'href'],
          optional: ['score', 'scoreValue', 'desktopOnly', 'focalRating', 'taxonomy', 'promptPreview'],
        },
        patternDetail: {
          required: ['id', 'canonicalId', 'name', 'taxonomy', 'modes', 'agentContract'],
          promptMode: ['context', 'example', 'usageNotes', 'pack'],
          codeMode: ['implementation', 'pack'],
        },
        playbookDetail: {
          required: ['slug', 'title', 'industry', 'modes', 'recommendedPatterns', 'references'],
          promptMode: ['guide', 'pack'],
          codeMode: ['guide', 'pack'],
        },
        referenceDetail: {
          required: ['id', 'title', 'summary', 'sections'],
          sectionShape: ['heading', 'body', 'mode'],
        },
      },
      queryCapabilities: {
        '/api/llm/patterns': ['q', 'mode', 'category', 'industry', 'tag', 'limit', 'debug'],
        '/api/llm/playbooks': ['q', 'industry', 'mode', 'limit', 'debug'],
        '/api/llm/references': ['q', 'mode', 'limit', 'debug'],
        '/api/llm/search': ['q', 'scope', 'mode', 'category', 'industry', 'tag', 'limit'],
      },
      compatibilityNotes: [
        'Existing fields remain available for backward compatibility.',
        'New fields are additive and safe for clients ignoring unknown keys.',
        'Canonical pattern identifiers use `patlib.pattern.<id>` format.',
      ],
    });
  } catch (error) {
    console.error('Failed to generate contracts', error);
    return jsonError('Failed to generate contracts');
  }
}
