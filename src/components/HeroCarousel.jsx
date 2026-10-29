import { useEffect, useState } from "react";
import Linework from "./Linework";

// The polaroid in the home hero, cycling through slides. Pauses on hover and
// stays put for reduced-motion visitors (the dots still work).
export default function HeroCarousel({ slides, interval = 4200 }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), interval);
    return () => clearTimeout(t);
  }, [i, paused, slides.length, interval]);

  return (
    <figure
      className="hero-card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Recent tattoos by coilbugatul"
    >
      <div className="carousel-frame">
        {slides.map((s, n) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            className={n === i ? "active" : ""}
            aria-hidden={n !== i}
            loading={n < 2 ? "eager" : "lazy"}
          />
        ))}
      </div>
      <figcaption className="hand" aria-live="polite">{slides[i].note}</figcaption>
      <div className="carousel-dots">
        {slides.map((s, n) => (
          <button
            key={s.src}
            className={n === i ? "active" : ""}
            aria-label={`Show ${s.note}`}
            aria-current={n === i}
            onClick={() => setI(n)}
          />
        ))}
      </div>
      <Linework art="wave" className="hero-wave tone-vermilion" strokeWidth={1.6} />
    </figure>
  );
}
