import { useEffect } from "react";
import { gsap } from "gsap";

// Irregular blob used as a mask — the ragged edge is what sells "ink soaking into paper"
const BLOB =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%23000' d='M52 3c11-2 17 9 25 15s19 5 21 16-9 15-8 25 8 21-2 28-21-6-32-5-21 12-31 7-8-19-13-28S1 44 5 34s17-8 24-15S41 5 52 3z'/%3E%3C/svg%3E";

export function useInkReveal(selector = ".ink-reveal", deps = []) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(selector));
    if (!els.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      els.forEach((el) => {
        el.style.webkitMaskImage = `url("${BLOB}")`;
        el.style.maskImage = `url("${BLOB}")`;
        el.style.webkitMaskRepeat = "no-repeat";
        el.style.maskRepeat = "no-repeat";
        el.style.webkitMaskPosition = "center";
        el.style.maskPosition = "center";

        const state = { bleed: 0 };
        const apply = () => {
          const s = `${state.bleed}% ${state.bleed}%`;
          el.style.webkitMaskSize = s;
          el.style.maskSize = s;
        };
        apply();

        gsap.to(state, {
          bleed: 320,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: apply,
          onComplete: () => {
            // drop the mask once fully bled in so edges stay crisp
            el.style.webkitMaskImage = "none";
            el.style.maskImage = "none";
          },
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        });
      });
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
