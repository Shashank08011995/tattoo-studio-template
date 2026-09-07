import { useEffect, useRef } from "react";
import { gsap } from "gsap";

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
      "M60 52c6 3 12 3 18 0",
      "M90 52c-6 3-12 3-18 0",
    ],
  },
  dagger: {
    viewBox: "0 0 60 180",
    paths: [
      "M30 8 42 58 30 152 18 58Z",
      "M6 60h48",
      "M30 62v34",
      "M22 96h16l-2 30H24Z",
      "M30 126c6 0 10 5 10 11s-4 11-10 11-10-5-10-11 4-11 10-11z",
      "M30 20v112",
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
  arrow: {
    viewBox: "0 0 220 40",
    paths: [
      "M8 20h198",
      "M206 20l-14-10M206 20l-14 10",
      "M26 20l14-10M26 20l14 10",
      "M44 20l14-10M44 20l14 10",
    ],
  },
  sun: {
    viewBox: "0 0 120 120",
    paths: [
      "M60 26c19 0 34 15 34 34S79 94 60 94 26 79 26 60s15-34 34-34z",
      "M72 38c-14-4-28 5-31 19-3 15 7 29 22 31-9-6-14-17-12-28 2-10 10-19 21-22z",
      "M60 6v10M60 104v10M6 60h10M104 60h10",
      "M22 22l7 7M91 91l7 7M98 22l-7 7M29 91l-7 7",
    ],
  },
};

export default function Linework({
  art = "rose",
  className = "",
  duration = 1.6,
  stagger = 0.12,
  strokeWidth = 1.4,
  start = "top 85%",
}) {
  const svgRef = useRef(null);
  const spec = ART[art] || ART.rose;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const paths = Array.from(svg.querySelectorAll("path"));
    if (!paths.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paths.forEach((p) => {
        p.style.strokeDasharray = "none";
        p.style.strokeDashoffset = "0";
      });
      return;
    }

    const ctx = gsap.context(() => {
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.to(paths, {
        strokeDashoffset: 0,
        duration,
        stagger,
        ease: "power2.inOut",
        scrollTrigger: { trigger: svg, start, once: true },
      });
    }, svg);

    return () => ctx.revert();
  }, [duration, stagger, start]);

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
