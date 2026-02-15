import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { LIBRARY_CONTENT_VERSION } from '@/lib/site-config';

const LIB_DIR = path.join(process.cwd(), 'lib-files');

interface LibrarySnapshot {
  digest: string;
  lastModifiedIso: string;
  indexedFiles: string[];
}

let snapshotCache: LibrarySnapshot | null = null;

function listMarkdownFiles(): string[] {
  return fs
    .readdirSync(LIB_DIR)
    .filter((fileName) => fileName.endsWith('.md'))
    .sort();
}

function buildSnapshot(): LibrarySnapshot {
  const files = listMarkdownFiles();
  const hash = crypto.createHash('sha256');

  let latestModified = 0;
  for (const fileName of files) {
    const fullPath = path.join(LIB_DIR, fileName);
    const stats = fs.statSync(fullPath);
    latestModified = Math.max(latestModified, stats.mtimeMs);
    hash.update(`${fileName}:${stats.size}:${stats.mtimeMs.toFixed(0)}`);
  }

  hash.update(LIBRARY_CONTENT_VERSION);

  return {
    digest: hash.digest('hex').slice(0, 16),
    lastModifiedIso: new Date(latestModified || Date.now()).toISOString(),
    indexedFiles: files,
  };
}

export function getLibrarySnapshot(): LibrarySnapshot {
  if (!snapshotCache) {
    snapshotCache = buildSnapshot();
  }
  return snapshotCache;
}

export function resetLibrarySnapshotForTests() {
  snapshotCache = null;
}
