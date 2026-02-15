# lib-core-rules.md
**Version:** 1.3 (Restored & Enhanced)
**Purpose:** Consolidated guardrails, technical capabilities, and quality standards for Lovable.dev prompts.
**Merges:** Original v1.2 Rules + Lovable Technical Constraints

---

## CORE PHILOSOPHY

> **Prompter defines WHAT (observable outcomes). Lovable defines HOW (craft execution).**

This delegation saves 30-40% tokens while increasing visual quality. Lovable is a design specialist — trust it with implementation details.

---

## PART 0: TEMPLATE OUTPUT BOUNDARIES (Anti-Leak)

When using templates that contain internal guidance plus a prompt body:

- If the template includes `BEGIN_PROMPT_BODY` / `END_PROMPT_BODY`, **output ONLY the content inside that span**.
- Treat everything outside as **prompter-only internal notes** (never paste into the Lovable prompt).
- Do not emit meta like “phase”, “hard length gate”, “how to call”, “operator checklist”, or “Lovable version”.
- Use benchmark examples as **inspiration + structure targets**, not text to copy.

This prevents “operator-manual bloat” and keeps prompts builder-facing.

---

## PART 1: TECHNICAL STACK & CONSTRAINTS (Non-Negotiable)

**Lovable’s Native Environment:**
- **Framework**: React + Vite + TypeScript
- **Styling**: Tailwind CSS v3 (Use standard utility classes. For container queries, use `@container` plugin syntax, NOT v4 native syntax).
- **Icons**: `lucide-react` ONLY. (Avoid FontAwesome/Heroicons to prevent hallucinated imports).
- **Animation**: `framer-motion` is the native engine.
- **Components**: `shadcn/ui` (Registry implementations). Native knowledge exists.

**Performance Anchors:**
- **Mobile FPS**: All animations must target 60fps on mobile.
- **Transform Preference**: Use `transform` and `opacity` for animations. Avoid `width`, `height`, `top`, `left`.
- **Heavy Animation Limit**: Max 2 "heavy" animations (e.g., WebGL, complex SVG paths) above the fold.
- **Blob Limit**: Max 3 active blobs per viewport.

**BANNED IMPORTS (will cause build failures):**
- `next/font`, `next/image`, `next/link` — this is NOT Next.js
- `@next/*` — no Next.js packages
- Any Node.js server-side APIs (`fs`, `path`, `process`)

---

## PART 2: DELEGATION BOUNDARIES

### What Lovable Decides (Never Specify)

These waste tokens — Lovable applies best practices automatically:

| Category | Let Lovable Decide |
|----------|-------------------|
| **File structure** | `src/components/ui/...`, imports, organization |
| **Route paths** | `/services`, `/contact`, architecture |
| **TypeScript interfaces** | Beyond props in signature |
| **Exact animation curves** | Say "bouncy" not `[0.34, 1.56, 0.64, 1]` |
| **Exact durations** | Give ranges: "0.3-0.5s" not "0.347s" |
| **Exact spacing** | Say "generous padding" not "py-24 lg:py-32" |
| **Exact breakpoints** | Say "mobile stack, desktop grid" not px values |
| **Icon choices** | Say "icon representing reservations" not "Lucide Calendar" |
| **Semantic HTML** | Lovable applies accessibility best practices |
| **Focus/keyboard handling** | Default focus styling is fine; **for interactive components** you must specify keyboard + focus return in the skeleton |

### What Prompter MUST Specify

These are essential for Lovable to execute correctly:

| Category | Must Include |
|----------|-------------|
| **Visual Anchor** | 5-word evocative scene |
| **Design tokens** | Complete HSL CSS variables (in `:root`) |
| **SECTION_COLORS** | With `hsl()` prefix for transitions |
| **Pattern behaviors** | What happens, not implementation code |
| **Observable outcomes** | Verification checkpoints |
| **Content (EXACT)** | Headlines, body, CTAs verbatim |
| **Hierarchy signals** | What's most important per section |
| **Constraints** | What to avoid (anti-patterns) |
| **Cohesion locks** | One radius, one shadow, one border |
| **Accent budget** | ≤10% surface area |
| **End state clarity** | What user sees after action completes |
| **Content density** | Short paragraphs, bullet-heavy, or prose |

---

## PART 3: INTENT VOCABULARY

Replace code-heavy specifications with intent language:

### Animation Intent
| Instead of | Write |
|------------|-------|
| `duration-300 ease-out` | "snappy response" |
| `duration-500 ease-in-out` | "gentle transition" |
| `[0.34, 1.56, 0.64, 1]` | "bouncy spring" |
| `ease-[cubic-bezier(0.16,1,0.3,1)]` | "smooth deceleration" |

### Spacing Intent
| Instead of | Write |
|------------|-------|
| `py-24 lg:py-32` | "generous breathing room" |
| `gap-4` | "comfortable spacing" |
| `py-8` | "compact rhythm" |
| `space-y-12` | "editorial pacing" |

