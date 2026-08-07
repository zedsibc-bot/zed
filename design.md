# Zed's Tools Depot — Frontend Design Specification

**Project:** Single-page marketing website for Zed's Tools Depot — Hardware Tools and Equipment Trading, Quezon City, Philippines.

**Stack:** Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript.

**Content source:** `scripts/company-profile.pdf` (25 pages, company profile) + extracted assets in `public/assets/` via `scripts/company_data.md`.

**Style language:** Light retail — modeled after a Philippine tools/hardware storefront (adapted from khmtools.com.ph). Clean white and off-white surfaces, deep ink text, a **yellow primary** (calls, CTAs, logo, accents), with orange, red, and green retained as secondary accents. Square, sharp-edged UI, hairline dividers, dense information, factual content only.

---

## 1. Color Palette

| Token | Hex | Usage |
|---|---|---|
| `gold` — Retail Yellow (primary) | `#FFD000` (hover `#EA580C`) | Utility bar, primary CTAs, logo mark, section accents, red band CTA |
| `gold-deep` | `#E6A800` | Readable yellow headings/borders on white (section kickers, product titles, sector labels) |
| `green` — Trust Green | `#048404` | Fresh/trust pops (international chips, OG accent) |
| `accent` — Safety Orange | `#EA580C` (hover `#F97316`) | Secondary accent, "Tools" brand word, product line markers, hover states |
| `accent-2` | `#F97316` | Lighter orange emphasis, product markers |
| `red` — Retail Red | `#E23B2B` | Secondary accent, reserved highlights (hover pops) |
| `bg` (base) | `#FFFFFF` | Primary page background |
| `bg-darker` | `#F5F5F5` — warm off-white | Flow shelves / distinction of sections and panels |
| `bg-dark` | `#ECECEC` | Denser panel backgrounds |
| `bg-darkest` (navy) | `#0D1C2E` | Footer background |
| `card` | `#FFFFFF` | Cards on top of `bg-darker` |
| `card-soft` | `#F5F5F5` | Card fill on white sections |
| Text — ink | `#1A1A1A` | On light (headings/CTA text) |
| Text — muted | `#6B6B6B`/`#595959` | Body copy on light |
| Text — muted-faint | `#999999` | Small meta labels, footer hairlines |
| Border/hairline | `rgba(0,0,0,0.12)` | Hairline grid dividers, card borders |

### Tailwind v4 theme tokens
```
--color-bg:        #FFFFFF
--color-bg-darker: #F5F5F5
--color-bg-dark:   #ECECEC
--color-bg-darkest:#0D1C2E
--color-accent:    #EA580C
--color-accent-2:  #F97316
--color-gold:      #FFD000
--color-gold-deep: #E6A800
--color-red:       #E23B2B
--color-green:     #048404
--color-navy:      #0A2540
--color-ink:       #1A1A1A
--color-muted:     #6B6B6B
--color-muted-2:   #595959
--color-muted-faint:#999999
--color-hairline:  rgba(0,0,0,0.12)
--font-sans:       --font-barlow
--font-heading:    --font-archivo
```

---

## 2. Typography

**Font family:** Archivo (display/headings) + Barlow (body) from `next/font/google` (self-hosted). Fallback: `ui-sans-serif, system-ui, sans-serif`.

| Element | Size | Weight | Color | Align |
|---|---|---|---|---|
| H1 (hero headline) | 48px → responsive down to 36px | 800 | `#1A1A1A` | center or left |
| H2 (section titles) | 32px → 28px | 700 | `#1A1A1A` | left |
| H3 (card titles) | 18px | 700 | `#1A1A1A` | left |
| H4 (labels / meta) | 14px | 600 | `#1A1A1A` | — |
| Body | 14px | 400 | `#595959` | — |
| Nav & buttons | 14px | 600 | — | text-transform: uppercase |

**Line-height:** body `1.6`, headings `1.2`.

**Section accent:** `.label-kicker` — small yellow-deep label with a 22×2px inline rule before it; replaces the old `/////` Divider (`.label-kicker` is a utility class, not a component). Gold-deep on light, `.light` variant inverts to white on dark bands.

---

## 3. Header & Navigation Bar

- **Container:** two-tier header.
  - **Tier 1 — yellow utility bar (top):** `#FFD000` full-width strip, ink 12px text: Phone, Email, Address (SVG handle icons), and the trading tagline on large screens.
  - **Tier 2 — sticky white header:** `#FFFFFF` with soft shadow when scrolled; logo (gear SVG in gold square, ink wordmark with "Tools" in orange), center nav links (Home…Contact), gold "Get A Quote" CTA → `tel:+639350396218`.
  - Mobile: hamburger → full-screen overlay (white, large ink links) at `lg` breakpoint.
