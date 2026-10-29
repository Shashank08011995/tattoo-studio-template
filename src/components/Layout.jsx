import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { BRAND, INSTAGRAM_HANDLE, INSTAGRAM_URL, NAV, PHONE_DISPLAY, TEL_LINK, waLink } from "../site";
import { WaIcon, WhatsAppButton, Wordmark } from "./ui";

const TITLES = {
  "/": `${BRAND} — Japanese & Colour Tattoos · Freelance Across India`,
  "/about": `The Journey — ${BRAND}`,
  "/work": `Work & Styles — ${BRAND}`,
  "/consult": `Consult, Process & Hygiene — ${BRAND}`,
  "/aftercare": `Tattoo Aftercare Guide — ${BRAND}`,
  "/contact": `Contact & Booking — ${BRAND}`,
};

// Fades sections up the first time they enter the viewport. Plain CSS
// transitions driven by one IntersectionObserver per page.
function useReveal(pathname) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal-up:not(.is-in)"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }),
      { rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
}

export default function Layout() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useReveal(pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = TITLES[pathname] || BRAND;
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
  }, [menuOpen]);

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />

      <nav className={`nav ${scrolled || menuOpen ? "scrolled" : ""}`}>
        <div className="wrap nav-inner">
          <Link className="nav-mark" to="/" aria-label={`${BRAND} home`} onClick={() => setMenuOpen(false)}>
            <Wordmark />
          </Link>
          <div className={`nav-links ${menuOpen ? "open" : ""}`} id="site-menu">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === "/"} onClick={() => setMenuOpen(false)}>
                {n.label}
              </NavLink>
            ))}
            <a className="nav-menu-wa" href={waLink()} target="_blank" rel="noopener noreferrer">
              <WaIcon /> {PHONE_DISPLAY}
            </a>
          </div>
          <div className="nav-right">
            <WhatsAppButton>Book</WhatsAppButton>
            <button
              className={`nav-toggle ${menuOpen ? "open" : ""}`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span /><span />
            </button>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer>
        <div className="wrap">
          <div className="footer-inner">
            <div className="footer-col">
              <div className="footer-mark serif"><Wordmark /></div>
              <p style={{ maxWidth: 300 }}>
                Freelance tattoo artist travelling across India. Japanese, colour
                and custom work — drawn for you, done clean.
              </p>
            </div>
            <div className="footer-col">
              <h4>Explore</h4>
              {NAV.map((n) => (
                <p key={n.to}><Link to={n.to}>{n.label}</Link></p>
              ))}
            </div>
            <div className="footer-col">
              <h4>Say hi</h4>
              <p><a href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp {PHONE_DISPLAY}</a></p>
              <p><a href={TEL_LINK}>Call {PHONE_DISPLAY}</a></p>
              <p><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram {INSTAGRAM_HANDLE}</a></p>
              <p>Based in India · Travels pan-India</p>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} {BRAND} · Atul Rana</span>
            <span>Hygiene first · Bloodborne pathogens certified · Hep B vaccinated</span>
          </div>
        </div>
      </footer>

      <div className="mobile-wa">
        <WhatsAppButton />
      </div>
    </>
  );
}
