# Pattern Library v7.1 — Master Visual Pattern Library (Lovable.dev)

> **29 Production-Ready Patterns** — advanced visuals + local-business conversion components
> **Dependencies**: framer-motion, lucide-react (pre-installed in Lovable)
> **Optional integrations** (use only if you explicitly allow them in the Lovable prompt): lenis (smooth scroll), three (WebGL)
> **Copy‑Paste Ready**: includes file paths, complete TSX, and a CSS bundle

---

## QUICK NAVIGATION INDEX

---

## DESIGN CRAFT ADDENDUM v11 (11/10 outcomes, lightweight)

This addendum is not a “pattern.” It is the **art-direction glue** that makes patterns feel like one premium system.

### A) Art Director Loop (internal, hidden)
- Generate 3 visual directions (A/B/C) that fit the PRD’s Design Metaphor.
- Pick the best based on: 5‑second clarity, cohesion, authenticity, craft.
- Implement only the chosen direction (do not output A/B/C).

### B) Cohesion Locks (must hold across the entire build)
- ONE radius family • ONE border language • ONE shadow language  
- ONE media frame + ONE caption style (museum-label)  
- ONE section opener motif (tiny accent dot + rule)  
- Accent budget: ≤10% surface area  
- Micro-delight budget: **exactly 3** (press, underline, lift)

### C) Composition Rules (anti-template)
- Each section must have **one focal point**. If two things compete, delete one.
- Keep a consistent “chapter opener” system: label → motif → heading → short lead.
- Use asymmetry sparingly: one or two moments, not everywhere.

### D) Media Art Direction (real photos look expensive)
- Use consistent aspect ratios within a grid; vary only intentionally (hero vs gallery).
- Always include small captions aligned to the media edge (quiet, museum-like).
- Never use heavy dark frames; prefer soft paper-edge borders and gentle shadows.
- If an image fails: remove tile + reflow OR show a text fallback tile.

### E) Signature Moment Recipes (examples, not defaults)
Use Hero + ONE Signature Moment + ONE Proof Wall. Everything else supports.
These are **inspirational pairings** — choose based on Design DNA and asset reality, not category labels.

| Archetype | Hero Options | Signature Moment (choose ONE) | Proof Wall | Notes |
|---|---|---|---|---|
| Archive / Memorial / Legacy | CutoutHero **or** Typography-led hero | ScrollStack | ExpandableGallery | Museum-label captions + calm editorial cadence |
| Food / Restaurant | Image-led hero (DicedHero/PlaceCard) **or** Typography-led if few photos | BentoGrid **or** ExpandableGallery | ExpandableGallery or TestimonialCarousel | Strong food hierarchy; captioned highlights |
| Service Business (trust) | DiagonalSplitHero **or** clean split layout | InteractiveSelector **or** ScrollStack | TestimonialsGrid | Make “why trust” immediate; keep accents disciplined |
| Boutique / Craft | CutoutHero **or** soft mesh/texture hero | ParallaxGlass **or** BentoGrid | ExpandableGallery | Tactile materials; micro-delights feel handcrafted |
| Education / Community | MeshGradientHero **or** calm split layout | ScrollStack **or** BentoGrid | LogoWall or TestimonialWall | Clear pathways; friendly density |

### F) Quick Anti-Generic Moves (pick 1–2)
- “Margin notes” chips that annotate a photo (short, factual).
- A single pull-quote card styled like an exhibit label.
- A “chapter divider” that subtly changes background tone (no harsh bands).

| # | Pattern | Type | Score | Mobile | Focal Rating |
|---|---------|------|-------|--------|--------------|
| 1.1 | MeshGradientHero | Hero | +4 | ✓ | ★★★★★ |
| 1.2 | DicedHero | Hero | +4 | ✓ | ★★★★★ |
| 1.3 | CutoutHero | Hero | +4 | ✓ | ★★★★★ |
| 1.4 | DiagonalSplitHero | Hero | +4 | ✓ | ★★★★★ |
| 2.1 | GlowCard | Card | +3 | ✓ | ★★★★☆ |
| 2.2 | PlaceCard | Card | +3 | ✓ | ★★★★☆ |
| 2.3 | SpotlightCard | Card | +3 | Desktop | ★★★★★ |
| 3.1 | ExpandingCards | Gallery | +3 | Desktop | ★★★★★ |
| 3.2 | ExpandableGallery | Gallery | +3 | ✓ | ★★★★☆ |
| 3.3 | ScrollStack | Narrative | +4 | ✓ | ★★★★★ |
| 4.1 | InteractiveSelector | Interactive | +3 | ✓ | ★★★★☆ |
| 4.2 | ExpandableTabs | Navigation | +2 | ✓ | ★★★☆☆ |
| 4.3 | InteractiveHoverButton | CTA | +2 | Desktop | ★★★☆☆ |
| 5.1 | MagneticText | Text | +2 | Desktop | ★★☆☆☆ |
| 5.2 | FlipWords | Text | +2 | ✓ | ★★☆☆☆ | **RULE: Always sentence-final** |
| 5.3 | TextLoop | Text | +2 | ✓ | ★★☆☆☆ |
| 5.4 | TextReveal | Text | +3 | ✓ | ★★★★☆ |
| 5.5 | MorphingCursorText | Text | +2 | Desktop | ★★★☆☆ |
| 6.1 | AnimatedCounter | Stats | +2 | ✓ | ★★★☆☆ |
| 7.1 | SectionTransition | Transition | +2 | ✓ | ★☆☆☆☆ |
| 8.1 | AuroraBackground | Ambient | +3 | ✓ | ★★★★☆ |
| 8.2 | AmbientBlobs | Ambient | +2 | ✓ | ★★☆☆☆ |
| 8.3 | ParallaxGlass | Section | +4 | ✓ | ★★★★★ |
| 8.4 | ShapeBlurLite | Ambient | +3 | ✓ | ★★★★☆ |
| 9.1 | ParallaxSection | Layout | +3 | ✓ | ★★★★☆ |
| 9.2 | InfiniteMarquee | Display | +2 | ✓ | ★★★☆☆ |
| 9.3 | BentoGrid | Layout | +3 | ✓ | ★★★★☆ |
| 10.1 | ServiceCard | Pricing | +3 | ✓ | ★★★★☆ |
| 10.2 | TestimonialCarousel | Social Proof | +4 | ✓ | ★★★★★ |
| 10.3 | ContactCTA | Conversion | +3 | ✓ | ★★★★☆ |
| 10.4 | BusinessHours | Info | +2 | ✓ | ★★★☆☆ |

**Maximum Score**: 75 points



## DESIGN CRAFT ADDENDUM (for the Prompter)

This addendum improves **visual outcomes** when Lovable implements patterns. Use it to reduce “template vibes” and increase craft.

### A) Composition Rules (make it look designed)
- Choose a **Density Cadence**: editorial-tight / balanced / gallery-forward — and keep it consistent.
- Keep **one dominant focal** per section: heading OR image OR CTA (not all equally loud).
- Align all section headers to a consistent “editorial rail” (same left edge, same spacing rhythm).

### B) Frame Discipline (avoid heavy borders)
- Prefer **paper-edge borders** and soft warm shadows.
- Avoid heavy dark frames around media unless the PRD explicitly demands it.
- Captions are small, muted, and aligned to media edges.

### C) Typography Ladder (premium readability)
- Use a 3-level ladder:
  - Display: rare, used for Hero only
  - Section headings: consistent scale and weight across page
  - Body: always high contrast; muted only for captions/meta
- Break long text into:
  - subheads, short paragraphs, callouts, quote blocks

### D) Signature Moment Recipes (lightweight, memorable)
Pick 2–3 total per site (not per section):
1) **CutOutHero + editorial side-rail** (badge + proof chips + CTA ladder)
2) **ExpandableGallery with “curator layer”** (chips for categories + caption rail + clear CTA at end)
3) **Timeline as archive spread** (milestones + vignette panel + gratitude note)

### E) Failure-State Contracts (trust)
- Stats/counters: never show placeholder 0; render final values first paint.
- Media grids: never show blank tiles; reflow or show text fallback.
- Card grids: choose column count that produces full rows. **Never** use 3 columns for 4 cards; use 2x2 or 4-col instead.




---

## FOR AI PROMPTERS: HOW TO USE THIS FILE

### Critical Instructions

### Workflow Note (Prompt #A / Prompt #B)

- Do **not** copy file paths or full TSX into prompts.
- Use the “AI Prompter Example” blocks as inspiration, then paraphrase into **Visual Signatures (10–15 lines)** + concise usage notes.
- Examples inside pattern sections are **contextual**; never assume a vertical mapping without checking the business data.

When writing prompts for Lovable.dev, you MUST include (for **chosen patterns only**):

### Usage Notes (Important)

- **Pick ONE ambient background** per section: don’t stack MeshGradientHero + AuroraBackground together.
- **Prefer real photos for local businesses** (or high-quality placeholders), then layer subtle gradients on top.
- **Mobile-first**: if you pick a desktop-only pattern, also instruct a mobile fallback layout.
- **Performance**: avoid running more than 2 heavy animated sections above the fold.

1. **Behavioral/Visual Signature** (10–15 lines; describes behavior + values + placement)
2. **Skeleton block** only for complex/high‑risk patterns (hero, signature, transitions)
3. **Required CSS/keyframes** only if the chosen pattern needs it
4. **Configuration** (colors, text, timing) tied to the business
5. **Usage guidance** (where/why the pattern appears)

### INTERNAL EXTRACTION GUIDE (Do Not Output)

For each chosen pattern:
- Copy **only** the needed skeleton (10–30 lines), not full component files.
- Do **not** output file paths or full TSX files (keep prompts tool-agnostic).
- Include CSS/keyframes only if the chosen pattern requires them.

### Example (Prompt-Friendly)

```markdown
> Pattern: MeshGradientHero
> Behavior: Soft mesh gradients create premium depth behind hero copy
> Values: 2–3 layers, blur 120–160px, opacity 25–35%
> Trigger: Load (static or subtle drift)
> Mobile: Reduce layers to 1–2, keep motion minimal
```

---

## AI PROMPTER QUICK REFERENCE

When writing prompts for Lovable.dev, include these specifics for each pattern:

**Color rule:** Use HSL tokens in prompts. If a pattern section shows hex examples, convert them to HSL tokens for implementation. The only exception is CutoutHero background matching for AI image generation.
**Scope rule:** Only specify fields for patterns you actually choose; do not list unused patterns.

| Pattern | Must Include |
|---------|-------------|
| **1.1 MeshGradientHero** | 3–4 HSL colors, headline + highlight word, description, 2 CTA texts, speed (8–12) |
| **1.2 DicedHero** | 4+ slides (title + image URL), auto-advance (true/false), headline, CTA text |
| **1.3 CutoutHero** | hero background HSL + AI HEX match (only for cutout), cutoutImage URL, accentShapes array, floatingBadge, headline, CTAs |
| **1.4 DiagonalSplitHero** | topColor/bottomColor (HSL), variant (diagonal-right/left, curve-right/left), textColorClass for readability, productImages array, floatingCards |
| **2.1 GlowCard** | Glow color (primary/purple/green/amber/rose/gradient), size (sm/md/lg), hover (true/false), content |
| **2.2 PlaceCard** | 2-5 images, title, subtitle, price + label, rating, tags, grid layout |
| **2.3 SpotlightCard** | Spotlight size (150-250px), card content, mobile fallback note |
| **3.1 ExpandingCards** | 3-6 items (id, title, description, imgSrc, icon), defaultActiveIndex, mobile fallback |
| **3.2 ExpandableGallery** | 4-12 image URLs, columns (2/3/4), gap (4/6/8) |
| **3.3 ScrollStack** | 3-6 cards, stackTop (15–25%), itemDistance (80–140), baseScale (0.82–0.9), reduced-motion fallback |
| **4.1 InteractiveSelector** | Options (id, label, description, icon), layout (horizontal/vertical/grid) |
| **4.2 ExpandableTabs** | Tabs array (id, icon, label, color), onChange callback |
| **4.3 InteractiveHoverButton** | Button text, onClick handler, mobile fallback |
| **5.1 MagneticText** | Text string, strength (0.1-0.5), speed (0.1-0.3) |
| **5.2 FlipWords** | 3-5 words array, duration (2000-3000ms), integration point |
| **5.3 TextLoop** | Texts array, interval (3000ms), variant (slide/fade/scale) |
| **5.4 TextReveal** | Text string, variant (word/char/mask), duration, delay |
| **5.5 MorphingCursorText** | text + hoverText, size class, fine-pointer only + accessibility fallback |
| **6.1 AnimatedCounter** | 3-4 items (value, suffix, label), grid layout |
| **7.1 SectionTransition** | SECTION_COLORS setup, fromColor (HSL), toColor (HSL), variant |
| **8.1 AuroraBackground** | Variant (warm/cool/sunset/ocean/forest), intensity (subtle/medium/bold) |
| **8.2 AmbientBlobs** | Variant (warm/cool/neutral), intensity (low/medium/high), count (2-4) |
| **8.3 ParallaxGlass** | Background texture type, glass cards count + layout, content structure |
| **8.4 ShapeBlurLite** | Variation (0–3), intensity (subtle/medium), interactive (on/off), reduced-motion fallback |
| **9.1 ParallaxSection** | Layers array (id, content, speed, zIndex), height |
| **9.2 InfiniteMarquee** | 5+ items (logos/cards), speed (30-50s), direction, pauseOnHover |
| **9.3 BentoGrid** | Items (title, description, icon, colSpan, rowSpan), columns (2/3/4) |
| **10.1 ServiceCard** | Service name, description, price, features list, icon, CTA (optional) |
| **10.2 TestimonialCarousel** | 3+ testimonials (quote, name, role, rating, image), autoAdvance + delay |
| **10.3 ContactCTA** | Headline, description, phone/email, primary + secondary CTA actions |
| **10.4 BusinessHours** | Week schedule array, highlightToday, showOpenNow (optional) |

