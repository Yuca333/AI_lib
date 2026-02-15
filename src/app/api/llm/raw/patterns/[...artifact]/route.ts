import { NextResponse } from 'next/server';
import { API_CACHE_CONTROL } from '@/lib/site-config';
import { resolvePatternByAnyId } from '@/lib/library-knowledge';

export const revalidate = 3600;

function resolvePatternIdFromArtifact(artifact: string[] | undefined): string | null {
  if (!artifact || artifact.length === 0) return null;
  const fileName = artifact.join('/');
  if (!fileName.endsWith('.tsx')) return null;
  const rawId = fileName.slice(0, -4).trim();
  if (!rawId) return null;
  return decodeURIComponent(rawId);
}

export async function GET(_: Request, props: { params: Promise<{ artifact: string[] }> }) {
  const params = await props.params;
  const patternId = resolvePatternIdFromArtifact(params.artifact);

  if (!patternId) {
    return new NextResponse('Pattern not found', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

  const pattern = resolvePatternByAnyId(patternId);
  if (!pattern) {
    return new NextResponse('Pattern not found', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

  return new NextResponse(pattern.code, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': API_CACHE_CONTROL,
      ETag: `"${pattern.implementationHash}"`,
      'X-LLM-Raw-Artifact': 'pattern-tsx',
    },
  });
}