### Scale Intent
| Instead of | Write |
|------------|-------|
| `text-4xl md:text-5xl lg:text-6xl` | "headline scale: impactful" |
| `text-sm` | "caption scale" |
| `text-lg` | "comfortable reading size" |

### Effect Intent
| Instead of | Write |
|------------|-------|
| `shadow-[0_0_30px_hsl(var(--primary)/0.4)]` | "CTA with visible glow halo" |
| `backdrop-blur-xl bg-white/80` | "frosted glass effect" |
| `opacity-25 blur-xl` | "soft ambient glow" |

### Bounded Ranges (Give Flexibility)
```markdown
Opacity: 25-35% (tune for visibility)
Blur: blur-[100px] to blur-[150px] (scale with element)
Duration: 0.4-0.7s (faster for small, slower for hero)
Stagger: 0.08-0.12s between items
Glow: 25-40px spread (brighter for primary CTA)
```

---

## PART 4: RELIABILITY GUARDRAILS

These prevent "pretty but broken" outputs. Enforce in the **VISUAL FOUNDATION** block placed at the top of the prompt:

### 1) No Placeholder Rule (Critical)
- **NEVER** ship placeholder values (e.g., "0", "—", empty containers) as final UI
- If animation/data-binding fails, **render static final values immediately**
- Animation is garnish only — content must be visible without it

### 2) No Empty Module Rule (Critical)
- **No empty right columns** (e.g., reserved map area with nothing inside)
- **No blank cards** or empty panels
- **No empty gallery tiles** — if image fails, remove tile and reflow OR text fallback

### 3) Readability Floor (Mobile-First)
- Paragraph/body copy: **high-contrast ink** (not muted)
- Muted color is for **captions and metadata only**
- Layout must remain scannable: short lines, clear headings, generous line-height

### 4) Media Failure Policy (Explicit)
- All image lists: on error → drop tile & reflow OR fallback tile
- Never show broken-image icons
- Use `ResilientGalleryTile` pattern from implementation blocks

### 5) Ornament Discipline (Avoid Kit-y Vibes)
- Avoid heavy dark ornamental frames around media
- Prefer "paper edge" borders and soft depth
- If a strong frame appears, downgrade unless PRD explicitly calls for it

### 6) HSL-Only Default (With Explicit Exception)
- Theme tokens are **HSL via CSS variables only**
- Exception: **CutoutHero seam-match** may use HEX for AI image generation
- SECTION_COLORS requires `"hsl(H S% L%)"` with hsl() prefix

### 7) Image URL Protocol Rule (Critical)
- All image URLs MUST use **HTTPS** (not HTTP)
- All images must be verified to load (use `onError` handlers)

**MANDATORY IMAGE FALLBACK (inject into every <img> skeleton):**
```tsx
<img 
  src={imageUrl}
  alt={altText}
  className="w-full h-full object-cover"
  onError={(e) => { 
    e.currentTarget.onerror = null;
    e.currentTarget.src = '/placeholder.svg';
    e.currentTarget.classList.add('bg-muted', 'p-8');
  }}
/>
```

### 8) Minimum Visual Guarantees (Foundation Build)

Every Foundation Build prompt MUST include ALL of these **guarantees** (not fixed patterns):

**Hero (required):**
- [ ] One hero pattern chosen for business fit, with skeleton
- [ ] One primary emphasis system:
  - Animated text **OR**
  - Typographic emphasis (no text animation) **OR**
  - Image-led hero composition
  If animated text is used, it MUST be sentence-final and singular (no stacking).
- [ ] CTA emphasis style defined (glow, solid emphasis, or underline system) with accessible focus state
- [ ] Proof module only if facts exist (StatStrip / AnimatedCounter / Testimonial / TrustBadges). If facts are missing, use safe-copy proof without numbers.

**Depth + Sections (required):**
- [ ] One depth system (AmbientBlobs / AuroraBackground / Texture) **OR** explicit rationale for a flat design
- [ ] ONE signature moment with 15–30 line skeleton
- [ ] At least one emphasized card/section (FeaturedCard **or** an alternative emphasis treatment)
- [ ] Transitions are optional; if used, single family, max 2, with SECTION_COLORS

**Bias guardrail:** If your hero + emphasis + depth + proof choices mirror the default stack (DicedHero + FlipWords + AmbientBlobs + StatStrip), you must provide a business-specific justification and name one viable alternative you rejected. If you cannot justify it, swap at least one major pattern family.

### 9) Character Count Enforcement

| Prompt | Word Target | Character Target (MUST meet) |
|--------|-------------|------------------------------|
| Foundation (A) | **2,400-3,000 words** | **16,000-20,000 characters** |
| Complete & Elevate (B) | **1,800-2,400 words** | **12,000-16,000 characters** |