---

## SECTION 1: HERO PATTERNS

### 1.1 MeshGradientHero

**Score**: +4 | **Desktop Only**: No | **Focal Rating**: ★★★★★

```tsx
// src/components/ui/mesh-gradient-hero.tsx
import React from 'react';
import { ArrowRight, ChevronDown, MapPin, ShieldCheck, Star } from 'lucide-react';

export interface MeshTrustIndicators {
  rating?: number;
  reviewCount?: number;
  yearsInBusiness?: number;
  location?: string;
}

export interface MeshGradientHeroProps {
  badge?: string;
  headline: string;
  highlightWord?: string;
  description: string;
  primaryCta: string;
  secondaryCta?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  colors?: [string, string, string, string];
  gradientSpeed?: number; // 8–14 feels premium
  showScrollIndicator?: boolean;
  trustIndicators?: MeshTrustIndicators;
}

export default function MeshGradientHero({
  badge,
  headline,
  highlightWord,
  description,
  primaryCta,
  secondaryCta,
  onPrimaryClick,
  onSecondaryClick,
  colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe'],
  gradientSpeed = 10,
  showScrollIndicator = true,
  trustIndicators,
}: MeshGradientHeroProps) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const parts = highlightWord && headline.includes(highlightWord) ? headline.split(highlightWord) : [headline];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted" />

        <div className="absolute inset-0 opacity-60">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`absolute rounded-full blur-3xl animate-mesh-${i + 1}`}
              style={{
                background: `radial-gradient(circle, ${colors[i]} 0%, transparent 70%)`,
                width: `${800 - i * 120}px`,
                height: `${800 - i * 120}px`,
                top: i % 2 === 0 ? `${i * 18}%` : 'auto',
                bottom: i % 2 === 1 ? `${i * 10}%` : 'auto',
                left: i < 2 ? `${i * 28}%` : 'auto',
                right: i >= 2 ? `${(i - 2) * 24}%` : 'auto',
                animationDuration: prefersReducedMotion ? '0s' : `${gradientSpeed}s`,
                animationIterationCount: prefersReducedMotion ? 1 : undefined,
              }}
            />
          ))}
        </div>

        {/* Subtle grain */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27120%27 height=%27120%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%27.8%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27120%27 height=%27120%27 filter=%27url(%23n)%27 opacity=%27.45%27/%3E%3C/svg%3E")`,
          }}
        />

        {/* Contrast overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-sm font-medium mb-6">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>{badge}</span>
          </div>
        )}

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
          {parts.length === 1 ? (
            headline
          ) : (
            <>
              {parts[0]}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {highlightWord}
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary/40 via-purple-500/40 to-pink-500/40 rounded-full" />
              </span>
              {parts.slice(1).join(highlightWord!)}
            </>
          )}
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <button
            onClick={onPrimaryClick}
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
          >
            {primaryCta}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </button>

          {secondaryCta && (
            <button
              onClick={onSecondaryClick}
              className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-foreground font-semibold text-lg hover:bg-white/15 transition-all duration-300"
            >
              {secondaryCta}
            </button>
          )}
        </div>

        {trustIndicators && (
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {typeof trustIndicators.rating === 'number' && (
              <div className="inline-flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-medium text-foreground">{trustIndicators.rating.toFixed(1)}</span>
                {trustIndicators.reviewCount ? <span>({trustIndicators.reviewCount} reviews)</span> : null}
              </div>
            )}

            {typeof trustIndicators.yearsInBusiness === 'number' && (
              <div className="inline-flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>{trustIndicators.yearsInBusiness}+ years</span>
              </div>
            )}

            {trustIndicators.location && (
              <div className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{trustIndicators.location}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {showScrollIndicator && !prefersReducedMotion && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      )}
    </section>
  );
}
```

**AI Prompter Example:**
```
Implement MeshGradientHero for a local service business:
- Badge: "Trusted locally"
- Headline: "Premium " + highlightWord "Service" + " that feels effortless"
- Highlight word: "Service"
- Description: "Fast booking, transparent pricing, and a team that shows up on time — every time."
- Primary CTA: "Book a Call"
- Secondary CTA: "See Pricing"
- Colors: ["#2563EB", "#7C3AED", "#EC4899", "#06B6D4"]
- Gradient speed: 10
- Trust indicators: rating=4.9, reviewCount=312, yearsInBusiness=12, location="Brooklyn"
```

---

### 1.3 CutoutHero


**RELIABILITY CONTRACT (CutoutHero)**
- **Seam rule:** If you are using a cutout image with a matte/background, the hero background and the image matte must be **pixel-identical**. Disable gradients/vignettes behind the cutout.
- **No halo:** Do not add drop-shadows or overlays that create edge seams.
- **Fallback:** If seam cannot be guaranteed, switch to a non-cutout hero pattern (unless explicitly forced by the spec).


**HARD RULES (CutoutHero):**
- Hero surface must be a **perfectly flat, single color** behind/around the cutout subject.
- Cutout image background must **exactly match** the hero surface color (same exact color value).
- Default cutout subject should be **non-human** (object/symbol/tools/still-life). Do not use real staff portraits as the cutout subject unless explicitly overridden.
- Do **not** place blobs/aurora/gradients behind or near the cutout edge zone. If you want ambience, confine it to the **text column only** or move it to the **next section**.


**STRICT COLOR-LOCK PROTOCOL (AI prompter chooses color)**
- The AI prompter must select one canonical solid color as **HERO_SOLID_HEX** (e.g., `#F2EDE2`) **for AI generation only**.
- Convert HERO_SOLID_HEX → **HERO_SOLID_HSL** (allow decimals) and use **only** `hsl(var(--hero-solid))` in CSS (HSL-only rule).
- Generate the hero image with a **perfectly uniform** background: “Background is exactly `HERO_SOLID_HEX` across the entire image; no vignette, gradient, falloff, paper texture, or noise in the background.”
- Object must float: enforce **12–18% margin** around the subject; no edge contact; no cropped shadows.
- If the rendered hero background and the image background look even slightly different: treat the **image background as canonical** and micro-adjust `--hero-solid` (HSL decimals) until it matches.

**Acceptance tests (must pass)**
- Zoom 200%: no halo/seam at the cutout edge, no “boxed photo” feel.
- Sample multiple points with a color picker: background is uniform; hero surface and image background match visually.
- Reduced motion: hero remains static; craft comes from layout/typography, not background effects.

**Score**: +4 | **Desktop Only**: No | **Focal Rating**: ★★★★★

```tsx
// src/components/ui/cutout-hero.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

export interface CutoutHeroProps {
  badge?: string;
  overline?: string;
  headline: string;
  description: string;
  primaryCta: string;
  secondaryCta?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  cutoutImage: string;
  cutoutAlt: string;
  backgroundColor: string; // MUST match AI image background exactly (hex or hsl)
  accentShapes?: Array<{
    color: string;
    size: string;
    position: { top?: string; right?: string; bottom?: string; left?: string };
    blur?: boolean;
  }>;
  floatingBadge?: {
    value: string;
    label: string;
  };
}

export default function CutoutHero({
  badge,
  overline,
  headline,
  description,
  primaryCta,
  secondaryCta,
  onPrimaryClick,
  onSecondaryClick,
  cutoutImage,
  cutoutAlt,
  backgroundColor,
  accentShapes = [],
  floatingBadge,
}: CutoutHeroProps) {
  return (
    <section 
      className="min-h-[90vh] grid lg:grid-cols-2 gap-8 lg:gap-12 items-center px-4 lg:px-8 py-16"
      style={{ backgroundColor }}
    >
      {/* Content Column */}
      <motion.div 
        className="space-y-6 order-2 lg:order-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {badge && (
          <div className="inline-flex px-4 py-2 rounded-full bg-white/10 text-sm font-medium">
            {badge}
          </div>
        )}
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary-foreground">
          {overline && (
            <span className="block italic font-normal text-3xl md:text-4xl mb-2">{overline}</span>
          )}
          <span className="block">{headline}</span>
        </h1>
        
        <p className="text-lg text-primary-foreground/80 max-w-lg">{description}</p>
        
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={onPrimaryClick}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-card text-foreground font-semibold text-lg transition-all duration-300 hover:scale-[1.02] shadow-lg"
          >
            {primaryCta}
            <ArrowRight className="w-5 h-5" />
          </button>
          
          {secondaryCta && (
            <button 
              onClick={onSecondaryClick}
              className="px-8 py-4 rounded-full border-2 border-primary-foreground/30 text-primary-foreground font-semibold transition-all duration-300 hover:bg-primary-foreground/10"
            >
              {secondaryCta}
            </button>
          )}
        </div>
      </motion.div>
      
      {/* Visual Composition Column */}
      <div className="relative order-1 lg:order-2">
        {/* Decorative accent shapes - render BEFORE image */}
        {accentShapes.map((shape, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${shape.blur ? 'blur-sm' : ''}`}
            style={{
              backgroundColor: shape.color,
              width: shape.size,
              height: shape.size,
              ...shape.position,
            }}
          />
        ))}
        
        {/* Main cutout image - bg matches section */}
        <motion.img 
          src={cutoutImage} 
          alt={cutoutAlt}
          className="relative z-10 w-full max-w-lg mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        />
        
        {/* Optional floating stat badge */}
        {floatingBadge && (
          <motion.div 
            className="absolute bottom-4 left-4 lg:bottom-8 lg:left-8 bg-card rounded-xl px-4 py-3 shadow-lg z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span className="text-2xl font-bold">{floatingBadge.value}</span>
            </div>
            <div className="text-xs text-muted-foreground">{floatingBadge.label}</div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
```

**Key Design Principle:** The AI image MUST be generated with an **exact background color match** to the hero section's `backgroundColor`. Since AI cannot generate transparent images, this color-matching technique creates the illusion of a floating/cutout visual.

**Visual Techniques:**
1. **Color-Matched AI Image**: Generate image with solid background matching hero section color
2. **Decorative Shape Layers**: Add 2-3 organic blob shapes behind/around the image for depth
3. **Floating UI Elements**: Optional stat badges positioned around the visual
4. **Split Layout**: Content left, visual composition right

**AI Image Integration (CRITICAL):**
- Image prompt MUST specify exact background color: "on solid #E54D2E background"
- Subject should be positioned with "breathing room" - not edge-to-edge
- Negative prompt MUST include: "white background, gradient, transparent, table, surface"

**AI Prompter Example:**
```
Implement CutoutHero for a healthy food restaurant:
- Badge: "New Opening"
- Overline: "September 20th, 2024"
- Headline: "Healthy Food Restaurant"
- Description: "Fresh, locally-sourced ingredients prepared daily with love. Experience the taste of wellness."
- Primary CTA: "Get Voucher"
- Hero background: #E54D2E (warm terracotta)
- Accent shapes: 2 circles (bg-amber-400/80 w-48, bg-amber-300/60 w-32) positioned behind visual
- Floating badge: "4.9" + "500+ Reviews"

AI Image Coordination (CRITICAL):
- Background: solid #E54D2E - MUST MATCH hero backgroundColor exactly
- Subject: Three poke bowls arranged in floating composition
- Style: food photography, studio lighting, centered with negative space
- Negative: white bg, gradient, table, surface, pattern, border
- Ratio: 1:1
```

---

### 1.4 DiagonalSplitHero

**Score**: +4 | **Desktop Only**: No | **Focal Rating**: ★★★★★

```tsx
// src/components/ui/diagonal-split-hero.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export type DiagonalVariant = 'diagonal-right' | 'diagonal-left' | 'curve-right' | 'curve-left';

export interface DiagonalSplitHeroProps {
  headline: string;
  highlightText?: string;
  description: string;
  primaryCta: string;
  secondaryCta?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  topColor: string;      // Primary color zone (text area)
  bottomColor: string;   // Secondary color zone
  variant?: DiagonalVariant;
  textColorClass?: string; // Ensure readability: text-white or text-foreground
  productImages?: Array<{
    src: string;
    alt: string;
    className?: string; // Position classes
  }>;
  floatingCards?: Array<{
    content: React.ReactNode;
    className?: string;
  }>;
}

// SVG path definitions for different variants
const DIAGONAL_PATHS = {
  'diagonal-right': 'M0,0 L100,0 L100,100 L0,80 Z',
  'diagonal-left': 'M0,0 L100,0 L100,80 L0,100 Z',
  'curve-right': 'M0,0 L100,0 L100,100 Q50,85 0,70 Z',
  'curve-left': 'M0,0 L100,0 Q50,15 0,30 L0,100 L100,100 Z',
};

export default function DiagonalSplitHero({
  headline,
  highlightText,
  description,
  primaryCta,
  secondaryCta,
  onPrimaryClick,
  onSecondaryClick,
  topColor,
  bottomColor,
  variant = 'diagonal-right',
  textColorClass = 'text-white',
  productImages = [],
  floatingCards = [],
}: DiagonalSplitHeroProps) {
  const path = DIAGONAL_PATHS[variant];
  
  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Background with diagonal split */}
      <div className="absolute inset-0">
        {/* Top color zone */}
        <div className="absolute inset-0" style={{ backgroundColor: topColor }} />
        
        {/* Bottom color zone with diagonal/curve clip */}
        <svg 
          className="absolute bottom-0 left-0 w-full h-[40%]" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <path d={path} fill={bottomColor} />
        </svg>
      </div>
      
      {/* Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Text Content - Always on solid color for readability */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight ${textColorClass}`}>
              {highlightText ? (
                <>
                  {headline.split(highlightText)[0]}
                  <span className="text-accent">{highlightText}</span>
                  {headline.split(highlightText).slice(1).join(highlightText)}
                </>
              ) : headline}
            </h1>
            
            <p className={`text-lg max-w-lg ${textColorClass} opacity-90`}>
              {description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onPrimaryClick}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-accent-foreground font-semibold text-lg transition-all duration-300 hover:scale-[1.02] shadow-lg"
              >
                {primaryCta}
                <ArrowRight className="w-5 h-5" />
              </button>
              
              {secondaryCta && (
                <button 
                  onClick={onSecondaryClick}
                  className={`px-8 py-4 rounded-full border-2 font-semibold transition-all duration-300 hover:bg-white/10 ${textColorClass} border-current/30`}
                >
                  {secondaryCta}
                </button>
              )}
            </div>
          </motion.div>
          
          {/* Visual Column - Product images crossing the boundary */}
          <div className="relative">
            {productImages.map((img, i) => (
              <motion.img
                key={i}
                src={img.src}
                alt={img.alt}
                className={`absolute shadow-2xl rounded-lg ${img.className || ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              />
            ))}
            
            {floatingCards.map((card, i) => (
              <motion.div
                key={i}
                className={`absolute bg-card rounded-xl shadow-xl p-4 ${card.className || ''}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              >
                {card.content}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Key Design Principles:**
1. **Text Readability First**: Text content is ALWAYS positioned on the solid color zone (topColor), never on the boundary
2. **CSS-based Diagonal/Curve**: Uses SVG clip-path for crisp diagonal or curved lines
3. **Overlapping Elements**: Product images and floating cards can cross the color boundary for visual interest
4. **Color Flexibility**: Works with any two contrasting colors

**Variant Options:**
- `diagonal-right`: Angle descends left to right (like BetterCloud example)
- `diagonal-left`: Angle ascends left to right
- `curve-right`: Curved boundary descending right
- `curve-left`: Curved boundary ascending left

**Text Readability Rules (CRITICAL):**
- If `topColor` is dark (e.g., blue, purple): use `textColorClass="text-white"`
- If `topColor` is light (e.g., white, cream): use `textColorClass="text-foreground"`
- Text should NEVER be placed where the diagonal crosses — only on solid color areas

**AI Prompter Example:**
```
Implement DiagonalSplitHero for a Dental Clinic:
- Headline: "Modern Dentistry for the Whole Family"
- Highlight text: "78%" (styled in accent color)
- Description: "BetterCloud automates onboarding, offboarding & mid-lifecycle changes..."
- Primary CTA: "Request a Demo"
- Secondary CTA: "Free Assessment"
- Top color: #2563EB (blue) — text area
- Bottom color: #FFFFFF (white)
- Variant: diagonal-right
- Text color: text-white (because topColor is dark)
- Product images: 3 dashboard screenshots at staggered positions crossing the diagonal
- Floating cards: Stats card showing "61.4K Files", badge showing "36% 60 Sanctioned"

Color Selection Rules:
- topColor should be your brand's primary color
- bottomColor should contrast (usually white or very light)
- textColorClass MUST ensure readability on topColor
```

---

### 1.2 DicedHero

**Score**: +4 | **Desktop Only**: No | **Focal Rating**: ★★★★★

```tsx
// src/components/ui/diced-hero.tsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface DicedSlide {
  title: string;
  image: string;
  alt?: string;
}

export interface DicedHeroProps {
  topText?: string;
  headline: string;
  description: string;
  ctaText: string;
  onCtaClick?: () => void;
  slides: DicedSlide[];
  autoAdvance?: boolean;
  autoAdvanceDelay?: number;
  showProgress?: boolean;
}

export function DicedHero({
  topText,
  headline,
  description,
  ctaText,
  onCtaClick,
  slides,
  autoAdvance = true,
  autoAdvanceDelay = 5000,
  showProgress = true,
}: DicedHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const touch = useRef<{ startX: number; startY: number } | null>(null);

  const slideCount = slides.length;

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + slideCount) % slideCount);
    setProgress(0);
  }, [slideCount]);

  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  // Autoplay + progress
  useEffect(() => {
    if (!autoAdvance || isPaused || slideCount < 2) return;

    const startedAt = Date.now();
    const tick = () => {
      const pct = Math.min(100, ((Date.now() - startedAt) / autoAdvanceDelay) * 100);
      setProgress(pct);
    };

    const interval = setInterval(tick, 50);
    const timer = setTimeout(() => next(), autoAdvanceDelay);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [autoAdvance, autoAdvanceDelay, isPaused, next, slideCount, activeIndex]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const active = useMemo(() => slides[activeIndex], [slides, activeIndex]);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { startX: t.clientX, startY: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const t0 = touch.current;
    if (!t0) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - t0.startX;
    const dy = t.clientY - t0.startY;
    touch.current = null;

    // horizontal swipe
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) prev();
      else next();
    }
  };

  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img loading="lazy" decoding="async"
              src={active.image}
              alt={active.alt || active.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/30 to-black/65" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {topText && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm md:text-base text-white/90 font-medium mb-4"
          >
            {topText}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6"
        >
          {headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
        >
          {description}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          onClick={onCtaClick}
          className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
        >
          {ctaText}
        </motion.button>

        {/* Thumbnails */}
        <div className="flex gap-3 justify-center mt-12">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`group relative transition-all duration-300 ${i == activeIndex ? 'w-20' : 'w-12'}`}
              aria-label={`Go to ${s.title}`}
            >
              <div className="h-12 rounded-lg overflow-hidden border-2 border-white/40 hover:border-white transition-colors">
                <img loading="lazy" decoding="async" src={s.image} alt={s.alt || s.title} className="w-full h-full object-cover" />
                {i === activeIndex && <div className="absolute inset-0 border-2 border-white rounded-lg" />}

                {showProgress && i === activeIndex && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <div
                      className="h-full bg-white"
                      style={{ width: `${isPaused ? 0 : progress}%` }}
                    />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Arrows (desktop) */}
      <div className="hidden md:block absolute inset-y-0 left-0 right-0 z-10 pointer-events-none">
        <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
          <button
            onClick={prev}
            className="pointer-events-auto w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={next}
            className="pointer-events-auto w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
```

**AI Prompter Example:**
```
Implement DicedHero for a restaurant:
- Top text: "Family recipes since 1985"
- Headline: "Authentic Italian Cuisine"
- Description: "Fresh pasta, wood-fired pizza, and cozy vibes in the heart of town."
- CTA text: "Reserve a Table"
- Slides (4+): title + image URL
- Auto-advance: true
- Delay: 5000ms
- Show progress: true
```



---

## SECTION 2: CARD PATTERNS

### 2.1 GlowCard

**Score**: +3 | **Desktop Only**: No | **Focal Rating**: ★★★★☆

```tsx
// src/components/ui/glow-card.tsx
import React from 'react';

export interface GlowCardProps {
  children: React.ReactNode;
  glowColor?: 'primary' | 'purple' | 'green' | 'amber' | 'rose' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'auto';
  className?: string;
  hover?: boolean;
}

const glowColors: Record<NonNullable<GlowCardProps['glowColor']>, string> = {
  primary: 'shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_50px_rgba(59,130,246,0.35)]',
  purple: 'shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:shadow-[0_0_50px_rgba(168,85,247,0.35)]',
  green: 'shadow-[0_0_20px_rgba(34,197,94,0.22)] hover:shadow-[0_0_50px_rgba(34,197,94,0.32)]',
  amber: 'shadow-[0_0_20px_rgba(251,191,36,0.22)] hover:shadow-[0_0_50px_rgba(251,191,36,0.32)]',
  rose: 'shadow-[0_0_20px_rgba(244,63,94,0.22)] hover:shadow-[0_0_50px_rgba(244,63,94,0.32)]',
  gradient: 'shadow-[0_0_22px_rgba(139,92,246,0.22),0_0_50px_rgba(236,72,153,0.16)] hover:shadow-[0_0_44px_rgba(139,92,246,0.34),0_0_70px_rgba(236,72,153,0.22)]',
};

const sizes = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  auto: '',
};

export function GlowCard({
  children,
  glowColor = 'primary',
  size = 'md',
  className = '',
  hover = true,
}: GlowCardProps) {
  return (
    <div
      className={[
        'relative rounded-2xl border border-border bg-card/70 backdrop-blur',
        sizes[size],
        glowColors[glowColor],
        'ring-1 ring-transparent focus-within:ring-primary/40',
        hover ? 'transition-all duration-300 hover:-translate-y-1' : '',
        className,
      ].join(' ')}
    >
      <div className="relative z-10">{children}</div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent" />
    </div>
  );
}
```

**AI Prompter Example:**
```
Implement GlowCard:
- Glow color: "gradient" for premium feel (or "primary" for subtle)
- Size: md
- Use for: service highlights, guarantees, or feature bullets
```

---

### 2.2 PlaceCard

**Score**: +3 | **Desktop Only**: No | **Focal Rating**: ★★★★☆

```tsx
// src/components/ui/place-card.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export interface PlaceCardProps {
  images: string[];
  title: string;
  subtitle: string;
  description: string;
  tags?: string[];
  rating?: number;
  price?: number;
  priceLabel?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  isTopRated?: boolean;
}

export function PlaceCard({
  images,
  title,
  subtitle,
  description,
  tags = [],
  rating,
  price,
  priceLabel,
  ctaText,
  onCtaClick,
  isTopRated = false,
}: PlaceCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="rounded-2xl border border-border bg-card overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Image Carousel */}
      <div className="relative aspect-[4/3] overflow-hidden group">
        <img loading="lazy" decoding="async"
          src={images[currentImageIndex]}
          alt={`${title} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Rated Badge */}
        {isTopRated && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
            Top Rated
          </div>
        )}

        {/* Image Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {safeImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'bg-white w-4'
                      : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-semibold mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          {rating && (
            <div className="flex items-center gap-1 ml-2">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span className="text-sm font-semibold">{rating}</span>
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-xs font-medium rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-3 border-t">
          {price !== undefined && (
            <div>
              <span className="text-xl font-bold">${price}</span>
              {priceLabel && (
                <span className="text-sm text-muted-foreground ml-1">
                  {priceLabel}
                </span>
              )}
            </div>
          )}
          {ctaText && (
            <button
              onClick={onCtaClick}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              {ctaText}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
```

**AI Prompter Example:**
```
Create PlaceCard grid (grid md:grid-cols-2 lg:grid-cols-3 gap-6):
Each card:
- Images: ["/room1.jpg", "/room2.jpg", "/room3.jpg"]
- Title: "Luxury Suite"
- Subtitle: "Ocean View • 2 Guests"
- Description: "Spacious suite with panoramic ocean views"
- Tags: ["Premium", "Ocean View"]
- Rating: 4.9
- Price: 299
- Price label: "/ night"
- CTA text: "Book Now"
- Is top rated: true
```

---

### 2.3 SpotlightCard

**Score**: +3 | **Desktop Only**: Yes | **Focal Rating**: ★★★★★

```tsx
// src/components/ui/spotlight-card.tsx
import React, { useRef, useState, useEffect } from 'react';

export interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
}

export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.1)',
  spotlightSize = 200,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    return () => card.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 ${className}`}
    >
      {/* Spotlight overlay - desktop only */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hidden md:block"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${spotlightSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 100%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
```

**AI Prompter Example:**
```
Create SpotlightCard grid (grid md:grid-cols-3 gap-6):
- Spotlight size: 200px
- Spotlight color: "rgba(255, 255, 255, 0.1)"
- Desktop only (mobile shows standard card)
Each card contains:
- Icon (Lucide, h-12 w-12, bg-primary/10 rounded-xl)
- Title (text-2xl font-bold mb-3)
- Description (text-base text-muted-foreground)
```

---

## SECTION 3: GALLERY PATTERNS

### 3.1 ExpandingCards

**Score**: +3 | **Desktop Only**: Yes | **Focal Rating**: ★★★★★

```tsx
// src/components/ui/expanding-cards.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface CardItem {
  id: number;
  title: string;
  description: string;
  imgSrc: string;
  icon?: React.ReactNode;
}

export interface ExpandingCardsProps {
  items: CardItem[];
  defaultActiveIndex?: number;
}

export function ExpandingCards({ items, defaultActiveIndex = 0 }: ExpandingCardsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden md:flex gap-4 h-[500px]">
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={item.id}
              initial={false}
              animate={{
                flex: isActive ? '0 0 65%' : `0 0 calc((100% - 65%) / ${items.length - 1})`,
              }}
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
              onClick={() => setActiveIndex(index)}
              className="relative overflow-hidden rounded-2xl cursor-pointer group"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img loading="lazy" decoding="async"
                  src={item.imgSrc}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-b transition-opacity duration-500 ${
                    isActive
                      ? 'from-black/20 via-black/40 to-black/70'
                      : 'from-black/40 to-black/80'
                  }`}
                />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6 text-white">
                {item.icon && (
                  <motion.div
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0.7, scale: isActive ? 1 : 0.9 }}
                    className="mb-4"
                  >
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      {item.icon}
                    </div>
                  </motion.div>
                )}

                <motion.h3
                  initial={false}
                  animate={{
                    fontSize: isActive ? '1.875rem' : '1.5rem',
                    opacity: 1,
                  }}
                  className="font-bold mb-2 leading-tight"
                >
                  {item.title}
                </motion.h3>

                <motion.p
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    height: isActive ? 'auto' : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-white/90 text-base overflow-hidden"
                >
                  {item.description}
                </motion.p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Fallback */}
      <div className="grid md:hidden gap-4">
        {items.map((item) => (
          <div key={item.id} className="relative h-64 rounded-2xl overflow-hidden">
            <img loading="lazy" decoding="async" src={item.imgSrc} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              {item.icon && (
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3">
                  {item.icon}
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
              <p className="text-white/90">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
```

**AI Prompter Example:**
```
Implement ExpandingCards (desktop only with mobile fallback):
Items: [
  { id: 1, title: "Breakfast", description: "Start your day right", imgSrc: "/breakfast.jpg", icon: <Coffee /> },
  { id: 2, title: "Lunch", description: "Midday delights", imgSrc: "/lunch.jpg", icon: <Utensils /> },
  { id: 3, title: "Desserts", description: "Sweet endings", imgSrc: "/desserts.jpg", icon: <Cake /> }
]
Default active: 0 (first card expanded)
Height: 500px
Mobile: Vertical stack of full cards
```

---

### 3.2 ExpandableGallery

**Score**: +3 | **Desktop Only**: No | **Focal Rating**: ★★★★☆

**SAFE MODE HARD RULES (no broken galleries)**
- Never render empty tiles. If there are 2 images, render a 2-up grid; if 1, render 1-up; max 3 tiles.
- If more than 3 images exist, still show only 3 tiles + a “Mehr ansehen” control that opens the lightbox at index 0.
- If an image fails to load, remove it from the list and **recompute** the layout. Do not show broken-image icons.
- Lightbox accessibility contract: `role="dialog"` + `aria-modal="true"`, ESC closes, focus trap, and focus returns to the triggering tile. Lock background scroll while open.
- Keyboard: tiles are focusable; Enter/Space opens; visible focus ring (never clipped).


```tsx
// src/components/ui/expandable-gallery.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export interface ExpandableGalleryProps {
  images: string[];
  columns?: 1 | 2 | 3;
  gap?: number;
}

export function ExpandableGallery({
  images,
  columns = 3,
  gap = 4,
}: ExpandableGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
  };

  const safeImages = images.filter(Boolean);
  const safeColumns = Math.min(columns, Math.max(1, Math.min(3, safeImages.length))) as 1|2|3;

  const gapClass = `gap-${gap}`;

  return (
    <>
      {/* Gallery Grid */}
      <div className={`grid ${gridCols[columns]} ${gapClass}`}>
        {safeImages.map((image, index) => (
          <motion.div
            key={index}
            layoutId={`image-${index}`}
            onClick={() => setSelectedIndex(index)}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
            whileHover={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <img loading="lazy" decoding="async"
              src={image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </motion.div>
        ))}
      </div>

      {/* Expanded View Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <motion.div
              layoutId={`image-${selectedIndex}`}
              className="relative max-w-5xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img loading="lazy" decoding="async"
                src={safeImages[selectedIndex]}
                alt={`Gallery image ${selectedIndex + 1}`}
                className="w-full h-full object-contain rounded-lg"
              />
            </motion.div>

            {/* Navigation */}
            {images.length > 1 && (
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 pointer-events-none">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : (prev ?? 0) - 1));
                  }}
                  className="pointer-events-auto w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Previous"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex((prev) => ((prev ?? 0) + 1) % images.length);
                  }}
                  className="pointer-events-auto w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Next"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

**AI Prompter Example:**
```
Implement ExpandableGallery:
- Images: ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg", "/img5.jpg", "/img6.jpg"]
- Columns: 3
- Gap: 4
- Click to expand to modal with navigation
- ESC to close
```

---


### 3.3 ScrollStack

**Score**: +4 | **Desktop Only**: No | **Focal Rating**: ★★★★★

**What it does**: turns a list of cards into a “stacking story” while you scroll (premium narrative effect, great for: *process*, *story*, *before/after*, *services explained in steps*).

**When to use**
- Best for: “How it works” / “Our process” / “Why choose us” storytelling sections.
- Avoid on pages that must feel ultra-classic or extremely performance-minimal.

**Important constraints (Lovable prompt friendly)**
- **No scroll hijacking**: use native window scroll (default). Do **not** replace global scrolling.
- **Reduced motion**: if `prefers-reduced-motion`, render as a normal stacked list.
- **Mobile**: keep fewer cards (3–4) and reduce spacing.

```tsx
// src/components/ui/scroll-stack.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  return reduced;
}

export interface ScrollStackProps {
  className?: string;
  children: React.ReactNode;
  /** Vertical spacing between cards in normal flow (px) */
  itemDistance?: number;
  /** How much each deeper card scales down (0.02–0.05 feels good) */
  itemScale?: number;
  /** Extra stack offset per item (px) */
  itemStackDistance?: number;
  /** Where the stack pins in viewport (percentage, e.g. 0.2 = 20%) */
  stackTop?: number;
  /** Where scaling completes (percentage, e.g. 0.1 = 10%) */
  scaleEnd?: number;
  /** Base scale for the deepest card */
  baseScale?: number;
  /** Optional: add rotation per card (deg) */
  rotationAmount?: number;
  /** Optional: add blur per depth (px) */
  blurAmount?: number;
}

export function ScrollStackItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={
        `scroll-stack-card rounded-[32px] border border-white/10 bg-white/70 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] ` +
        `p-8 md:p-10 ${className}`
      }
    >
      {children}
    </div>
  );
}

export default function ScrollStack({
  children,
  className = '',
  itemDistance = 110,
  itemScale = 0.03,
  itemStackDistance = 28,
  stackTop = 0.2,
  scaleEnd = 0.1,
  baseScale = 0.86,
  rotationAmount = 0,
  blurAmount = 0,
}: ScrollStackProps) {
  const reducedMotion = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const rafRef = useRef<number | null>(null);

  const cards = useMemo(() => React.Children.toArray(children), [children]);

  useEffect(() => {
    if (reducedMotion) return;

    const update = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;

      const scrollTop = window.scrollY;
      const vh = window.innerHeight;
      const stackTopPx = vh * stackTop;
      const scaleEndPx = vh * scaleEnd;

      const wrapTopAbs = wrap.getBoundingClientRect().top + window.scrollY;
      const endTopAbs = (endRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY;
      const pinEnd = endTopAbs - vh * 0.5;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        const cardTopAbs = wrapTopAbs + card.offsetTop;
        const triggerStart = cardTopAbs - stackTopPx - itemStackDistance * i;
        const triggerEnd = cardTopAbs - scaleEndPx;
        const pinStart = triggerStart;

        const prog = (v: number, a: number, b: number) => (v <= a ? 0 : v >= b ? 1 : (v - a) / (b - a));
        const scaleProg = prog(scrollTop, triggerStart, triggerEnd);

        const targetScale = baseScale + i * itemScale;
        const scale = 1 - scaleProg * (1 - targetScale);
        const rotation = rotationAmount ? i * rotationAmount * scaleProg : 0;

        let translateY = 0;
        const pinned = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (pinned) translateY = scrollTop - cardTopAbs + stackTopPx + itemStackDistance * i;
        else if (scrollTop > pinEnd) translateY = pinEnd - cardTopAbs + stackTopPx + itemStackDistance * i;

        let blur = 0;
        if (blurAmount && scrollTop >= pinStart) {
          // blur deeper cards behind the topmost “active” card
          const topIndex = Math.min(i, Math.floor((scrollTop - (wrapTopAbs - stackTopPx)) / Math.max(itemDistance, 1)));
          if (i < topIndex) blur = (topIndex - i) * blurAmount;
        }

        card.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(3)}) rotate(${rotation.toFixed(2)}deg)`;
        card.style.filter = blur > 0 ? `blur(${blur.toFixed(2)}px)` : '';
        card.style.transformOrigin = 'top center';
        card.style.willChange = 'transform, filter';
      });
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        update();
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [
    reducedMotion,
    itemDistance,
    itemScale,
    itemStackDistance,
    stackTop,
    scaleEnd,
    baseScale,
    rotationAmount,
    blurAmount,
  ]);

  if (reducedMotion) {
    return <div className={`space-y-6 ${className}`}>{children}</div>;
  }

  return (
    <section ref={wrapRef} className={`relative ${className}`}>
      <div className="space-y-8" style={{ paddingTop: '18vh', paddingBottom: '46vh' }}>
        {cards.map((node, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) cardRefs.current[i] = el;
            }}
            style={{ marginBottom: i < cards.length - 1 ? itemDistance : 0 }}
          >
            {node}
          </div>
        ))}
        <div ref={endRef} className="h-px w-full" />
      </div>
    </section>
  );
}
```

**Usage**
```tsx
import ScrollStack, { ScrollStackItem } from '@/components/ui/scroll-stack';

<ScrollStack stackTop={0.22} baseScale={0.85} itemDistance={120}>
  <ScrollStackItem>
    <h3 className="text-2xl font-semibold">Step 1: Quick check-in</h3>
    <p className="mt-2 text-muted-foreground">We understand your goal and constraints.</p>
  </ScrollStackItem>
  <ScrollStackItem>
    <h3 className="text-2xl font-semibold">Step 2: Plan</h3>
    <p className="mt-2 text-muted-foreground">Clear steps, timelines, and expectations.</p>
  </ScrollStackItem>
  <ScrollStackItem>
    <h3 className="text-2xl font-semibold">Step 3: Delivery</h3>
    <p className="mt-2 text-muted-foreground">Polished outcome and follow-up support.</p>
  </ScrollStackItem>
</ScrollStack>
```

**Prompting note for Lovable.dev**: tell it to implement **native window scrolling**, add a **reduced-motion fallback**, and keep the number of cards small (3–5).

**Optional (ReactBits install)**
```bash
npx shadcn@latest add @react-bits/ScrollStack-TS-CSS
```

## SECTION 4: INTERACTIVE PATTERNS

### 4.1 InteractiveSelector

**Score**: +3 | **Desktop Only**: No | **Focal Rating**: ★★★★☆

```tsx
// src/components/ui/interactive-selector.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SelectorOption {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  image?: string;
}

export interface InteractiveSelectorProps {
  options: SelectorOption[];
  defaultSelected?: string;
  onChange?: (id: string) => void;
  layout?: 'horizontal' | 'vertical' | 'grid';
}

export function InteractiveSelector({
  options,
  defaultSelected,
  onChange,
  layout = 'horizontal',
}: InteractiveSelectorProps) {
  const [selected, setSelected] = useState(defaultSelected || options[0]?.id);

  const handleSelect = (id: string) => {
    setSelected(id);
    onChange?.(id);
  };

  const layoutClasses = {
    horizontal: 'flex gap-3 overflow-x-auto pb-2',
    vertical: 'flex flex-col gap-3',
    grid: 'grid grid-cols-2 md:grid-cols-3 gap-4',
  };

  return (
    <div className={layoutClasses[layout]}>
      {options.map((option) => {
        const isSelected = selected === option.id;

        return (
          <motion.button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`relative flex-shrink-0 rounded-xl p-4 text-left transition-all duration-300 ${
              layout === 'horizontal' ? 'min-w-[200px]' : 'w-full'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Background */}
            <div
              className={`absolute inset-0 rounded-xl border-2 transition-all duration-300 ${
                isSelected
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            />

            {/* Content */}
            <div className="relative z-10">
              {option.icon && (
                <div className="mb-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}
                  >
                    {option.icon}
                  </div>
                </div>
              )}

              {option.image && (
                <div className="mb-3 aspect-video rounded-lg overflow-hidden">
                  <img loading="lazy" decoding="async" src={option.image} alt={option.label} className="w-full h-full object-cover" />
                </div>
              )}

              <h3
                className={`font-semibold mb-1 transition-colors ${
                  isSelected ? 'text-primary' : 'text-foreground'
                }`}
              >
                {option.label}
              </h3>

              {option.description && (
                <p className="text-sm text-muted-foreground">{option.description}</p>
              )}
            </div>

            {/* Check mark */}
            <AnimatePresence>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                >
                  <svg className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}
```

**AI Prompter Example:**
```
Implement InteractiveSelector:
- Layout: "horizontal"
- Options: [
    { id: "basic", label: "Basic", description: "Essential features", icon: <Zap /> },
    { id: "pro", label: "Pro", description: "Advanced tools", icon: <Star /> },
    { id: "enterprise", label: "Enterprise", description: "Full suite", icon: <Crown /> }
  ]
- Default selected: "pro"
- On change: Update parent state
```

---

### 4.2 ExpandableTabs

**Score**: +2 | **Desktop Only**: No | **Focal Rating**: ★★★☆☆

```tsx
// src/components/ui/expandable-tabs.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

export interface TabItem {
  id: string;
  icon: LucideIcon;
  label: string;
  color: string;
}

export interface ExpandableTabsProps {
  tabs: TabItem[];
  onChange?: (id: string) => void;
  defaultActive?: string;
}

export function ExpandableTabs({ tabs, onChange, defaultActive }: ExpandableTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultActive || tabs[0]?.id);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    onChange?.(id);
  };

  return (
    <div className="flex gap-2 p-2 bg-muted rounded-2xl">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <motion.button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-colors overflow-hidden ${
              isActive ? 'text-white' : 'text-muted-foreground hover:text-foreground'
            }`}
            animate={{
              flex: isActive ? '1 1 auto' : '0 0 auto',
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* Animated background */}
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className={`absolute inset-0 ${tab.color}`}
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}

            <Icon className={`relative z-10 w-5 h-5 flex-shrink-0`} />

            {/* Label with animation */}
            <motion.span
              className="relative z-10 whitespace-nowrap"
              initial={false}
              animate={{
                width: isActive ? 'auto' : 0,
                opacity: isActive ? 1 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              {tab.label}
            </motion.span>
          </motion.button>
        );
      })}
    </div>
  );
}
```

**AI Prompter Example:**
```
Implement ExpandableTabs:
- Tabs: [
    { id: "home", icon: Home, label: "Home", color: "bg-blue-600" },
    { id: "profile", icon: User, label: "Profile", color: "bg-pink-500" },
    { id: "settings", icon: Settings, label: "Settings", color: "bg-purple-600" }
  ]
