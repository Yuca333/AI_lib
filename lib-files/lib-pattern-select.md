# lib-pattern-select.md
**Version:** 7.0  
**Purpose:** Pattern selection guide + reliability matrix for AI Prompter.

---

## ⚠️ INTERNAL REFERENCE ONLY

**This file helps AI Prompter SELECT patterns — NOT output code to prompts.**

---

## PATTERN RELIABILITY MATRIX (Critical — Use This First)

**Note:** This matrix tells you *how* to implement a pattern **if chosen**. It does **not** mean the pattern is required.

| Pattern | Reliability | Skeleton In Prompt? | Lines |
|---------|-------------|---------------------|-------|
| FlipWords | ⭐⭐⭐ | **YES** — sentence-final position critical | 15 |
| AmbientBlobs | ⭐⭐⭐ | **YES** + CSS keyframes | 10 |
| AnimatedCounter | ⭐⭐⭐ | **YES** — scroll trigger required | 15 |
| SectionTransition | ⭐⭐⭐ | **YES** + SECTION_COLORS object | 8 |
| CTAWithGlow | ⭐⭐⭐ | No — classes only | 0 |
| FeaturedCard | ⭐⭐⭐ | No — classes only | 0 |
| StatStrip | ⭐⭐⭐ | No — classes only | 0 |
| InteractiveSelector | ⭐⭐ | **MUST** — flex-[4]/[1] logic | 30 |
| ExpandableGallery | ⭐⭐ | **MUST** — keyboard nav | 25 |
| SpotlightCard | ⭐⭐ | **MUST** — pointer tracking | 15 |
| ScrollStack | ⭐⭐ | **MUST** — sticky approach ONLY, no useScroll | 35 |
| ProcessSteps | ⭐⭐⭐ | No — CSS grid only | 0 |
| MagneticText | ⭐ | **AVOID** — 70%+ failure rate | N/A |

**Rule:** ⭐⭐⭐ patterns work from intent. ⭐⭐ patterns MUST include full skeleton.

---

## PATTERN SELECTION PROCESS (REQUIRED)

Before you choose patterns, **think, compare, then decide**:
1. **Derive design DNA** (adjectives, tension, motif) from PRD/JSON.
2. **Run a quick ui-ux-pro-max style check** (internal) to validate tone, accessibility, and performance risks.
3. **Audit content reality**: image quantity/quality, data/proof availability, narrative complexity, conversion goal.
4. **Draft 2–3 candidate stacks** (distinct hero patterns + different support patterns).
5. **Choose ONE stack** that best supports clarity + conversion + visual identity.
6. **Bias check:** If your choice matches the "default stack" (DicedHero + FlipWords + AmbientBlobs + StatStrip), keep it **only** if you can cite **2+ concrete business-fit reasons** (asset reality + tone + conversion). Otherwise, swap at least one major pattern family (hero, text, or proof).
7. **Record alternatives:** Note the top rejected stack and *why* it lost (1–2 lines). This forces intent-driven selection.

You are optimizing for **business fit**, not pattern reuse.

## STYLE & RISK GATE (ui-ux-pro-max)

Run a quick style check before locking patterns:
- **Choose a style direction** that matches the business intent (e.g., Social‑Proof Focused for services, Accessible & Ethical for medical, Editorial Craft for hospitality with strong imagery).
- **Check risk flags**: if a style suggests heavy glass/blur or low contrast (e.g., Liquid Glass), only use it if the business explicitly benefits **and** you can preserve accessibility/performance. Otherwise, downgrade to a safer style.
- **Social‑proof cue (services):** prioritize testimonials/logos/process proof if trust is the conversion bottleneck.
- **Medical/clinical cue:** prefer accessible, high‑contrast, low‑motion styling; avoid playful gradient schemes.
- **Anti‑pattern check**: avoid hidden contact info, complex booking, or weak imagery in hospitality — these consistently reduce trust.

