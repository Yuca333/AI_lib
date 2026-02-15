# Pattern Lifecycle & Deprecation Policy v1.0
**Purpose:** Stable versioning, freshness, and deprecation behavior for pattern retrieval APIs.

---

## Versioning Model

### 1) Library Versions
- `schemaVersion`: API response contract version.
- `contentVersion`: content set version for patterns/playbooks/references.
- `taxonomyVersion`: canonical taxonomy mapping version.

### 2) Compatibility Rule
- Additive changes are preferred.
- Existing response keys must remain unless explicitly deprecated.
- New clients should use canonical IDs (`patlib.pattern.<id>`).
- Legacy clients may continue using numeric IDs (`1.4`, `10.2`).

---

## Pattern Status States

### `active`
- Recommended for production.
- Included in ranking by default.

### `experimental`
- Supported but lower confidence for generic use.
- Should include explicit fallback instructions.
- Ranking should apply a slight score penalty.

### `deprecated`
- Available for backward compatibility only.
- Must include replacement guidance in API output.
- Excluded from default recommendations unless explicitly requested.

---

## Deprecation Process

1. Mark pattern as `deprecated` with replacement candidate(s).
2. Keep endpoint readable for at least one minor content cycle.
3. Add deprecation note in:
   - API detail response
   - `llms.txt` data notes
   - reference docs changelog section
4. Remove only in next major schema version after notice period.

---

## Freshness Strategy

### Source Freshness
- Track `contentDigest` derived from `lib-files/*.md` metadata.
- Expose `indexedAt` timestamp in all LLM API responses.
- Use cache headers with stale-while-revalidate behavior.

### Refresh Cadence
- Default: daily or on content change.
- Trigger immediate refresh when:
  - prompt templates are updated
  - pattern taxonomy is changed
  - playbook recommendations are modified

---

## Caching Policy

- Public API cache target: `s-maxage=3600`.
- Allow stale serving while async revalidation runs.
- Cache keys must include filter params (`q`, `mode`, `industry`, etc.).
- ETag should reflect content digest to avoid unnecessary transfers.

---

## Change Categories

### Patch (safe additive)
- Typos, copy refinement, metadata enhancements.
- No breaking field removals.

### Minor (feature additive)
- New patterns, new references, new optional response fields.
- Existing contracts remain valid.

### Major (breaking)
- Field removals/renames or semantic meaning changes.
- Requires schema version increment and migration notes.

---

## Validation Requirements Before Release

- `lint` passes.
- `build` passes.
- Content QA checks pass (placeholder and contract checks).
- Retrieval evaluation pass rate meets threshold.

---

## Agent Guidance

Agents should:
1. Read `meta.schemaVersion` + `meta.contentVersion`.
2. Prefer canonical IDs and `canonicalUrl`.
3. Respect `status` and fallback recommendations.
4. Re-check index metadata when cached data becomes stale.
