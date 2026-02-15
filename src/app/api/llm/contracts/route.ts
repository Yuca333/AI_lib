import { jsonError, jsonWithMeta } from '@/lib/api-response';

export const revalidate = 86400;

export async function GET() {
  try {
    return jsonWithMeta({
      contracts: {
        llmSearch: {
          endpoint: '/api/llm/search',
          responseShape: {
            query: 'string',
            scope: 'all|patterns|playbooks|references',
            mode: 'prompt|code|null',
            count: 'number',
            results: [
              {
                pattern_id: 'string',
                name: 'string',
                relevance_score: 'number(0..1)',
                match_reasons: ['string'],
                implementation_complexity: 'low|medium|high',
                code_blocks: {
                  html: 'string',
                  css: 'string',
                  js: 'string',
                },
                prompt_template: 'string',
                required_assets: ['string'],
                estimated_tokens: 'number',
                ai_success_rate: 'number(0..1)',
                selection_criteria: {
                  use_when: ['string'],
                  avoid_when: ['string'],
                  better_alternatives: [
                    {
                      pattern_id: 'string',
                      reason: 'string',
                    },
                  ],
                },
                compatibility: {
                  llms_tested: {
                    'claude_sonnet_3.5': {
                      success_rate: 'number',
                      avg_iterations: 'number',
                    },
                    gpt4: {
                      success_rate: 'number',
                      avg_iterations: 'number',
                    },
                    lovable: {
                      success_rate: 'number',
                      avg_iterations: 'number',
                    },
                  },
                  frameworks: ['string'],
                  css_approach: ['string'],
                  a11y_compliant: 'boolean',
                  mobile_tested: 'boolean',
                },
                links: {
                  detail: 'string',
                  ui: 'string',
                },
              },
            ],
          },
        },
        patternSummary: {
          required: ['id', 'canonicalId', 'name', 'category', 'oneSentenceDescription', 'objective', 'href'],
          optional: [
            'score',
            'scoreValue',
            'desktopOnly',
            'focalRating',
            'taxonomy',
            'promptPreview',
            'whenToUse',
            'avoidWhen',
            'failureModes',
            'promptPack',
            'codePack',
            'implementationRawHref',
            'implementationExcerpt',
            'implementationHash',
            'selectionCriteria',
            'llmMeta',
            'compatibility',
            'promptBlueprint',
            'promptTemplates',
            'codeBlocks',
          ],
        },
        patternDetail: {
          required: [
            'id',
            'canonicalId',
            'name',
            'oneSentenceDescription',
            'objective',
            'whenToUse',
            'avoidWhen',
            'failureModes',
            'taxonomy',
            'selection_criteria',
            'llm_integration',
            'compatibility',
            'llm_meta',
            'prompt_blueprint',
            'prompt_templates',
            'code_blocks',
            'lovable_optimized',
            'modes',
            'agentContract',
          ],
          promptMode: ['context', 'example', 'usageNotes', 'pack'],
          codeMode: ['implementationRawHref', 'implementationExcerpt', 'implementationHash', 'pack'],
        },
        playbookDetail: {
          required: ['slug', 'title', 'industry', 'modes', 'recommendedPatterns', 'references', 'variables'],
          promptMode: ['guide', 'pack'],
          codeMode: ['guide', 'pack'],
        },
        referenceDetail: {
          required: ['id', 'title', 'summary', 'sections', 'rawHref', 'rawHash'],
          sectionShape: ['sectionId', 'heading', 'body', 'mode', 'tokenEstimate'],
        },
        referenceSections: {
          listEndpoint: '/api/llm/references/{id}/sections',
          detailEndpoint: '/api/llm/references/{id}/sections/{sectionId}',
          listShape: ['sectionId', 'heading', 'mode', 'tokenEstimate', 'href'],
        },
        rawArtifacts: {
          patternTsx: '/api/llm/raw/patterns/{id}.tsx',
          referenceMarkdown: '/api/llm/raw/references/{id}.md',
          mediaType: 'text/plain',
        },
        health: {
          endpoint: '/api/llm/health',
          responseShape: ['schemaVersion', 'contentVersion', 'contentDigest', 'generatedAt'],
        },
        composeLovable: {
          endpoint: '/api/llm/compose/lovable',
          method: 'POST',
          requestShape: ['playbookSlug', 'selectedPatternIds[]', 'variables'],
          responseShape: ['prompt', 'assumptions', 'selectedPatternIds[]'],
        },
      },
      retrievalControls: {
        format: {
          values: ['full', 'compact'],
          description: 'compact returns pack-oriented payloads and excludes long examples/code blocks.',
        },
        packOnly: {
          values: ['true', 'false'],
          description: 'Alias for format=compact.',
        },
        fields: {
          type: 'comma-separated projection',
          example: 'fields=id,name,modes.code.implementationRawHref',
        },
      },
      queryCapabilities: {
        '/api/llm/patterns': [
          'q',
          'mode',
          'category',
          'industry',
          'tag',
          'limit',
          'debug',
          'format',
          'packOnly',
          'fields',
        ],
        '/api/llm/patterns/{id}': ['format', 'packOnly', 'fields', 'legacyCode'],
        '/api/llm/playbooks': ['q', 'industry', 'mode', 'limit', 'debug', 'format', 'packOnly', 'fields'],
        '/api/llm/playbooks/{slug}': ['format', 'packOnly', 'fields'],
        '/api/llm/references': ['q', 'mode', 'limit', 'debug', 'format', 'packOnly', 'fields'],
        '/api/llm/references/{id}': ['format', 'packOnly', 'fields'],
        '/api/llm/references/{id}/sections': ['fields'],
        '/api/llm/references/{id}/sections/{sectionId}': ['fields'],
        '/api/llm/search': ['q', 'scope', 'mode', 'category', 'industry', 'tag', 'limit', 'format', 'packOnly', 'fields'],
      },
      compatibilityNotes: [
        'Pattern canonical identifiers use `patlib.pattern.<id>` format.',
        'Raw artifact endpoints return unsanitized plain text for lossless transport.',
        'All retrieval collection endpoints support format, packOnly, and fields projection controls.',
      ],
    });
  } catch (error) {
    console.error('Failed to generate contracts', error);
    return jsonError('Failed to generate contracts');
  }
}
