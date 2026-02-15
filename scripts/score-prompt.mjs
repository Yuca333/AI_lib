import fs from 'fs';
import path from 'path';

function readInput() {
  const filePath = process.argv[2];
  if (filePath) {
    const absolute = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
    return fs.readFileSync(absolute, 'utf8');
  }

  if (!process.stdin.isTTY) {
    return fs.readFileSync(0, 'utf8');
  }

  console.error('Usage: node scripts/score-prompt.mjs <prompt-file.md>');
  process.exit(1);
}

function countMatches(text, regex) {
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

function scorePrompt(text) {
  const lower = text.toLowerCase();
  const words = text.split(/\s+/).filter(Boolean).length;
  const lines = text.split('\n').length;

  let score = 0;
  const checks = [];

  if (words >= 120 && words <= 900) {
    score += 20;
    checks.push('word-range');
  }
  if (lines >= 20) {
    score += 8;
    checks.push('line-density');
  }
  if (/(context|audience|objective)/i.test(text)) {
    score += 14;
    checks.push('context-block');
  }
  if (/(constraint|must|avoid|do not)/i.test(text)) {
    score += 14;
    checks.push('constraints');
  }
  if (/(quality check|acceptance|verify|checklist)/i.test(text)) {
    score += 14;
    checks.push('quality-gate');
  }
  if (/(fallback|if .* fail|failure handling|degrade)/i.test(text)) {
    score += 14;
    checks.push('failure-handling');
  }
  if (/(output|return|deliverable)/i.test(text)) {
    score += 8;
    checks.push('output-contract');
  }

  const weakWords = ['clean', 'modern', 'professional', 'simple', 'best practices'];
  const weakWordHits = weakWords.reduce(
    (acc, word) => acc + countMatches(lower, new RegExp(`\\b${word}\\b`, 'g')),
    0
  );
  if (weakWordHits === 0) {
    score += 8;
    checks.push('low-vagueness');
  } else {
    score -= Math.min(weakWordHits * 2, 12);
  }

  score = Math.max(0, Math.min(100, score));

  return {
    score,
    checks,
    diagnostics: {
      words,
      lines,
      weakWordHits,
    },
    pass: score >= 70,
  };
}

const promptText = readInput();
const result = scorePrompt(promptText);

console.log(JSON.stringify(result, null, 2));

if (!result.pass) {
  process.exit(1);
}
