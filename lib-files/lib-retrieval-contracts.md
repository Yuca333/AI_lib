# Retrieval Contracts v1.0
**Purpose:** Machine-facing contract reference for query patterns, ranked retrieval, and deterministic integration workflows.

---

## Endpoints

- `/api/llm/index`
- `/api/llm/patterns`
- `/api/llm/patterns/[id]`
- `/api/llm/playbooks`
- `/api/llm/playbooks/[slug]`
- `/api/llm/references`
- `/api/llm/references/[id]`
- `/api/llm/search`
- `/api/llm/contracts`

---

## Canonical Identifier Contract

Every pattern has:

1. Human ID: `1.4`
2. Canonical ID: `patlib.pattern.1.4`
3. Canonical URL: `/library/1.4`

Pattern detail endpoint must resolve all supported identifier forms where possible.

---

## Query Contract

### Pattern Queries
- `q`: free-text intent query.
- `mode`: `prompt` or `code`.
- `industry`: vertical keyword.
- `category`: category keyword.
- `tag`: repeatable/comma-separated taxonomy tags.
- `limit`: bounded integer.

### Playbook Queries
- `q`, `industry`, `mode`, `limit`.

### Reference Queries
- `q`, `mode`, `limit`.

### Unified Search
- `q`, `scope` (`all|patterns|playbooks|references`), `mode`, `industry`, `category`, `tag`, `limit`.

---

## Ranking Contract

Ranking should reward:

1. Name/title match.
2. Intent/tag overlap.
3. Industry alignment.
4. Description/summary relevance.
5. Filter-specific boosts.

Ranking should penalize:

1. Experimental patterns (small penalty).
2. Mismatched industry filters.

---

## Structured Output Contract

### Pattern Summary
- `id`
- `canonicalId`
- `slug`
- `name`
- `category`
- `description`
- `taxonomy`
- `href`

### Pattern Detail
- `modes.prompt.pack`
- `modes.code.pack`
- `agentContract` with:
  - `whenToUse`
  - `avoidWhen`
  - `fallbackPatternIds`
  - `compatibility`

### Playbook Detail
- `modes.prompt.pack`
- `modes.code.pack`
- `recommendedPatterns[]`
- `references[]`

### Reference Detail
- `sections[]` with `mode` classification.

---

## Deterministic Retrieval Workflow

1. Call `/api/llm/search` with the user request.
2. Resolve top pattern candidates with `/api/llm/patterns/[id]`.
3. Resolve top playbook candidate with `/api/llm/playbooks/[slug]`.
4. Resolve policy references with `/api/llm/references/[id]`.
5. Generate output only after all required contracts are loaded.

---

## Error Contract

- Error responses must include:
  - `error` (string)
  - `meta` object with schema/content version fields

Use clear status codes:
- `404`: missing identifier.
- `500`: processing failure.

---

## Backward Compatibility

- Existing high-level fields remain available.
- New contract fields are additive.
- Unknown fields can be ignored by legacy clients safely.