- Default active: "home"
- On change: Switch content sections
```

---

### 4.3 InteractiveHoverButton

**Score**: +2 | **Desktop Only**: Yes | **Focal Rating**: ★★★☆☆

```tsx
// src/components/ui/interactive-hover-button.tsx
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export interface InteractiveHoverButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export function InteractiveHoverButton({ 
  text, 
  onClick,
  className = '' 
}: InteractiveHoverButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <>
      {/* Desktop Version with Hover Effect */}
      <motion.button
        ref={buttonRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`hidden md:block relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold overflow-hidden ${className}`}
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated gradient spot */}
        <motion.div
          className="absolute inset-0 opacity-0"
          animate={{
            opacity: isHovered ? 0.3 : 0,
          }}
          style={{
            background: `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.8), transparent)`,
          }}
        />
        <span className="relative z-10">{text}</span>
      </motion.button>

      {/* Mobile Version - Standard Button */}
      <button
        onClick={onClick}
        className={`md:hidden px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold active:scale-95 transition-transform ${className}`}
      >
        {text}
      </button>
    </>
  );
}
```

**AI Prompter Example:**
```
Implement InteractiveHoverButton:
- Text: "Get Started"
- Desktop: Cursor-following light effect
- Mobile: Standard button with tap feedback
- On click: Navigate to signup
```

---

## SECTION 5: TEXT PATTERNS

### 5.1 MagneticText

**Score**: +2 | **Desktop Only**: Yes | **Focal Rating**: ★★☆☆☆

```tsx
// src/components/ui/magnetic-text.tsx
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface MagneticTextProps {
  children: string;
  className?: string;
  strength?: number;
  speed?: number;
}