**Output requirement (internal):** note the chosen style + one risk mitigation before selecting patterns.

## MINIMUM VISUAL GUARANTEES (Every Foundation Build)

Every Prompt A MUST include:
1. **ONE hero pattern** (chosen for business fit) with skeleton.
2. **ONE primary emphasis system**:
   - Animated text **OR**
   - Typographic emphasis (no text animation) **OR**
   - Image-led hero composition.
   If animated text is used, it MUST be sentence-final and singular (no stacking).
3. **ONE depth system** (AmbientBlobs / AuroraBackground / Texture) **OR** explicit rationale for a flat, no-ambient design.
4. **ONE proof module** (StatStrip / AnimatedCounter / Testimonial / TrustBadges) **only if facts exist**. If not, use safe-copy proof without numbers.
5. **ONE signature moment** (interactive or narrative) with 15–30 line skeleton from lib-implementation-blocks.md.
6. **Transitions are optional**: use only if they improve pacing. If used, single family, max 2.

If any required guarantee is missing → add it before outputting the prompt.

**Default-stack guardrail:** If your chosen stack uses **3+** of these {DicedHero, FlipWords, AmbientBlobs, StatStrip, ExpandableGallery}, you MUST justify why each one is the best fit **and** name one viable alternative you rejected. If you cannot justify them, replace at least one major family.

---
- Copy file paths into prompts
- Reference this file in prompts ("see lib-pattern-select.md")
- Include score values in prompts (scores are for YOUR selection only)
- Dump full component code into prompts

DO:
- Use this to choose appropriate patterns for business type
- Use the INLINE/COMPONENT prompt formats defined in `lib-core-rules.md` (paraphrase the pattern library “AI Prompter Example” blocks; never copy file paths or full TSX)
- Include Visual Signatures (10-15 lines) for COMPONENT patterns
- Specify pattern purpose and placement

## Lovable Execution Notes (v12)

Keep prompts **art-directed, not assembled**. Use these constraints to improve compliance:

- **MUST rules:** use **6–8** true MUSTs total; put them in the prompt opening (VISUAL FOUNDATION).
- **Code blocks:** **8–12** per prompt (max ~15). Too many fragments attention.
- **Code lines:** target ≤150; hard max ~180. Prefer 10–30 line **skeletons**.
- **Prefer positive constraints:** “Prefer X” beats “Don’t do Y”. Put any “Avoid” items early if needed.
- **Parallax:** prefer Framer Motion `useScroll + useTransform` (hero only or hero + 1 section). Avoid `background-attachment: fixed`.

### Patterns that REQUIRE a Skeleton (minimum size)

| Pattern | Minimum skeleton size | Why |
|---|---:|---|
| SpotlightCard | 15–20 lines | needs `onPointerMove` + CSS vars |
| InteractiveSelector / ExpandingCards | 25–30 lines | needs flex expansion logic + state |
| ExpandableGallery (lightbox) | 20–25 lines | needs ESC + focus return + keyboard |
| ScrollStack | 20–25 lines | sticky math is easy to break |
| AnimatedCounter | 12–15 lines | needs inView trigger + counting |

**Rule:** If you pick one of the patterns above, you MUST include the corresponding skeleton (from `lib-implementation-blocks.md`) in Prompt A.

---

### INLINE vs COMPONENT (Prompting)

- **COMPONENT**: reusable UI unit with props + structure + interaction (hero, cards, gallery, counters, timelines).
- **INLINE**: styling/ambient/transition utility embedded inside sections (blobs/ambient overlays/transitions).


---

## HIGH-RISK PATTERNS WARNING

### CutoutHero — CONDITIONAL USE ONLY ⚠️

**Risk Level:** HIGH — AI image generators cannot guarantee exact hex color matching.
**Visible Symptom:** Color seam/halo around cutout subject where hero bg and image bg don't match.

