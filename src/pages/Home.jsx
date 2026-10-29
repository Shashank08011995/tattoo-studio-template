import { Link } from "react-router-dom";
import Linework from "../components/Linework";
import { ClosingCta, SectionHead, TextLink, WhatsAppButton } from "../components/ui";
import WorkItem from "../components/WorkItem";
import { styles, workItems } from "../data";
import { YEARS } from "../site";

const marquee = ["Japanese", "Colour work", "Fine line", "Blackwork", "Dotwork", "Custom designs", "Travelling across India"];

const steps = [
  { title: "Say hi", body: "Drop your idea on WhatsApp — a reference, a feeling, or just a word." },
  { title: "Consult", body: "Atul guides you on style, size and placement so it fits your body and your story." },
  { title: "Design", body: "A custom design drawn for you, tweaked until you love it." },
  { title: "Ink & heal", body: "A clean, sterile session — then aftercare support until it’s fully healed." },
];

const quickTips = [
  { art: "soap", tone: "jade", note: "wash gently", body: "Lukewarm water, mild unscented soap, pat dry." },
  { art: "hand", tone: "vermilion", note: "no picking!", body: "Let flakes fall on their own. Tap, don’t scratch." },
  { art: "noSun", tone: "gold", note: "hide from the sun", body: "Cover up while healing, SPF 50 once healed." },
];

export default function Home() {
  return (
    <>
      <header className="hero">
        
                <div className="wrap hero-content">
          <div className="hero-eyebrow label">
            <span className="rule" />
            Atul Rana · Freelance tattoo artist · India
          </div>

          <h1 className="serif">
            <span className="line">Stories in</span>
            <span className="line"><em className="pop">colour</em> &amp; <em>ink.</em></span>
          </h1>

          <p className="hero-sub">
            Japanese and colourful custom tattoos by <b>coilbugatul</b>. Drawing since
            childhood, tattooing since 2020 — and travelling across India to
            meet clients where they are.
          </p>

          <div className="hero-actions">
            <WhatsAppButton>Book a consultation</WhatsAppButton>
            <Link className="btn btn-ghost" to="/work">See the work</Link>
          </div>

          <div className="hero-meta">
            <div className="hero-meta-item"><b>{YEARS}+</b><span>Years tattooing</span></div>
            <div className="hero-meta-item"><b>2020</b><span>First machine</span></div>
            <div className="hero-meta-item"><b>Pan-India</b><span>Travelling artist</span></div>
            <div className="hero-meta-item"><b>1:1</b><span>Design guidance</span></div>
          </div>
        </div>
        <figure className="hero-card">
          <img src="/work/hannya-mask.jpg" alt="Japanese colour hannya mask tattoo by coilbugatul" />
          <figcaption className="hand">fresh hannya ✦</figcaption>
          <Linework art="wave" className="hero-wave tone-vermilion" strokeWidth={1.6} />
        </figure>
      </header>

      <div className="marquee-band" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((i) => (
            <span key={i} className="marquee-set">
              {marquee.map((m, j) => (
                <span key={m} className="marquee-set">
                  <span className={`item ${j % 2 ? "alt" : ""}`}>{m}</span>
                  <span className="marquee-dot" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <section className="intro">
        <div className="wrap intro-grid">
          <div className="intro-copy reveal-up">
            <div className="label"><span className="rule" />Hi, I’m Atul</div>
            <h2 className="serif">
              The kid who drew on everything <em>now draws on skin.</em>
            </h2>
            <p>
              Art has been my language since I was little. In 2020 I picked up a
              tattoo machine purely out of passion — and it never left my hands.
              Today I work freelance, carry my studio to cities across India, and
              spend as much time helping you find the <i>right</i> tattoo as I do
              making it.
            </p>
            <p className="hand">yoga in the morning, music on the speaker, ink all day ✦</p>
            <TextLink to="/about">Read my journey</TextLink>
          </div>
          <div className="intro-doodles reveal-up">
            <Linework art="lotus" className="tone-sakura" strokeWidth={1.5} />
            <Linework art="note" className="tone-gold" strokeWidth={1.5} />
            <Linework art="pencil" className="tone-jade" strokeWidth={1.5} />
          </div>
        </div>
      </section>

      <section className="styles-section">
        <div className="wrap">
          <SectionHead label="What I tattoo" title={<>Bold Japanese. <em>Bright colour.</em> Plus more.</>}>
            <p>Most of my work leans Japanese and colourful, but every style below is on the table.</p>
          </SectionHead>
          <div className="style-grid">
            {styles.map((s) => (
              <div className={`style-card reveal-up tone-${s.tone}`} key={s.name}>
                <Linework art={s.art} className="style-art" strokeWidth={1.4} />
                <h3>{s.name}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="travel">
        <div className="wrap travel-grid">
          <div className="travel-map reveal-up">
            <Linework art="mountain" className="tone-jade" strokeWidth={1.4} />
            <Linework art="pin" className="travel-pin tone-vermilion" strokeWidth={1.6} />
            <span className="hand travel-note">your city next?</span>
          </div>
          <div className="reveal-up">
            <div className="label"><span className="rule" />The travelling studio</div>
            <h2 className="serif">Can’t come to me? <em>I’ll come to you.</em></h2>
            <p>
              I work remotely as a freelancer and travel throughout India with a
              fully sterile, single-use setup. Message me your city — when there
              are enough bookings nearby, I plan a visit and lock in dates.
            </p>
            <div className="hero-actions">
              <WhatsAppButton text="Hi Atul! When are you visiting my city? I'm in: ">Ask about my city</WhatsAppButton>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <SectionHead label="Recent work" title={<>Fresh off <em>the needle.</em></>} />
          <div className="work-grid work-grid--featured">
            {workItems.slice(0, 4).map((w) => <WorkItem item={w} key={w.src} />)}
          </div>
          <div className="center-row"><TextLink to="/work">All work &amp; styles</TextLink></div>
        </div>
      </section>

      <section className="process-steps">
        <div className="wrap">
          <SectionHead label="How it works" title={<>From idea <em>to ink.</em></>} />
          <ol className="process-list">
            {steps.map((step, i) => (
              <li className="process-item reveal-up" key={step.title}>
                <div className="process-num serif">{String(i + 1).padStart(2, "0")}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="center-row"><TextLink to="/consult">Consultation, process &amp; hygiene</TextLink></div>
        </div>
      </section>

      <section className="tips-teaser">
        <div className="wrap">
          <SectionHead label="Aftercare" title={<>After the ink, <em>the glow-up.</em></>}>
            <p>A great tattoo is half the artist, half the healing. Here’s the cheat-sheet.</p>
          </SectionHead>
          <div className="tip-grid">
            {quickTips.map((t) => (
              <div className={`tip-card reveal-up tone-${t.tone}`} key={t.note}>
                <Linework art={t.art} className="tip-art" strokeWidth={1.6} />
                <span className="hand tip-note">{t.note}</span>
                <p>{t.body}</p>
              </div>
            ))}
          </div>
          <div className="center-row"><TextLink to="/aftercare">The full healing guide</TextLink></div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
