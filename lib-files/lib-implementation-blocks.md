# lib-implementation-blocks.md (v14.0 - Gold Edition)

Purpose: **Single source** for pattern intents + executable skeletons (10–30 lines).

## 🚀 PERFORMANCE ANCHORS (Non-Negotiable)
1. **Mobile FPS**: All animations must target 60fps on mobile.
2. **Transform Preference**: Use `transform` and `opacity` for animations. Avoid `width`, `height`, `top`, `left`.
3. **Heavy Animation Limit**: Max 2 "heavy" animations (e.g., WebGL, complex SVG paths) above the fold.
4. **Blob Limit**: Max 3 active blobs per viewport.

---

## Pattern Reliability Matrix

| Pattern | Reliability | Skeleton Required? |
|---------|-------------|-------------------|
| FlipWords | ⭐⭐⭐ | Yes (15 lines) — sentence-final position critical |
| AmbientBlobs | ⭐⭐⭐ | Yes (10 lines) + CSS keyframes |
| AnimatedCounter | ⭐⭐⭐ | Yes (15 lines) — scroll trigger required |
| SectionTransition | ⭐⭐⭐ | Yes (8 lines) + SECTION_COLORS object |
| CTAWithGlow | ⭐⭐⭐ | No — classes only |
| FeaturedCard | ⭐⭐⭐ | No — classes only |
| InteractiveSelector | ⭐⭐ | **Yes (30 lines)** — flex-[4]/[1] logic required |
| ExpandableGallery | ⭐⭐ | **Yes (25 lines)** — keyboard nav required |
| SpotlightCard | ⭐⭐ | **Yes (15 lines)** — pointer tracking required |
| ScrollStack | ⭐⭐ | **Yes (40 lines)** — sticky + active detection |

**Rule:** ⭐⭐⭐ patterns work from intent. ⭐⭐ patterns MUST include skeleton.

**Selection note:** These blocks are **not mandatory patterns**. Only include a block if that pattern is explicitly chosen for this business. Do not default to FlipWords/AmbientBlobs/StatStrip without a business-fit rationale.

## CTA Emphasis Options (Choose ONE)
Pick the emphasis style that matches the Design DNA:
- **Glow CTA**: energetic, modern, conversion-forward
- **Solid CTA**: trust-heavy, formal, high-clarity
- **Underline CTA**: editorial, minimal, understated confidence

**Rule:** If you choose Glow, use the CTAWithGlow classes. If you choose Solid or Underline, specify the exact classes + focus states. Do not default to glow without justification.

## Proof Modules (Data-Dependent)
- Use **StatStrip/AnimatedCounter** only if real numbers exist.
- If numbers are missing, prefer **Testimonials**, **TrustBadges**, or safe-copy proof language.

---

## 🛡️ SAFETY ENFORCERS (The "Crash Pad")
**Usage Rule:** For every high-performance component (WebGL, heavy animation), you MUST implement a CSS-only fallback.

**IMPLEMENT:**
Check `window.matchMedia('(prefers-reduced-motion: reduce)')` or simple CSS overrides.

---

## SECTION_COLORS (Critical — Must Include hsl() Prefix)

**When:** Every design with section transitions.
**Why:** SVG fills cannot interpolate CSS variables. Hardcoded HSL strings required.

**IMPLEMENT:**
```tsx
export const SECTION_COLORS = {
  hero: "hsl(42 35% 97%)",      // format: "hsl(H S% L%)" — include hsl() prefix
  menu: "hsl(38 18% 94%)",
  about: "hsl(40 20% 99%)",
  stats: "hsl(28 45% 22%)",
  footer: "hsl(28 45% 18%)",
} as const;
```

**VERIFY:** No visible seam between sections.

---

## FlipWords (⭐⭐⭐ — Include Skeleton if Used)

**When:** Headline needs cycling words.
**Critical:** Words MUST be at SENTENCE-FINAL position to avoid grammar issues.

**IMPLEMENT:**
```tsx
function FlipWords({ words, interval = 3000 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % words.length), interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="inline-block"
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  );
}

// USAGE (correct):
// <h1>Guten Morgen, wir machen es <FlipWords words={["Berlin", "schön", "besonders"]} /></h1>
```

**VERIFY:** Words cycle every 3s with y-axis animation.

---

## AmbientBlobs (⭐⭐⭐ — Include Skeleton + CSS if Used)

