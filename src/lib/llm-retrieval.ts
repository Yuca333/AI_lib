import type { EnrichedPattern, ResolvedPlaybook, ReferenceDocument } from '@/lib/library-knowledge';

export interface RetrievalScore {
  score: number;
  reasons: string[];
}

export interface PatternSearchOptions {
  query?: string;
  mode?: 'prompt' | 'code';
  category?: string;
  industry?: string;
  tags?: string[];
  limit?: number;
}

export interface PatternSearchResult {
  pattern: EnrichedPattern;
  score: number;
  reasons: string[];
}

export interface PlaybookSearchOptions {
  query?: string;
  industry?: string;
  mode?: 'prompt' | 'code';
  limit?: number;
}

export interface PlaybookSearchResult {
  playbook: ResolvedPlaybook;
  score: number;
  reasons: string[];
}

export interface ReferenceSearchOptions {
  query?: string;
  mode?: 'prompt' | 'code' | 'mixed';
  limit?: number;
}

export interface ReferenceSearchResult {
  reference: ReferenceDocument;
  score: number;
  reasons: string[];
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, ' ')
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 1);
}

function includesInsensitive(haystack: string, needle: string) {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

function overlapScore(queryTokens: string[], sourceTokens: string[]): number {
  if (queryTokens.length === 0 || sourceTokens.length === 0) return 0;
  const sourceSet = new Set(sourceTokens);
  const hits = queryTokens.filter((token) => sourceSet.has(token)).length;
  return hits;
}

function compactReasons(reasons: string[]): string[] {
  return Array.from(new Set(reasons.filter(Boolean)));
}

export function scorePattern(pattern: EnrichedPattern, options: PatternSearchOptions): RetrievalScore {
  const reasons: string[] = [];
  let score = 0;

  const query = (options.query || '').trim();
  if (query) {
    const queryTokens = tokenize(query);
    const nameScore = overlapScore(queryTokens, tokenize(pattern.name));
    const tagScore = overlapScore(queryTokens, tokenize(pattern.taxonomy.tags.join(' ')));
    const intentScore = overlapScore(queryTokens, tokenize(pattern.taxonomy.intents.join(' ')));
    const industryScore = overlapScore(queryTokens, tokenize(pattern.taxonomy.industries.join(' ')));
    const descriptionScore = overlapScore(queryTokens, tokenize(pattern.description));

    score += nameScore * 8 + tagScore * 6 + intentScore * 5 + industryScore * 5 + descriptionScore * 3;

    if (nameScore > 0) reasons.push('name');
    if (tagScore > 0) reasons.push('tags');
    if (intentScore > 0) reasons.push('intent');
    if (industryScore > 0) reasons.push('industry');
    if (descriptionScore > 0) reasons.push('description');
  }

  if (options.mode === 'prompt') {
    score += 5;
    reasons.push('prompt-mode');
  }
  if (options.mode === 'code') {
    score += 5;
    reasons.push('code-mode');
  }

  if (options.category && includesInsensitive(pattern.category, options.category)) {
    score += 12;
    reasons.push('category');
  }

  if (options.industry) {
    if (pattern.taxonomy.industries.some((value) => includesInsensitive(value, options.industry!))) {
      score += 14;
      reasons.push('industry-filter');
    } else {
      score -= 2;
    }
  }

  if (options.tags && options.tags.length > 0) {
    const normalizedTags = pattern.taxonomy.tags.map((tag) => tag.toLowerCase());
    const tagHits = options.tags.filter((tag) => normalizedTags.includes(tag.toLowerCase())).length;
    score += tagHits * 8;
    if (tagHits > 0) reasons.push('tag-filter');
  }

  if (pattern.taxonomy.status === 'experimental') {
    score -= 3;
    reasons.push('experimental-penalty');
  }

  return { score, reasons: compactReasons(reasons) };
}

export function searchPatterns(patterns: EnrichedPattern[], options: PatternSearchOptions): PatternSearchResult[] {
  const limit = Math.min(Math.max(options.limit ?? 25, 1), 100);

  const filtered = patterns.filter((pattern) => {
    if (options.category && !includesInsensitive(pattern.category, options.category)) return false;
    if (
      options.industry &&
      !pattern.taxonomy.industries.some((value) => includesInsensitive(value, options.industry!))
    ) {
      return false;
    }
    if (options.tags && options.tags.length > 0) {
      const patternTags = pattern.taxonomy.tags.map((tag) => tag.toLowerCase());
      const hasAnyTag = options.tags.some((tag) => patternTags.includes(tag.toLowerCase()));
      if (!hasAnyTag) return false;
    }
    return true;
  });

  return filtered
    .map((pattern) => {
      const scored = scorePattern(pattern, options);
      return {
        pattern,
        score: scored.score,
        reasons: scored.reasons,
      };
    })
    .sort((a, b) => b.score - a.score || a.pattern.id.localeCompare(b.pattern.id))
    .slice(0, limit);
}

export function searchPlaybooks(
  playbooks: ResolvedPlaybook[],
  options: PlaybookSearchOptions
): PlaybookSearchResult[] {
  const queryTokens = tokenize(options.query || '');
  const limit = Math.min(Math.max(options.limit ?? 25, 1), 100);

  const ranked = playbooks
    .filter((playbook) => {
      if (options.industry && !includesInsensitive(playbook.industry, options.industry)) return false;
      return true;
    })
    .map((playbook) => {
      const reasons: string[] = [];
      let score = 0;

      if (queryTokens.length > 0) {
        const nameScore = overlapScore(queryTokens, tokenize(playbook.title));
        const summaryScore = overlapScore(queryTokens, tokenize(playbook.summary));
        const industryScore = overlapScore(queryTokens, tokenize(playbook.industry));
        const patternNameScore = overlapScore(
          queryTokens,
          tokenize(playbook.patterns.map((pattern) => pattern.name).join(' '))
        );

        score += nameScore * 7 + summaryScore * 4 + industryScore * 8 + patternNameScore * 3;
        if (nameScore > 0) reasons.push('title');
        if (summaryScore > 0) reasons.push('summary');
        if (industryScore > 0) reasons.push('industry');
        if (patternNameScore > 0) reasons.push('pattern-name');
      }

      if (options.mode === 'prompt') {
        score += 3;
        reasons.push('prompt-mode');
      }
      if (options.mode === 'code') {
        score += 3;
        reasons.push('code-mode');
      }

      if (options.industry && includesInsensitive(playbook.industry, options.industry)) {
        score += 12;
        reasons.push('industry-filter');
      }

      return {
        playbook,
        score,
        reasons: compactReasons(reasons),
      };
    })
    .sort((a, b) => b.score - a.score || a.playbook.slug.localeCompare(b.playbook.slug))
    .slice(0, limit);

  return ranked;
}

export function searchReferences(
  references: ReferenceDocument[],
  options: ReferenceSearchOptions
): ReferenceSearchResult[] {
  const queryTokens = tokenize(options.query || '');
  const limit = Math.min(Math.max(options.limit ?? 25, 1), 100);

  return references
    .filter((reference) => {
      if (!options.mode) return true;
      return reference.sections.some((section) => section.mode === options.mode || section.mode === 'mixed');
    })
    .map((reference) => {
      const reasons: string[] = [];
      let score = 0;

      if (queryTokens.length > 0) {
        const titleScore = overlapScore(queryTokens, tokenize(reference.title));
        const summaryScore = overlapScore(queryTokens, tokenize(reference.summary));
        const sectionScore = overlapScore(
          queryTokens,
          tokenize(reference.sections.map((section) => `${section.heading} ${section.body}`).join(' '))
        );

        score += titleScore * 8 + summaryScore * 4 + sectionScore * 2;
        if (titleScore > 0) reasons.push('title');
        if (summaryScore > 0) reasons.push('summary');
        if (sectionScore > 0) reasons.push('section-content');
      }

      if (options.mode) {
        score += 2;
        reasons.push(`mode:${options.mode}`);
      }

      return {
        reference,
        score,
        reasons: compactReasons(reasons),
      };
    })
    .sort((a, b) => b.score - a.score || a.reference.id.localeCompare(b.reference.id))
    .slice(0, limit);
}
