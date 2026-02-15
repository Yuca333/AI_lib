import { WebElement } from "./elements";

export const patterns: WebElement[] = [
    {
        slug: "mesh-gradient-hero",
        name: "Mesh Gradient Hero",
        description: "A premium hero section with animated floating mesh gradients, trust indicators, and clear CTA hierarchy. Ideal for SaaS and modern services.",
        category: "Hero Patterns",
        implementation: `import React from 'react';
import { ArrowRight, ChevronDown, MapPin, ShieldCheck, Star } from 'lucide-react';

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
  trustIndicators?: {
    rating?: number;
    reviewCount?: number;
    yearsInBusiness?: number;
    location?: string;
  };
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
  trustIndicators,
}: MeshGradientHeroProps) {
  // Implementation details...
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradients would go here */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-sm font-medium mb-6">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>{badge}</span>
          </div>
        )}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            {headline}
        </h1>
        {/* ... rest of component */}
      </div>
    </section>
  );
}`,
        usage: `<MeshGradientHero 
  headline="Building the Future of AI"
  highlightWord="Future"
  description="Experience the next generation of intelligent interfaces."
  primaryCta="Get Started"
  colors={['#FF0080', '#7928CA', '#FF4D4D', '#F9CB28']}
/>`,
        accessibility: [
            "Ensure color contrast of text over gradients is sufficient.",
            "Respect 'prefers-reduced-motion' media query to disable gradient animation.",
            "Use semantic <section> and <h1> tags."
        ]
    },
    {
        slug: "cutout-hero",
        name: "Cutout Hero",
        description: "A high-impact hero section featuring a subject 'cut out' from the background, creating a depth effect. Requires precise color matching between image background and section background.",
        category: "Hero Patterns",
        implementation: `// src/components/ui/cutout-hero.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CutoutHero({
  headline,
  description,
  primaryCta,
  cutoutImage,
  backgroundColor, // MUST match AI image background exactly
}: any) {
  return (
    <section 
      className="min-h-[90vh] grid lg:grid-cols-2 gap-12 items-center px-4 py-16"
      style={{ backgroundColor }}
    >
      <div className="order-2 lg:order-1 space-y-6">
        <h1 className="text-5xl font-bold text-primary-foreground">{headline}</h1>
        <p className="text-lg text-primary-foreground/80">{description}</p>
        <button className="px-8 py-4 bg-white text-black rounded-full font-semibold">
          {primaryCta}
        </button>
      </div>
      
      <div className="relative order-1 lg:order-2">
        <img 
          src={cutoutImage} 
          alt="Hero Visual"
          className="relative z-10 w-full max-w-lg mx-auto"
        />
      </div>
    </section>
  );
}`,
        usage: `// Critical: Image background color must match 'backgroundColor' prop
<CutoutHero 
  headline="Fresh Local Food"
  description="Delivered to your door."
  primaryCta="Order Now"
  backgroundColor="#E54D2E"
  cutoutImage="/images/bowl-cutout.png"
/>`,
        accessibility: [
            "Image must have descriptive alt text.",
            "Contrast between background color and text must meet WCAG AA standards.",
            "Ensure logical focus order between content and visual columns."
        ]
    },
    {
        slug: "glow-card",
        name: "Glow Card",
        description: "A card component that visualizes a soft glow effect on hover, creating a 'premium' and tactile feel.",
        category: "Card Patterns",
        implementation: `export const GlowCard = ({ children, className }: any) => (
  <div className={\`group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-transparent transition-colors \${className}\`}>
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
    <div className="relative z-10">
      {children}
    </div>
  </div>
);`,
        usage: `<GlowCard>
  <h3 className="font-bold">Premium Feature</h3>
  <p>Hover to see the glow effect.</p>
</GlowCard>`,
        accessibility: [
            "Glow effect should not rely solely on color; ensure border or scale change also occurs.",
            "Ensure content remains readable over the glow background."
        ]
    }
];