- **Logo:** graphic icon (wrench/gear SVG in gold) + text "Zed's Tools" (ink) / "Tools" accented `#EA580C`.

---

## 4. Section Breakdown

### 01 — Hero / Storefront
- Light `#FFFFFF` hero (no full-bleed dark photo).
- Left column: yellow-deep kicker "Est 2020 · Quezon City", explosive `Archivo` headline "Zed's Tools Depot" + orange subtitle, short intro paragraph, gold CTA "Call …" (ink text) + outlined ink "Send an Inquiry"→`mailto:`.
- Right column: framed store photo (`pg-16-01.png`) in a `#F5F5F5` border, with caption dot.
- Below: **category widget bar** (4 tiles: Power & Hand Tools, Electrical, Pumps & Motors, Industrial & Welding) — squares with 44px gold icon wells, hairline grid background.
- Next: **milestone track** on `#F5F5F5` — the 5 origin milestones (01 First known as Zed's Depot → 05 Builders Corp. 2025).

### 02 — About
- `#F5F5F5` background.
- 2 columns (50/50): overlapping storefront/interior photos, right-side history (online store est. Aug 2020 → physical store Apr 25, 2021 → brand evolved → Builders Corp. 2025), Vision + Mission cards (white), gold-left-rule Commitment note, gold "Learn More" CTA.

### 03 — Services & Supplies
- `#FFFFFF` background.
- Kicker "02 / What We Supply" + card grid, 12 supply cards.
- Cards: `#FFFFFF` with hairline grid, number offset, Archivo title, muted copy.

### 04 — Product Lines
- `#F5F5F5` background.
- Kicker "03 / Product Lines".
- Container `gap-px bg-hairline`, cards `#FFFFFF` (13 lines, list markers as 6×2px orange rules).

### 05 — Why Choose Us
- `#FFFFFF` background.
- Kicker "04 / Why Zed's".
- 2 columns: framed store photo (`pg-16-02.png`) + caption dot; right side 2×2 `#F5F5F5` cards with 2px gold-deep left border (Authorized Supplier, Quality Brands, Money's Worth, Fast Service).

### 06 — Clients & Partners
- `#F5F5F5` background.
- Kicker "05 / Clients & Partners".
- 2 columns: framed photo (`pg-15-02.png`), right side a 6-row "Who We Supply" table (hairline dividers, gold-deep sector labels, muted client names).
- Below split cards **Local 16** / **International 6** chips — bordered, gold-deep for the latter.

### 07 — CTA band (signal band)
- Solid `#FFD000` full-width band, ink text, ink "Call" → `tel:` + ink outline "Email Us".

### 08 — Gallery & Certifications
- `#FFFFFF` background.
- "Store Gallery" masonry (full-height images, hairline borders).
- Certification grid (13 items) with gold CheckIcon wells: `#FFFFFF` cards, gold check square, Archivo title + muted code.
- Dark navy footer follows.

### 09 — Brands, Bank & Contact
- `#F5F5F5` background.
- **Brands strip:** bordered chips (hairline) — Emerson, Siemens, Cameron, Leakwise, Precision Digital, Contrec, Supmea, etc.
- **Contact cards:** gold square icon wells (map-pin address, mail, phone), ink labels, addresses/emails/phones in muted with gold hover.

---

## 5. Interaction / Behavior Rules

- All in-page navigation uses `#section-id` anchors; no routing.
- Contact actions use `tel:` and `mailto:`.
- Next `<Image>` requires explicit `width`/`height` or `fill` — use `fill` + parent aspect containers for extracted photos.
- Mobile-first breakpoints: base → `sm` (640) → `md` (768) → `lg` (1024).

---

## 6. Accessibility

- Buttons: `focus-visible` rings in gold-deep.
- All images: descriptive `alt`.
- Contrast: `#595959` on `#FFFFFF` passes AA; `#999999` only for non-essential meta.

---

## 7. Content Sources

- **Copy:** `scripts/company_data.md` (machine-extracted from the PDF).
- **Photos:** `public/assets/pdf/pg-*` (extracted from the PDF originally).
- **Verification artifact:** `public/assets/thumbs/` full-page snapshots used during build.
- **Sensitive data:** the PDF is excluded from `public/` (moved to `scripts/`); no TIN, bank accounts, owner name, or certificate scans are rendered. Certifications are text-only badges.