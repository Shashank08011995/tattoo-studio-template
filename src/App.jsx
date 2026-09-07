import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "./hooks/useLenis";
import { useInkReveal } from "./hooks/useInkReveal";
import CursorRing from "./components/CursorRing";
import Linework from "./components/Linework";
import ScrollSequence from "./components/ScrollSequence";
import { spawnInkSplatOnLine } from "./lib/inkSplats";

gsap.registerPlugin(ScrollTrigger);

const WA_NUMBER = "971500000000"; // [Replace with studio's WhatsApp number]
const WA_LINK =
  `https://wa.me/${WA_NUMBER}?text=` +
  encodeURIComponent("Hi! I'd like to book a tattoo consultation.");
const INSTAGRAM_HANDLE = "@[instagram_handle]";
const INSTAGRAM_URL = "https://instagram.com/[instagram_handle]";
const PHONE_DISPLAY = "[+971 5X XXX XXXX]";
const ADDRESS = "[Street, Area, Dubai]";
const FOUNDED_YEAR = new Date().getFullYear() - 8;

const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm5.6 14.3c-.2.7-1.4 1.3-2 1.4-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.6-.6-2.9-1.3-4.8-4.2-4.9-4.4-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.4.2.5.7 1.8.8 1.9.1.2.1.3 0 .5-.1.2-.1.3-.3.5-.1.2-.3.3-.4.5-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.8.8.3.1.4.2.5.3 0 .2 0 .8-.2 1.4z" />
  </svg>
);

const Wordmark = () => (
  <>
    Ritual <em>Ink</em>
  </>
);

function BookButton({ children = "Book on WhatsApp", ghost = false }) {
  return (
    <a
      className={`btn ${ghost ? "btn-ghost" : "btn-ink"}`}
      data-cursor="hover"
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
    >
      {!ghost && <WaIcon />}
      {children}
    </a>
  );
}

// Each service carries a piece of flash from the Linework set — the mark draws
// itself as the row scrolls in.
const services = [
  { title: "Custom Tattoos", art: "rose", body: "Original designs drawn around your idea — nothing traced, nothing recycled." },
  { title: "Fine Line & Micro", art: "moth", body: "Delicate, high-detail work for smaller, precise pieces." },
  { title: "Cover-Ups", art: "snake", body: "Rework old or unwanted ink into something you're proud of." },
  { title: "Piercing", art: "dagger", body: "Standard and specialty piercings with sterile, single-use equipment." },
  { title: "Touch-Ups", art: "sun", body: "Refresh healed work and keep older pieces reading sharp." },
  { title: "Free Consultation", art: "arrow", body: "Talk through placement, size and design before you book a session." },
];

const process = [
  { title: "Consult", body: "Message us on WhatsApp with your idea, placement and rough size." },
  { title: "Design", body: "Your artist sketches a custom design and confirms it with you before the session." },
  { title: "Tattoo", body: "In-studio session with sterile equipment and an experienced artist." },
  { title: "Aftercare", body: "Clear healing instructions, and support if anything comes up after." },
];

// spans tile a 12-column grid: 5+7 / 6+6 / 4+4+4 / 6+6
const workItems = [
  { src: "/img/work-01.jpg", style: "Fine line", place: "Forearm", cls: "tall" },
  { src: "/img/work-02.jpg", style: "Blackwork sleeve", place: "Full arm", cls: "wide" },
  { src: "/img/work-06.jpg", style: "Blackwork", place: "Nape", cls: "half" },
  { src: "/img/process-03.jpg", style: "In progress", place: "Studio", cls: "half" },
  { src: "/img/work-03.jpg", style: "Linework", place: "Calf", cls: "" },
  { src: "/img/work-04.jpg", style: "Fine line", place: "Hand", cls: "" },
  { src: "/img/work-05.jpg", style: "Ornamental", place: "Back", cls: "" },
  { src: "/img/work-07.jpg", style: "Ornamental", place: "Full back", cls: "pair" },
  { src: "/img/work-08.jpg", style: "Traditional colour", place: "Legs", cls: "pair" },
];

