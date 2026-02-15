# Pattern Quality System v1.0
**Purpose:** Deterministic quality rules for selecting and composing patterns so LLM outputs look premium, intentional, and conversion-ready.

---

## Quality Targets

Every generated page should pass these baseline targets:

1. **Clarity in 5 seconds:** headline, value proposition, and primary action are immediately obvious.
2. **Single focal hierarchy:** each section has one dominant element and one support layer.
3. **Controlled visual system:** one radius family, one shadow family, one border language.
4. **Motion discipline:** meaningful animation only; reduced-motion still communicates the same content.
5. **Trust resilience:** no invented claims, no placeholder statistics, no blank content modules.

---

## Premium Visual Rules

### 1) Composition
- Use an editorial cadence: dominant section, secondary section, quiet support sections.
- Avoid repeating identical section structures more than twice in a row.
- Keep CTA hierarchy explicit: primary > secondary > tertiary text link.

### 2) Material and Depth
- Use one depth system per page (`ambient blobs`, `aurora`, `shape blur`, or `flat`).
- Keep accent surfaces under 10% of visible area.
- Avoid hard black shadows unless the design intentionally uses brutalist style.

### 3) Typography
- Use a 3-step hierarchy: display, section heading, body/caption.
- Keep long paragraphs under 3 lines on mobile where possible.
- Avoid all-caps for body copy and avoid low-contrast muted body text.

### 4) Interaction
- Interactive patterns must always include keyboard and focus-visible behavior.
- If pointer-driven behavior is used, provide a coarse-pointer fallback.
- Avoid stacking two high-interaction patterns back-to-back above the fold.

---

## Selection Rules (When / Avoid / Fallback)

### Hero Patterns

| Pattern | When to Use | Avoid | Fallback |
|---|---|---|---|
| `1.4 DiagonalSplitHero` | High-trust local services, conversion-first pages | If no clear CTA or no supporting image | `9.3 BentoGrid` + static hero block |
| `1.1 MeshGradientHero` | Premium modern brands with controlled motion | Medical/legal pages requiring minimal motion | `1.4 DiagonalSplitHero` |
| `1.2 DicedHero` | Strong image inventory, food/hospitality | Weak imagery or inconsistent art direction | Text-led hero + `2.2 PlaceCard` |
| `1.3 CutoutHero` | Pixel-perfect cutout assets are available | Any uncertain image matte/background match | `1.4 DiagonalSplitHero` |

### Trust and Conversion

| Pattern | When to Use | Avoid | Fallback |
|---|---|---|---|
| `10.1 ServiceCard` | Service scope comparison with concise bullets | Large narrative copy per card | `9.3 BentoGrid` |
| `10.2 TestimonialCarousel` | 3+ high-quality testimonials available | Placeholder testimonials or no attribution | Trust badges + process section |
| `6.1 AnimatedCounter` | Verified metrics with clear unit labels | Estimated or outdated values | Static proof strip |
| `10.3 ContactCTA` | End-of-flow conversion module | Hidden contact methods | Sticky CTA + inline contact row |
| `10.4 BusinessHours` | Local services where open-now context matters | Non-local digital products | Contact details card |

### High-Risk / Experimental

| Pattern | Risk | Required Safeguard |
|---|---|---|
| `2.3 SpotlightCard` | pointer-only interaction | disable effect on coarse pointer |
| `3.1 ExpandingCards` | desktop bias | static card grid fallback on mobile |
| `5.1 MagneticText` | playful trust erosion | avoid in medical/legal/financial contexts |
| `5.5 MorphingCursorText` | accessibility and pointer dependency | static text fallback, preserve readability |

---

## Compatibility Rules

### Allowed Pairings (High Confidence)
- `1.4` + `10.1` + `10.2` + `10.3`
- `1.2` + `2.2` + `3.2` + `10.3`
- `9.3` + `10.1` + `10.2`
- `1.1` + `6.1` + `10.3` (with motion controls)

### Restricted Pairings (Avoid by Default)
- `1.1` with `8.1` in same hero viewport (excess ambient conflict).
- `1.3` with any heavy ambient behind cutout edge zone.
- `5.1` or `5.5` as primary emphasis in high-trust industries.
- `3.3 ScrollStack` followed immediately by another heavy interaction module.

---

## Anti-Patterns (Do Not Ship)

1. Multiple hero-like focal blocks in the first viewport.
2. Placeholder data, fake metrics, or unverifiable proof.
3. Decorative motion without semantic purpose.
4. Brand-inconsistent color jumps across sections.
5. Blank image tiles, broken media icons, or empty right columns.
6. Conversion CTA that appears only once on long pages.

---

## Quality Gate Checklist

Before final output, verify:

- [ ] No horizontal overflow at 320px.
- [ ] One clear primary CTA above fold.
- [ ] One dominant focal point per section.
- [ ] Reduced-motion version keeps full meaning.
- [ ] No unresolved placeholders (`{{...}}`, lorem ipsum, `TODO`).
- [ ] All proof claims are sourceable and current.

---

## Failure Handling Protocol

If quality checks fail:

1. **Readability issue:** reduce ambient intensity, increase text contrast, simplify backgrounds.
2. **Motion issue:** disable non-essential animation and preserve static end state.
3. **Content gap:** replace weak modules with stronger factual modules (services, process, contact).
4. **Media failure:** remove broken assets and reflow layout; do not show broken placeholders.
5. **Trust failure:** demote experimental effects and prioritize proof + clarity patterns.

---

## Output Requirement for Agents

When this reference is used, the generated output should include:

1. Chosen pattern set with explicit justification.
2. One rejected alternative stack with reason.
3. Constraints and anti-pattern checks.
4. Fallback path per high-risk pattern.
