import Linework from "../components/Linework";
import { ClosingCta, PageHero, SectionHead, WhatsAppButton } from "../components/ui";
import { photoOf } from "../data";

const steps = [
  { art: "chat", tone: "jade", title: "Say hi on WhatsApp", body: "Tell me your idea, references, placement, rough size and your city. Not sure yet? That’s exactly what the consult is for." },
  { art: "hand", tone: "gold", title: "Consultation", body: "We talk through style, size, placement and composition. I’ll be honest about what will age well and what will look best on your body." },
  { art: "pencil", tone: "sakura", title: "Custom design", body: "I draw your design and refine it with you until it feels right. Then a clean, accurate stencil — placed and checked with you before we start." },
  { art: "pin", tone: "koi", title: "Session day", body: "In your city or mine. Fresh single-use needles, barrier protection and a fully prepped, sterile workstation every time." },
  { art: "drop", tone: "vermilion", title: "Aftercare & check-ins", body: "You leave with clear instructions, and I stay a message away until it’s fully healed." },
];

const hygiene = [
  "Workstation prepared and barrier-wrapped before every client",
  "Single-use, disposable needles and cartridges, fresh for every client",
  "Gloves changed whenever cross-contamination is possible",
  "Proper barrier protection on machines, cords and bottles",
  "Safe handling and disposal of sharps",
  "Equipment cleaning and sterilisation procedures",
  "Client skin prepared and disinfected before stencilling",
  "Aftercare education for every client",
];

const faqs = [
  { q: "Can I bring my own design or reference?", a: "Absolutely. I’ll use it as a starting point and adapt it so it fits your body, ages well and becomes your own piece." },
  { q: "I don’t know what I want. Can you help?", a: "That’s my favourite kind of client. Tell me what matters to you — a memory, a place, a feeling — and I’ll suggest styles, placements and draw options." },
  { q: "How do I book you in my city?", a: "Message me your city and idea on WhatsApp. When there are enough bookings in an area, I plan a visit and confirm dates with everyone." },
  { q: "Will it hurt?", a: "A little — it depends on placement and your own pain tolerance. I work steadily, take breaks when you need them, and talk you through it." },
  { q: "How long does a session take?", a: "Small pieces can take under an hour; large Japanese or colour work is often split into several sessions. I’ll give you an honest estimate during the consult." },
  { q: "Are you open to guest spots?", a: "Yes — studios in India and abroad, and cruise-ship studios too. Reach out on WhatsApp or Instagram." },
];

export default function Consult() {
  return (
    <>
      <PageHero label="Consult & process" title={<>Guided from <em>idea to healed.</em></>} art="chat" tone="jade" photo={photoOf("eye-filigree", "drawn for you, then inked")}>
        I don’t just tattoo — I help you decide what to tattoo. Suggestions,
        placement advice and a custom design, all before the needle touches skin.
      </PageHero>

      <section>
        <div className="wrap">
          <SectionHead label="How it works" title={<>Five steps, <em>zero guesswork.</em></>} />
          <ol className="step-cards">
            {steps.map((s, i) => (
              <li className={`step-card reveal-up tone-${s.tone}`} key={s.title}>
                <span className="step-num serif">{String(i + 1).padStart(2, "0")}</span>
                <Linework art={s.art} className="step-art" strokeWidth={1.6} />
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="hygiene">
        <div className="wrap hygiene-grid">
          <div className="reveal-up">
            <div className="label"><span className="rule" />Hygiene & safety</div>
            <h2 className="serif">Clean isn’t a bonus. <em>It’s the baseline.</em></h2>
            <p>
              Wherever I’m tattooing, the standard doesn’t change. Professional
              infection-control practices from setup to cleanup.
            </p>
            <div className="badge-row">
              <span className="badge">Bloodborne Pathogens Certified</span>
              <span className="badge">Hepatitis B Vaccinated</span>
            </div>
          </div>
          <ul className="check-list reveal-up">
            {hygiene.map((h) => (
              <li key={h}><Linework art="check" className="tone-jade" strokeWidth={2.4} />{h}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="before-session">
        <div className="wrap">
          <SectionHead label="Before your session" title={<>Show up <em>ready.</em></>} />
          <div className="tip-grid">
            {[
              { art: "drop", tone: "jade", note: "hydrate", body: "Drink plenty of water the day before and on the day." },
              { art: "sun", tone: "gold", note: "eat & sleep", body: "A proper meal and a good night’s sleep help your skin and your stamina." },
              { art: "cross", tone: "vermilion", note: "skip alcohol", body: "No alcohol for 24 hours before — it thins the blood." },
              { art: "wrap", tone: "sakura", note: "comfy clothes", body: "Wear loose clothes that give easy access to the area." },
            ].map((t) => (
              <div className={`tip-card reveal-up tone-${t.tone}`} key={t.note}>
                <Linework art={t.art} className="tip-art" strokeWidth={1.8} />
                <span className="hand tip-note">{t.note}</span>
                <p>{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="wrap faq-wrap">
          <SectionHead label="FAQ" title={<>Good <em>questions.</em></>} />
          <div className="faq reveal-up">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <div className="center-row">
            <WhatsAppButton text="Hi Atul! I have a question about getting tattooed: ">Ask me anything</WhatsAppButton>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