**When to USE CutoutHero:**
- ✅ User provides REAL professional product photo with transparent/white background
- ✅ Subject has clean edges that can be masked (bottles, electronics, packaged goods)
- ✅ PRD explicitly requests "floating product" or "cutout" visual

**When to AVOID CutoutHero:**
- ❌ AI-generated cutout images (background color matching is UNRELIABLE)
- ❌ Subjects with fuzzy edges (animals with fur, people with hair, plants, food with steam)
- ❌ No specific visual requirement in PRD for floating/cutout effect

**Preferred Alternatives (Lower Risk):**
| Instead of CutoutHero | Use | Why |
|----------------------|-----|-----|
| Food/Restaurant | **DicedHero** | 4-image grid, no background matching needed |
| Service/Trust | **DiagonalSplitHero** | Clean split, image/context balance |
| Premium/Luxury | **DiagonalSplitHero** | Geometric division, images overlay boundary |

**If CutoutHero is Required:**
1. Define `--hero-solid` in HSL for CSS
2. Convert to HEX for AI prompt: `hsl(38 35% 92%)` → `#F0EAE0`
3. Use EXACT HEX in AI prompt: `"on solid #F0EAE0 background"`
4. Include mandatory negatives: `"gradient background, vignette, color falloff, paper texture"`
5. Request 12-18% margin around subject (not edge-to-edge)

---

## PATTERN FIT HEURISTICS (Use These, Not Defaults)

Choose patterns based on **content + intent**, not business label:

### Hero Selection Cues
- **Image-rich (4+ strong photos):** DicedHero or PlaceCard-based hero can work.
- **Trust-critical / service clarity:** DiagonalSplitHero or typography-led hero keeps focus on promise.
- **Premium / atmospheric:** MeshGradientHero or AuroraBackground with restrained motion.
- **Product cutout available:** CutoutHero only if real cutout-friendly imagery exists; otherwise avoid.
- **Limited images:** Use text-forward hero + one strong ambient system; avoid image grids.

### Proof Module Cues
- **Concrete numbers:** StatStrip or AnimatedCounter.
- **Narrative trust:** TestimonialCarousel or ScrollStack.
- **Credentials:** TrustBadges / Certifications row.

### Interaction Cues
- **Compare options:** InteractiveSelector / ExpandableTabs.
- **Compare options:** InteractiveSelector / ExpandableTabs.
- **Process/story:** ScrollStack (5+ steps) OR ProcessSteps (3-5 steps).
- **Gallery-first:** ExpandableGallery (only if photos are strong and abundant).

**Decision Rule for Process:**
- IF process has <= 5 steps AND no scroll-driven narrative is required:
  **USE ProcessSteps (3-star, zero risk).**
- ELSE IF process has 5+ steps AND premium scroll experience is justified:
  **USE ScrollStack (2-star, requires full component install).**

**Rule:** If two patterns could work, pick the one that best expresses the **design DNA** and least resembles your recent outputs.

---

## PATTERN QUICK REFERENCE

### HERO PATTERNS (Pick ONE)

| Pattern | Best For | Energy | Mobile |
|---------|----------|--------|--------|
| **MeshGradientHero** | Tech, Premium, Bold | High | Stacked content |
| **DicedHero** | Food, Retail, Visual | Medium-High | Carousel below |
| **CutoutHero** | Food, Fashion, Products, E-commerce | Medium-High | Visual below content |
| **DiagonalSplitHero** | Medical, Legal, Financial, Services | High | Stack, images below |
| **AuroraBackground** | Wellness, Calm | Low-Medium | Reduced motion |
| **Gradient + Blobs** | Professional, Clean | Medium | Blobs hidden |

### CARD PATTERNS (Pick ONE system)

| Pattern | Best For | Interaction |
|---------|----------|-------------|
| **GlowCard** | Services, Features | Hover glow + lift |
| **PlaceCard** | Locations, Rooms | Image carousel |
| **ServiceCard** | Pricing, Services | Feature list + CTA |
| **SpotlightCard** | Desktop-focused | Mouse tracking |

