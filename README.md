# Ritual Ink — Tattoo Studio Landing Page

A GSAP-animated landing page template for pitching to tattoo studio leads.
Vite + React, with GSAP + ScrollTrigger and Lenis smooth scroll.

Design direction is **"Ink & Paper"**: a light, off-white paper ground rather
than the dark template look, with editorial serif type, hand-drawn linework
that draws itself on scroll, and photography that sits on the page as a
printed sketch until you hover it.

## Before sending to a lead — what to customize

Placeholders live at the top of `src/App.jsx`:

```js
const WA_NUMBER = "971500000000";       // studio's WhatsApp number (no + or spaces)
const INSTAGRAM_HANDLE = "@[instagram_handle]";
const INSTAGRAM_URL = "https://instagram.com/[instagram_handle]";
const PHONE_DISPLAY = "[+971 5X XXX XXXX]";
const ADDRESS = "[Street, Area, Dubai]";
```

The studio name renders through the `Wordmark` component in `src/App.jsx`
(currently `Ritual Ink`, with the second word italicised). Change it there and
it updates the nav, footer and closing. Also update `<title>` and the meta
description in `index.html`.

Also update:

- **Stats** — search `data-target=` in `App.jsx` (four instances), and the
  matching `.hero-meta` values just above them.
- **Reviews** — replace the three placeholders with real Google reviews. Keep
  quotes short and paraphrase long ones rather than copy-pasting verbatim.
- **Portfolio** — edit the `workItems` array in `App.jsx`. Each entry has a
  `src`, a `style` and `place` caption, and a span class. See "Photography".
- **Footer address / hours** — search `[Street, Area, Dubai]` and
  `[Opening hours]`.

## Photography

`public/img/` ships with **placeholder photography from Unsplash** (Unsplash
License — free for commercial use, no attribution required). **Replace these
with the studio's own healed work before sending.** Keeping stock tattoo
photos on a live studio site misrepresents their portfolio.

Drop replacements into `public/img/` using the same filenames and nothing else
needs to change. Portrait crops suit `tall`, `pair` and the default span;
landscape crops suit `wide` and `half`.

Grid spans tile a 12-column grid, so keep the row sums at 12 if you reorder:

| class     | span | aspect |
|-----------|------|--------|
| `tall`    | 5    | 4 / 5  |
| `wide`    | 7    | 4 / 3  |
| `half`    | 6    | 16 / 11|
| `pair`    | 6    | 4 / 5  |
| *(none)*  | 4    | 3 / 4  |

Current rows: `5+7` / `6+6` / `4+4+4` / `6+6`.

## Run locally

```bash
npm install
npm run dev
```

## Build & deploy

```bash
npm run build
```

Outputs to `dist/`. Push to GitHub, import to Vercel, deploy.

**Recommended workflow per lead:** duplicate this folder per studio, fill in
their details, deploy to a throwaway Vercel URL (e.g.
`studioname-demo.vercel.app`) and send the link rather than a screenshot —
the motion is most of the pitch.

## Design notes

- **Palette** — paper `#F7F4EF`, ink `#1A1815`, sepia `#6B5D4F`, and a single
  seal red `#8C3A2E` used sparingly (stamp, review stars, hover states). The
  light ground is the main differentiator; nearly every tattoo template is
  black.
- **Type** — Instrument Serif for display (editorial, high contrast), Inter
  for body, IBM Plex Mono for labels and small caps.
- **Linework** (`src/components/Linework.jsx`) — SVG tattoo flash drawn with
  `stroke-dashoffset` on scroll. Available art: `rose`, `snake`, `moth`,
  `dagger`, `flourish`, `arrow`, `sun`. Use it sparingly; it stops reading as
  hand-drawn if it's on every section.
- **Ink reveal** (`src/hooks/useInkReveal.js`) — adds an irregular blob mask
  to any `.ink-reveal` element and grows it on scroll, so images bleed in like
  ink into paper. The mask is dropped once complete to keep edges crisp.
- **Sketch → photo** — each portfolio image is stacked twice: a
  desaturated, high-contrast `multiply` copy that reads as a sketch printed on
  the paper, crossfading to the full photo on hover.
- **Booking CTA** — deliberately ink-black rather than WhatsApp green, which
  fights the paper palette. The WhatsApp glyph carries the recognition.
- Motion is restrained by design: one orchestrated hero reveal, scroll
  counters, ink reveals, and the linework draw. Resist adding more.
- Everything respects `prefers-reduced-motion`.