**Character Density Strategy:**
- **Section specs:** Layout, visuals, content, interaction states (~5k chars)
- **Pattern expansions:** Skeletons for complex logic only (~3k chars)
- **Editorial formatting:** Pull quotes, dividers, chips (~1.5k chars)
- **No filler words.** Every token must provide implementation value.

**Adherence ceilings (practical):**
- Prompt A quality often degrades above ~3,400 words
- Prompt B quality often degrades above ~2,600 words

If you exceed these ceilings, compress instead of appending.

### 10) Pattern Visibility Verification

Before outputting any prompt, verify each pattern has ALL 4 elements:

| Element | Description | Example |
|---------|-------------|---------|
| **Skeleton** | 10-40 line code block | Animated text (if used): 10–15 lines |
| **Placement** | Exact section + position | "Hero, SENTENCE-FINAL" |
| **Values** | Opacity, size, duration | "bg-primary/35, blur-[120px]" |
| **Verification** | Observable outcome | "Words cycle every 3s" |

### 11) Transition Placement Rule (Critical)

SectionTransition components must be:
- Edge-overlayed at the bottom of the upper section
- NOT rendered as detached spacer bands
- Enforce one separator primitive per boundary (irregular edge OR straight edge, never both)
- Include anti-seam micro-buffer after SVG

**Wrong:**
```tsx
<SectionA />
<SectionTransition /> {/* ❌ Detached spacer band */}
<SectionB className="border-t ..." /> {/* ❌ Double separator */}
```

**Correct:**
```tsx
<SectionA className="relative overflow-visible">
  <SectionTransition />
</SectionA>
<SectionB className="-mt-px" />
```

### 12b) Grid Math Rule (Critical)
Before outputting any card grid specification:
1. Count total items
2. Count column count
3. Map each item's col-span
4. Verify: every row's total spans = grid-cols-N
5. If any row has orphan items → change layout

**Common fix patterns:**
- 4 items in 3-col: Use 2x2 grid (grid-cols-2) instead
- 5 items in 3-col: Make last 2 items span 1.5 cols each (impractical) → use 2-col with last item full-width
- 3 items in 2-col: Last item spans 2 cols OR use 3-col grid

### 12c) No Phantom File Paths (Critical)
- NEVER reference local file paths (e.g., `/images/ai-*.jpg`) in prompts
- AI-generated images must be referenced by their AI Image number (e.g., "Use Image 6 from AI IMAGE section")
- Only use: real HTTPS URLs, placeholder.svg, or AI image prompt references

### 12) Mobile Overflow Prevention (Critical)

Every layout container MUST prevent horizontal overflow:

**Container level:**
- Main wrapper: `overflow-x-hidden` on `<main>` or page container
- Section wrappers: `overflow-hidden` on sections with absolute/positioned children

**Text level:**
- Hero headlines: add `max-w-full`
- Long words (German-heavy copy): add `break-words` and `hyphens-auto`
- Typography and spacing: prefer fluid scaling (`clamp()` or responsive class stepping) over fixed-only jumps
- Badge strips: prefer `flex flex-wrap` over fixed grid columns on mobile

**Specific patterns:**
- Proof modules (stats/testimonials): stack on mobile (`grid-cols-1 sm:grid-cols-3`)
- Badge/Chip strips: `flex flex-wrap gap-2` + `whitespace-nowrap` per chip
- Carousels: outer `overflow-hidden`, inner `overflow-x-auto`
- Responsive media: use `picture/srcset/sizes` (or framework equivalent) for large hero/gallery assets
- Component-level adaptation: use `@container` for cards/components in variable-width regions
- CTA rows with long labels: `w-full sm:w-auto justify-center text-center` on each button
- Avoid mobile negative horizontal margins on scrollers (`-mx-*`) unless containment is proven at 320px

**Anti-pattern:**
```tsx
// WRONG: fixed 4-column badge strip on mobile
<div className="grid grid-cols-4 gap-4">
  <Badge>Fruehstueck inklusive</Badge>
</div>

// CORRECT: wrapping chips
<div className="flex flex-wrap gap-2 justify-center">
  <Badge className="whitespace-nowrap">Fruehstueck inklusive</Badge>
</div>
```

### Pre-Output Mobile Check (Mandatory)

Before finalizing any prompt, verify:
1. At 320px width, hero headline remains fully contained.
2. At 375px width, badge/chip strips wrap cleanly.
3. At 414px width, no horizontal scrollbar appears.
4. Every carousel uses double-wrap containment (outer hidden + inner auto).
5. Heading/body scale is fluid across breakpoints (no abrupt size jumps).
6. Large media uses responsive source sizing (no oversized desktop asset on mobile).

If any check fails, add explicit containment rules before output.

### 13) Opening Weight Rule (Critical)

Lovable over-weights the opening of the prompt. Treat the first 20 lines (and roughly first 600 words) as the high-impact zone:
- Identity + visual anchor
- Art direction commitment
- Locked HSL token system
- Focal budget declaration
- Material + lighting model