### TEXT/STATS PATTERNS (Pick 1-2)

| Pattern | Best For | Where |
|---------|----------|-------|
| **FlipWords** | Headlines with variety | Hero (one word cycles) |
| **TextReveal** | Dramatic entrances | Section headings |
| **AnimatedCounter** | Stats, Proof points | Stats section |
| **StatStrip** | Quick proof | Below hero |

## TEXT EFFECT SELECTION (text-effects skill)

Pick **one** text effect (or none) based on vibe:
- **Block Reveal**: bold/editorial, high-fashion statements (map to TextReveal or custom)
- **Blur Stagger**: soft, elegant, cinematic (custom only if you can provide a short skeleton)
- **Text Loop**: dynamic, informative (roles/services)
- **FlipWords**: modern, tech‑clean emphasis
- **Scroll Reveal**: narrative/storytelling sections
- **Magnetic Text**: playful/interactable (avoid in high‑trust medical/legal)

**Rule:** If animated text is used, keep it sentence‑final and never stack multiple text systems above the fold. If using a custom effect, include a compact skeleton and reduced‑motion fallback.

### AMBIENT PATTERNS

| Pattern | Best For | Constraints |
|---------|----------|-------------|
| **AmbientBlobs** | Warmth, Depth | 25-35% opacity, 2-3 max |
| **AuroraBackground** | Hero, Full sections | One per page |
| **BackgroundTexture** | Dark themes | 8-10% opacity |

### TRANSITIONS (Pick ONE family, max 2-3 per page)

| Variant | Best For |
|---------|----------|
| **wave-organic** | Warm, Friendly (restaurants, artisan) |
| **wave-elegant** | Premium, Sophisticated (hotels, spas) |
| **wave-subtle** | Professional, Clean (medical, legal) |
| **diagonal** | Modern, Sharp (professional services) |

---

## POWER LEVEL TARGETS

| Quality Level | Score Range | Pattern Count | Requirements |
|---------------|-------------|---------------|--------------|
| Level 3 (Safe) | 10–15 | 3-4 patterns | Basic visual |
| Level 4 (Baseline) | 16–22 | 5-7 patterns | Balanced visual system |
| Level 5 (Premium) | 23–30 | 7-10 patterns | Full visual drama |

**DO NOT include scores in prompts. Use them to guide YOUR pattern selection.**

---

## BEHAVIORAL SIGNATURE FORMAT (How to Embed in Prompts)

Every pattern MUST use the Behavioral Signature format (5-7 lines):

```markdown
> Pattern: [Name]
> Behavior: [What makes it unique - core interaction/animation]
> Values: [Critical numbers - opacity, duration, blur, size]
> Trigger: [When it activates - load/scroll/hover/click]
> Mobile: [How it adapts]
```

### Example: GlowCard

**❌ WRONG (pattern name only):**
```markdown
Use GlowCard for the services section.
```
Lovable doesn't know what behavior to implement.

**❌ WRONG (full implementation block):**
```markdown
<div className="group relative bg-card rounded-xl border border-border/50 p-6 
  transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
  hover:shadow-[0_0_40px_hsl(var(--primary)/0.25)]">
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
    transition-opacity duration-300 pointer-events-none">
    <div className="absolute inset-0 blur-xl bg-primary/20 rounded-xl" />
  </div>
  {/* ... more code ... */}
</div>
```
Token waste — Lovable can write this code from the specification.

**✅ CORRECT (Behavioral Signature):**
```markdown
> Pattern: GlowCard
> Behavior: Hover reveals glow pseudo-element + card lift
> Values: Glow opacity 25-35%, blur 30-40px, lift -translate-y-1, duration-300
> Trigger: Hover (desktop)
> Mobile: Tap triggers hover state
```
This is what Lovable needs — behavior + values + trigger. 5 lines, complete.

### Example: ExpandableGallery

