# lib-power-quality.md — Prompt Quality Heuristics (Internal)

This document is **internal**: it guides how you write prompts. Do not paste it into Lovable prompts.

## 1) What "High Quality" Looks Like
A great Lovable prompt reads like a build brief:
1) Visual anchor (metaphor + motif)
2) Clear one-page section plan
3) Media wiring (exact URLs + slots)
4) Copy blocks (ready-to-use)
5) Key behaviors (anchors, dialogs, CTAs)
6) 3–5 acceptance checks (observable)

### Skill-informed quality lens (internal)
- **`ui-ux-pro-max` lens:** hierarchy, spacing rhythm, accessibility, responsive sanity.
- **`copywriting` lens:** clarity, conversion logic, truthful claims, friction-reducing CTA language.
- **`frontend-design` lens (Prompt A):** memorable but cohesive visual direction.
- **`responsive-design` lens:** fluid type/spacing, component-level adaptation, and responsive media delivery.

**Character Targets:**
- Prompt A: 20,000-30,000 characters (3,000-3,600 words)
- Prompt B: 20,000-30,000 characters (3,000-3,600 words)

### Opening Leverage (Critical)
- Treat the first 20 lines (roughly first 600 words) as the highest-weight block.
- Front-load: identity, visual anchor, art-direction commitment, HSL token lock, focal budget, material model.
- If these appear late, visual quality drops toward safe defaults.

### Adherence Ceilings
- Prompt A quality often drops beyond ~3,800 words.
- Prompt B quality often drops beyond ~3,800 words.
- If approaching ceiling, compress prose before adding new directives.

### Focal + Motion Budgets (Default)
- **Focal budget:** dominant 60% / secondary 25% / support 15%.
- **Motion budget:** hero max 3 animated elements, mid-sections max 2, page max 8-10.
- If either budget is violated, downgrade supporting sections first.

## 2) Anti‑Bloat Rules
Remove:
- word-count talk, "hard gates," meta governance, "Lovable can/can't"
- long policy checklists
- redundant "use React/Tailwind…" unless it materially affects design

Keep:
- concrete placement instructions ("use this image here with this caption")
- disciplined visual locks (motif, card language, accent discipline)
- short, testable acceptance checks
- **skeletons for chosen high‑risk patterns only** (adds density without filler)

### Hard Rule Ceiling
- Keep opening hard `MUST` lines to **8 or fewer**.
- Beyond 8, compliance drops and lower-priority rules are ignored.

## 3) Benchmarks (Inspiration, Not Copy)
Use gold prompts as **shape targets**:
- Tight opening: visual anchor + conversion goal within 10 lines
- Section specs are scannable: titles, bullets, CTAs
- Media wiring is explicit and minimal
- No internal meta in the deliverable

Never:
- paste benchmark text
- reference benchmark filenames inside the prompt output

## 4) Common Failure Modes + Fixes
- **Meta leakage:** Templates must separate INTERNAL notes from PROMPT_BODY. Output only PROMPT_BODY.
- **Generic vibe:** force metaphor + motif + signature moment + caption system.
- **Missing trust:** add proof artifacts (certificate), process clarity, and real photos with captions.
- **Over-motion:** pick one signature moment; everything else calm.
- **Claim inflation:** remove numbers/superlatives; use structure + artifacts.
- **Boring gallery:** apply postcard treatment (caption chips, hover zoom, consistent framing).
- **Layout issues:** include layout verification checklist in prompts.

### Vocabulary Drift (Prompt Wording Risk)
- Avoid vague-safe anchors: `clean`, `simple`, `modern`, `professional`, `user-friendly`.
- Prefer premium trigger words: `considered`, `refined`, `editorial pacing`, `tactile`, `museum-quality`, `signature moment`.

