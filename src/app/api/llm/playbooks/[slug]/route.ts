import { jsonError, jsonWithMeta } from '@/lib/api-response';
import { getPlaybookBySlug } from '@/lib/library-knowledge';
import {
  applyFieldProjection,
  getRetrievalResponseFormat,
  parseFieldProjection,
} from '@/lib/llm-response-controls';

export const revalidate = 3600;

export async function GET(request: Request, props: { params: Promise<{ slug: string }> }) {
  try {
    const url = new URL(request.url);
    const format = getRetrievalResponseFormat(url.searchParams);
    const fields = parseFieldProjection(url.searchParams);

    const params = await props.params;
    const playbook = getPlaybookBySlug(params.slug);

    if (!playbook) {
      return jsonError('Playbook not found', 404);
    }

    const fullPayload = {
      slug: playbook.slug,
      title: playbook.title,
      industry: playbook.industry,
      summary: playbook.summary,
      modes: {
        prompt: {
          guide: playbook.promptGuide,
          pack: playbook.promptPack,
        },
        code: {
          guide: playbook.codeGuide,
          pack: playbook.codePack,
        },
      },
      variables: playbook.promptPack.variables || [],
      recommendedPatterns: playbook.patterns.map((pattern) => ({
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
        tags: pattern.taxonomy.tags,
        implementationRawHref: pattern.implementationRawHref,
        href: `/api/llm/patterns/${pattern.id}`,
      })),
      references: playbook.references.map((referenceId) => ({
        id: referenceId,
        href: `/api/llm/references/${referenceId}`,
        sectionsHref: `/api/llm/references/${referenceId}/sections`,
        rawHref: `/api/llm/raw/references/${referenceId}.md`,
      })),
      links: {
        self: `/api/llm/playbooks/${playbook.slug}`,
        ui: `/playbooks/${playbook.slug}`,
        collection: '/playbooks',
        composeLovable: '/api/llm/compose/lovable',
      },
      retrievalControls: {
        format: 'full|compact',
        packOnly: 'true|false',
        fields: 'comma-separated projection',
      },
    } satisfies Record<string, unknown>;

    const compactPayload = {
      slug: playbook.slug,
      title: playbook.title,
      industry: playbook.industry,
      summary: playbook.summary,
      variables: playbook.promptPack.variables || [],
      modes: {
        prompt: {
          pack: {
            objective: playbook.promptPack.objective,
            contextBlock: playbook.promptPack.contextBlock,
            constraints: playbook.promptPack.constraints,
            qualityChecks: playbook.promptPack.qualityChecks,
            failureHandling: playbook.promptPack.failureHandling,
            outputContract: playbook.promptPack.outputContract,
            variables: playbook.promptPack.variables || [],
            promptTemplate: playbook.promptPack.promptTemplate,
          },
        },
        code: {
          pack: playbook.codePack,
        },
      },
      recommendedPatterns: fullPayload.recommendedPatterns.map((pattern) => ({
        id: pattern.id,
        canonicalId: pattern.canonicalId,
        name: pattern.name,
        objective: pattern.objective,
        implementationRawHref: pattern.implementationRawHref,
        href: pattern.href,
      })),
      references: fullPayload.references,
      links: fullPayload.links,
      retrievalControls: fullPayload.retrievalControls,
    } satisfies Record<string, unknown>;

    const payload = format === 'compact' ? compactPayload : fullPayload;
    return jsonWithMeta(applyFieldProjection(payload, fields));
  } catch (error) {
    console.error('Failed to load playbook detail', error);
    return jsonError('Failed to load playbook detail');
  }
}