export function MagneticText({
  children,
  className = '',
  strength = 0.3,
  speed = 0.15,
}: MagneticTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      setPosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`inline-block cursor-default ${className}`}>
      <motion.span
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: speed }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </div>
  );
}
```

**AI Prompter Example:**
```
Implement MagneticText for headline:
- Text: "Innovation"
- Strength: 0.2 (subtle movement)
- Speed: 0.15
- Desktop only effect
```

---

### 5.2 FlipWords

**Score**: +2 | **Desktop Only**: No | **Focal Rating**: ★★☆☆☆

**⚠️ CRITICAL: SENTENCE POSITION RULE**

FlipWords MUST be the **LAST WORD** in its sentence/phrase. This is non-negotiable because:
1. **Grammatical correctness**: Many languages (German, French, etc.) have word endings that change based on context
2. **Animation flow**: Sentence-final position prevents jarring mid-sentence jumps
3. **Reading rhythm**: Users complete the static part first, then watch the animation

**❌ WRONG POSITIONS:**
```markdown
"Das {FlipWords} ist hier" — Mid-sentence breaks reading flow
"Ein {FlipWords} Erlebnis erwartet Sie" — Adjective position causes grammar issues
"Wir bieten {FlipWords} Service" — Mid-phrase disrupts comprehension
```

**✅ CORRECT POSITIONS:**
```markdown
"Unser Service ist {FlipWords}." — Sentence-final (predicate adjective)
"Erleben Sie etwas {FlipWords}." — Sentence-final after verb
"Weine, die {FlipWords} sind." — Clause-final after relative pronoun
"Terroir, das bleibt: {FlipWords}." — After colon (restart position)
```

**GERMAN-SPECIFIC PATTERNS:**
```markdown
✅ "Das Weingut, das {FlipWords} ist." — Relative clause final
✅ "Wir machen es {FlipWords}." — Main clause final  
✅ "Qualität, die {FlipWords} bleibt." — Adjective clause final
✅ "Genuss pur: {FlipWords}." — After colon (new phrase start)
```

```tsx
// src/components/ui/flip-words.tsx
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface FlipWordsProps {
  words: string[];
  duration?: number;
  className?: string;
}

