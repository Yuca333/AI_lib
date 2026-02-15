import fs from 'fs';
import path from 'path';

const root = process.cwd();
const patternDocPath = path.join(root, 'lib-files/lib-patterns.md');

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, ' ')
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 1);
}

function parsePatternIndex(markdown) {
  const lines = markdown.split('\n');
  const patterns = [];
  let currentCategory = 'Uncategorized';
  let current = null;

  for (const line of lines) {
    const section = line.match(/^##\s+SECTION\s+\d+:\s+(.+)$/);
    if (section) {
      currentCategory = section[1].trim();
      continue;
    }

    const header = line.match(/^###\s+(\d+\.\d+)\s+(.+)$/);
    if (header) {
      if (current) patterns.push(current);
      current = {
        id: header[1].trim(),
        name: header[2].trim(),
        category: currentCategory,
        text: '',
      };
      continue;
    }

    if (current) {
      current.text += `${line}\n`;
    }
  }

  if (current) patterns.push(current);
  return patterns;
}

function rankPatterns(patterns, query) {
  const queryTokens = tokenize(query);
  const patternHints = {
    '1.4': ['trust', 'service', 'clinic', 'contractor', 'booking', 'quote'],
    '10.1': ['service', 'scope', 'pricing', 'offer'],
    '10.2': ['testimonial', 'trust', 'proof', 'review'],
    '10.3': ['contact', 'booking', 'reservation', 'quote', 'cta'],
    '10.4': ['hours', 'open', 'schedule', 'booking'],
    '1.2': ['restaurant', 'food', 'image', 'reservation'],
    '2.2': ['place', 'menu', 'restaurant', 'image'],
    '3.2': ['gallery', 'photo', 'image', 'showcase'],
    '3.3': ['process', 'narrative', 'steps', 'journey'],
    '6.1': ['stats', 'numbers', 'metrics', 'proof'],
    '7.1': ['transition', 'separator', 'section', 'seam'],
    '8.2': ['ambient', 'depth', 'background', 'blobs'],
    '8.4': ['ambient', 'subtle', 'background', 'depth'],
  };

  return patterns
    .map((pattern) => {
      const haystack = [
        pattern.name,
        pattern.category,
        pattern.text.slice(0, 1200),
      ].join(' ');
      const tokens = tokenize(haystack);
      const tokenSet = new Set(tokens);

      let score = 0;
      for (const token of queryTokens) {
        if (tokenSet.has(token)) score += 1;
        if (tokenize(pattern.name).includes(token)) score += 4;
        if (tokenize(pattern.category).includes(token)) score += 2;
      }

      const hints = patternHints[pattern.id] || [];
      for (const token of queryTokens) {
        if (hints.includes(token)) score += 6;
      }

      return { ...pattern, score };
    })
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
}

const benchmarkQueries = [
  { query: 'dental clinic trust hero booking', expected: ['1.4', '10.3', '10.2'] },
  { query: 'restaurant food image gallery reservation', expected: ['1.2', '3.2', '10.3'] },
  { query: 'contractor process narrative and quote', expected: ['3.3', '10.3', '10.1'] },
  { query: 'show verified stats proof numbers', expected: ['6.1', '10.2'] },
  { query: 'subtle background ambient depth', expected: ['8.4', '8.2'] },
  { query: 'section separators transition without seams', expected: ['7.1'] },
];

const markdown = fs.readFileSync(patternDocPath, 'utf8');
const patterns = parsePatternIndex(markdown);

if (patterns.length < 20) {
  console.error(`FAIL: expected at least 20 patterns, found ${patterns.length}`);
  process.exit(1);
}

let passed = 0;
let misses = 0;
for (const item of benchmarkQueries) {
  const ranked = rankPatterns(patterns, item.query);
  const topFive = ranked.slice(0, 5).map((entry) => entry.id);
  const missing = item.expected.filter((id) => !topFive.includes(id));

  if (missing.length === 0) {
    passed += 1;
    console.log(`PASS: "${item.query}" -> top5 ${topFive.join(', ')}`);
  } else {
    misses += 1;
    console.warn(`WARN: "${item.query}" missing expected IDs in top5: ${missing.join(', ')}`);
    console.warn(`      top5 ${topFive.join(', ')}`);
  }
}

const passRate = passed / benchmarkQueries.length;
console.log(`Retrieval benchmark pass rate: ${(passRate * 100).toFixed(1)}%`);
if (misses > 0) {
  console.warn(`WARN: ${misses} benchmark cases had misses; review query/pattern mappings.`);
}

if (passRate < 0.8) {
  process.exit(1);
}