Do not bury these blocks below long narrative text.

### 14) Hard-Rule Budget (Cognitive Load)

Too many hard constraints reduce adherence.
- Keep opening `MUST` rules to **8 or fewer**
- Convert lower-priority constraints to `SHOULD` guidance
- If a rule is not design-critical, move it to checkpoints

### 15) Motion Density Budget (Critical)

Motion must stay premium, not noisy:
- Hero viewport: max **3** animated elements
- Mid-page viewport: max **2** animated elements
- Full page: max **8-10** concurrently noticeable animations

If motion exceeds budget, remove low-impact loops first.

### 16) Prompt Vocabulary Steering

Certain words push safer/generic output. Prefer high-signal vocabulary.

**Prefer:**
- `considered`
- `refined`
- `editorial pacing`
- `tactile`
- `museum-quality`
- `signature moment`

**Avoid as primary style directives:**
- `clean`
- `simple`
- `modern`
- `professional`
- `user-friendly`

Use concrete replacements (for example, "intuitive but distinctive" instead of "user-friendly").
Reference: `lib-prompt-vocabulary-reference.md` for swap-ready wording.

### 17) Skeleton Scope Rule

Use full 15-40 line skeletons only for complex/high-risk patterns:
- Hero architecture (your chosen hero pattern)
- Signature interactive pattern (InteractiveSelector/ScrollStack/etc.)
- SectionTransition + anti-seam behavior

For simple/derivable elements (buttons, basic cards, simple copy blocks):
- Use intent + critical class/behavior requirements
- Do not spend large token budgets on full simple-component scaffolds

---

## PART 5: DESIGN EXCELLENCE PROTOCOL

These push outputs from "nice" to **visually memorable**:

### 0) Style Fit Gate (Skill-Driven)
- Use `ui-ux-pro-max` to sanity-check style direction, contrast, and performance risk.
- If a style implies heavy glass/blur or low contrast, downgrade effects unless the business explicitly benefits and accessibility is preserved.
- For high-trust verticals (medical/legal), prefer accessible, high-contrast, low-motion styling.