export function FlipWords({ words, duration = 2500, className = '' }: FlipWordsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <span className={`inline-block relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -20, rotateX: 90 }}
          transition={{
            duration: 0.4,
            ease: [0.33, 1, 0.68, 1],
          }}
          className="inline-block"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
```

**AI Prompter Example:**
```
Implement FlipWords at SENTENCE-FINAL position:

✅ CORRECT: "We serve ingredients that are {FlipWords}."
   Words: ["fresh", "local", "organic", "seasonal"]
   Duration: 2500ms

❌ WRONG: "We serve {FlipWords} ingredients" — mid-sentence position

German example:
✅ CORRECT: "Terroir, das bleibt: {FlipWords}."
   Words: ["klar", "mineralisch", "herzlich"]
   
❌ WRONG: "Mosel-Terroir, das {FlipWords} bleibt." — adjective before verb
```

---

### 5.3 TextLoop

**Score**: +2 | **Desktop Only**: No | **Focal Rating**: ★★☆☆☆

```tsx
// src/components/ui/text-loop.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface TextLoopProps {
  texts: string[];
  interval?: number;
  className?: string;
  variant?: 'slide' | 'fade' | 'scale';
}

export function TextLoop({
  texts,
  interval = 3000,
  className = '',
  variant = 'slide',
}: TextLoopProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % texts.length);
    }, interval);
    return () => clearInterval(timer);
  }, [texts.length, interval]);

  const variants = {
    slide: {
      initial: { x: 50, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -50, opacity: 0 },
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    scale: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 1.2, opacity: 0 },
    },
  };

  return (
    <div className={`inline-block overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={variants[variant].initial}
          animate={variants[variant].animate}
          exit={variants[variant].exit}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="inline-block"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
```

**AI Prompter Example:**
```
Implement TextLoop:
- Texts: ["Powerful", "Fast", "Reliable", "Secure"]
- Interval: 3000ms
- Variant: "slide"
- Use in subtitle below headline
```

---

### 5.4 TextReveal

**Score**: +3 | **Desktop Only**: No | **Focal Rating**: ★★★★☆

```tsx
// src/components/ui/text-reveal.tsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
}

export function TextReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  staggerDelay = 0.03,
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const words = children.split(' ');

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden">
          <motion.span
            initial={{ y: '100%' }}
            animate={isInView ? { y: 0 } : { y: '100%' }}
            transition={{
              duration,
              delay: delay + wordIndex * staggerDelay,
              ease: [0.33, 1, 0.68, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
          {wordIndex < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </div>
  );
}

// Character variant
export function TextRevealCharacters({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  staggerDelay = 0.02,
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const characters = children.split('');

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration,
            delay: delay + index * staggerDelay,
            ease: 'easeOut',
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
}

// Mask variant
export function TextRevealMask({
  children,
  className = '',
  delay = 0,
  duration = 1.5,
}: Omit<TextRevealProps, 'staggerDelay'>) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
        transition={{
          duration,
          delay,
          ease: [0.33, 1, 0.68, 1],
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
```

**AI Prompter Example:**
```
Implement TextReveal for section headline:
- Text: "Beautiful experiences start here"
- Variant: Word-by-word (default)
- Duration: 0.8s
- Stagger delay: 0.03s
- Triggers on scroll into view
```

---


### 5.5 MorphingCursorText

**Score**: +2 | **Desktop Only**: Yes (fine pointer) | **Focal Rating**: ★★★☆☆

**What it does**: an interactive headline where a circular “cursor” reveals alternate text. Use sparingly for premium, playful moments.

**When to use**
- Good for: one hero highlight word (“CREATE → ELEVATE”), a section title, or a playful brand moment.
- Avoid for: critical navigation, forms, or anything that must remain obvious.

**Accessibility & safety**
- Only enable on **fine pointers** (mouse/trackpad). On mobile, show normal text.
- Respect **prefers-reduced-motion** by disabling the effect.
- Don’t remove the cursor globally—only inside this component.

```tsx
// src/components/ui/morphing-cursor-text.tsx
"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const onChange = () => setFine(mq.matches);
    onChange();
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  return fine;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  return reduced;
}

interface MorphingCursorTextProps {
  text: string;
  hoverText: string;
  className?: string;
  circleSize?: number; // px
}

export default function MorphingCursorText({
  text,
  hoverText,
  className,
  circleSize = 150,
}: MorphingCursorTextProps) {
  const finePointer = useFinePointer();
  const reducedMotion = usePrefersReducedMotion();

  // Safe fallback
  if (!finePointer || reducedMotion) {
    return (
      <span className={cn('font-bold tracking-tight', className)}>
        {text}
      </span>
    );
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef<number>();

  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      setContainerSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.16);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.16);

      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${-pos.current.x}px, ${-pos.current.y}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => raf.current && cancelAnimationFrame(raf.current);
  }, []);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  }, []);

  const onEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    mouse.current = { x, y };
    pos.current = { x, y };
    setIsHovered(true);
  }, []);

  const onLeave = useCallback(() => setIsHovered(false), []);

  const circleStyle = useMemo(
    () => ({
      width: isHovered ? circleSize : 0,
      height: isHovered ? circleSize : 0,
      transition: 'width 0.45s cubic-bezier(0.33, 1, 0.68, 1), height 0.45s cubic-bezier(0.33, 1, 0.68, 1)',
      willChange: 'transform, width, height',
    }),
    [isHovered, circleSize]
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={cn('relative inline-flex items-center justify-center cursor-none select-none', className)}
      aria-label={`${text} ${hoverText}`}
    >
      <span className="font-bold tracking-tight text-foreground">{text}</span>

      <div
        ref={circleRef}
        className="absolute left-0 top-0 pointer-events-none rounded-full bg-foreground overflow-hidden"
        style={circleStyle}
      >
        <div
          ref={innerRef}
          className="absolute flex items-center justify-center"
          style={{
            width: containerSize.width,
            height: containerSize.height,
            top: '50%',
            left: '50%',
            willChange: 'transform',
          }}
        >
          <span className="font-bold tracking-tight text-background whitespace-nowrap">{hoverText}</span>
        </div>
      </div>
    </div>
  );
}
```

**Usage**
```tsx
import MorphingCursorText from '@/components/ui/morphing-cursor-text';

<h1 className="text-5xl md:text-7xl font-bold tracking-tight">
  We <MorphingCursorText className="mx-2 inline-flex" text="create" hoverText="elevate" /> your brand.
