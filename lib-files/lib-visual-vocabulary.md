# lib-visual-vocabulary.md

## Visual Vocabulary (Shared Language) v2.0

> **Purpose:** This file defines the *soulless* variables of design (colors, fonts) into *soulful* directives.
> **Rule:** When the PRD specifies a "Vibe", it MUST map to these specific definitions.

---

### 1. Aesthetic Archetypes (The "Vibe")

| Archetype | Keywords | Visual Signature |
| :--- | :--- | :--- |
| **"Clinical Luxury"** | Trust, Science, Premium, Sterile. | Vast white space, 1px borders (#E2E8F0), glassmorphism, cool blues/teals, `Inter` or `Geist`. |
| **"Organic Warmth"** | Welcoming, Human, Grounded, Earthy. | Cream/Beige backgrounds (#FDFCF8), soft blurred shapes (`Aurora`), rounded corners (2xl), serif/handwritten accents (`Playfair Display`). |
| **"Neo-Brutalist Pop"** | Bold, Energetic, Youthful, Loud. | High contrast black borders (3px), hard shadows (offset 4px), vibrant colors (Neon), monospace fonts, marquee text. |

| **"Editorial Minimal"** | Fashion, Art, Journalism. | Heavy typography, overlapping text/images, highly structured grids, monochromatic + 1 accent color. |

---

### 1.1 Agency Trigger Phrases (The "Secret Sauce")

Use these combinations of **Physical Material + Behavior + Constraint** to trigger premium "Agency Polish".

| Want | Write This | Why It Works |
|------|------------|--------------|
| **Not boring** | "Editorial rhythm, intentional asymmetry, breathing room between sections" | Triggers intentional whitespace, 7/5 splits. |
| **Premium cards** | "Tactile cards: thin border + soft shadow + micro-lift on hover" | Triggers surfaces (not flat boxes). |
| **Memorable hero** | "Layered depth: visible ambient blobs + entrance choreography + one focal moment" | Triggers motion & z-index layering. |
| **Trust signals** | "Museum-label captions on all media, proof not decoration" | Triggers typographic hierarchy. |
| **Physicality** | "Surfaces feel like warm paper (soft grain, gentle noise, no harsh flat whites)" | Triggers texture & subtle styling. |

---

### 2. Physics & Motion (The "Feel")

Define how the DOM elements move. This dictates the `transition` and `animate` properties.

| Physics Model | Description | Implementation Cues |
| :--- | :--- | :--- |
| **"Liquid / Fluid"** | Smooth, continuous, viscous. | `duration: 1.2s`, `ease: [0.22, 1, 0.36, 1]` (custom bezier). No hard stops. Elements "flow" into place. |
| **"Snap / Tactile"** | Responsive, tight, mechanical. | `type: "spring"`, `stiffness: 300`, `damping: 20`. Instant feedback. Clicky. |
| **"Float / Ethereal"** | Weightless, drift, zero-gravity. | Continuous low-speed movement (`y: [0, -10, 0]`). Parallax is mandatory. Slow fades (`duration: 1.5s`). |
| **"Linear / Industrial"** | Precise, robotic, predictable. | `ease: "linear"`, `duration: 0.3s`. Used for marquees or technical scans. |

---

### 3. Lighting & Depth (The "Atmosphere")

Define how light interacts with the UI.

| Lighting Model | Description | Implementation Cues |
| :--- | :--- | :--- |
| **"Diffused Studio"** | Soft, shadowless, clean. | Low contrast shadows (`shadow-sm`), ambient light, white/gray gradients. |
| **"Neon Cyber"** | Hard, colored light sources. | `box-shadow` with color (`shadow-cyan-500/50`), glowing borders, dark backgrounds. |
| **"Natural Golden Hour"** | Warm, directional, sun-kissed. | Warm gradients (Orange -> Pink), subtle grain, soft directional shadows (`shadow-lg`). |
| **"Void / Abyss"** | No light, deep depth. | Pure black backgrounds, elements emerge from darkness (opacity 0->1), high contrast white text. |

---

### 4. Texture & Material (The "Touch")

Define the surface properties of the UI components.

| Material | Description | Implementation Cues |
| :--- | :--- | :--- |
| **"Frosted Glass"** | Translucent, blurred background. | `backdrop-blur-md`, `bg-white/10`, white borders with low opacity. |
| **"Fine Grain"** | Film photography, noise. | SVG noise overlay (opacity 0.05), mix-blend-mode: overlay. |
| **"Silk / Satin"** | Smooth, gradient sheens. | Subtle linear-gradients that shift on hover. High sheen. |
| **"Concrete / Paper"** | Rough, flat, textured. | Solid colors, visible textures (optional bg image), matte finish (no shine). |

---

### 5. Composition Strategies (The "Layout")

| Strategy | Description |
| :--- | :--- |
| **"Swiss Grid"** | Rigid adherence to 12-column grid. heavy alignment. Everything aligns. |
| **"Broken Grid"** | Intentional overlap. Images overlap text. Elements break out of containers. High Z-index usage. |
| **"Central Focus"** | Symmetrical. Hero centered. Everything radiates from middle. Classic luxury. |
| **"Rule of Thirds"** | Asymmetrical balance. Text on left 1/3, massive visual on right 2/3. |

---

### 6. Micro-Interactions (The "Delight")

> **Rule:** Every interactive element MUST have a "Delight" state.

| Interaction | Description |
| :--- | :--- |
| **"Magnetic"** | Button follows cursor slightly before click. |
| **"Scale Click"** | Element shrinks (`0.95`) on mousedown, springs back on mouseup. |
| **"Glow Bloom"** | Border or shadow intensifies on hover. |
| **"Text Scramble"** | Text characters randomize before settling on hover/view. |

---

## 7. Explicit Token Map (The "DNA")

**CRITICAL:** When prompting, COPY AND PASTE the relevant block into the prompt's `Foundation` section.



### A. Organic Warmth (Stone/Orange)
```css
@layer base {
  :root {
    --background: 28 25% 98%;     /* #fffbf7 */
    --foreground: 20 14% 4%;      /* #0c0a09 */
    --card: 28 25% 98%;
    --card-foreground: 20 14% 4%;
    --popover: 28 25% 98%;
    --popover-foreground: 20 14% 4%;
    --primary: 24.6 95% 53.1%;    /* #f97316 (Orange) */
    --primary-foreground: 60 9.1% 97.8%;
    --secondary: 60 4.8% 95.9%;
    --secondary-foreground: 24 9.8% 10%;
    --muted: 60 4.8% 95.9%;
    --muted-foreground: 25 5.3% 44.7%;
    --accent: 60 4.8% 95.9%;
    --accent-foreground: 24 9.8% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 60 9.1% 97.8%;
    --border: 20 5.9% 90%;
    --input: 20 5.9% 90%;
    --ring: 24.6 95% 53.1%;
    --radius: 1rem;
  }
}
```

### B. Clinical Trust (Medical/Dentist)
```css
@layer base {
  :root {
    --background: 210 40% 98%;    /* #f8fafc (Ice White) */
    --foreground: 222 47% 11%;    /* #0f172a */
    --card: 0 0% 100%;
    --card-foreground: 222 47% 11%;
    --popover: 0 0% 100%;
    --popover-foreground: 222 47% 11%;
    --primary: 199 89% 48%;       /* #0ea5e9 (Reassuring Blue) */
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215 16% 47%;
    --accent: 199 89% 48%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 210 40% 98%;
    --border: 214 32% 91%;
    --input: 214 32% 91%;
    --ring: 199 89% 48%;
    --radius: 0.5rem;
  }
}
```

### C. Craftsman Reliability (Contractor/Handyman)
```css
@layer base {
  :root {
    --background: 0 0% 100%;      /* #ffffff */
    --foreground: 222 47% 11%;    /* #0f172a */
    --card: 0 0% 100%;
    --card-foreground: 222 47% 11%;
    --popover: 0 0% 100%;
    --popover-foreground: 222 47% 11%;
    --primary: 221 83% 53%;       /* #2563eb (Royal Blue - Trust) */
    --primary-foreground: 210 40% 98%;
    --secondary: 48 96% 53%;      /* #facc15 (Safety Yellow - Accent) */
    --secondary-foreground: 26 83% 14%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215 16% 47%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222 47% 11%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 210 40% 98%;
    --border: 214 32% 91%;
    --input: 214 32% 91%;
    --ring: 221 83% 53%;
    --radius: 0.375rem;
  }
}
```
```
