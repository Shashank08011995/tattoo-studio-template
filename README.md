# coilbugatul — Atul Rana, Tattoo Artist

Multi-page site for **coilbugatul** (Atul Rana), a freelance tattoo artist
travelling across India — Japanese, colour and custom work.

Vite + React + React Router. No animation libraries: the only motion is
sections fading up on scroll, hand-drawn doodles that draw themselves once,
and the style marquee. Everything respects `prefers-reduced-motion`.

## Pages

| Route        | What's on it |
|--------------|--------------|
| `/`          | Hero, intro, styles, travelling studio, recent work, process, aftercare teaser |
| `/about`     | The journey timeline (childhood → 2020 → freelance → today), yoga & music, why freelance, skills & certifications |
| `/work`      | Styles, primary/additional style lists, portfolio gallery, Instagram link |
| `/consult`   | Consultation steps, hygiene & safety, before-your-session tips, FAQ |
| `/aftercare` | Interactive healing timeline, do/don't, "is this normal?", when to see a doctor |
| `/contact`   | WhatsApp message composer (fills in idea, city, size…), call / WhatsApp / Instagram cards |

## Editing

- **Contact details, brand, nav** — `src/site.js`
- **Portfolio & styles** — `src/data.js`
- **Doodles** — `src/components/Linework.jsx` (`ART` map of SVG paths)
- **Colours & layout** — `src/index.css` (tokens at the top)

### Adding new work

Photos and short videos live in `public/work/`. Drop a file in and add an
entry to `workItems` in `src/data.js` (videos take `video` plus a `src`
poster frame). Keep videos short, muted and re-encoded small, e.g.:

```bash
ffmpeg -i in.mp4 -an -vf scale=720:-2 -c:v libx264 -crf 26 -movflags +faststart public/work/name.mp4
```

## Run & deploy

```bash
npm install
npm run dev
```

```bash
npm run build
```

Outputs to `dist/`. `vercel.json` rewrites every route to `index.html` so
deep links like `/aftercare` work on Vercel.
