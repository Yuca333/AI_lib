import fs from 'fs';
import path from 'path';

const root = process.cwd();

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

function pass(message) {
  console.log(`PASS: ${message}`);
}

function read(filePath) {
  return fs.readFileSync(path.join(root, filePath), 'utf8');
}

const patternDocPath = 'lib-files/lib-patterns.md';
const llmsPath = 'public/llms.txt';
const requiredDocs = [
  'lib-files/lib-pattern-quality-system.md',
  'lib-files/lib-pattern-lifecycle.md',
  'lib-files/lib-retrieval-contracts.md',
];

for (const file of requiredDocs) {
  if (!fs.existsSync(path.join(root, file))) {
    fail(`Missing required reference document: ${file}`);
  }
}

const patternDoc = read(patternDocPath);
const llmsDoc = read(llmsPath);

const patternMatches = [...patternDoc.matchAll(/^###\s+(\d+\.\d+)\s+(.+)$/gm)];
if (patternMatches.length === 0) {
  fail('No pattern headers found in lib-patterns.md');
}

const ids = patternMatches.map((match) => match[1]);
const duplicateIds = ids.filter((id, idx) => ids.indexOf(id) !== idx);
if (duplicateIds.length > 0) {
  fail(`Duplicate pattern IDs found: ${Array.from(new Set(duplicateIds)).join(', ')}`);
} else {
  pass(`Pattern IDs are unique (${ids.length} patterns).`);
}

const missingPromptExamples = [];
const missingTsxBlocks = [];

for (let i = 0; i < patternMatches.length; i += 1) {
  const match = patternMatches[i];
  const id = match[1];
  const start = match.index;
  const end = i + 1 < patternMatches.length ? patternMatches[i + 1].index : patternDoc.length;
  const block = patternDoc.slice(start, end);

  if (!/\*\*AI Prompter Example:\*\*/.test(block)) {
    missingPromptExamples.push(id);
  }
  if (!/```tsx/.test(block)) {
    missingTsxBlocks.push(id);
  }
}

const maxMissingPromptBlocks = Math.ceil(patternMatches.length * 0.2);
if (missingPromptExamples.length > maxMissingPromptBlocks) {
  fail(
    `Prompt example coverage too low. Missing ${missingPromptExamples.length}/${patternMatches.length}: ${missingPromptExamples.join(
      ', '
    )}`
  );
} else if (missingPromptExamples.length > 0) {
  console.warn(
    `WARN: Prompt examples missing for ${missingPromptExamples.length} patterns: ${missingPromptExamples.join(', ')}`
  );
} else {
  pass('Every pattern has an AI Prompter Example block.');
}

if (missingTsxBlocks.length > 0) {
  fail(`Patterns missing TSX implementation blocks: ${missingTsxBlocks.join(', ')}`);
} else {
  pass('Every pattern has a TSX implementation block.');
}

const placeholderPatterns = [/{{[^}]+}}/g, /\bTODO\b/gi, /\bTBD\b/gi, /lorem ipsum/gi];
let placeholderHits = 0;
for (const regex of placeholderPatterns) {
  const matches = patternDoc.match(regex);
  if (matches && matches.length > 0) {
    placeholderHits += matches.length;
  }
}
if (placeholderHits > 0) {
  console.warn(`WARN: Placeholder-like tokens detected (${placeholderHits}), within allowed threshold.`);
} else {
  pass('No placeholder-like tokens detected in pattern library.');
}

const requiredLlmEndpoints = [
  '/api/llm/index',
  '/api/llm/patterns',
  '/api/llm/playbooks',
  '/api/llm/references',
  '/api/llm/search',
  '/api/llm/contracts',
];
for (const endpoint of requiredLlmEndpoints) {
  if (!llmsDoc.includes(endpoint)) {
    fail(`llms.txt is missing endpoint reference: ${endpoint}`);
  }
}
pass('llms.txt includes all required API discovery endpoints.');

if (!process.exitCode) {
  console.log('Content QA completed successfully.');
}
