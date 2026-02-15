# Pat Lib Online

LLM-first web design and pattern library built with Next.js App Router.

## Core Goals

- Expose UI patterns in two modes:
  - Prompt mode (for AI prompt generation)
  - Code mode (for direct implementation)
- Index all `lib-files/*` references for retrieval by humans and LLMs.
- Provide industry playbooks (for example: dentist landing page) with recommended pattern stacks.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Main Routes

- `/library` - pattern catalog and pattern detail pages
- `/playbooks` - industry playbooks with prompt/code tabs
- `/reference` - indexed guide docs sourced from `/lib-files`
- `/llm` - machine-consumption entry page

## LLM API

- `/api/llm/index`
- `/api/llm/patterns`
- `/api/llm/patterns/[id]`
- `/api/llm/playbooks`
- `/api/llm/playbooks/[slug]`
- `/api/llm/references`
- `/api/llm/references/[id]`

## Content Sources

- Pattern definitions: `lib-files/lib-patterns.md`
- Rule and guidance docs: `lib-files/*.md`

The parser and knowledge layer live in:

- `src/lib/pattern-parser.ts`
- `src/lib/library-knowledge.ts`
