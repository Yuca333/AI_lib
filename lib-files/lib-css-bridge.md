# lib-css-bridge.md
**Version:** 2.0  
**Purpose:** Quick pattern → CSS lookup + mandatory keyframes for animated patterns.

---

## ⚠️ INTERNAL REFERENCE ONLY

**This file is for AI Prompter pattern understanding.**  
**Use `lib-implementation-blocks.md` to embed actual code in prompts.**

---

## POWER LEVEL QUICK REFERENCE

| Level | H1 Classes | Blobs | Cards |
|-------|-----------|-------|-------|
| 3 | text-5xl md:text-6xl font-bold | bg-primary/15 | Uniform |
| 4 | text-5xl md:text-6xl lg:text-7xl font-bold | bg-primary/35 blur-[120px] | ONE featured |
| 5 | text-6xl md:text-7xl lg:text-8xl font-black | bg-primary/40 blur-[150px] | Featured + glass |

---

## PATTERN → CLASS LOOKUP

### Split-Color Headline (Level 4+)
```
text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]
Line 1: block text-foreground
Line 2: block text-primary
```

### Gradient Text Word
```
bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent
```

### Featured Card
```
relative rounded-2xl p-8 border-2 border-primary/30 scale-[1.02] shadow-xl
bg-gradient-to-br from-primary/10 to-accent/10
Badge: absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1.5 rounded-full
```

### Regular Card (hover lift)
```
bg-card rounded-xl p-6 border border-border/50 shadow-sm
hover:shadow-lg hover:-translate-y-1 transition-all duration-300
```

### Stat Strip
```
grid grid-cols-3 gap-8 border-t border-border/30 pt-8 mt-12
Number: text-4xl md:text-5xl font-bold text-primary
Label: text-sm text-muted-foreground
```

### CTA with Glow
```
bg-primary text-primary-foreground px-6 py-3 font-semibold
shadow-[0_0_20px_hsl(var(--primary)/0.3)]
hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]
```

### Glass Panel
```
bg-card/30 backdrop-blur-xl border border-border/30 rounded-2xl p-8
```

### Ambient Blobs (Level 4)
```
absolute top-20 right-20 w-[500px] h-[500px] bg-primary/35 rounded-full blur-[120px] pointer-events-none animate-blob-float
absolute bottom-20 left-10 w-[400px] h-[400px] bg-accent/25 rounded-full blur-[100px] pointer-events-none animate-blob-float
```

### Sticky Nav
```
sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md h-16
```

### Section Wrapper
```
py-24 lg:py-32
Container: max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
```

### Overline
```
text-xs uppercase tracking-widest text-primary font-medium mb-4 block
```

---

## MANDATORY CSS KEYFRAMES

**Any pattern with animation REQUIRES these keyframes in index.css:**

### Mesh Gradient Blobs (for MeshGradientHero)
```css
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
```

### Blob Float (for AmbientBlobs)
```css
@keyframes blob-float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(3%, -4%) scale(1.03); }
  50% { transform: translate(-2%, 3%) scale(0.97); }
  75% { transform: translate(4%, 2%) scale(1.02); }
}
.animate-blob-float { animation: blob-float 25s ease-in-out infinite; }
```

### Aurora (for AuroraBackground)
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
.animate-aurora-1 { animation: aurora-1 20s ease-in-out infinite; }
.animate-aurora-2 { animation: aurora-2 25s ease-in-out infinite; animation-delay: -5s; }
```

### Marquee (for InfiniteMarquee)
```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

### Reduced Motion (MANDATORY)
```css
@media (prefers-reduced-motion: reduce) {
  .animate-mesh-1, .animate-mesh-2, .animate-mesh-3, .animate-mesh-4,
  .animate-aurora-1, .animate-aurora-2, .animate-blob-float {
    animation: none !important;
  }
}
```

---

## TRIGGER LEXICON

### HIGH-IMPACT (Use)
| Trigger | Effect |
|---------|--------|
| font-black | Heavier than font-bold |
| tracking-tight leading-[1.02] | Display typography |
| text-7xl / text-8xl | Dramatic scale |
| blur-[150px] | Dramatic depth |
| bg-primary/35 | Visible ambient color |
| shadow-[0_0_40px_...] | Glow effects |
| scale-[1.02] | Subtle elevation |
| backdrop-blur-xl | Glass effects |

### ANTI-TRIGGERS (Never Use)
| Anti-Trigger | Use Instead |
|--------------|-------------|
| shadow-md | shadow-lg or custom |
| text-4xl for H1 | text-6xl+ |
| bg-primary/10 featured | bg-primary/20+ |
| p-4 for cards | p-6 or p-8 |
| opacity-15 for blobs | opacity-25+ |

---

## PATTERN → KEYFRAME REQUIREMENT

| Pattern | Requires CSS Keyframes? |
|---------|------------------------|
| MeshGradientHero | ✅ mesh-1 through mesh-4 |
| AuroraBackground | ✅ aurora-1, aurora-2 |
| AmbientBlobs | ✅ blob-float |
| InfiniteMarquee | ✅ marquee |
| FlipWords | ❌ (framer-motion handles) |
| AnimatedCounter | ❌ (framer-motion handles) |
| GlowCard | ❌ (CSS transitions) |
| SectionTransition | ❌ (static SVG) |

**Rule:** If ✅, the keyframes MUST be included in the prompt.

---

## END OF REFERENCE
