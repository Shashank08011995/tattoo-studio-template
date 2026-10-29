import { useEffect, useRef } from "react";

// One portfolio tile. Videos only play while on screen, and not at all for
// people who've asked for reduced motion — they just see the poster frame.
export default function WorkItem({ item, className = "" }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const alt = `${item.style} tattoo by coilbugatul${item.place ? ` — ${item.place}` : ""}`;

  return (
    <figure className={`work-item reveal-up ${item.video ? "is-video" : ""} ${className}`}>
      {item.video ? (
        <video ref={videoRef} src={item.video} poster={item.src} muted loop playsInline preload="none" aria-label={alt} />
      ) : (
        <img src={item.src} alt={alt} loading="lazy" />
      )}
      {item.video && <span className="work-badge">▶ Video</span>}
      <figcaption className="work-cap">
        <span>{item.style}</span>
        {item.place && <span>{item.place}</span>}
      </figcaption>
    </figure>
  );
}