**When:** Hero needs depth and warmth.
**Critical:** Opacity MUST be 25%+ to be visible.

**IMPLEMENT:**
```tsx
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-primary/35 rounded-full blur-[120px] animate-blob-float" />
  <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-accent/25 rounded-full blur-[100px] animate-blob-float" style={{ animationDelay: '-10s' }} />
</div>
```

**CSS (Add to index.css):**
```css
@keyframes blob-float { 
  0%, 100% { transform: translate(0, 0) scale(1); } 
  25% { transform: translate(3%, -4%) scale(1.03); }
  50% { transform: translate(-2%, 3%) scale(0.97); }
  75% { transform: translate(4%, 2%) scale(1.02); }
}
.animate-blob-float { animation: blob-float 25s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .animate-blob-float { animation: none !important; }
}
```

**VERIFY:** Blobs are CLEARLY visible (25%+ opacity) and animate continuously.

---

## InteractiveSelector (⭐⭐ — MUST Include Skeleton)

**When:** 3–5 category showcase needing visual drama.
**Critical:** flex-[4]/flex-[1] logic + AnimatePresence for description reveal.

**IMPLEMENT:**
```tsx
const [activeIndex, setActiveIndex] = useState(0);
const reduce = useReducedMotion();

<div className="flex flex-col md:flex-row gap-4 h-auto md:h-[520px]">
  {options.map((opt, i) => {
    const active = i === activeIndex;
    return (
      <motion.button
        key={i}
        onClick={() => setActiveIndex(i)}
        className={
          "relative overflow-hidden rounded-2xl text-left min-h-[140px] md:min-h-[520px] outline-none " +
          "focus-visible:ring-2 focus-visible:ring-primary/40 " +
          (active ? "flex-[4]" : "flex-[1] hover:flex-[1.35]")
        }
        style={{ transition: 'flex 0.5s ease-out' }}
      >
        <motion.img
          src={opt.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          animate={reduce ? {} : { scale: active ? 1 : 1.08 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        {/* Overlay and Text Content */}
        {/* ... (See original pattern) */}
      </motion.button>
    );
  })}
</div>
```

**VERIFY:** Click expands panel to flex-[4]; only active panel shows description.

---

## SpotlightCard (⭐⭐ — Mobile Triage Active)

**When:** Cards need pointer-following glow effect.
**Mobile Triage:** Disabled on touch devices to prevent scroll jank/battery drain.

**IMPLEMENT:**
```tsx
export function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      data-spotlight
      onPointerMove={(e) => {
        // Mobile Triage: Only execute on mouse
        if (window.matchMedia("(pointer: fine)").matches) {
           const el = e.currentTarget;
           const r = el.getBoundingClientRect();
           el.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
           el.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
        }
      }}
      className={"relative overflow-hidden rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl p-6 transition " + className}
    >
      {children}
    </div>
  );
}
```

**CSS (Add to index.css):**
```css
[data-spotlight] { --mouse-x: 50%; --mouse-y: 50%; --spotlight-size: 240px; }
[data-spotlight]::after {
  content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  background: radial-gradient(var(--spotlight-size) circle at var(--mouse-x) var(--mouse-y), hsl(var(--foreground)/0.10), transparent 60%);
  opacity: 0; transition: opacity 300ms ease;
}
[data-spotlight]:hover::after { opacity: 1; }
@media (hover: none) { [data-spotlight]::after { display: none; } }
```

**VERIFY:** Spotlight follows cursor on desktop; Static (clean) on mobile.

---

## AnimatedCounter (⭐⭐⭐ — Include Skeleton)

**When:** Stats section needs count-up animation on scroll.

**IMPLEMENT:**
```tsx
import { animate, useInView } from "framer-motion";

export function AnimatedCounter({ to, duration = 1.2, suffix = "" }: { to: number; duration?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return <span ref={ref} className="tabular-nums">{value.toLocaleString()}{suffix}</span>;
}
```

**VERIFY:** Numbers count up when scrolled into view.

---

## SectionTransition (⭐⭐⭐ — Include Skeleton)

**When:** Smooth visual flow between sections.
**Critical:** 
- Use `position="top"` on the Image section for Solid->Image transitions
- Use `position="bottom"` on the Image section for Image->Solid transitions
- Wave color always matches the SOLID section
- Never render as a detached spacer block with a visible horizontal band
- Exactly one separator primitive per section boundary