**❌ WRONG:**
```markdown
Create ExpandableGallery component.
```

**✅ CORRECT:**
```markdown
> Pattern: ExpandableGallery
> Behavior: Click image opens full-screen lightbox modal with arrow navigation
> Values: Thumbnail hover scale(1.05), lightbox bg-black/90, ESC to close
> Trigger: Click (user-initiated)
> Mobile: 2-column grid, same lightbox with swipe optional
```

### Example: FlipWords

**❌ WRONG (pattern name only):**
```markdown
Add FlipWords to headline.
```

**❌ WRONG (mid-sentence position):**
```markdown
> Pattern: FlipWords
> Sentence: "Mosel-Terroir, das {FlipWords} bleibt."
```
**Problem:** FlipWords is NOT at sentence-final position — causes grammar/reading issues.

**✅ CORRECT (sentence-final position):**
```markdown
> Pattern: FlipWords
> Behavior: Word cycles with y-axis flip animation at SENTENCE-FINAL position
> Sentence: "Terroir, das bleibt: {FlipWords}." — word is LAST
> Values: Words ["klar", "mineralisch", "herzlich"], interval 3s, text-primary
> Trigger: Load (continuous timer)
> Mobile: Same behavior

⚠️ POSITION CHECK: FlipWords appears AFTER colon, making it sentence-final ✓
```

### Example: CutoutHero (AI Image Integration)

**❌ WRONG (pattern name only):**
```markdown
Use CutoutHero for the hero section.
```

**❌ WRONG (missing color coordination):**
```markdown
> Pattern: CutoutHero
> Use AI image of poke bowls
```

**✅ CORRECT (includes AI coordination):**
```markdown
> Pattern: CutoutHero
> Behavior: Split layout with color-matched AI cutout image
> Values: Hero bg #E54D2E = AI image bg #E54D2E, 2 accent shapes at 60-80% opacity
> Trigger: Load (content + image fade in staggered)
> Mobile: Stack, content first

AI Image Coordination (CRITICAL):
- Background: solid #E54D2E - MUST MATCH hero exactly
- Subject: Three poke bowls in floating composition
- Style: food photography, studio lighting, centered with negative space
- Negative: white bg, gradient, table, surface, pattern
- Ratio: 1:1
```

### Example: DiagonalSplitHero (Text Readability Focus)

**❌ WRONG (pattern name only):**
```markdown
Use DiagonalSplitHero for the hero.
```

**❌ WRONG (missing readability consideration):**
```markdown
> Pattern: DiagonalSplitHero
> Use blue and white diagonal
```

**✅ CORRECT (includes color + readability rules):**
```markdown
> Pattern: DiagonalSplitHero
> Behavior: Bold diagonal color split with product images crossing boundary
> Values: topColor #2563EB, bottomColor #FFFFFF, variant diagonal-right
> Trigger: Load (content fade in, images stagger)
> Mobile: Stack, images below content

Color & Readability (CRITICAL):
- topColor: #2563EB (dark blue)
- bottomColor: #FFFFFF (white)
- textColorClass: text-white (because topColor is dark)
- All text positioned on solid topColor zone
- Product images cross the diagonal with shadow-2xl
```

### For COMPONENT Patterns

Use Behavioral Signature PLUS Visual Signature (10-15 lines total):

```markdown
### DicedHero — Behavioral Signature

> Pattern: DicedHero
> Behavior: Split layout with image carousel on right, content on left
> Values: 4+ images, auto-rotate 4s, dot navigation, staggered image entrance
> Trigger: Load (auto-advance timer)
> Mobile: Stack, carousel below content

**Visual Signature (additional):**
Core: min-h-[90vh] grid lg:grid-cols-2 gap-8
Left: Badge + headline + description + CTAs + proof module (if used)
Right: 2×2 image grid with rounded corners
Nav: Dots below images
```

---

## COMPATIBILITY RULES

### ✅ Compatible Combinations

