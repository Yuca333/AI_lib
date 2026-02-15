import { NextResponse } from 'next/server';
import { getLibraryMeta } from '@/lib/library-knowledge';
import { API_CACHE_CONTROL, LLM_SCHEMA_VERSION } from '@/lib/site-config';

interface ResponseOptions {
  status?: number;
  headers?: HeadersInit;
}

export function jsonWithMeta<T extends object>(payload: T, options: ResponseOptions = {}) {
  const libraryMeta = getLibraryMeta();
  const headers = new Headers(options.headers);
  headers.set('Cache-Control', API_CACHE_CONTROL);
  headers.set('ETag', `"${libraryMeta.contentDigest}"`);
  headers.set('X-LLM-Schema-Version', LLM_SCHEMA_VERSION);

  return NextResponse.json(
    {
      ...payload,
      meta: {
        schemaVersion: LLM_SCHEMA_VERSION,
        ...libraryMeta,
      },
    },
    {
      status: options.status,
      headers,
    }
  );
}

export function jsonError(message: string, status = 500, details?: string) {
  return jsonWithMeta(
    {
      error: message,
      ...(details ? { details } : {}),
    },
    { status }
  );
}
