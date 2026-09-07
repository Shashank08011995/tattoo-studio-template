import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { spawnInkSplatAt } from "../lib/inkSplats";

export default function CursorRing() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const ring = ringRef.current;
    const dot = dotRef.current;

    gsap.set([ring, dot], { xPercent: -50, yPercent: -50 });

    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });

    const onMove = (e) => {
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
    };
    const onOver = (e) => {
      if (e.target.closest("[data-cursor='hover']")) ring.classList.add("cursor-ring--active");
    };
    const onOut = (e) => {
      if (e.target.closest("[data-cursor='hover']")) ring.classList.remove("cursor-ring--active");
    };
    const onDown = () => ring.classList.add("cursor-ring--down");
    const onUp = (e) => {
      ring.classList.remove("cursor-ring--down");
      spawnInkSplatAt(e.clientX, e.clientY, document.body, { size: 30 });
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
