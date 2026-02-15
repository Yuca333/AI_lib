import { jsonError, jsonWithMeta } from '@/lib/api-response';
import { getLibraryMeta } from '@/lib/library-knowledge';
import { LLM_SCHEMA_VERSION } from '@/lib/site-config';

export const revalidate = 300;

export async function GET() {
  try {
    const meta = getLibraryMeta();
    return jsonWithMeta({
      schemaVersion: LLM_SCHEMA_VERSION,
      contentVersion: meta.contentVersion,
      contentDigest: meta.contentDigest,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to generate health payload', error);
    return jsonError('Failed to generate health payload');
  }
}