## 5) Quick "Screenshot Tests"
Ask yourself (internally):
- Is the first mobile screen actionable (CTA visible)?
- Does every photo have a caption?
- Can a buyer decide "yes/no" within 15 seconds?
- Are CTAs repeated at sensible points?
- Does reduced-motion still communicate everything?
- If ambient depth is used, is it clearly visible (not washed out)?
- If an emphasis card is used, does it OBVIOUSLY stand out?
- Do headings/spacing scale fluidly and avoid breakpoint jumps?
- Are large media assets responsive (no oversized mobile payload)?
- Does the page feel premium-but-controlled (not flat, not noisy)?

## 5.1) Effect Balance Test (Must Pass)
- One dominant wow area is obvious.
- Secondary wow is optional and restrained.
- Micro-interactions stay limited and purposeful.
- Decorative effects never reduce readability or trust cues.
- If uncertain, downgrade effect intensity one level.

## 6) Prompt B Empowerment

Prompt B must ENHANCE, not just patch. Empower Lovable to:

**Analyze and improve autonomously:**
- Identify visual depth opportunities (add gradients, overlays)
- Elevate typography (pull quotes, text hierarchy)
- Polish interactions (stagger, underline sweep, press states)
- Fix layout rhythm (awkward gaps, alignment issues)
- Enhance galleries (postcard treatment, caption chips)

**Decision framework for autonomous changes:**
1. Will this enhance UX without breaking functionality? → Do it
2. Is this consistent with the design system? → Do it
3. Does this add visual interest without clutter? → Do it
4. Could this distract from primary content? → Skip it

## 7) Pattern Visibility Hierarchy (If Used)

Patterns must be VISIBLE to work **only when they are chosen**:

| Pattern | Minimum Visibility |
|---------|-------------------|
| AmbientBlobs | 35-45% opacity (25% is often invisible) |
| CTA Emphasis | Visible contrast or glow (if glow, 40px spread at 0.4 opacity) |
| Emphasis Card | scale-[1.05], border-[3px], shadow-2xl |
| Proof Module | text-5xl minimum **or** clear contrast + spacing |

**Escalation rule:** If a chosen pattern is too subtle after first build, AGGRESSIVELY escalate in Prompt B.

## 8) AI Misinterpretation Risk Checks
- Are optional instructions paired with a default behavior?
- Any conflicting transition/separator guidance?
- Any chance sticky header overlaps initial hero content?
- Any chance effect stacking causes visual clutter in one viewport?
- Are reduced-motion and image-fallback paths explicit and testable?

## 9) Premium Quality Rubric (Internal Scoring)

| Criterion | Weight | Low-score symptom |
|---------|--------|-------------------|
| Focal hierarchy clarity | 25% | Every section feels equally loud |
| Color system integrity | 15% | Token drift to arbitrary colors |
| Typography drama/control | 15% | Flat type scale, weak emphasis |
| Motion intentionality | 15% | Animation soup or dead page |
| Asymmetric composition quality | 10% | Repetitive 50/50 blocks |
| Material consistency | 10% | Mixed depth/lighting languages |
| Mobile containment reliability | 10% | Overflow/clipping at phone widths |

Pass bar for "$5k custom feel":
- Focal hierarchy >= 8/10
- Motion intentionality >= 8/10
- Mobile containment failures = 0

## 10) 9+ Score Gate (Deterministic)
To qualify as 9+ quality, all checks below must pass:

- Word/char gate:
  - Prompt A: 3,000-3,600 words and <=30,000 chars
  - Prompt B: 3,000-3,600 words and <=30,000 chars
- Placeholder gate: unresolved `{{...}}` count = 0 in generated prompts.
- Contradiction gate: conflicting directives count = 0 (for example "do not change tokens" + "retune hues").
- Validity gate: known invalid utility classes count = 0 (for example `border-3`).
- Duplication gate: no duplicated policy lines in the same prompt section.
- Integrity gate: unknown facts are marked as `unknown`; invented fact findings = 0.

Scoring recommendation:
- Any failed deterministic gate caps final score at 8.4.
- 9.0+ requires all deterministic gates plus visual rubric >= 9 average.