**IMPLEMENT:**
```tsx
interface SectionTransitionProps {
  color: string;
  variant?: 'wave-organic' | 'wave-elegant' | 'diagonal';
  position?: 'bottom' | 'top'; 
}

function SectionTransition({ color, variant = 'wave-organic', position = 'bottom' }: SectionTransitionProps) {
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

**DOM Placement (CRITICAL):**
```tsx
{/* Scenario: Solid (Hero) -> Image (Provenance) */}
<section className="bg-cream">
  {/* Hero Content */}
</section>

<section className="relative overflow-visible">
  {/* Image Section Content */}
  
  {/* Transition is placed HERE (Top of Image Section), colored Cream */}
  <SectionTransition position="top" color="hsl(var(--cream))" />
</section>
```

**VERIFY:** 
- [ ] No visible seam or hard line at wave edges
- [ ] Wave color matches sections above and below
- [ ] Hero->first-section boundary uses Top Position (if Hero is solid and Next is Image)
- [ ] No extra top margin/padding creates a gap above the wave

---

## ProcessSteps (⭐⭐⭐ — CSS Only, Zero Risk)

**When:** 3-5 step process explanation (dental, onboarding, repair).
**Why over ScrollStack:** Same information hierarchy, zero scroll bugs, works on all devices.

**IMPLEMENT:**
- Desktop: grid-cols-2 or grid-cols-4 with numbered cards
- Mobile: single column stack
- Each card: number badge (bg-primary rounded-full) + title + description
- Optional: connecting line between cards (border-l or pseudo-element)
- Stagger entrance with framer-motion (delay: i * 0.1)

**No skeleton needed — CSS grid + standard card markup.**

---

## ScrollStack (⭐⭐ — Advanced, Enhanced Robustness)

**When:** Timeline or process with "stacked cards" effect (5+ steps).
**Critical:** Cards must be opaque.
**Safety Check:** Parents MUST NOT have `overflow: hidden`.
**WARNING:** The useScroll/useTransform variant with h-[250vh] containers is BANNED. It creates massive blank space and requires hooks-in-loops. Only the sticky-stack variant is allowed.

**IMPLEMENT (Safe Sticky Variant):**
```tsx
// SAFE ScrollStack — sticky card stack (no hooks-in-loop)
export default function ProcessStack({ steps }: { steps: { num: string; title: string; text: string }[] }) {
  return (
    <>
      {/* Desktop: sticky stack */}
      <div className="hidden md:block relative py-20">
        {steps.map((step, i) => (
          <div
            key={i}
            className="sticky top-[20vh] mb-16 first:mt-0"
            style={{ zIndex: 10 + i }}
          >
            <div className="max-w-lg mx-auto bg-card p-8 rounded-3xl shadow-xl border border-border/50 text-center">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg mb-6">
                {step.num}
              </span>
              <h3 className="text-2xl font-bold mb-3 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Mobile: simple vertical list */}
      <div className="md:hidden space-y-6 px-4 py-12">
        {steps.map((step, i) => (
          <div key={i} className="bg-card p-6 rounded-2xl shadow-md border border-border/40 text-center">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold mb-4">
              {step.num}
            </span>
            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}
```

**VERIFY:** Only ONE card's content visible at a time (no stacked text ghosting).

---

## MeshGradientHero (⭐⭐⭐ — with Fallback)

**When:** Hero needs animated gradient background.
**Safety:** Pure CSS static gradient fallback for no-js/reduced-motion.

**IMPLEMENT:**
```tsx
<div className="relative min-h-[90vh] overflow-hidden bg-background">
  {/* Fallback for safety */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10 opacity-50" />
  
  <motion.div
    aria-hidden
    className="absolute -inset-[30%] blur-3xl opacity-60"
    style={{
      background:
        "radial-gradient(circle at 30% 30%, hsl(var(--primary)/0.55), transparent 60%)," +
        "radial-gradient(circle at 70% 40%, hsl(var(--accent)/0.45), transparent 55%)," +
        "radial-gradient(circle at 55% 75%, hsl(var(--secondary)/0.35), transparent 60%)",
    }}
    animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
  />
  <div className="relative z-10">{/* Content */}</div>
</div>
```

**VERIFY:** Gradient blobs drift slowly; no hex/rgb colors.