function SectionHead({ label, title, children }) {
  return (
    <div className="section-head">
      <div className="label"><span className="rule" />{label}</div>
      <h2 className="serif">{title}</h2>
      {children}
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const craftRef = useRef(null);
  const bleedRef = useRef(null);
  const closeRef = useRef(null);
  const marqueeRef = useRef(null);

  useLenis();
  useInkReveal(".ink-reveal");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        ".hero-line",
        { yPercent: 112 },
        {
          yPercent: 0,
          duration: 1.15,
          stagger: {
            each: 0.13,
            onComplete() {
              spawnInkSplatOnLine(this.targets()[0]);
            },
          },
        }
      )
        .fromTo(".hero-eyebrow", { opacity: 0 }, { opacity: 1, duration: 0.7 }, "-=0.9")
        .fromTo(".hero-sub", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .fromTo(".hero-actions", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .fromTo(".hero-meta", { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.5")
        .fromTo(".scroll-cue", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.4");

      // The hero no longer pins, so the footage drifts slightly as it leaves —
      // enough to feel scroll-reactive without holding the viewport hostage.
      if (heroRef.current) {
        gsap.to(".hero-video", {
          yPercent: 10,
          scale: 1.08,
          ease: "none",
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      }

      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, { xPercent: -50, duration: 30, ease: "none", repeat: -1 });
      }

      gsap.utils.toArray(".stat-num").forEach((el) => {
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || "";
        const counter = { val: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () =>
            gsap.to(counter, {
              val: target,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: () => {
                const v = target % 1 === 0 ? Math.floor(counter.val) : counter.val.toFixed(1);
                el.textContent = (target >= 1000 ? v.toLocaleString() : v) + suffix;
              },
            }),
        });
      });

      gsap.utils.toArray(".reveal-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      // Services reveal one at a time as the machine pushes in beside them.
      gsap.utils.toArray(".service-row").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <CursorRing />
      <div className="grain-overlay" aria-hidden="true" />

      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="wrap nav-inner">
          <a className="nav-mark" data-cursor="hover" href="#top">
            <Wordmark />
          </a>
          <div className="nav-links">
            <a data-cursor="hover" href="#work">Work</a>
            <a data-cursor="hover" href="#services">Services</a>
            <a data-cursor="hover" href="#process">Process</a>
            <a data-cursor="hover" href="#studio">Studio</a>
          </div>
          <div className="nav-right">
            <BookButton>Book</BookButton>
          </div>
        </div>
      </nav>

      <main id="top">
        {/* ---- Hero: the room, running behind the copy ---- */}
        <header className="hero" ref={heroRef}>
          <video
            className="hero-video"
            src="/video/04-room.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          <span className="hero-veil" aria-hidden="true" />
          <div className="wrap hero-content">
              <div className="hero-eyebrow label">
                <span className="rule" />
                Ritual Ink — Dubai, UAE · Est. {FOUNDED_YEAR}
              </div>

              <h1 className="serif">
                <span className="hero-headline-wrap"><span className="line hero-line">Ink with</span></span>
                <span className="hero-headline-wrap"><span className="line hero-line"><em>intent.</em></span></span>
              </h1>

              <p className="hero-sub">
                Custom tattoos, fine line and cover-ups in Dubai. Every piece is
                drawn around your idea &mdash; never picked off a wall.
              </p>

              <div className="hero-actions">
                <BookButton />
                <a className="btn btn-ghost" data-cursor="hover" href="#work">See the work</a>
              </div>

              <div className="hero-meta">
                <div className="hero-meta-item"><b>8</b><span>Years in Dubai</span></div>
                <div className="hero-meta-item"><b>3,200+</b><span>Pieces completed</span></div>
                <div className="hero-meta-item"><b>4</b><span>Resident artists</span></div>
                <div className="hero-meta-item"><b>4.9</b><span>Google rating</span></div>
              </div>
            </div>

          <div className="scroll-cue">
            <span className="scroll-cue-line"><i /></span>
            Scroll
          </div>
        </header>

        <div className="marquee-band">
          <div className="marquee-track" ref={marqueeRef}>
            {Array(2).fill(0).map((_, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center" }}>
                <span className="item">Custom designs</span>
                <span className="marquee-dot" />
                <span className="item alt">Cover-ups</span>
                <span className="marquee-dot" />
                <span className="item">Fine line</span>
                <span className="marquee-dot" />
                <span className="item alt">Walk-ins welcome</span>
                <span className="marquee-dot" />
                <span className="item">Free consultation</span>
                <span className="marquee-dot" />
              </span>
            ))}
          </div>
        </div>

        <section id="stats">
          <div className="wrap">
            <div className="stats">
              <div className="stat-cell">
                <div className="stat-num serif" data-target="8">0</div>
                <div className="stat-label">Years in Dubai</div>
              </div>
              <div className="stat-cell">
                <div className="stat-num serif" data-target="3200" data-suffix="+">0</div>
                <div className="stat-label">Pieces completed</div>
              </div>
              <div className="stat-cell">
                <div className="stat-num serif" data-target="4">0</div>
                <div className="stat-label">Resident artists</div>
              </div>
              <div className="stat-cell">
                <div className="stat-num serif" data-target="4.9">0</div>
                <div className="stat-label">Google rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Services: needle pushes in beside the list ---- */}
        <section id="services" className="craft" ref={craftRef}>
          <div className="wrap craft-grid">
            <div className="craft-media">
              <ScrollSequence
                dir="/frames/bloom"
                count={150}
                fit="contain"
                scrollerRef={craftRef}
                className="seq-craft"
              />
            </div>
            <div className="craft-list">
              <SectionHead label="What we do" title={<>Services, <em>start to finish.</em></>} />
              <div className="services-list">
                {services.map((s, i) => (
                  <div className="service-row" key={s.title} data-cursor="hover">
                    <div className="service-num">{String(i + 1).padStart(2, "0")}</div>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                    <Linework art={s.art} className="service-mark" duration={1.3} strokeWidth={1.2} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="work">
          <div className="wrap">
            <SectionHead label="Recent work" title={<>The <em>portfolio.</em></>}>
              <p>
                Placeholder photography — swap each image for the studio's own
                healed work before this page goes live. Hover any piece to see it
                come off the sketch.
              </p>
            </SectionHead>
            <div className="work-grid">
              {workItems.map((w, i) => (
                <div className={`work-item ink-reveal ${w.cls}`} key={i} data-cursor="hover">
                  <img className="work-sketch" src={w.src} alt="" aria-hidden="true" />
                  <img className="work-full" src={w.src} alt={`${w.style} tattoo — ${w.place}`} />
                  <div className="work-cap">
                    <span>{w.style}</span>
                    <span>{w.place}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Ink spreads through paper, then the steps ---- */}
        <section id="process" className="bleed-pin" ref={bleedRef}>
          <div className="pin-inner">
            {/* Contained to a band below the heading rather than covering the
                viewport — at full spread this clip is ~85% ink, which would
                bury the type if it were a cover layer. */}
            <ScrollSequence
              dir="/frames/bleed"
              count={120}
              to={96}
              fit="contain"
              scrollerRef={bleedRef}
              className="seq-bleed"
            />
            <div className="wrap bleed-content">
              <div className="label"><span className="rule" />How it works</div>
              <h2 className="serif">From idea <em>to ink.</em></h2>
            </div>
          </div>
        </section>

        <section className="process-steps">
          <div className="wrap">
            <div className="process-list">
              {process.map((step, i) => (
                <div className="process-item reveal-up" key={step.title}>
                  <div className="process-num serif">{String(i + 1).padStart(2, "0")}</div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              ))}
            </div>
            <Linework art="flourish" className="process-flourish linework--sepia" duration={1.8} />
          </div>
        </section>

        {/* ---- Studio: the room, running quietly ---- */}
        <section id="studio" className="studio-section">
          <div className="wrap studio-inner">
            <div className="studio-photo ink-reveal">
              <img src="/img/studio-01.jpg" alt="Inside the studio" />
              <Linework art="moth" className="studio-moth linework--sepia" duration={2} />
            </div>
            <div className="studio-copy reveal-up">
              <div className="label" style={{ marginBottom: 22 }}>
                <span className="rule" />
                The studio
              </div>
              <h2 className="serif">A quiet room, <em>sterile tools,</em> and time to get it right.</h2>
              <p>
                Fresh healed pieces, in-progress shots and studio life get posted
                as they happen. It's usually how people find us long before they
                ever send a message.
              </p>
              <a className="studio-link" data-cursor="hover" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                Follow {INSTAGRAM_HANDLE} →
              </a>
            </div>
          </div>
        </section>

        <section id="reviews">
          <div className="wrap">
            <SectionHead label="Reviews" title={<>What clients <em>say.</em></>} />
            <div className="reviews-grid">
              {[0, 1, 2].map((i) => (
                <div className="review-card reveal-up" key={i}>
                  <div className="review-stars">★★★★★</div>
                  <p>“[Placeholder review — paste a real Google review here before sending]”</p>
                  <div className="review-name">[Client name]</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Closing: the bloom runs backwards, ink leaves the page ---- */}
        <div className="closing-pin" id="contact" ref={closeRef}>
          <div className="pin-inner">
            <ScrollSequence
              dir="/frames/bloom"
              count={150}
              reverse
              scrollerRef={closeRef}
              className="seq-closing"
            />
            <div className="wrap closing-content">
              <h2 className="serif">Ready when <em>you are.</em></h2>
              <p>Message us on WhatsApp to book a consultation, or just ask a question.</p>
              <div className="closing-actions">
                <BookButton />
                <a className="btn btn-ghost" data-cursor="hover" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                  {INSTAGRAM_HANDLE}
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="wrap">
          <div className="footer-inner">
            <div className="footer-col">
              <div className="footer-mark serif"><Wordmark /></div>
              <p style={{ maxWidth: 280 }}>
                Custom tattoos, fine line and cover-ups in Dubai.
              </p>
            </div>
            <div className="footer-col">
              <h4>Visit</h4>
              <p>{ADDRESS}</p>
              <p>[Opening hours]</p>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <p><a data-cursor="hover" href={WA_LINK} target="_blank" rel="noopener noreferrer">{PHONE_DISPLAY}</a></p>
              <p><a data-cursor="hover" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">{INSTAGRAM_HANDLE}</a></p>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Ritual Ink</span>
            <span>Site by Rishi Web Studios</span>
          </div>
        </div>
      </footer>

      <div className="mobile-wa">
        <BookButton />
      </div>
    </>
  );
}
