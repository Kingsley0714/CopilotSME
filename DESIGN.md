# Design System Strategy: High-End Editorial Fintech

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Architect."** 

Consulting is about structure, vision, and the precise application of expertise. To move beyond the "generic fintech" look, this system rejects the standard rigid grid in favor of an editorial layout characterized by intentional white space, high-contrast typography, and asymmetrical depth. We are not just building an app; we are designing a premium consultancy experience that feels as authoritative as a high-end financial journal and as fluid as a modern tech platform.

By utilizing the depth of deep indigos and the energy of vibrant violets, we create a "Luminous Depth" effect—where information feels like it is floating on layers of sophisticated, translucent surfaces.

---

## 2. Colors
Our palette is rooted in the Material Design convention but applied with a high-end, bespoke philosophy.

### The "No-Line" Rule
**Explicit Instruction:** Use of 1px solid borders for sectioning is strictly prohibited. 
Structural boundaries must be defined through background color shifts. For example, a `surface-container-low` section should sit directly against a `surface` background. This creates a seamless, modern flow that feels engineered rather than "boxed in."

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. We use the surface-container tiers to create "nested" depth:
*   **Background (`#f8f9fa`):** The canvas.
*   **Surface-Container-Lowest (`#ffffff`):** Used for primary content cards to create a soft, natural lift.
*   **Surface-Container-Highest (`#e1e3e4`):** Used for "sunken" utility areas or secondary navigation bars.

### The "Glass & Gradient" Rule
To evoke a high-tech, innovative feel, use **Glassmorphism** for floating elements (like Modals or sticky Navbars). 
*   **Implementation:** Use a semi-transparent version of `surface` or `primary-container` with a `backdrop-blur` of 20px-40px.
*   **Signature Textures:** Apply subtle linear gradients (e.g., `primary` `#3d0eb4` to `primary-container` `#5535cb`) at a 135-degree angle for Hero CTAs. This adds a "digital soul" that flat color cannot replicate.

---

## 3. Typography
We use a dual-font system to balance "Expertise" with "Efficiency."

*   **Display & Headline (Manrope):** A sophisticated sans-serif with geometric leanings. Used for large, impactful statements. Its wide apertures convey openness and innovation.
*   **Title, Body, & Label (Inter):** A workhorse typeface designed for maximum legibility at small sizes. This conveys the "Consulting" aspect—clear, no-nonsense, and professional.

**Hierarchy as Identity:**
By pairing a `display-lg` (3.5rem) headline in Manrope with a generous `body-lg` (1rem) in Inter, we create a high-contrast editorial scale. This mimics the layout of premium financial reports, instantly signaling "Expertise" to the user.

---

## 4. Elevation & Depth
Elevation is achieved through **Tonal Layering** rather than traditional drop shadows.

*   **The Layering Principle:** Stacking tiers is our primary tool. A `surface-container-lowest` card placed on a `surface-container-low` section creates a sophisticated "paper-on-paper" lift.
*   **Ambient Shadows:** If a shadow is required (e.g., for a floating action button), it must be extra-diffused. 
    *   *Spec:* Blur: 24px, Opacity: 6%, Color: Derived from `on-surface` (dark indigo tint).
*   **The "Ghost Border" Fallback:** If accessibility requires a container boundary, use the `outline-variant` token at **15% opacity**. Never use 100% opaque borders.
*   **Glassmorphism Depth:** When using glass layers, the background colors should "bleed" through, softening the edges and making the layout feel integrated into the environment.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary` background with `on-primary` text. Use `xl` (1.5rem) rounded corners for a modern, GXBank-inspired feel.
*   **Secondary:** `surface-container-highest` background. No border.
*   **Tertiary:** Transparent background with `primary` text. Used for low-priority actions.

### Cards & Lists
*   **Constraint:** Forbid the use of divider lines.
*   **Separation:** Use vertical white space from the Spacing Scale (specifically `8` or `10`) or subtle background shifts between `surface-container` tiers to separate list items.
*   **Style:** `xl` rounded corners (1.5rem) with an ambient shadow or a "Ghost Border."

### Input Fields
*   **State:** Use `surface-container-lowest` for the field background. 
*   **Focus:** Transition the "Ghost Border" from 15% opacity to 100% `primary` color.
*   **Error:** Use `error` (#ba1a1a) for text and a 20% opacity `error_container` fill.

### Signature Component: The "Consultant Insight" Card
A specialized card for fintech data. Use a `primary_container` background with a subtle glassmorphism overlay on the bottom third for the CTA, creating a sense of "High-Tech Professionalism."

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical layouts. Let a headline hang over the edge of a card to break the "boxed" feel.
*   **Do** prioritize `primary` purple for high-impact moments only (CTAs, Key stats).
*   **Do** use "Breathing Room." If you think a section has enough padding, add 25% more. High-end design is defined by space.

### Don't
*   **Don't** use 1px solid black or grey borders. This instantly makes the system look "out-of-the-box" and cheap.
*   **Don't** use traditional "Drop Shadows" with high opacity. They muddy the clean, high-tech aesthetic.
*   **Don't** crowd the interface. If a screen feels busy, move secondary information into a "sunken" `surface-container-high` drawer.

### Accessibility Note
While we prioritize a "No-Line" aesthetic, always ensure the contrast ratio between `surface` tiers and `on-surface` text meets WCAG AA standards. Use the `outline-variant` Ghost Border when testing shows a lack of visual affordance for interactive elements.