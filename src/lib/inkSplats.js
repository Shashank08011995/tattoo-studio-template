import { gsap } from "gsap";

export const INK_SPLATS = [
  "M50 4c9 0 14 8 21 10s16-1 19 9-6 13-4 22-3 19-14 19-13-9-22-9-18 8-25-1 2-15-2-23S6 15 14 8s17 5 26-4z",
  "M46 2c11-3 20 6 27 12s13 3 15 14-9 12-9 21 4 20-9 22-15-10-25-10-19 9-25-2 4-16 0-24S3 18 11 9s16 3 25-2z",
  "M40 6c8-5 19-2 24 6s2 15 9 20 8 16-2 21-16-4-25-2-17 11-24 2 1-16-4-22S1 17 10 10s16 4 20-4z",
];

export function spawnInkSplatAt(x, y, container = document.body, opts = {}) {
  const size = opts.size ?? 22 + Math.random() * 18;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 90 90");
  svg.classList.add("ink-splat-burst");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", INK_SPLATS[Math.floor(Math.random() * INK_SPLATS.length)]);
  svg.appendChild(path);

  svg.style.width = `${size}px`;
  svg.style.height = `${size}px`;
  svg.style.left = `${x - size / 2}px`;
  svg.style.top = `${y - size / 2}px`;
  container.appendChild(svg);

  gsap.fromTo(
    svg,
    { scale: 0, opacity: 0.9, rotate: Math.random() * 60 - 30 },
    {
      scale: 1,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      onComplete: () => svg.remove(),
    }
  );
}

// Splats land in the viewport layer rather than inside the headline's
// overflow:hidden reveal mask, which would clip them.
export function spawnInkSplatOnLine(lineEl) {
  if (!lineEl) return;
  const r = lineEl.getBoundingClientRect();
  spawnInkSplatAt(r.right + 6, r.top + r.height * 0.62, document.body, {
    size: 26 + Math.random() * 18,
  });
}