### 1) Enhancement Mode (Empowered Design)
**Rule:** Lovable is **EMPOWERED** to enhance visuals if:
1.  It follows the existing `:root` design system (no new colors).
2.  It adds polish (hover states, stagger, gradients) without clutter.
3.  It maintains pattern reliability (doesn't break layout).

### 2) Focal Budget (Prevent "Template Soup")
Every page must have:
- **ONE** dominant focal moment (usually Hero)
- **ONE** secondary signature moment (timeline/collage/interactive)
- **ONE** proof wall (gallery/testimonials/logos)
- Everything else: quiet support

### 3) Type Ladder (Readable + Premium)
- **3-rung ladder:** Display / Section Heading / Body
- Body text: **ink-dark** (not muted)
- Muted: captions only
- Keep paragraphs short with strong subheads

### 4) Edge + Depth System (Cohesion)
- **ONE** corner-radius family across all elements
- **ONE** shadow language (soft + warm)
- **ONE** border language (paper-edge, low contrast)
- Avoid heavy dark ornamental frames

### 5) Accent Discipline (Spice, Not Sauce)
- Primary accent: **≤10%** of UI surface area
- Use for: primary CTA, key numbers, tiny motif/divider
- Do NOT outline every card with accent color

### 6) Media Art Direction (Real Photos Look Intentional)
- Consistent crops, gentle framing, clean captions
- No "random collage" unless PRD calls for it
- Image fails: remove and reflow OR clean fallback tile

### 7) Layout Rhythm Rule (Split Sections)
- Consecutive split-layout sections MUST alternate scroll/fixed sides
- Section A: scrollable LEFT, fixed RIGHT
- Section B: fixed LEFT, scrollable RIGHT

### 8) Consistent Background Rule (Card Grids)
- If ONE card has background image, ALL must have images
- If insufficient images, use NO background images on any
- Never mix styled/unstyled cards in same grid
- **Card grid cardinality:** column count must fit the item count (no orphan columns). For 4 items use 2x2 or 4-col — never 3-col.

### 9) Micro-Delight Budget (always exactly 3)
**The 3 that must be used (highest compliance):**
1. **Button press:** hover scale-[1.02], active scale-[0.98] + shadow shift  
2. **Card hover lift:** -translate-y-1 + shadow step-up  
3. **Link underline sweep:** width 0→100% from left (hover + focus-visible parity)

---

## PART 6: DESIGN TENSION FRAMEWORK

Cohesion creates comfort. Tension creates memory. Apply strategically:

### Scale Tension
- Most elements follow the type ladder
- ONE element per page breaks scale (hero stat, signature quote)

### Density Tension
- Most sections have consistent padding
- Signature moment section has 1.5x padding (breathing room)

### Motion Tension
- Most elements have subtle entrances
- Signature moment has dramatic reveal (stagger, scale, rotation)

### Color Tension
- Most surfaces use muted palette
- CTAs and ONE accent element pop with primary

### The 90/10 Rule
> 90% cohesive system, 10% intentional rule-breaking for focal moments.
> Do not make everything special — that makes nothing special.

---

## PART 7: COHESION LOCKS

Lock these early (VISUAL FOUNDATION block) so the build cannot drift:

```markdown
- ONE radius family across all cards/media/chips
- ONE border language (paper-edge, low contrast)
- ONE shadow language (soft, warm; avoid high-contrast drop shadows)
- ONE caption system (museum-label style) for all media
- ONE motif (e.g., tiny gold star + rule) used only for section openers
- Accent budget: primary accent in ≤10% of surface area
- Micro-delight budget: exactly 3 site-wide
```

---

## PART 8: SIGNATURE MOMENT RULE

Besides Hero and Proof Wall (gallery), choose **exactly ONE** secondary signature moment:

| Content Type | Signature Moment | Intent |
|--------------|------------------|--------|
| Timeline/history | **ScrollStack** | Cards stack like turning pages |
| Testimonial/quote | **ParallaxGlass** or **KineticPullQuote** | Featured content with depth |
| 3-5 categories | **InteractiveSelector** | Click expands selected |
| Image portfolio | **ExpandableGallery** | Full lightbox with keyboard nav |
| Features | **BentoGrid** | Magazine-style varied grid |

Everything else must be quieter support.

---

## PART 9: META-PROMPTING STRUCTURE

### Art Director → Builder → QA (Internal Passes)

1. **Art Director Pass:** 10-15 line Visual Signature (sensory + testable)
   - Hierarchy, contrast, density, edge/depth, accent, media, motif

2. **Builder Pass:** Section-by-section specs mapping 1:1 to PRD
   - Patterns + Intent Blocks + content

3. **QA Pass:** 3-6 checkpoints with "if you see X, fix by Y"
   - No placeholders, no empty modules, readable body, gallery works

### Taste Test (Self-Critique Before Finalizing)
Answer YES to all:
1. In 5 seconds: **What is this? Why trust? What now?** are obvious
2. Each section has **one focal point** (no competing heroics)
3. Adjacent sections look like **same brand system**
4. Body text readable on mobile (captions muted, paragraphs not)
5. No ornament exists "because it's pretty" — every flourish clarifies
6. Media feels curated (consistent crops + captions)

---

## PART 10: PROMPT START STRUCTURE

### VISUAL FOUNDATION (highest attention; put this at the very top)

Use this exact order. Keep it compact and high-signal.

1) **Identity + Visual Anchor**
```markdown
# [Business Name]
**VISUAL ANCHOR:** "[5-word sensory scene]"
**Purpose:** [One sentence: what this site does]
```

2) **Art Direction Commitment (REQUIRED)**
```markdown
## ART DIRECTION
Internally explore 2-3 visual directions. Commit to ONE.
**Signature Moment:** [Section name] is this page's "stop scrolling" moment.
Do NOT output exploration — only the final build.
```

3) **Design Tokens (complete HSL block)**
```css
:root {
  --background: H S% L%;
  --foreground: H S% L%;
  --card: H S% L%;
  --card-foreground: H S% L%;
  --primary: H S% L%;
  --primary-foreground: H S% L%;
  --secondary: H S% L%;
  --secondary-foreground: H S% L%;
  --accent: H S% L%;
  --accent-foreground: H S% L%;
  --muted: H S% L%;
  --muted-foreground: H S% L%;
  --border: H S% L%;
  --ring: H S% L%;
}
```

4) **Focal Budget (REQUIRED)**
```markdown
**FOCAL BUDGET:** Hero = 60% visual weight, [Secondary Section] = 25%, all other sections = 15% support.
```

5) **Material + Lighting Model**
```markdown
**Material System:** Surfaces feel like [single material family].
**Lighting:** Top-left key light; shadows are warm and never pure black.
```

6) **Motion Budget**
```markdown
Hero viewport: max 3 animated elements.
Mid sections: max 2 animated elements.
Page total: max 8-10 animated elements.
```

7) **Mobile-First Anchor (REQUIRED)**
```tsx
<main className="min-h-screen overflow-x-hidden">
  {/* All sections inside */}
</main>
```

Mobile containment rules:
- All `<h1>`/`<h2>` blocks: `max-w-full break-words`
- Language-heavy body containers: `hyphens-auto`
- Headline/section spacing: fluid scaling (`clamp` or responsive step classes)
- Trust badges/chips: `flex flex-wrap` (not fixed `grid-cols-*` on mobile)
- Carousel strips: outer `overflow-hidden`, inner `overflow-x-auto`
- Large media: responsive source sizing (`srcset/sizes` or framework equivalent)
- Variable-width components: use `@container` behavior where cards must reflow by parent width
- CTA buttons with long copy: `w-full sm:w-auto justify-center text-center`
- Do not use `-mx-*` on mobile carousel wrappers

