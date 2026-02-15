import { WebElement } from "./elements";

export const vocabulary: WebElement[] = [
    {
        slug: "design-tokens-organic",
        name: "Design Tokens: Organic Warmth",
        description: "A color palette and design system evoking warmth, humanity, and groundedness. Uses creams, beiges, and soft rounded corners.",
        category: "Design System",
        implementation: `:root {
  --background: 28 25% 98%;     /* #fffbf7 */
  --foreground: 20 14% 4%;      /* #0c0a09 */
  --card: 28 25% 98%;
  --card-foreground: 20 14% 4%;
  --primary: 24.6 95% 53.1%;    /* #f97316 (Orange) */
  --primary-foreground: 60 9.1% 97.8%;
  --muted: 60 4.8% 95.9%;
  --muted-foreground: 25 5.3% 44.7%;
  --radius: 1rem;
}`,
        usage: "Copy these CSS variables into your globals.css :root block to apply the theme.",
        accessibility: [
            "High contrast text (#0c0a09) ensures readability on cream backgrounds.",
            "Primary orange is used for accents, ensure adequate contrast for text overlays."
        ]
    },
    {
        slug: "design-tokens-clinical",
        name: "Design Tokens: Clinical Trust",
        description: "A clean, sterile, and premium palette suitable for medical, legal, or high-trust capability sectors. Uses ice whites and reassuring blues.",
        category: "Design System",
        implementation: `:root {
  --background: 210 40% 98%;    /* #f8fafc (Ice White) */
  --foreground: 222 47% 11%;    /* #0f172a */
  --primary: 199 89% 48%;       /* #0ea5e9 (Reassuring Blue) */
  --primary-foreground: 210 40% 98%;
  --muted: 210 40% 96.1%;
  --border: 214 32% 91%;
  --radius: 0.5rem;
}`,
        usage: "Use for medical, dental, or enterprise SaaS applications where trust is paramount.",
        accessibility: [
            "Strict high contrast ratios.",
            "Blue widely accepted as a trust signal."
        ]
    },
    {
        slug: "physics-liquid",
        name: "Physics: Liquid Motion",
        description: "Animation easing curves that feel viscous, smooth, and premium. No hard stops.",
        category: "Motion",
        implementation: `.liquid-transition {
  transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
  transition-duration: 1.2s;
}`,
        usage: `<div className="liquid-transition hover:translate-y-2">
  Liquid Element
</div>`,
        accessibility: [
            "Respect prefers-reduced-motion.",
            "Long durations (1.2s) should not block interaction."
        ]
    }
];