</h1>
```

**Prompting note for Lovable.dev**: instruct “enable only on pointer:fine and disable under prefers-reduced-motion; otherwise render plain text.”

## SECTION 6: STATS PATTERNS

### 6.1 AnimatedCounter


**RELIABILITY CONTRACT (AnimatedCounter)**
- `value` MUST be numeric-only (e.g., `20`, `2014`). Put words (e.g., “Jahre”) in `label` or `suffix`.
- **No placeholder 0:** The final value must be present immediately; animation is decorative only.
- **Fallback:** If value parsing fails or reduced-motion is enabled, render static values (no counting).

**Score**: +2 | **Desktop Only**: No | **Focal Rating**: ★★★☆☆

```tsx
// src/components/ui/animated-counter.tsx
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export interface CounterItem {
  value: number;
  suffix?: string;
  label: string;
}

export interface AnimatedCounterProps {
  items: CounterItem[];
  duration?: number;
  staggerDelay?: number;
}

export function AnimatedCounter({
  items,
  duration = 2,
  staggerDelay = 0.15,
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {items.map((item, index) => (
        <Counter
          key={index}
          value={item.value}
          suffix={item.suffix}
          label={item.label}
          duration={duration}
          delay={index * staggerDelay}
          shouldAnimate={isInView}
        />
      ))}
    </div>
  );
}

function Counter({
  value,
  suffix = '',
  label,
  duration,
  delay,
  shouldAnimate,
}: CounterItem & { duration: number; delay: number; shouldAnimate: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime - delay * 1000) / (duration * 1000), 1);

      if (progress >= 0) {
        setCount(Math.floor(progress * value));
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration, delay, shouldAnimate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-sm md:text-base text-muted-foreground">{label}</div>
    </motion.div>
  );
}
```

**AI Prompter Example:**
```
Implement AnimatedCounter:
- Items: [
    { value: 15, suffix: "+", label: "Years Experience" },
    { value: 5000, suffix: "+", label: "Happy Customers" },
    { value: 98, suffix: "%", label: "Satisfaction Rate" },
    { value: 24, suffix: "/7", label: "Support" }
  ]
- Duration: 2s
- Stagger: 150ms
- Grid: grid-cols-2 md:grid-cols-4
```

---

## SECTION 7: TRANSITION PATTERNS

### 7.1 SectionTransition

**Score**: +2 | **Desktop Only**: No | **Focal Rating**: ★☆☆☆☆

```tsx
// src/components/ui/section-transition.tsx
import React from 'react';

export interface SectionTransitionProps {
  color: string;
  variant?: 'wave-organic' | 'wave-elegant' | 'diagonal';
  position?: 'bottom' | 'top'; 
}

export function SectionTransition({ color, variant = 'wave-organic', position = 'bottom' }: SectionTransitionProps) {
  const paths = {
    'wave-organic': "M0,36 C260,10 500,64 740,36 C980,8 1220,62 1440,36 L1440,96 L0,96 Z",
    'wave-elegant': "M0,48 C360,20 720,76 1080,48 C1260,34 1380,56 1440,48 L1440,96 L0,96 Z",
    'diagonal': "M0,96 L1440,0 L1440,96 L0,96 Z",
  };

  const isTop = position === 'top';

  return (
    <div 
      className={`pointer-events-none absolute inset-x-0 z-20 leading-none ${isTop ? '-top-[1px] rotate-180' : '-bottom-[1px]'}`} 
      aria-hidden="true"
    >
      <svg width="100%" height="72" viewBox="0 0 1440 96" preserveAspectRatio="none" className="block w-full">
        <path d={paths[variant]} style={{ fill: color }} />
      </svg>
      {/* Spacer to prevent hairline gaps */}
      <div style={{ height: '2px', backgroundColor: color, marginTop: '-1px' }} />
    </div>
  );
}
```

**CRITICAL SETUP - Add to top of Index.tsx:**
```tsx
const SECTION_COLORS = {
  hero: "hsl(42 45% 96%)",
  features: "hsl(38 30% 94%)",
  menu: "hsl(42 45% 96%)",
  story: "hsl(40 40% 98%)",
  footer: "hsl(22 45% 22%)",
} as const;
```

**AI Prompter Example:**
```
Setup SectionTransition system:

1. Scenario: Solid (Hero) -> Image (Provenance)
   - Goal: Hero color "waves" over the top of the Image.
   - Place inside Provenance (Image) section:
   <SectionTransition position="top" color={SECTION_COLORS.hero} />

2. Scenario: Image (Provenance) -> Solid (Menu)
   - Goal: Menu color "waves" over the bottom of the Image.
   - Place inside Provenance (Image) section:
   <SectionTransition position="bottom" color={SECTION_COLORS.menu} />

3. Scenario: Solid -> Solid
   - Use position="bottom" on the upper section.
   <SectionTransition position="bottom" color={SECTION_COLORS.next_section} />

CRITICAL: Always use explicit color tokens from SECTION_COLORS.
```

---

## SECTION 8: AMBIENT PATTERNS

### 8.1 AuroraBackground

**Score**: +3 | **Desktop Only**: No | **Focal Rating**: ★★★★☆

```tsx
// src/components/ui/aurora-background.tsx
import React from 'react';

export interface AuroraBackgroundProps {
  variant?: 'warm' | 'cool' | 'sunset' | 'ocean' | 'forest';
  intensity?: 'subtle' | 'medium' | 'bold';
  children: React.ReactNode;
  className?: string;
}

const colorSets = {
  warm: ['#ff9a9e', '#fad0c4', '#ffecd2', '#fcb69f'],
  cool: ['#a8edea', '#fed6e3', '#d299c2', '#fef9d7'],
  sunset: ['#ff6b6b', '#feca57', '#ee5a6f', '#f7b731'],
  ocean: ['#667eea', '#764ba2', '#f093fb', '#4facfe'],
  forest: ['#52c234', '#061700', '#6dd5ed', '#2193b0'],
};

const opacities = {
  subtle: 0.3,
  medium: 0.5,
  bold: 0.7,
};