- MeshGradient + GlowCard + AmbientBlobs (high-energy stack)
- AuroraBackground + wave-elegant (both calm)
- DicedHero + PlaceCard + FeaturedCard (visual-heavy)
- AnimatedCounter + ServiceCard (complementary)
- FlipWords + Blobs (both dynamic)

### ❌ Avoid These Combinations

- MeshGradient + AuroraBackground (competing animations)
- SpotlightCard + GlowCard in same grid (visual conflict)
- wave-dramatic + AuroraBackground (energy mismatch)
- Multiple text animations above fold (performance)
- More than 3 blob clusters (visual noise)
- More than 2-3 section transitions (rhythm disruption — HARD LIMIT)
- Mixed transition families (wave + diagonal)

---

## TRANSITION RULES (Critical)

### Family Consistency
- Pick **ONE** family for all transitions: wave-organic OR wave-elegant OR diagonal
- Never mix families within the same page
- **Maximum 2-3 transitions per page (HARD LIMIT)**

### SECTION_COLORS Requirement
Every prompt must include hardcoded HSL values with hsl() prefix for transitions:

```tsx
const SECTION_COLORS = {
  hero: "hsl(42 35% 97%)",      // ← MUST include hsl() prefix
  services: "hsl(38 18% 94%)",
  stats: "hsl(28 45% 22%)",
  footer: "hsl(28 45% 18%)",
} as const;
```

**Why?** SVG `fill` doesn't interpolate CSS variables, causing visible gaps.

**⚠️ CRITICAL FORMAT:**
- ✅ Correct: `"hsl(42 35% 97%)"` — includes hsl() prefix
- ❌ Wrong: `"42 35% 97%"` — missing hsl() prefix, causes SVG rendering issues

### Transition Specification in Prompts

```markdown
> SectionTransition fromColor={SECTION_COLORS.hero} toColor={SECTION_COLORS.services}, 
> variant="wave-organic", height 72px minimum.
```

---

## MOBILE-FIRST NOTES

### Patterns That Change on Mobile

| Pattern | Desktop | Mobile |
|---------|---------|--------|
| **DicedHero** | Split layout | Stack, carousel below |
| **SpotlightCard** | Mouse tracking | Static fallback |
| **InteractiveHoverButton** | Hover reveal | Tap to reveal |
| **AmbientBlobs** | Large (500px+) | Smaller or hidden |
| **MeshGradient** | Full animation | Reduced/static |

### Patterns That Work Same on Mobile

| Pattern | Behavior |
|---------|----------|
| **GlowCard** | Tap = hover state |
| **FlipWords** | Timer-based, works everywhere |
| **AnimatedCounter** | Scroll-triggered, works everywhere |
| **SectionTransition** | Responsive SVG, scales naturally |
| **FeaturedCard** | Maintains prominence |

---

## ANTI-PATTERNS TO AVOID

### ❌ Pattern Name Only
```markdown
Use GlowCard for the services section.
```
**Problem:** Lovable needs implementation details.

### ✅ Correct (v8 Format)
```markdown
> Create 3-column GlowCard grid. On hover: glow pseudo-element scales up 
> with blur-xl at opacity-30, card lifts with -translate-y-1. 
> Mark ONE card as FEATURED with gradient bg and floating badge.
```

### ❌ Complete JSX Dump
```markdown
<div className="group relative bg-card rounded-xl border border-border/50...
```
**Problem:** Wastes tokens, over-constrains Lovable.

### ✅ Correct
```markdown
> Card treatment: rounded-xl, border-border/40, shadow-soft
> Hover: translate-y-[-2px], shadow-lift, glow effect at 25-35% opacity
```

---

## PATTERN BUDGET BY PAGE TYPE

### Landing Page (One-page)
- Hero: 1 pattern
- Services/Features: 1-2 patterns
- About/Story: 0-1 pattern
- Stats: 1 pattern
- CTA: 1 pattern
- Transitions: 2-3 (same family, HARD LIMIT)
- **Total: 5-8 patterns**

