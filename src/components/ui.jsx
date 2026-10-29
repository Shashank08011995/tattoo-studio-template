import { Link } from "react-router-dom";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, waLink } from "../site";
import Linework from "./Linework";

export const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm5.6 14.3c-.2.7-1.4 1.3-2 1.4-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.6-.6-2.9-1.3-4.8-4.2-4.9-4.4-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.4.2.5.7 1.8.8 1.9.1.2.1.3 0 .5-.1.2-.1.3-.3.5-.1.2-.3.3-.4.5-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.8.8.3.1.4.2.5.3 0 .2 0 .8-.2 1.4z" />
  </svg>
);

export const Wordmark = () => (
  <>
    coilbug<em>atul</em>
  </>
);

export function WhatsAppButton({ children = "Chat on WhatsApp", text, ghost = false }) {
  return (
    <a
      className={`btn ${ghost ? "btn-ghost" : "btn-ink"}`}
      href={waLink(text)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {!ghost && <WaIcon />}
      {children}
    </a>
  );
}

export function InstagramButton({ children = INSTAGRAM_HANDLE }) {
  return (
    <a className="btn btn-ghost" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export function TextLink({ to, children }) {
  return (
    <Link className="text-link" to={to}>
      {children} <span aria-hidden="true">→</span>
    </Link>
  );
}

export function SectionHead({ label, title, children }) {
  return (
    <div className="section-head reveal-up">
      <div className="label"><span className="rule" />{label}</div>
      <h2 className="serif">{title}</h2>
      {children}
    </div>
  );
}

// Opening band for the inner pages: big title, a line of copy, one doodle.
export function PageHero({ label, title, children, art = "wave", tone = "koi" }) {
  return (
    <header className="page-hero">
      <div className="wrap page-hero-inner">
        <div>
          <div className="label"><span className="rule" />{label}</div>
          <h1 className="serif">{title}</h1>
          {children && <p className="page-hero-sub">{children}</p>}
        </div>
        <Linework art={art} className={`page-hero-art tone-${tone}`} strokeWidth={1.6} />
      </div>
    </header>
  );
}

export function ClosingCta({
  title = <>Got an idea? <em>Let’s talk.</em></>,
  body = "Say hi on WhatsApp — share your idea, placement and city, and Atul will help you shape it into something you’ll love wearing.",
}) {
  return (
    <section className="closing">
      <Linework art="koi" className="closing-koi tone-koi" strokeWidth={1.5} />
      <div className="wrap closing-content reveal-up">
        <h2 className="serif">{title}</h2>
        <p>{body}</p>
        <div className="closing-actions">
          <WhatsAppButton />
          <InstagramButton />
        </div>
      </div>
    </section>
  );
}
