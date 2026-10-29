// Atul's own work. Videos loop silently while on screen; `poster` shows first.
export const workItems = [
  { src: "/work/hannya-mask.jpg", note: "fresh hannya ✦", style: "Japanese colour · Hannya", place: "Calf" },
  { video: "/work/skull-dagger.mp4", src: "/work/skull-dagger.jpg", note: "skull & dagger", style: "Japanese colour · Skull & dagger", place: "Forearm" },
  { src: "/work/lotus-beads.jpg", note: "lotus & prayer beads", style: "Japanese black & grey · Lotus", place: "Thigh" },
  { video: "/work/tiger.mp4", src: "/work/tiger.jpg", note: "crouching tiger", style: "Black & grey · Tiger", place: "Forearm" },
  { src: "/work/eye-filigree.jpg", note: "eye & filigree", style: "Black & grey · Eye & filigree", place: "Upper arm" },
  { src: "/work/portrait.jpg", note: "a portrait to keep", style: "Realism · Portrait", place: "Arm" },
  { src: "/work/butterflies.jpg", note: "fine line flutter", style: "Fine line · Butterflies", place: "Arm" },
];

export const styles = [
  { name: "Japanese", art: "wave", tone: "vermilion", body: "Hannya masks, koi, lotus, waves and flow — bold, timeless compositions built to move with the body." },
  { name: "Colour work", art: "koi", tone: "koi", body: "Saturated, punchy colour that heals bright and stays bright with good aftercare." },
  { name: "Black & grey realism", art: "moth", tone: "ink", body: "Portraits, animals and soft shading — smooth gradients with real depth." },
  { name: "Fine line", art: "rose", tone: "sakura", body: "Delicate, precise linework for small, elegant pieces that still age well." },
  { name: "Geometric & Ornamental", art: "sun", tone: "gold", body: "Filigree, mandalas and symbols with clean symmetry, plus blackwork and dotwork." },
  { name: "Microrealism", art: "sparkle", tone: "jade", body: "Tiny, detailed realism — portraits, objects and memories in miniature." },
];

// Photos of Atul himself. Put the files in public/work/ and uncomment — the
// Journey page hero and the front of the home carousel pick them up.
export const artistPhotos = [
  // { src: "/work/atul-drawing.jpg", note: "still drawing, always ✦", alt: "Atul Rana holding his pastel sunset drawing" },
  // { src: "/work/atul-hills.jpg", note: "somewhere in the hills", alt: "Atul Rana in the hills, showing his leg tattoos" },
];

// Home hero carousel: Atul first (if any), then the work.
export const heroSlides = [
  ...artistPhotos,
  ...workItems.map(({ src, note, style }) => ({ src, note, alt: `${style} tattoo by coilbugatul` })),
];

// A piece as a Polaroid/PageHero photo, looked up by its file name.
export function photoOf(slug, note) {
  const w = workItems.find((x) => x.src.includes(slug));
  return { src: w.src, alt: `${w.style} tattoo by coilbugatul`, note: note ?? w.note };
}
