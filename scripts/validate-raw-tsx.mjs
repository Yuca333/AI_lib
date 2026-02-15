import fs from 'fs';
import path from 'path';
import ts from 'typescript';

const root = process.cwd();
const patternDocPath = path.join(root, 'lib-files/lib-patterns.md');
const markdown = fs.readFileSync(patternDocPath, 'utf8');

function parseRawPatternTsx(content) {
  const lines = content.split('\n');
  const patternHeaderRegex = /^###\s+(\d+\.\d+)\s+(.+)$/;
  const fenceStartRegex = /^```([a-zA-Z0-9_-]+)?\s*$/;
  const jsLike = new Set(['tsx', 'typescript', 'jsx', 'javascript']);

  const patterns = [];
  let current = null;
  let inFence = false;
  let fenceLang = '';
  let fenceBuffer = [];

  function flushFence() {
    if (!current) return;
    if (current.code) return;
    if (!jsLike.has(fenceLang)) return;
    current.code = fenceBuffer.join('\n');
  }

  function flushPattern() {
    if (!current) return;
    patterns.push(current);
  }

  for (const line of lines) {
    const header = line.match(patternHeaderRegex);
    if (header) {
      if (inFence) {
        flushFence();
        inFence = false;
        fenceLang = '';
        fenceBuffer = [];
      }
      flushPattern();
      current = {
        id: header[1].trim(),
        name: header[2].trim(),
        code: '',
      };
      continue;
    }

    if (!current) continue;

    if (inFence) {
      if (line.trim() === '```') {
        flushFence();
        inFence = false;
        fenceLang = '';
        fenceBuffer = [];
      } else {
        fenceBuffer.push(line.replace(/\r$/, ''));
      }
      continue;
    }

    const fenceStart = line.trim().match(fenceStartRegex);
    if (!fenceStart) continue;
    inFence = true;
    fenceLang = (fenceStart[1] || '').toLowerCase();
    fenceBuffer = [];
  }

  if (inFence) {
    flushFence();
  }
  flushPattern();
  return patterns;
}

function formatDiagnostic(diagnostic, sourceFile) {
  const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
  if (!diagnostic.start || !sourceFile) return message;
  const position = sourceFile.getLineAndCharacterOfPosition(diagnostic.start);
  return `L${position.line + 1}:C${position.character + 1} ${message}`;
}

const patterns = parseRawPatternTsx(markdown);
const failures = [];

for (const pattern of patterns) {
  if (!pattern.code || pattern.code.trim().length === 0) {
    failures.push(`${pattern.id} ${pattern.name}: missing TSX skeleton`);
    continue;
  }

  const sourceFile = ts.createSourceFile(
    `${pattern.id}.tsx`,
    pattern.code,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );

  const parseDiagnostics = sourceFile.parseDiagnostics || [];
  if (parseDiagnostics.length > 0) {
    const messages = parseDiagnostics.map((diagnostic) => formatDiagnostic(diagnostic, sourceFile));
    failures.push(`${pattern.id} ${pattern.name}: parse diagnostics\n  - ${messages.join('\n  - ')}`);
    continue;
  }

  const transpile = ts.transpileModule(pattern.code, {
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
    },
    fileName: `${pattern.id}.tsx`,
    reportDiagnostics: true,
  });

  const transpileDiagnostics = transpile.diagnostics || [];
  if (transpileDiagnostics.length > 0) {
    const messages = transpileDiagnostics.map((diagnostic) => formatDiagnostic(diagnostic, sourceFile));
    failures.push(`${pattern.id} ${pattern.name}: transpile diagnostics\n  - ${messages.join('\n  - ')}`);
  }
}

if (failures.length > 0) {
  console.error('FAIL: Raw TSX validation failed.');
  for (const failure of failures) {
    console.error(`\n${failure}`);
  }
  process.exit(1);
}

console.log(`PASS: Raw TSX validation passed for ${patterns.length} patterns.`);

