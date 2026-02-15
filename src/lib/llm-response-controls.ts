export type RetrievalResponseFormat = 'full' | 'compact';

function isTruthy(value: string | null): boolean {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'on';
}

export function getRetrievalResponseFormat(searchParams: URLSearchParams): RetrievalResponseFormat {
  const format = searchParams.get('format')?.trim().toLowerCase();
  if (isTruthy(searchParams.get('packOnly'))) {
    return 'compact';
  }
  if (format === 'compact') {
    return 'compact';
  }
  return 'full';
}

export function parseFieldProjection(searchParams: URLSearchParams): string[] {
  const fields = searchParams
    .getAll('fields')
    .flatMap((value) => value.split(','))
    .map((value) => value.trim())
    .filter(Boolean);

  return Array.from(new Set(fields));
}

function asObject(value: unknown): Record<string, unknown> {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

function mergeProjectedPath(target: unknown, source: unknown, path: string[]): unknown {
  if (path.length === 0) {
    return source;
  }

  if (source === null || source === undefined) {
    return target;
  }

  if (Array.isArray(source)) {
    const current = Array.isArray(target) ? target : [];
    return source.map((item, index) => mergeProjectedPath(current[index], item, path));
  }

  if (typeof source !== 'object') {
    return target;
  }

  const [head, ...rest] = path;
  const objectSource = source as Record<string, unknown>;
  if (!(head in objectSource)) {
    return target;
  }

  const objectTarget = asObject(target);
  if (rest.length === 0) {
    objectTarget[head] = objectSource[head];
    return objectTarget;
  }

  objectTarget[head] = mergeProjectedPath(objectTarget[head], objectSource[head], rest);
  return objectTarget;
}

export function applyFieldProjection<T extends Record<string, unknown>>(
  payload: T,
  fields: string[]
): Record<string, unknown> {
  if (fields.length === 0) {
    return payload;
  }

  let projected: unknown = {};
  for (const field of fields) {
    const path = field
      .split('.')
      .map((segment) => segment.trim())
      .filter(Boolean);

    if (path.length === 0) continue;
    projected = mergeProjectedPath(projected, payload, path);
  }

  return asObject(projected);
}