export function AuroraBackground({
  variant = 'warm',
  intensity = 'medium',
  children,
  className = '',
}: AuroraBackgroundProps) {
  const colors = colorSets[variant];
  const opacity = opacities[intensity];

  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Aurora layers */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full blur-3xl animate-aurora-1"
          style={{
            background: `radial-gradient(circle, ${colors[0]} 0%, transparent 70%)`,
            opacity,
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl animate-aurora-2"
          style={{
            background: `radial-gradient(circle, ${colors[1]} 0%, transparent 70%)`,
            opacity,
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 w-[700px] h-[700px] rounded-full blur-3xl animate-aurora-3"
          style={{
            background: `radial-gradient(circle, ${colors[2]} 0%, transparent 70%)`,
            opacity,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
```

**Required CSS (add to index.css):**
```css
@keyframes aurora-1 {
  0%, 100% { transform: translate(0%, 0%) rotate(0deg) scale(1); }
  25% { transform: translate(3%, -4%) rotate(2deg) scale(1.05); }
  50% { transform: translate(-2%, 3%) rotate(-1deg) scale(0.95); }
  75% { transform: translate(4%, 1%) rotate(3deg) scale(1.02); }
}
@keyframes aurora-2 {
  0%, 100% { transform: translate(0%, 0%) rotate(0deg) scale(1); }
  25% { transform: translate(-4%, 3%) rotate(-2deg) scale(0.97); }
  50% { transform: translate(3%, -2%) rotate(2deg) scale(1.04); }
  75% { transform: translate(-2%, 4%) rotate(-3deg) scale(0.98); }
}
@keyframes aurora-3 {
  0%, 100% { transform: translate(0%, 0%) scale(1); }
  33% { transform: translate(2%, -3%) scale(1.06); }
  66% { transform: translate(-3%, 2%) scale(0.94); }
}
.animate-aurora-1 { animation: aurora-1 20s ease-in-out infinite; }
.animate-aurora-2 { animation: aurora-2 25s ease-in-out infinite; animation-delay: -5s; }
.animate-aurora-3 { animation: aurora-3 18s ease-in-out infinite; animation-delay: -10s; }
```

**AI Prompter Example:**
```
Implement AuroraBackground for hero section:
- Variant: "ocean" (blues and purples)
- Intensity: "medium"
- Wrap hero content inside
- Content must have "relative z-10" class
WARNING: Don't combine with MeshGradientHero (competing effects)
```

---

### 8.2 AmbientBlobs

**Score**: +2 | **Desktop Only**: No | **Focal Rating**: ★★☆☆☆

```tsx
// src/components/ui/ambient-blobs.tsx
import React from 'react';

export interface AmbientBlobsProps {
  variant?: 'warm' | 'cool' | 'neutral';
  intensity?: 'low' | 'medium' | 'high';
  count?: 2 | 3 | 4;
  className?: string;
}

const colorSets = {
  warm: ['#ff9a9e', '#feca57', '#ff6b6b'],
  cool: ['#667eea', '#764ba2', '#4facfe'],
  neutral: ['#a8a8a8', '#d4d4d4', '#9ca3af'],
};

const opacities = {
  low: 0.3,
  medium: 0.5,
  high: 0.6,
};

export function AmbientBlobs({
  variant = 'warm',
  intensity = 'medium',
  count = 3,
  className = '',
}: AmbientBlobsProps) {
  const colors = colorSets[variant];
  const opacity = opacities[intensity];

  const blobPositions = [
    { top: '10%', left: '20%', size: 600, delay: '0s' },
    { top: '60%', right: '15%', size: 500, delay: '-8s' },
    { bottom: '15%', left: '50%', size: 550, delay: '-15s' },
    { top: '40%', left: '70%', size: 450, delay: '-20s' },
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {blobPositions.slice(0, count).map((pos, index) => (
        <div
          key={index}
          className="absolute rounded-full blur-3xl animate-blob-float"
          style={{
            ...pos,
            width: `${pos.size}px`,
            height: `${pos.size}px`,
            background: `radial-gradient(circle, ${colors[index % colors.length]} 0%, transparent 70%)`,
            opacity,
            animationDelay: pos.delay,
          }}
        />
      ))}
    </div>
  );
}
```

**Required CSS (add to index.css):**
```css
@keyframes blob-float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(3%, -4%) scale(1.03); }
  50% { transform: translate(-2%, 3%) scale(0.97); }
  75% { transform: translate(4%, 2%) scale(1.02); }
}
.animate-blob-float { animation: blob-float 25s ease-in-out infinite; }
```

**AI Prompter Example:**
```
Implement AmbientBlobs behind features section:
- Variant: "warm"
- Intensity: "high" (60% opacity - must be visible!)
- Count: 3
- Section must have: overflow-hidden
- Content must have: relative z-10
```

---

### 8.3 ParallaxGlass

**Score**: +4 | **Desktop Only**: No | **Focal Rating**: ★★★★★

```tsx
// src/components/ui/parallax-glass.tsx
import React from 'react';

export interface GlassCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function GlassCard({ 
  title, 
  description, 
  icon, 
  children, 
  className = '' 
}: GlassCardProps) {
  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl
        bg-white/5 dark:bg-white/5
        backdrop-blur-md
        border border-white/10
        p-6 md:p-8
        transition-all duration-700 ease-out
        hover:border-white/40
        hover:bg-white/10
        ${className}
      `}
    >
      {/* Internal light gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 transition-opacity duration-700 group-hover:opacity-70" />

      {/* Content */}
      <div className="relative z-10">
        {icon && (
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary backdrop-blur-sm border border-primary/20">
            {icon}
          </div>
        )}

        <h3 className="mb-3 text-xl md:text-2xl font-bold text-foreground">
          {title}
        </h3>

        {description && (
          <p className="text-base text-muted-foreground mb-4 leading-relaxed">
            {description}
          </p>
        )}

        {children}
      </div>
    </div>
  );
}

export interface ParallaxGlassProps {
  children: React.ReactNode;
  backgroundImage?: string;
  backgroundTexture?: 'noise' | 'grain' | 'dots' | 'none';
  className?: string;
  contentClassName?: string;
}

export function ParallaxGlass({
  children,
  backgroundImage,
  backgroundTexture = 'noise',
  className = '',
  contentClassName = '',
}: ParallaxGlassProps) {
  return (
    <section className={`relative py-24 lg:py-32 overflow-hidden ${className}`}>
      {/* Fixed Parallax Background Layer */}
      {backgroundImage && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.2,
            mixBlendMode: 'overlay',
          }}
        />
      )}

      {/* Noise/Grain Overlay */}
      {backgroundTexture !== 'none' && (
        <div
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: getTexturePattern(backgroundTexture),
            backgroundSize: backgroundTexture === 'noise' ? '200px 200px' : '100px 100px',
            mixBlendMode: 'overlay',
          }}
        />
      )}

      {/* Content */}
      <div className={`relative z-10 ${contentClassName}`}>
        {children}
      </div>
    </section>
  );
}

function getTexturePattern(type: 'noise' | 'grain' | 'dots'): string {
  const patterns = {
    noise: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`,
    grain: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='0.4'/%3E%3C/svg%3E")`,
    dots: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
  };
  return patterns[type];
}
```

**AI Prompter Example:**
```
Implement ParallaxGlass section:
- Background: Subtle grain texture (backgroundTexture="grain")
- Background image: Optional, 20% opacity
- Layout: 3-column grid (grid md:grid-cols-3 gap-8)
- Each GlassCard:
  * backdrop-blur-md (REQUIRED for glass effect)
  * bg-white/5, border-white/10
  * Internal gradient from-white/10 to-transparent
  * Hover: border-white/40, duration-700
  * Icon: Lucide in bg-primary/10 rounded-xl
  * Title: text-xl font-bold
  * Description: text-base text-muted-foreground
```

---


### 8.4 ShapeBlurLite

**Score**: +3 | **Desktop Only**: No | **Focal Rating**: ★★★★☆

**What it does**: a **WebGL-free** “shape blur” overlay (SVG + Gaussian blur) that gently follows the cursor. This gives the *premium shader vibe* without three.js / canvas.

**When to use**
- As a subtle hero/section background behind text (opacity 0.15–0.35).
- Great for: creative studios, boutique brands, modern local services.

**Avoid**
- If the business should feel ultra-traditional (law firms, medical clinics) unless used extremely subtly.

```tsx
// src/components/ui/shape-blur-lite.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  return reduced;
}

export interface ShapeBlurLiteProps {
  className?: string;
  /** 0=rounded-rect, 1=filled circle, 2=ring, 3=triangle */
  variation?: 0 | 1 | 2 | 3;
  /** 0.6–1.4 */
  intensity?: number;
  /** Follow pointer (desktop); if false, stays centered */
  interactive?: boolean;
  /** Opacity of the blurred shape (0.08–0.4) */
  opacity?: number;
}

export default function ShapeBlurLite({
  className,
  variation = 0,
  intensity = 1,
  interactive = true,
  opacity = 0.28,
}: ShapeBlurLiteProps) {
  const reducedMotion = usePrefersReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);

  // Work in a simple 0..100 coordinate space for SVG.
  const [pt, setPt] = useState({ x: 50, y: 50 });
  const target = useRef({ x: 50, y: 50 });
  const raf = useRef<number>();

  useEffect(() => {
    if (reducedMotion || !interactive) return;

    const onMove = (e: PointerEvent) => {
      const el = hostRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / Math.max(r.width, 1);
      const ny = (e.clientY - r.top) / Math.max(r.height, 1);
      target.current.x = Math.max(0, Math.min(100, nx * 100));
      target.current.y = Math.max(0, Math.min(100, ny * 100));
    };

    const tick = () => {
      setPt((p) => ({
        x: p.x + (target.current.x - p.x) * 0.08,
        y: p.y + (target.current.y - p.y) * 0.08,
      }));
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [reducedMotion, interactive]);

  const blur = useMemo(() => 10 * intensity, [intensity]);
  const size = useMemo(() => 22 * intensity, [intensity]);

  const shape = (() => {
    if (variation === 1) {
      return <circle cx={pt.x} cy={pt.y} r={size * 0.75} />;
    }
    if (variation === 2) {
      return <circle cx={pt.x} cy={pt.y} r={size * 0.75} fill="none" strokeWidth={size * 0.22} />;
    }
    if (variation === 3) {
      const p1 = `${pt.x} ${pt.y - size * 0.8}`;
      const p2 = `${pt.x - size * 0.75} ${pt.y + size * 0.6}`;
      const p3 = `${pt.x + size * 0.75} ${pt.y + size * 0.6}`;
      return <polygon points={`${p1}, ${p2}, ${p3}`} />;
    }
    // variation 0: rounded rect
    return (
      <rect
        x={pt.x - size}
        y={pt.y - size * 0.7}
        width={size * 2}
        height={size * 1.4}
        rx={size * 0.55}
      />
    );
  })();

  return (
    <div ref={hostRef} className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <filter id="shapeBlurLite" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={blur} />
          </filter>
        </defs>
        <g filter="url(#shapeBlurLite)" opacity={opacity}>
          {/* Use currentColor so hue is controlled by text color classes on parent */}
          <g fill="currentColor" stroke="currentColor" strokeLinejoin="round" strokeLinecap="round">
            {shape}
          </g>
        </g>
      </svg>
    </div>
  );
}
```

**Usage**
```tsx
import ShapeBlurLite from '@/components/ui/shape-blur-lite';

<section className="relative overflow-hidden">
  <ShapeBlurLite className="text-indigo-500" variation={0} intensity={1} />
  <div className="relative z-10">{/** your content */}</div>
</section>
```

**Optional (ReactBits install, WebGL)**
```bash
npx shadcn@latest add @react-bits/ShapeBlur-TS-CSS
```
Only use if your prompt explicitly allows WebGL/canvas and you can accept the perf/accessibility tradeoffs.

## SECTION 9: LAYOUT PATTERNS

### 9.1 ParallaxSection

**Score**: +3 | **Desktop Only**: No | **Focal Rating**: ★★★★☆

```tsx
// src/components/ui/parallax-section.tsx
import React, { useRef, useEffect, useState } from 'react';

export interface ParallaxLayer {
  id: string;
  content: React.ReactNode;
  speed: number; // 0.1 to 2.0
  zIndex?: number;
  className?: string;
}

export interface ParallaxSectionProps {
  layers: ParallaxLayer[];
  className?: string;
  height?: string;
}

export function ParallaxSection({
  layers,
  className = '',
  height = 'min-h-screen',
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const windowScrollY = window.scrollY;

      const relativeScroll = windowScrollY - sectionTop + window.innerHeight;
      setScrollY(relativeScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={sectionRef} className={`relative ${height} overflow-hidden ${className}`}>
      {layers.map((layer) => {
        const translateY = -(scrollY * (1 - layer.speed));

        return (
          <div
            key={layer.id}
            className={`absolute inset-0 ${layer.className || ''}`}
            style={{
              transform: `translateY(${translateY}px)`,
              zIndex: layer.zIndex || 0,
              willChange: 'transform',
            }}
          >
            {layer.content}
          </div>
        );
      })}
    </div>
  );
}
```

**AI Prompter Example:**
```
Implement ParallaxSection:
Layers: [
  {
    id: "bg",
    speed: 0.3,
    zIndex: 0,
    content: <div className="w-full h-full bg-gradient-to-b from-blue-500 to-purple-500" />
  },
  {
    id: "content",
    speed: 1,
    zIndex: 10,
    content: <div className="flex items-center justify-center h-full"><h1>Parallax Effect</h1></div>
  }
]
Height: "min-h-screen"
```

---

### 9.2 InfiniteMarquee

**Score**: +2 | **Desktop Only**: No | **Focal Rating**: ★★★☆☆

```tsx
// src/components/ui/infinite-marquee.tsx
import React from 'react';

export interface InfiniteMarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  gradient?: boolean;
  className?: string;
}

export function InfiniteMarquee({
  children,
  speed = 30,
  direction = 'left',
  pauseOnHover = true,
  gradient = true,
  className = '',
}: InfiniteMarqueeProps) {
  const animationDirection = direction === 'left' ? 'normal' : 'reverse';

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Gradient overlays */}
      {gradient && (
        <>
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />
        </>
      )}

      {/* Scrolling content */}
      <div
        className={`flex ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection,
        }}
      >
        {/* First set */}
        <div className="flex shrink-0 items-center justify-around gap-8">
          {children}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex shrink-0 items-center justify-around gap-8" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
```

**Required CSS (add to index.css):**
```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

**AI Prompter Example:**
```
Implement InfiniteMarquee for logo wall:
- Speed: 40s (slower = premium feel)
- Direction: "left"
- Pause on hover: true
- Gradient: true (fade edges)
Children: 6+ logo images (h-12, grayscale, hover:grayscale-0)
```

---

### 9.3 BentoGrid

**Score**: +3 | **Desktop Only**: No | **Focal Rating**: ★★★★☆

```tsx
// src/components/ui/bento-grid.tsx
import React from 'react';
import { motion } from 'framer-motion';

export interface BentoItemProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  image?: string;
  className?: string;
  children?: React.ReactNode;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
}

export function BentoItem({
  title,
  description,
  icon,
  image,
  className = '',
  children,
  colSpan = 1,
  rowSpan = 1,
}: BentoItemProps) {
  const spanClasses = {
    col: {
      1: 'col-span-1',
      2: 'md:col-span-2',
      3: 'md:col-span-3',
    },
    row: {
      1: 'row-span-1',
      2: 'md:row-span-2',
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover:border-primary/50 transition-all duration-300 ${spanClasses.col[colSpan]} ${spanClasses.row[rowSpan]} ${className}`}
    >
      {/* Background image */}
      {image && (
        <div className="absolute inset-0 z-0">
          <img loading="lazy" decoding="async"
            src={image}
            alt={title}
            className="h-full w-full object-cover opacity-20 transition-opacity group-hover:opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/40" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {icon && (
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>
        )}

        <h3 className="mb-2 text-xl font-bold">{title}</h3>

        {description && (
          <p className="text-muted-foreground mb-4">{description}</p>
        )}

        {children && <div className="mt-auto">{children}</div>}
      </div>
    </motion.div>
  );
}

export interface BentoGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
  className?: string;
}

export function BentoGrid({
  children,
  columns = 3,
  className = '',
}: BentoGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4 auto-rows-fr ${className}`}>
      {children}
    </div>
  );
}
```

**AI Prompter Example:**
```
Implement BentoGrid:
- Columns: 3
- Items:
  * BentoItem: title="Fast", icon=<Zap />, colSpan=2
  * BentoItem: title="Secure", icon=<Shield />, colSpan=1
  * BentoItem: title="AI-Powered", icon=<Sparkles />, colSpan=1, rowSpan=2, image="/ai.jpg"
  * BentoItem: title="Collaborative", icon=<Users />, colSpan=2, children=<Button>Learn More</Button>
```

---

---

## SECTION 10: LOCAL BUSINESS CONVERSION PATTERNS

### 10.1 ServiceCard

**Score**: +3 | **Desktop Only**: No | **Focal Rating**: ★★★★☆

```tsx
// src/components/ui/service-card.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ChevronRight } from 'lucide-react';

export interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  duration?: string;
  price?: string;
  priceNote?: string;
  features?: string[];
  ctaText?: string;
  onCtaClick?: () => void;
  popular?: boolean;
  variant?: 'default' | 'featured';
}

export function ServiceCard({
  icon,
  title,
  description,
  duration,
  price,
  priceNote,
  features = [],
  ctaText = 'Book Now',
  onCtaClick,
  popular,
  variant = 'default',
}: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={[
        'relative rounded-2xl border bg-card overflow-hidden transition-all p-6',
        variant === 'featured'
          ? 'border-primary shadow-lg shadow-primary/10'
          : 'border-border hover:border-primary/50',
      ].join(' ')}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-bl-lg">
          Most Popular
        </div>
      )}

      <div className="inline-flex items-center justify-center rounded-xl bg-primary/10 text-primary w-14 h-14 mb-4">
        {icon}
      </div>

      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>

      {(duration || price) && (
        <div className="flex items-center gap-4 mb-4 text-sm">
          {duration && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-4 h-4" />
              {duration}
            </div>
          )}
          {price && (
            <div className="font-semibold">
              {price}
              {priceNote && <span className="text-muted-foreground text-xs ml-1">{priceNote}</span>}
            </div>
          )}
        </div>
      )}

      {features.length > 0 && (
        <ul className="space-y-2 mb-6">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {f}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={onCtaClick}
        className={[
          'w-full flex items-center justify-center gap-2 rounded-lg font-medium py-3 transition-all',
          variant === 'featured'
            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
            : 'bg-primary/10 text-primary hover:bg-primary/20',
        ].join(' ')}
      >
        {ctaText} <ChevronRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
```

**AI Prompter Example:**
```
Implement ServiceCard grid for a local business:
- Provide 3-6 services with: icon, title, description, duration, price, features
- Desktop columns must avoid orphan gaps:
  - 3 items → 3-col
  - 4 items → 2x2 or 4-col (never 3-col)
  - 5–6 items → 3-col; if 5, use a featured span or bento to remove empty space
- Mobile: stack (1-col)
- Mark one as popular and featured
```

---

### 10.2 TestimonialCarousel

**Score**: +4 | **Desktop Only**: No | **Focal Rating**: ★★★★★

```tsx
// src/components/ui/testimonial-carousel.tsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

export interface Testimonial {
  id: string;
  content: string;
  author: string;
  role?: string;
  avatar?: string;
  rating?: number;
}

export interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
  pauseOnHover?: boolean;
}

export function TestimonialCarousel({
  testimonials,
  autoPlay = true,
  interval = 6000,
  pauseOnHover = true,
}: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!autoPlay || (pauseOnHover && paused) || testimonials.length < 2) return;
    const timer = setInterval(() => setActiveIndex((p) => (p + 1) % testimonials.length), interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, paused, pauseOnHover, testimonials.length]);

  const current = testimonials[activeIndex];

  return (
    <div
      className="relative max-w-4xl mx-auto px-4"
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div className="flex justify-center mb-8">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Quote className="w-8 h-8 text-primary" />
        </div>
      </div>

      <div className="relative min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="text-center"
          >
            {typeof current.rating === 'number' && (
              <div className="flex justify-center gap-1 mb-6" aria-label={`${current.rating} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < current.rating! ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/40'}`}
                  />
                ))}
              </div>
            )}

            <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground leading-relaxed mb-8">
              "{current.content}"
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              {current.avatar && (
                <img loading="lazy" decoding="async"
                  src={current.avatar}
                  alt={current.author}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
                />
              )}
              <div className="text-left">
                <div className="font-semibold text-foreground">{current.author}</div>
                {current.role && <div className="text-sm text-muted-foreground">{current.role}</div>}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-4 mt-10">
        <button
          onClick={() => setActiveIndex((p) => (p - 1 + testimonials.length) % testimonials.length)}
          className="w-10 h-10 rounded-full border border-border hover:border-primary hover:bg-primary/5 flex items-center justify-center transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === activeIndex ? 'w-8 bg-primary' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setActiveIndex((p) => (p + 1) % testimonials.length)}
          className="w-10 h-10 rounded-full border border-border hover:border-primary hover:bg-primary/5 flex items-center justify-center transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