Verification widths:
- 320px
- 375px
- 414px

Rule: no horizontal scrollbar at any verification width.

8) **SECTION_COLORS (with `hsl(...)` prefix)**
```tsx
const SECTION_COLORS = {
  hero: "hsl(H S% L%)", // format: "hsl(H S% L%)" — include hsl() prefix
  services: "hsl(H S% L%)",
  cta: "hsl(H S% L%)",
} as const;
```

9) **Cohesion locks (declare once, then follow)**
- ONE radius family (e.g., rounded-2xl)
- ONE border language (`border border-border/40`)
- ONE shadow language
- Micro-delights: **exactly 3**

10) **Visual Drama Checklist (End of Prompt A)**

```markdown
## VISUAL DRAMA VERIFICATION

Before finalizing, answer YES to all:
- [ ] Hero has visible energy (motion **or** composition)
- [ ] ONE signature moment creates "stop scrolling" impact
- [ ] Emphasis element stands out (featured card or focal section)
- [ ] Depth system is visible **OR** flat design rationale is explicit
- [ ] CTA emphasis is noticeable (glow or alternative)
```

---

## PART 11: HARD ENFORCEMENT TABLE

**Pre-output validation — verify ALL before outputting:**

| Rule | Requirement | If Fails |
|------|-------------|----------|
| **Prompt A length** | **16,000-20,000 characters** AND **2,400-3,000 words** | Expand or trim while preserving meaning |
| **Prompt B length** | **12,000-16,000 characters** AND **1,800-2,400 words** | Expand or trim while preserving meaning |
| Code lines | Target ≤150; hard max 180 (per prompt) | Prefer Intent Blocks; only skeletons for complex patterns |
| **Hero patterns** | Hero pattern present + chosen emphasis/depth/proof patterns included | Add missing chosen patterns with skeletons |
| **Section patterns** | Minimum 2 | Add patterns from lib-implementation-blocks.md |
| Code blocks | 8-12 per prompt (max ~15) | Merge/remove blocks; keep only 10-30 line skeletons |
| Full components | Zero complete .tsx files | Use Implementation Blocks only |
| Route tables | Zero | Lovable decides routing |
| File paths | Zero | Lovable decides structure |
| Pattern scores | Zero in output | Scores are internal only |
| Stack declaration | Include once early: React + Tailwind + Framer Motion + shadcn/ui | **If missing, Lovable may drift** |
| Logo | Handled (use provided OR generate) | Add logo section |
| Transition family | ONE only | All transitions same variant |
| Transition count | 2 maximum | Remove excess |
| SECTION_COLORS | Present with `"hsl(H S% L%)"` | Fix format |
| Language | Instructions in ENGLISH only | Content in original language |
| Language | Instructions in ENGLISH only | Content in original language |
| AI image prompts | ENGLISH only | Translate prompts |
| **Image onError** | Every `<img>` in skeletons must have onError fallback | Add fallback handler |

**If ANY rule fails → revise before outputting.**

---

## PART 12: OUTPUT FILTERING

**These are INTERNAL rules — NEVER include in output prompts:**

- ❌ "(must appear in first X words)"
- ❌ "HARD RULE" / "HARD LIMIT"
- ❌ "This is the ONLY allowed exception"
- ❌ Pattern score numbers (e.g., "+4", "★★★★★")
- ❌ References to "lib-patterns.md" or other lib files
- ❌ "AI Prompter:" prefixes
- ❌ "Phase 1 KB" / "quality >= 0.60"
- ❌ "Prompt #A" / "Prompt #B" — use clean headers

**The output should read as natural design direction, not a rules document.**

---

## PART 13: LANGUAGE SEPARATION

- **All implementation instructions:** ENGLISH only
- **All business content (headlines, descriptions, CTAs):** ORIGINAL LANGUAGE from PRD
- **AI image prompts:** ENGLISH only (always, regardless of business language)
- **Never write:** German/French/etc. instruction text

---

## PART 14: TOKEN WASTE AVOIDANCE

**DO NOT include in prompts:**

| Wasted Tokens | Why Wasteful |
|---------------|--------------|
| Repeating "No Three.js/WebGL/scroll hijacking" in multiple sections | State it once in opening constraints only |
| Repeating accessibility defaults in multiple sections | Keep one clear accessibility block; avoid duplication |
| "ROLE CONTRACT: You are implementing..." | Meta-instruction |
| Full component implementations (200+ lines) | Lovable builds from Intent Blocks |
| Route tables | Lovable decides architecture |
| File path instructions | Lovable decides structure |
| Pattern scores ("+3 points") | Internal scoring only |
| "See lib-patterns.md" | Lovable can't read external files |
| rgba() color values | Use HSL only |

---

## PART 15: INTENT BLOCK FORMAT

