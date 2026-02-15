import { NextResponse } from 'next/server';
import { API_CACHE_CONTROL } from '@/lib/site-config';
import { getReferenceById } from '@/lib/library-knowledge';

export const revalidate = 3600;

function resolveReferenceIdFromArtifact(artifact: string[] | undefined): string | null {
  if (!artifact || artifact.length === 0) return null;
  const fileName = artifact.join('/');
  if (!fileName.endsWith('.md')) return null;
  const rawId = fileName.slice(0, -3).trim();
  if (!rawId) return null;
  return decodeURIComponent(rawId);
}

export async function GET(_: Request, props: { params: Promise<{ artifact: string[] }> }) {
  const params = await props.params;
  const referenceId = resolveReferenceIdFromArtifact(params.artifact);

  if (!referenceId) {
    return new NextResponse('Reference not found', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

  const reference = getReferenceById(referenceId);
  if (!reference) {
    return new NextResponse('Reference not found', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

  return new NextResponse(reference.rawContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': API_CACHE_CONTROL,
      ETag: `"${reference.rawHash}"`,
      'X-LLM-Raw-Artifact': 'reference-markdown',
    },
  });
}

