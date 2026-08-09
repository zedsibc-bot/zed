# Client-Ready Enterprise Design System (Anti-AI Template Specification)

**Version:** 2.0.0  
**Target:** Bespoke, High-End Client Deliverables  
**Objective:** Elimination of the "vibe-coded" SaaS aesthetic (purple gradients, bento grids, glassmorphism, emoji overuse) in favor of architecturally disciplined, editorial, and human-centered user interfaces.

---

## 1. Architectural Layout & Spatial Systems

### 1.1 Layout Philosophy

- **Structural Intent:** Abandon repetitive grid matrices and box-in-box containment. Use asymmetrical layouts, structural split-screens, and structural whitespace to establish visual hierarchy.
- **The Anti-Box Rule:** Information must be organized through typographic scale, solid background transitions, or structural borders—never by trapping every content module inside a separate rounded card.

### 1.2 Grid & Content Containment

- **Max Width Strategy:** Standardize on a strict desktop grid constraint. Use `max-w-7xl` (1280px) for standard marketing sections and `max-w-5xl` (1024px) for high-density, editorial prose sections to maximize focus.
- **Section Transitions:** Separate content blocks using raw structural whitespace or solid, hard-edged background color shifts. Do not use floating cards over ambient gradient backdrops.

### 1.3 Margins and Padding System (Mathematical Scales)

- **Macro-Spacing (Section-to-Section):** Enforce wide vertical breathing room. A minimum desktop vertical padding of `py-24` (96px) to `py-32` (128px) must be applied across alternating content components.
- **Micro-Spacing (Inline Elements):** Maintain proportional geometric lockups. Use a strict 4:1 scale ratio for structural elements (e.g., if paragraph block padding is `p-8`, accompanying internal elements must map cleanly to `p-2`).

---

## 2. Typographic Discipline & Scale

### 2.1 Font Selection & Pairing Matrix

- **Primary Display Serif:** Use high-contrast, editorial serif typefaces for all headings (H1, H2, H3). Suggested choices include _Playfair Display_, _Clash Display_, or _Cormorant Garamond_.
- **Secondary Interface Sans:** Use high-legibility, geometric sans-serif typefaces for user interface controls, body copy, and secondary metadata. Suggested choices include _Inter_, _SF Pro_, or _Instrument Sans_.

### 2.2 Strict Proportional Typography Scale

```text
[Element]      [Size]          [Weight]        [Line Height]   [Tracking]
Hero H1        4.5rem (72px)   Bold (700)      1.05 (Tight)    -0.03em
Section H2     3.0rem (48px)   Medium (500)    1.15            -0.02em
Subhead H3     1.5rem (24px)   Regular (400)   1.25            Normal
Body Copy      1.0rem (16px)   Regular (400)   1.60 (Wide)     Normal
UI Metadata    0.875rem (14px) Medium (500)    1.40            +0.05em
```

### 2.3 Typographic Rules

- **No Extremes:** Do not mix maximum bold display titles with ultra-thin, hard-to-read line weights in adjacent body copy blocks.
- **Container Bounds:** All long-form text elements must be explicitly constrained to a line length of 45 to 75 characters per line (`max-w-2xl` to `max-w-3xl`) to ensure optimal line lengths.

---

## 3. Sophisticated Color Budgets & Chromatic Restraint

### 3.1 The 60-30-10 Architecture Rule

- **60% Dominant (Canvas):** Limited to architectural neutrals. Use deep charcoal (`#0C0F12`), structured stone (`#1C1F22`), stark gallery white (`#FAFAFA`), or rich cream (`#FDFBF7`).
- **30% Secondary (Structure):** Used for typography, structural borders, subtle containers, and navigation foundations.
- **10% Accent (Intent):** Reserved purely for interactive cues, primary calls-to-action, or critical highlights.

### 3.2 Chromatic Restrictions & Outlawed Assets

- **Absolute Gradient Ban:** Radial background light blooms, indigo-to-purple blurs, and shifting, multicolored header text are strictly prohibited.
- **Neon Suppression:** High-chroma cyan, magenta, and electric lime greens are banned. Brand accents must choose organic, historically grounded tones (e.g., deep burgundy, olive, terracotta, or midnight blue).

---

## 4. UI Elements & Functional Micro-Interactions

### 4.1 Structural Edges & Borders

- **Border Radius Lock:** Container border radius must be limited to either `rounded-md` (6px) or `rounded-none` to preserve architectural discipline. No pill-shaped UI.
- **Divider Standards:** All horizontal and vertical dividing rules must be `border-neutral-200` on light or `border-neutral-800` on dark themes. No decorative multi-colored rules.

### 4.2 Buttons and Interactive Controls

- **Button states:** All actionable components must have four explicit state styles: default, hover, active/focus-visible, and disabled.
- **Motion Stack:** Buttons, cards, and navigable elements must use the prescribed transition stack:
  ```text
  transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
  ```

---

## 5. Asset Standards & System Integrity

### 5.1 Graphic Iconography

- **Zero Emoji Tolerance:** Emojis are strictly banned as UI elements, navigation anchors, decorative accents, and bullet points.
- **Bespoke SVGs Only:** All icons must be imported from a unified icon set (e.g., _Lucide_, _Phosphor Icons_) at consistent stroke weight.

### 5.2 Real Data vs. Mock Placeholders

- **No live counters:** No artificial numbers, metrics, or telemetry may use live view or counter animations unless the source is genuine telemetry.
- **Real assets:** No grey placeholder glyphs, sample logos, or generic imagery of people. Use crafted monograms or client-approved photography.