Replace code dumps with Intent Blocks (5 lines):

```markdown
> Pattern: GlowCard
> Intent: Cards feel warm, lifting toward visitors
> Behavior: Hover reveals soft glow + gentle lift
> Verify: Glow at 25%+ opacity, lift noticeable
> Critical: ONE card marked FEATURED
```

For complex patterns, add Visual Signature (10-15 lines total):

```markdown
### Pattern — Intent Block (Example)

> Pattern: DiagonalSplitHero
> Intent: Immediate trust + clarity with bold geometry
> Behavior: Diagonal color split, media crosses boundary with shadow
> Verify: Text sits fully on solid color zone, image overlap visible
> Mobile: Stack, image below content

**Visual Signature:**
Core: min-h-[90vh] grid lg:grid-cols-2 gap-8, diagonal split backdrop
Left: Badge + headline + description + CTAs
Right: Media block crossing split with shadow-xl
Nav: None (keep hero simple unless media is a carousel)
```

---

## SUMMARY: The Delegation Contract

| Prompter Specifies | Lovable Decides |
|-------------------|-----------------|
| Visual anchor & feeling | File organization |
| Pattern behaviors | Animation curves |
| Observable outcomes | Exact timing |
| Content (exact copy) | Responsive breakpoints |
| Hierarchy signals | Shadow/blur values |
| Constraints | Icon choices |
| Cohesion locks | Semantic HTML |
| SECTION_COLORS | Focus management |

**Result:** Shorter prompts, better designs, faster iteration.

---

## PATCH v3 — Reliability rules for “looks buggy” failure modes

### Overlap / Sticky / Stack surfaces
- If cards overlap (sticky stacks, pinned steps, decks): **card surfaces must be fully opaque** (`bg-card`), never glass (`backdrop-blur`) and never container opacity.
- Only the active/top card may show body text (bullets, paragraphs, CTAs). Inactive cards show header only. This prevents “ghost text” artifacts.

### Determinism (SSR + hydration safety)
- Never use `Math.random()` (or time-based values) inside render output.
- If randomness is needed: generate once in `useMemo` (seeded) or `useEffect` + state, and keep DOM stable.

### Scrolling
- Default: native scroll only (no global smooth-scroll libraries).
- Optional exception ONLY if user explicitly opts in: smooth scrolling must be section-scoped, reversible, and must not break anchors/back-button/scroll restoration. Always keep a native-scroll fallback.

### Reduced motion
- If `prefers-reduced-motion`: disable non-essential transforms/loops; prefer static visuals or the mobile fallback layout.

---

## RULE: NO HOOKS IN LOOPS

**Never call React hooks (useState, useEffect, useRef, useTransform, useScroll, useInView) inside .map(), .forEach(), or any loop.**
This violates React's Rules of Hooks and causes runtime crashes.
If per-item animation is needed, extract a child component that calls hooks at its own top level.

---

## RULE: PATTERN RISK GATE

### 18) Context-First Protocol (Persistence)
- Every prompt MUST begin by reading `project_context.md` (except Phase 3 init).
- Every prompt MUST end by updating `project_context.md`.
- This file is the "Living Memory" of the project.
- Never rely on chat history for tokens or status.

---

If a chosen Signature Moment is a 2-star pattern (ScrollStack, InteractiveSelector), the AI Prompter MUST either:
(a) Include the COMPLETE working skeleton from `lib-implementation-blocks.md`, OR
(b) Downgrade to a 3-star alternative (ProcessSteps) that achieves the same goal.

**NEVER improvise a skeleton for 2-star patterns.** If the skeleton is incomplete, use the full version from library or switch to a safer pattern.

---

## PART 15A: LOCAL BUSINESS ARCHETYPES (Cues, Not Defaults)

Use these cues to **inform** pattern choice, not to lock it:

### Hospitality (Hotels, Restaurants, Cafés)
- **Visual priority:** real spaces + food/room imagery
- **Hero choice:** image-led if strong assets exist; otherwise typography-led with one ambient system
- **Signature options:** gallery, selector, or story stack based on content richness
- **CTAs:** "Reserve Table" / "Book Room" — include phone + email if provided
- **Trust cues:** years in business, family-run, local awards (only if real)
- **Tone:** Warm, welcoming, "come as you are"

### Service Trades (Contractors, Plumbers, etc.)
- **Visual priority:** before/after or project imagery if credible
- **Hero choice:** clarity-first layout that foregrounds scope + response speed
- **Signature options:** process/timeline, scope comparison, or service tiers
- **CTAs:** "Call Now" / "Get Quote" — phone dominant if provided
- **Trust cues:** certifications, years experience, service area (only if real)
- **Tone:** Reliable, no-nonsense, professional

