import { useEffect, useRef } from "react";

// Hand-drawn flash and doodles. Each one draws itself once, the first time it
// scrolls into view — the only scroll motion left on the site.
const ART = {
  rose: {
    viewBox: "0 0 120 170",
    paths: [
      "M60 28c17 0 31 14 31 31 0 18-14 32-31 32-18 0-31-14-31-32 0-9 4-17 10-23",
      "M62 46c-8 0-14 6-14 14 0 8 6 14 14 14 9 0 16-7 16-16 0-11-9-19-20-19-13 0-23 10-23 23",
      "M40 38c6-6 14-9 22-8",
      "M84 56c1 9-2 17-8 23",
      "M60 92c1 16 1 34 0 52",
      "M59 116c-11-2-20-10-23-21 12-1 23 7 26 18",
      "M62 132c11-1 20-9 23-20-12-2-24 6-27 17",
    ],
  },
  snake: {
    viewBox: "0 0 120 190",
    paths: [
      "M58 34c22 5 27 29 11 42-18 14-41 7-43 25-2 21 23 27 41 21 17-5 29 4 27 21-2 19-23 29-44 25",
      "M58 34c-9-2-15-9-14-17 1-9 10-14 19-12 9 2 14 10 12 18-1 6-6 10-12 11",
      "M63 14c4-4 10-5 15-2",
      "M52 22c-5 1-9 5-10 10",
    ],
  },
  moth: {
    viewBox: "0 0 150 120",
    paths: [
      "M75 26c3 13 3 44 0 68",
      "M73 34c-17-17-44-21-54-6-10 14 4 32 21 38-15 4-21 17-13 25 10 10 34 2 46-15",
      "M77 34c17-17 44-21 54-6 10 14-4 32-21 38 15 4 21 17 13 25-10 10-34 2-46-15",
      "M73 26c-6-9-15-13-24-13",
      "M77 26c6-9 15-13 24-13",
    ],
  },
  flourish: {
    viewBox: "0 0 260 40",
    paths: [
      "M6 20c42-20 74 20 118 0 44-20 76 20 130 0",
      "M124 20c4-6 12-6 16 0-4 6-12 6-16 0z",
      "M60 20c-4 4-10 4-14 0",
      "M200 20c4-4 10-4 14 0",
    ],
  },
  sun: {
    viewBox: "0 0 120 120",
    paths: [
      "M60 26c19 0 34 15 34 34S79 94 60 94 26 79 26 60s15-34 34-34z",
      "M60 6v10M60 104v10M6 60h10M104 60h10",
      "M22 22l7 7M91 91l7 7M98 22l-7 7M29 91l-7 7",
    ],
  },
  // Japanese great wave, loosely after the classic woodblock curl
  wave: {
    viewBox: "0 0 200 120",
    paths: [
      "M6 108c30-4 46-22 54-46 8-26 30-46 58-46 26 0 44 18 44 40 0 16-12 28-26 28-12 0-20-8-20-18 0-8 6-14 13-14",
      "M60 62c10 6 22 6 30-2",
      "M120 16c-6 6-8 14-6 22M138 20c-6 6-7 14-4 22M154 30c-5 5-6 12-3 18",
      "M6 108h188M30 108c10-8 22-10 34-6M150 108c10-10 24-12 40-8",
    ],
  },
  koi: {
    viewBox: "0 0 180 110",
    paths: [
      "M20 56c20-30 70-40 110-24 14 6 22 14 26 24-4 10-12 18-26 24-40 16-90 6-110-24z",
      "M156 56l18-20c-2 14-2 26 0 40z",
      "M42 50c-2 4-2 8 0 12",
      "M36 44c-6-4-12-4-16 0M36 68c-6 4-12 4-16 0",
      "M80 34c8 10 8 34 0 44M110 32c10 12 10 36 0 48",
      "M96 30c4-10 16-14 26-10M96 82c4 10 16 14 26 10",
    ],
  },
  lotus: {
    viewBox: "0 0 160 110",
    paths: [
      "M80 92c-14-18-14-50 0-74 14 24 14 56 0 74z",
      "M78 92c-24-6-40-30-40-56 22 6 38 28 40 56z",
      "M82 92c24-6 40-30 40-56-22 6-38 28-40 56z",
      "M74 94c-26 4-50-6-62-24 22-6 46 2 62 24zM86 94c26 4 50-6 62-24-22-6-46 2-62 24z",
      "M30 102h100",
    ],
  },
  note: {
    viewBox: "0 0 120 120",
    paths: [
      "M44 92V26l56-12v66",
      "M44 92c0 8-8 14-16 14s-14-4-14-10 8-12 16-12 14 4 14 8z",
      "M100 80c0 8-8 14-16 14s-14-4-14-10 8-12 16-12 14 4 14 8z",
      "M44 42l56-12",
    ],
  },
  drop: {
    viewBox: "0 0 100 120",
    paths: ["M50 10C36 34 22 52 22 72a28 28 0 0 0 56 0c0-20-14-38-28-62z", "M38 74c0 8 5 14 12 16"],
  },
  soap: {
    viewBox: "0 0 140 110",
    paths: [
      "M20 70c0-12 10-22 22-22h56c12 0 22 10 22 22v6c0 12-10 22-22 22H42c-12 0-22-10-22-22z",
      "M44 46a12 12 0 1 1 0-1M78 26a9 9 0 1 1 0-1M104 38a6 6 0 1 1 0-1",
      "M40 74h30",
    ],
  },
  noSun: {
    viewBox: "0 0 120 120",
    paths: [
      "M60 38a22 22 0 1 1 0 44 22 22 0 1 1 0-44z",
      "M60 8v12M60 100v12M8 60h12M100 60h12M24 24l8 8M88 88l8 8M96 24l-8 8M32 88l-8 8",
      "M16 104L104 16",
    ],
  },
  noSwim: {
    viewBox: "0 0 140 120",
    paths: [
      "M10 76c14-10 26-10 40 0s26 10 40 0 26-10 40 0",
      "M10 96c14-10 26-10 40 0s26 10 40 0 26-10 40 0",
      "M78 30a8 8 0 1 1 0-1M52 62l24-20 18 14",
      "M20 108L120 12",
    ],
  },
  wrap: {
    viewBox: "0 0 140 110",
    paths: [
      "M18 30h104v50H18z",
      "M18 30l20 20M122 30l-20 20M18 80l20-20M122 80l-20-20",
      "M52 46c6-6 14-6 18 0s12 6 18 0",
    ],
  },
  tube: {
    viewBox: "0 0 140 110",
    paths: [
      "M20 40h80l14 10v10l-14 10H20z",
      "M114 50h12v10h-12",
      "M20 40v30M36 48h40M36 62h26",
      "M128 38c2-6 6-8 10-6",
    ],
  },
  hand: {
    viewBox: "0 0 120 130",
    paths: [
      "M40 120V58c0-6 4-10 9-10s9 4 9 10v-34c0-6 4-10 9-10s9 4 9 10v34-6c0-6 4-10 9-10s9 4 9 10v40c0 22-14 38-36 38z",
      "M40 70c-8-10-20-12-26-6 8 10 16 26 26 36",
      "M98 14l8-8M106 24h10M20 20l-8-8",
    ],
  },
  chat: {
    viewBox: "0 0 140 110",
    paths: [
      "M20 22h100c6 0 10 4 10 10v40c0 6-4 10-10 10H60L34 102V82H20c-6 0-10-4-10-10V32c0-6 4-10 10-10z",
      "M40 52h4M68 52h4M96 52h4",
    ],
  },
  pin: {
    viewBox: "0 0 100 130",
    paths: ["M50 120C30 90 16 70 16 48a34 34 0 0 1 68 0c0 22-14 42-34 72z", "M50 36a12 12 0 1 1 0 24 12 12 0 1 1 0-24z"],
  },
  pencil: {
    viewBox: "0 0 140 110",
    paths: [
      "M24 92l8-24 66-66 16 16-66 66z",
      "M32 68l16 16M90 10l16 16",
      "M24 92c20-6 40 10 60 4s30-8 40-2",
    ],
  },
  sparkle: {
    viewBox: "0 0 100 100",
    paths: ["M50 10c4 24 16 36 40 40-24 4-36 16-40 40-4-24-16-36-40-40 24-4 36-16 40-40z", "M82 16v12M76 22h12"],
  },
  mountain: {
    viewBox: "0 0 200 110",
    paths: [
      "M6 100l54-70 30 38 26-30 78 62",
      "M48 46l12 8 10-6M108 46l8 6 8-4",
      "M150 22a10 10 0 1 1 0-1",
      "M6 100h188",
    ],
  },
  check: { viewBox: "0 0 60 60", paths: ["M12 32l12 12 26-28"] },
  cross: { viewBox: "0 0 60 60", paths: ["M16 16l28 28M44 16L16 44"] },
};

export default function Linework({
  art = "rose",
  className = "",
  duration = 1.4,
  stagger = 0.12,
  strokeWidth = 1.4,
}) {
  const svgRef = useRef(null);
  const spec = ART[art] || ART.rose;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const paths = Array.from(svg.querySelectorAll("path"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    paths.forEach((p, i) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
      p.style.transition = `stroke-dashoffset ${duration}s cubic-bezier(.65,0,.35,1) ${i * stagger}s`;
    });

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        paths.forEach((p) => (p.style.strokeDashoffset = "0"));
        io.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(svg);
    return () => io.disconnect();
  }, [art, duration, stagger]);

  return (
    <svg
      ref={svgRef}
      className={`linework ${className}`}
      viewBox={spec.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      aria-hidden="true"
    >
      {spec.paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