```

**AI Prompter Example:**
```
Implement TestimonialCarousel for a dentist or clinic:
- Provide 6-10 testimonials, each with author + role + rating
- Autoplay true, interval 6000
- Use real-looking avatars or /placeholder.svg
```

---

### 10.3 ContactCTA


**RELIABILITY CONTRACT (ContactCTA)**
- Never render empty slots: if phone/email/hours are missing, do not show that row.
- If you do not implement a map, **do not reserve a map column** or placeholder container.
- Mobile-first: keep contact info scannable (short lines, clear labels) and ensure tap targets are large.

**Score**: +3 | **Desktop Only**: No | **Focal Rating**: ★★★★☆

```tsx
// src/components/ui/contact-cta.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

export interface ContactCTAProps {
  headline: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
  hours?: string;
  primaryCta: string;
  secondaryCta?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export function ContactCTA({
  headline,
  description,
  phone,
  email,
  address,
  hours,
  primaryCta,
  secondaryCta,
  onPrimaryClick,
  onSecondaryClick,
}: ContactCTAProps) {
  const items = [
    { icon: Phone, label: 'Call', value: phone, href: phone ? `tel:${phone.replace(/\D/g, '')}` : undefined },
    { icon: Mail, label: 'Email', value: email, href: email ? `mailto:${email}` : undefined },
    { icon: MapPin, label: 'Location', value: address },
    { icon: Clock, label: 'Hours', value: hours },
  ].filter((i) => i.value);

  return (
    <section className="py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4 text-center"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{headline}</h2>
        {description && (
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">{description}</p>
        )}

        {items.length > 0 && (
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {items.map((item, i) => {
              const Icon = item.icon;
              const content = (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-left">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</div>
                    <div className="text-sm font-medium">{item.value}</div>
                  </div>
                </div>
              );
              return item.href ? (
                <a key={i} href={item.href}>
                  {content}
                </a>
              ) : (
                <div key={i}>{content}</div>
              );
            })}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onPrimaryClick}
            className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            {primaryCta} <ArrowRight className="w-5 h-5" />
          </button>
          {secondaryCta && (
            <button
              onClick={onSecondaryClick}
              className="rounded-full px-8 py-4 bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors"
            >
              {secondaryCta}
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
}
```

**AI Prompter Example:**
```
Implement ContactCTA as the final section:
- Include phone, email, address, hours summary
- Primary CTA: "Book Now"
- Secondary CTA: "Get Directions"
```

---

### 10.4 BusinessHours

**Score**: +2 | **Desktop Only**: No | **Focal Rating**: ★★★☆☆

```tsx
// src/components/ui/business-hours.tsx
import React, { useMemo } from 'react';
import { Clock } from 'lucide-react';

export interface BusinessHourRow {
  day: string; // e.g. "Mon" or "Monday"
  open?: string; // 24h "09:00"
  close?: string; // 24h "17:30"
  closed?: boolean;
  note?: string;
}

export interface BusinessHoursProps {
  title?: string;
  rows: BusinessHourRow[];
  highlightToday?: boolean;
  className?: string;
}

function normalizeDay(s: string) {
  const t = s.trim().slice(0, 3).toLowerCase();
  return t;
}

export function BusinessHours({ title = 'Hours', rows, highlightToday = true, className = '' }: BusinessHoursProps) {
  const todayKey = useMemo(() => {
    const d = new Date().getDay(); // 0 Sun
    const map = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return map[d];
  }, []);

  return (
    <section className={['py-12', className].join(' ')}>
      <div className="max-w-xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <ul className="divide-y divide-border">
            {rows.map((r, i) => {
              const isToday = normalizeDay(r.day) === todayKey;
              const line = r.closed
                ? 'Closed'
                : r.open && r.close
                  ? `${r.open} – ${r.close}`
                  : 'Hours vary';
              return (
                <li
                  key={i}
                  className={[
                    'flex items-center justify-between px-5 py-4',
                    highlightToday && isToday ? 'bg-primary/5' : '',
                  ].join(' ')}
                >
                  <div>
                    <div className="font-medium">{r.day}</div>
                    {r.note && <div className="text-xs text-muted-foreground">{r.note}</div>}
                  </div>
                  <div className="text-sm text-muted-foreground">{line}</div>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="text-xs text-muted-foreground mt-3">Holiday hours may vary — call ahead to confirm.</p>
      </div>
    </section>
  );
}
```

**AI Prompter Example:**
```
Implement BusinessHours with 7 rows and highlightToday=true.
Use 24h strings like "09:00" and "17:30"; mark closed days with closed=true.
```


## COMPLETE CSS REQUIREMENTS

Add all these to `src/index.css`:

```css
/* Accessibility helpers */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in 0.6s ease-out both; }

@media (prefers-reduced-motion: reduce) {
  .animate-mesh-1, .animate-mesh-2, .animate-mesh-3, .animate-mesh-4,
  .animate-aurora-1, .animate-aurora-2, .animate-aurora-3,
  .animate-blob-float {
    animation: none !important;
  }
}

/* Mesh Gradient Animations */
@keyframes mesh-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}
@keyframes mesh-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-30px, 30px) scale(0.9); }
  66% { transform: translate(20px, -20px) scale(1.1); }
}
@keyframes mesh-3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(20px, 40px) scale(1.05); }
  66% { transform: translate(-30px, -30px) scale(0.95); }
}
@keyframes mesh-4 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-40px, -20px) scale(0.95); }
  66% { transform: translate(30px, 30px) scale(1.05); }
}
.animate-mesh-1 { animation: mesh-1 10s ease-in-out infinite; }
.animate-mesh-2 { animation: mesh-2 12s ease-in-out infinite; }
.animate-mesh-3 { animation: mesh-3 9s ease-in-out infinite; }
.animate-mesh-4 { animation: mesh-4 11s ease-in-out infinite; }

/* Aurora Animations */
@keyframes aurora-1 {
  0%, 100% { transform: translate(0%, 0%) rotate(0deg) scale(1); }
  25% { transform: translate(3%, -4%) rotate(2deg) scale(1.05); }
  50% { transform: translate(-2%, 3%) rotate(-1deg) scale(0.95); }
  75% { transform: translate(4%, 1%) rotate(3deg) scale(1.02); }
}
@keyframes aurora-2 {
  0%, 100% { transform: translate(0%, 0%) rotate(0deg) scale(1); }
  25% { transform: translate(-4%, 3%) rotate(-2deg) scale(0.97); }
  50% { transform: translate(3%, -2%) rotate(2deg) scale(1.04); }
  75% { transform: translate(-2%, 4%) rotate(-3deg) scale(0.98); }
}
@keyframes aurora-3 {
  0%, 100% { transform: translate(0%, 0%) scale(1); }
  33% { transform: translate(2%, -3%) scale(1.06); }
  66% { transform: translate(-3%, 2%) scale(0.94); }
}
.animate-aurora-1 { animation: aurora-1 20s ease-in-out infinite; }
.animate-aurora-2 { animation: aurora-2 25s ease-in-out infinite; animation-delay: -5s; }
.animate-aurora-3 { animation: aurora-3 18s ease-in-out infinite; animation-delay: -10s; }

/* Blob Animation */
@keyframes blob-float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(3%, -4%) scale(1.03); }
  50% { transform: translate(-2%, 3%) scale(0.97); }
  75% { transform: translate(4%, 2%) scale(1.02); }
}
.animate-blob-float { animation: blob-float 25s ease-in-out infinite; }

/* Marquee Animation */
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

---

## FINAL VERIFICATION CHECKLIST

✅ **All 29 patterns have complete TypeScript implementations**
✅ **All patterns in proper numerical order (1.1, 1.2, 2.1, 2.2, etc.)**
✅ **Zero external dependencies in default implementations (framer-motion, lucide-react only)**
✅ **Every pattern includes AI Prompter Example**
✅ **All required CSS keyframes provided**
✅ **Mobile fallbacks documented for desktop-only patterns**
✅ **TypeScript interfaces for all props**
✅ **No pattern relies on external libraries like @paper-design/shaders-react**
✅ **MeshGradientHero uses pure CSS animated gradients**
✅ **Complete and copy-pasteable**

---

## HOW TO USE THIS FILE

### For AI Implementation
1. Reference pattern by number (e.g., "1.1 MeshGradientHero")
2. Copy complete implementation code
3. Add required CSS to index.css
4. Follow AI Prompter Example for configuration

### For AI Prompter Writing Prompts
1. Select patterns from index
2. Copy "AI Prompter Example" sections
3. Include complete specifications in prompt
4. Don't just say pattern name - include all configuration details

### For Manual Development
1. Find pattern in numerical order
2. Copy TypeScript component code
3. Add CSS keyframes if required
4. Import and use with provided props

---

## VERSION HISTORY

**v7.1** - Adds ScrollStack + ShapeBlurLite + MorphingCursorText
- ScrollStack: premium narrative stacking section (native scroll + reduced-motion fallback)
- ShapeBlurLite: WebGL-free interactive blur overlay (SVG)
- MorphingCursorText: fine-pointer-only hover reveal headline

**v7.0** - Master library
- Adds Local Business Conversion Patterns (ServiceCard, TestimonialCarousel, ContactCTA, BusinessHours)
- Upgrades MeshGradientHero (trust indicators, scroll cue, grain, reduced-motion)
- Upgrades DicedHero (keyboard + swipe + progress)
- Upgrades GlowCard (gradient option + better focus styles)

**v5.0** - Base library
- 22 patterns fully implemented
- AI prompter integration guide + CSS bundle## Lovable Execution Notes (v12)

- Keep the prompt **art-directed, not assembled**: internally explore 2–3 directions, commit to one, do not print exploration.
- Put **VISUAL FOUNDATION + Hero + Signature Moment** first; least priority items last.
- Use **6–8** true MUSTs total (too many reduces compliance).
- Keep to **8–12 code blocks** (max ~15) and **≤150–180 code lines** per prompt.
- Complex patterns require skeletons from `lib-implementation-blocks.md` (SpotlightCard, InteractiveSelector, ExpandableGallery, ScrollStack, AnimatedCounter).
- Shadows must stay token-based: `hsl(var(--foreground)/a)` or `hsl(var(--primary)/a)` only.

---

---

## PATCH v3 — Canonical Pattern Packs (anti-confusion, anti-bug)

### PatternPack: ScrollStack → StickyDeck (default)
**Use when:** steps/process needs a premium “stacked panels” narrative.
- Native scroll only. No scroll hijack by default.
- Cards overlap (sticky) and feel like a deck.
- **Hard anti-bug rules:** opaque surfaces; only active/top card shows body; strict z-index; no glass; no container opacity.
- Active step derived from scroll position near `stackTop ≈ 18vh`.
- Mobile + reduced-motion: timeline list fallback (no sticky).

**Acceptance checks:**
- At any scroll position: only ONE card’s body text is readable.
- No ghost/bleed-through text.
- Overlap is intentional (crisp edges; consistent spacing).

### PatternPack: InteractiveSelector (Expandable Panels)
**Use when:** 3–5 categories/features should feel tactile and visual.
- Desktop: horizontal expanding panels.
- Mobile: vertical stack; no min-width; no horizontal overflow.
- Only active panel shows description/body (prevents noisy overlaps).
- HSL-only scrims/overlays (use `hsl(0 0% 0% / a)` for image readability).

### PatternPack: MeshGradientHero (CSS-only default)
**Use when:** hero needs color+depth without heavy canvas.
- Layered radial gradients using `hsl(var(--token)/a)` only.
- Motion is slow blob drift; reduced-motion is static.
- Shader/canvas variants are **experimental** and must be explicit opt-in with fallback.