### Wellness (Spas, Therapists, Yoga)
- **Visual priority:** calm atmosphere, gentle texture, soft light
- **Hero choice:** low-motion, calm composition; avoid aggressive effects
- **Signature options:** service ritual flow, practitioner focus, or testimonial narrative
- **CTAs:** "Book Appointment" — phone preferred if provided
- **Trust cues:** certifications, modalities, peaceful imagery (only if real)
- **Tone:** Calm, restorative, professional but warm

---

## PART 16: VOLUME RECOVERY PROTOCOL (Anti-Shortness)

**Trigger (Pre-emptive):**
- **Any time the source JSON is < 1,000 words** (sparse input).
- **ANY Deliverable (PRD, Prompt A, B, or C)** projected < 3,000 words.

**Action:** You are **REQUIRED** to inject "Deep Specification" to recover meaningful volume until you pass 3,000 words.
1. **Inject Intent Blocks:** For every chosen pattern, paste the full "Intent Block" + "Visual Signature" (10-15 lines) from `lib-core-rules.md` Part 15.
2.  **Explicit Motion Physics:** Instead of "gentle fade", write:
    ```tsx
    // Motion Intent
    const smoothReveal = {
      hidden: { opacity: 0, y: 30, scale: 0.98 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
    };
    ```
3.  **Full Copy Frameworks:** Write out 3-4 variations of Headlines/CTAs before selecting the final one (show your work).
4.  **Mobile Containment Rules:** Explicitly list the containment strategy for *each* section (e.g., "At 320px: Title wraps to 3 lines, padding reduces to px-4, image stacks below text").

---

## PART 17: IMAGE PRESERVATION PROTOCOL

**Image Injection Protocol:**

**Image Preservation Across Prompts:**
- Prompt B must NEVER replace a working image URL from Prompt A
- Working real URLs > Working Unsplash URLs > AI-generated images
- AI images fill GAPS only — they never overwrite existing assets
- If Prompt B needs to upgrade an image, it must use the pattern:
  "Keep [original URL] as primary. If quality insufficient, replace with [AI Image N]."


### Example 1: The "Animation Physics" Dump
Inject full Framer Motion variant definitions instead of generic descriptions.
```tsx
// INJECT THIS BLOCK if short:
const smoothReveal = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 }
  }
};
```


### Expansion 3: The "Content Verbosity" Rule
- **Rewrite with the installed copy writer skill.**
  
- **Short:** "We offer implants."
- **Long:** "Our implantology service restores more than just your smile; it restores your confidence. Using state-of-the-art titanium roots and ceramic crowns, we create a solution that looks, feels, and functions exactly like your natural teeth."

**NEVER SUBMIT A SHORT PROMPT. USE THESE EXPANSIONS.**

---

## PART 17b: IMAGE INJECTION PROTOCOL (Real Assets)

**Trigger:** Input JSON contains an `images` array with valid URLs.
**Action:** You MUST use these real images instead of generic AI placeholders or Unsplash fallbacks.

**Hierarchy of Truth:**
1. **JSON `images` (High Confidence):** User-provided assets. **PRIORITY 1.**
2. **Website Extract (Medium Confidence):** Images found during scraping (if high res). **PRIORITY 2.**
3. **AI Generation (Low Confidence):** Use only if no real assets exist. **PRIORITY 3.**

**Injection Rules:**
- **Validation:** Check if URL is HTTPS. If HTTP, convert or flag.
- **Context matching:** If JSON labeled an image "Team Photo", do not use it for "Services".
- **Fallback:** Always provide a fallback description or AI prompt in case the real URL 404s.

---

## PART 18: IMAGE INTEGRATION STRATEGY (New Standard)

**The Golden Rule:** Put the URL as close as possible to where it renders.

**1. Inline at Point of Use (Preferred / Default)**
Best for 80% of cases. No lookup tables.
```tsx
<img 
  src="https://..." 
  alt="Description"
  className="object-cover..."
  onError={(e) => { e.currentTarget.src = '/placeholder.svg' }} 
/>
```

**2. Compact Ledger + Inline ID (For 8+ images)**
If many shared images exist, define a short ledger at the top, but ALWAYS reference the ID inline.
```markdown
| ID | URL | Fallback |
|---|---|---|
| IMG-01 | https://... | /placeholder.svg |
```
Usage: `// Hero Position 1: Use IMG-01 (Exterior)`

**3. Planned AI Slots (Phase 5 Placeholder Strategy)**
For slots that need AI generation in Phase 5:
- **Do NOT** generate the AI image now.
- **Do NOT** use a broken `[AI Image]` placeholder.
- **DO:** Use a specific, high-quality Unsplash URL as a layout placeholder.
- **DO:** Append `?w=800` to the URL.
- **DO:** Add a comment: `/* Reserved for AI-0X: [Concept] */`

**Approved Unsplash Placeholders (Examples):**
- **Bathroom/Spa:** `https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800`
- **Breakfast/Dining:** `https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800`
- **General Modern Interior:** Find a high-quality Unsplash ID (e.g., modern office, living room) and use it.