### Multi-Page Site
- Home: Full pattern stack (7-10 patterns)
- Inner pages: Reduced (4-6 patterns each)
- Maintain consistency: same card system, same transition family
- Transitions: 2-3 maximum per page

---

## NEXT STEP

After selecting patterns using this file:
→ Pull Implementation Blocks from `lib-implementation-blocks.md`
→ Embed directly in your prompt, customizing only content values
→ Check `ex-gold.md` for the exact embedding format

**Quality benchmarks:** Compare your output against `ex-gold.md` (Foundation) and `ex-gold-prompt-b.md` (Completion).

---

## PROMPT #B EFFICIENCY RULES

**⚠️ TOKEN WASTE AVOIDANCE**

Prompt #B (refinement/completion) should NOT repeat context that Lovable already knows:

### ❌ WRONG (Wastes ~500 tokens):
```markdown
# Weingut Brunnenhof Strupp — Complete & Elevate

**Building on:** "Sunlit limestone, cool cellar air"

## CONTEXT (3 lines max)

Foundation: [HeroPattern] + [SignatureMoment] + [ProofModule] + [EmphasisTreatment]
Tokens: HSL CSS vars + SECTION_COLORS kept unchanged 
Transitions: wave-organic (2 total)
This build: Lock real photos, finalize 3 authentic AI vignettes...

### 2. Carryover Media Locklist
[repeats all 12 image URLs again]
```

**Problem:** Lovable knows the project name, knows what it just built, has the images cached.

### ✅ CORRECT (Focused ~100 tokens):
```markdown
## REFINEMENT BUILD

### FIXES:
1. Hero AI image bg → exact #F0EAE0 (convert from hsl(38 35% 92%))
2. ExpandableGallery → add lightbox (ESC, arrows, focus return)
3. Wave transition Termine→Kontakt → verify fromColor=muted, toColor=ink match

### ADDITIONS:
- Termine 2025 section: event list with date chips
- Micro-interactions: card hover lift, staggered reveals
```

### PROMPT #B STRUCTURE:
```markdown
## [BUILD TYPE] BUILD

### FIXES (only if needed):
- [Issue] → [Specific fix]

### ADDITIONS:
- [New feature] with [brief behavioral spec]

### POLISH:
- [Interaction/motion details]
```

### WHAT TO NEVER REPEAT IN PROMPT #B:
- Project name
- Visual anchor phrase
- Pattern names already implemented
- CSS variables/tokens already set
- Image URLs already loaded
- Content that hasn't changed

### WHAT TO INCLUDE IN PROMPT #B:
- **Specific fixes** with exact values (hex codes, HSL values)
- **New section specs** with content
- **Behavioral details** Lovable missed
- **Accessibility additions** (focus states, aria labels)

---

## END OF SELECTION GUIDE

---

## PATCH v3 — ScrollStack / StickyDeck selection guidance (Lovable reliability)

### Prefer StickyDeck (CSS-first) for “stacked cards” moments
Use when the visual reference is overlapping panels/cards (deck look). This is the most stable and easiest to QA.

**Must include in prompt:**
- Opaque surfaces (no backdrop blur / no card opacity).
- Only active/top card shows body (bullets + CTA). Inactive cards: header only.
- Explicit `stackTop` target (≈ 18vh) and strict z-index order.
- Mobile + reduced-motion fallback: vertical timeline list (no sticky).

### Avoid transform-math stacks unless explicitly needed
Transform-math stacks drift into “buggy” states (ghost text, clipping) when the prompt is vague or when content density changes.

If transform-math is required:
- Keep body hidden on inactive cards.
- Cap to 5 cards max.
- Provide a hard fallback (non-stacking sticky section or normal list).

### Smooth scroll libraries
Default: do not use. If user explicitly opts in, treat as experimental and never global.
