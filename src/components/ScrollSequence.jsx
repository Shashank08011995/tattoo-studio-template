import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Scroll-scrubbed image sequence drawn to a canvas.
 *
 * Seeking a <video> by currentTime stutters badly on Safari and iOS, so the
 * clips ship as preloaded frame sequences instead. The frames are pre-processed
 * (see scripts/make-frames.sh) so their backdrop is exactly white, and the
 * canvas composites with mix-blend-mode: multiply — white drops out entirely,
 * leaving only ink on the paper with no rectangle edge.
 */
export default function ScrollSequence({
  dir,
  count,
  ext = "webp",
  pad = 3,
  from = 1,
  to = null,
  reverse = false,
  eager = false,
  fit = "cover",
  scrollerRef,
  className = "",
}) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const trigger = scrollerRef?.current;
    if (!canvas || !wrap || !trigger) return;

    const ctx = canvas.getContext("2d");
    const last = to ?? count;
    // Halve the frame count on phones: the full sequence is a lot to pull over
    // cellular, and at that size the drop in smoothness isn't perceptible.
    const step = window.matchMedia("(max-width: 700px)").matches ? 2 : 1;
    const total = Math.ceil((last - from + 1) / step);

    const images = new Array(total);
    const ready = new Array(total).fill(false);
    let current = -1;
    let disposed = false;
    let started = false;

    const src = (i) => `${dir}/f-${String(from + i * step).padStart(pad, "0")}.${ext}`;
    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

    const sizeCanvas = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (!w || !h) return;
      canvas.width = Math.round(w * dpr());
      canvas.height = Math.round(h * dpr());
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr(), 0, 0, dpr(), 0, 0);
    };

    // Nearest decoded frame, so scrubbing never blanks while frames stream in.
    const nearestReady = (i) => {
      if (ready[i]) return i;
      for (let d = 1; d < total; d++) {
        if (i - d >= 0 && ready[i - d]) return i - d;
        if (i + d < total && ready[i + d]) return i + d;
      }
      return -1;
    };

    const draw = (i) => {
      const idx = nearestReady(i);
      if (idx < 0) return;
      const img = images[idx];
      if (!img || !img.naturalWidth) return;

      const cw = wrap.clientWidth;
      const ch = wrap.clientHeight;
      const s =
        fit === "contain"
          ? Math.min(cw / img.naturalWidth, ch / img.naturalHeight)
          : Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * s;
      const dh = img.naturalHeight * s;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      current = idx;
    };

    const startLoading = () => {
      if (started) return;
      started = true;
      for (let i = 0; i < total; i++) {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (disposed) return;
          ready[i] = true;
          if (current === -1 || i === current) draw(i);
        };
        img.src = src(i);
        images[i] = img;
      }
    };

    sizeCanvas();

    let io;
    if (eager) {
      startLoading();
    } else {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            startLoading();
            io.disconnect();
          }
        },
        { rootMargin: "150% 0px" }
      );
      io.observe(wrap);
    }

    const state = { frame: 0 };
    const ctxGsap = gsap.context(() => {
      gsap.to(state, {
        frame: total - 1,
        ease: "none",
        // Direct scrub, not time-smoothed: Lenis already eases the scroll, and
        // smoothing on top of it makes the ink visibly lag the page.
        scrollTrigger: { trigger, start: "top top", end: "bottom bottom", scrub: true },
        onUpdate: () => {
          // Belt and braces: IntersectionObserver is tied to the rendering
          // lifecycle and can be throttled, so being scrubbed at all is itself
          // proof we need these frames.
          startLoading();
          const f = Math.round(state.frame);
          draw(reverse ? total - 1 - f : f);
        },
      });
    });

    const onResize = () => {
      sizeCanvas();
      draw(current < 0 ? 0 : current);
    };
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      io?.disconnect();
      ctxGsap.revert();
      window.removeEventListener("resize", onResize);
      images.forEach((img) => {
        if (!img) return;
        img.onload = null;
        img.src = "";
      });
    };
  }, [dir, count, ext, pad, from, to, reverse, eager, fit, scrollerRef]);

  return (
    <div ref={wrapRef} className={`seq ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
