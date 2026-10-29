import { useState } from "react";
import Linework from "../components/Linework";
import { ClosingCta, PageHero, SectionHead, WhatsAppButton } from "../components/ui";

const stages = [
  {
    when: "First hours",
    title: "Keep it covered",
    art: "wrap",
    tone: "jade",
    mood: "fresh & tender",
    tips: [
      "Leave the wrap or second-skin film on for as long as I advised.",
      "Wash your hands before you touch it — every single time.",
      "A little redness, warmth and swelling is completely normal.",
    ],
  },
  {
    when: "Day 1 – 3",
    title: "Wash, pat, breathe",
    art: "soap",
    tone: "koi",
    mood: "a bit oozy",
    tips: [
      "Wash gently 2–3 times a day with lukewarm water and mild, fragrance-free soap.",
      "Pat dry with a clean paper towel — no rubbing, no shared towels.",
      "Let it air-dry, then apply a very thin layer of aftercare balm. Less is more.",
      "Clear or ink-tinted fluid seeping out is normal at this stage.",
    ],
  },
  {
    when: "Day 4 – 14",
    title: "The itchy, flaky phase",
    art: "hand",
    tone: "vermilion",
    mood: "itchy (sorry!)",
    tips: [
      "It will peel like a sunburn and itch. Do NOT scratch or pick.",
      "Tap or lightly pat the area if the itch gets bad.",
      "Keep moisturising thinly when it feels tight or dry.",
      "Wear loose, soft, breathable clothes over it.",
    ],
  },
  {
    when: "Week 2 – 4",
    title: "The cloudy stage",
    art: "moth",
    tone: "sakura",
    mood: "looks a bit dull",
    tips: [
      "A milky, shiny or cloudy look is normal — new skin is settling over the ink.",
      "Colours will look softer for a while. They brighten up as it heals.",
      "Keep avoiding pools, sea water and direct sun.",
    ],
  },
  {
    when: "1 month +",
    title: "Healed & glowing",
    art: "sun",
    tone: "gold",
    mood: "show it off ✦",
    tips: [
      "The surface is healed; deeper layers keep settling for a few more weeks.",
      "SPF 50 sunscreen whenever it sees the sun — forever. UV is what fades colour.",
      "Keep skin moisturised and hydrated so lines stay crisp.",
      "Message me if any spot needs a touch-up check.",
    ],
  },
];

const dos = [
  { art: "soap", text: "Wash with clean hands & mild soap" },
  { art: "tube", text: "Thin layer of balm, not a thick coat" },
  { art: "wrap", text: "Loose, clean cotton clothing" },
  { art: "drop", text: "Drink water, sleep well, eat well" },
  { art: "sun", text: "SPF 50 once fully healed" },
];

const donts = [
  { art: "hand", text: "Scratch, pick or peel flakes" },
  { art: "noSwim", text: "Pools, sea, bathtubs, steam for 2–3 weeks" },
  { art: "noSun", text: "Direct sun or tanning while healing" },
  { art: "cross", text: "Tight clothes or straps rubbing on it" },
  { art: "cross", text: "Heavy sweaty workouts on the area for the first days" },
];

const normal = [
  { q: "It’s oozing clear or coloured fluid", a: "Normal for the first day or two — that’s plasma and excess ink. Wash gently and pat dry." },
  { q: "It’s really itchy", a: "Very normal during peeling. Tap it, moisturise lightly, and don’t scratch." },
  { q: "It looks cloudy or faded", a: "That’s the ‘milky’ stage. New skin is forming over the ink — give it 2–4 weeks." },
  { q: "The skin feels raised", a: "Light swelling for a few days is normal, especially on fine detail and colour packing." },
];

export default function Aftercare() {
  const [active, setActive] = useState(0);
  const stage = stages[active];

  return (
    <>
      <PageHero label="Aftercare guide" title={<>Heal it right, <em>wear it bright.</em></>} art="drop" tone="jade">
        Your tattoo is a wound for the first few weeks — treat it kindly and it
        will look amazing for life. Here’s everything you need, stage by stage.
      </PageHero>

      <section className="heal-timeline">
        <div className="wrap">
          <SectionHead label="Healing timeline" title={<>Tap through <em>your healing.</em></>} />
          <div className="stage-tabs reveal-up" role="tablist" aria-label="Healing stages">
            {stages.map((s, i) => (
              <button
                key={s.when}
                role="tab"
                aria-selected={i === active}
                className={`stage-tab tone-${s.tone} ${i === active ? "active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="stage-tab-num">{i + 1}</span>
                {s.when}
              </button>
            ))}
          </div>
          <div className={`stage-panel tone-${stage.tone}`} role="tabpanel" key={stage.when}>
            <div className="stage-art">
              <Linework art={stage.art} strokeWidth={1.6} duration={1} />
              <span className="hand stage-mood">{stage.mood}</span>
            </div>
            <div>
              <span className="label">{stage.when}</span>
              <h3 className="serif">{stage.title}</h3>
              <ul className="stage-tips">
                {stage.tips.map((t) => <li key={t}>{t}</li>)}
              </ul>
              <div className="stage-nav">
                <button className="btn btn-ghost" disabled={active === 0} onClick={() => setActive((a) => a - 1)}>← Prev</button>
                <button className="btn btn-ghost" disabled={active === stages.length - 1} onClick={() => setActive((a) => a + 1)}>Next →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="do-dont">
        <div className="wrap">
          <SectionHead label="The golden rules" title={<>Do this. <em>Not that.</em></>} />
          <div className="dd-grid">
            <div className="dd-col dd-do reveal-up">
              <h3 className="hand">do ✓</h3>
              <ul>
                {dos.map((d) => (
                  <li key={d.text}><Linework art={d.art} className="dd-art" strokeWidth={1.8} />{d.text}</li>
                ))}
              </ul>
            </div>
            <div className="dd-col dd-dont reveal-up">
              <h3 className="hand">don’t ✗</h3>
              <ul>
                {donts.map((d) => (
                  <li key={d.text}><Linework art={d.art} className="dd-art" strokeWidth={1.8} />{d.text}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="is-normal">
        <div className="wrap faq-wrap">
          <SectionHead label="Don’t panic" title={<>“Is this <em>normal?”</em></>}>
            <p>The questions everyone asks in week one.</p>
          </SectionHead>
          <div className="faq reveal-up">
            {normal.map((n) => (
              <details key={n.q}>
                <summary>{n.q}</summary>
                <p>{n.a}</p>
              </details>
            ))}
          </div>

          <div className="warn-card reveal-up">
            <Linework art="cross" className="tone-vermilion warn-art" strokeWidth={2.4} />
            <div>
              <h3>When to see a doctor</h3>
              <p>
                Redness that keeps spreading, pain or heat that gets worse after
                day 3, yellow/green pus, red streaks, fever, or an itchy rash that
                won’t settle can mean infection or an allergic reaction. Please
                see a doctor promptly — and let me know too.
              </p>
            </div>
          </div>

          <div className="center-row">
            <WhatsAppButton text="Hi Atul! Quick aftercare question about my tattoo: ">Ask an aftercare question</WhatsAppButton>
          </div>
        </div>
      </section>

      <ClosingCta
        title={<>Healed and <em>hungry for more?</em></>}
        body="Planning your next piece? Let’s design something that pairs with the last one."
      />
    </>
  );
}
