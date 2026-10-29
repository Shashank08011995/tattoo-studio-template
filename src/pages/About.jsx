import Linework from "../components/Linework";
import { ClosingCta, PageHero, Polaroid, SectionHead } from "../components/ui";
import { artistPhotos, photoOf } from "../data";
import { YEARS } from "../site";

const journey = [
  {
    when: "Childhood",
    title: "A kid who never stopped drawing",
    body: "Notebook margins, walls, the backs of exam papers — art was always there. Long before tattoos, it was pencils, colours and a head full of ideas.",
    art: "pencil",
    tone: "jade",
  },
  {
    when: "2020",
    title: "Picking up the machine",
    body: "What started as pure passion became a calling. I began learning tattooing seriously in 2020 — stencils, needle depth, line work, shading, and above all, hygiene.",
    art: "sparkle",
    tone: "gold",
  },
  {
    when: "The practice years",
    title: "Learning every style",
    body: "Fine line, blackwork, dotwork, geometric, microrealism, lettering — I worked across styles to understand what each one asks of the skin. Along the way, Japanese and colour work became home.",
    art: "wave",
    tone: "vermilion",
  },
  {
    when: "Going freelance",
    title: "Taking the studio on the road",
    body: "Instead of waiting behind one counter, I went freelance — working remotely and travelling through India with a sterile, single-use kit to tattoo people in their own cities.",
    art: "pin",
    tone: "koi",
  },
  {
    when: "Today",
    title: `${YEARS}+ years, still a student`,
    body: "Custom designs, honest guidance and clean execution for clients from all walks of life. And always open to new horizons — guest spots in studios, and one day, on a cruise ship tattooing travellers from around the world.",
    art: "koi",
    tone: "sakura",
  },
];

const skills = [
  "Custom tattoo design", "Client consultations", "Placement & sizing", "Japanese",
  "Colour work", "Fine line", "Black & grey", "Geometric", "Microrealism", "Blackwork",
  "Dotwork", "Custom lettering", "Stencil preparation", "Aftercare guidance",
  "Hygiene & infection control", "Equipment sterilisation", "Diverse, international clientele",
];

export default function About() {
  return (
    <>
      <PageHero label="The journey" title={<>From sketchbooks <em>to skin.</em></>} art="pencil" tone="jade"
        photo={artistPhotos[0] ?? photoOf("portrait", "every line, a story")}
      >
        I’m Atul Rana — <b>coilbugatul</b>. A freelance tattoo artist from India,
        a lifelong doodler, and a spiritual seeker who believes a tattoo should
        feel as good as it looks.
      </PageHero>

      <section className="journey">
        <div className="wrap">
          <ol className="timeline">
            {journey.map((j) => (
              <li className={`timeline-item reveal-up tone-${j.tone}`} key={j.when}>
                <div className="timeline-dot"><Linework art={j.art} strokeWidth={1.6} /></div>
                <div className="timeline-body">
                  <span className="hand timeline-when">{j.when}</span>
                  <h3 className="serif">{j.title}</h3>
                  <p>{j.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="soul">
        <div className="wrap soul-grid">
          <div className="soul-doodles reveal-up">
            <Polaroid {...photoOf("lotus-beads", "lotus — a seeker’s symbol")} art="lotus" tone="sakura" className="soul-photo" />
            <Linework art="note" className="tone-gold soul-note" strokeWidth={1.5} />
            <span className="hand soul-caption">breathe · listen · create</span>
          </div>
          <div className="reveal-up">
            <div className="label"><span className="rule" />Beyond the needle</div>
            <h2 className="serif">A quiet mind <em>makes a steady hand.</em></h2>
            <p>
              Off the clock I’m a spiritual seeker — yoga keeps me grounded and
              music keeps me moving. That same calm comes into every session: no
              rush, no pressure, just you, your story and a design that means
              something.
            </p>
            <p>
              Many clients come in nervous and leave relaxed. I take time to talk,
              explain each step, and make sure you feel safe in the chair.
            </p>
          </div>
        </div>
      </section>

      <section className="freelance">
        <div className="wrap">
          <SectionHead label="Why freelance" title={<>One artist. <em>Your whole journey.</em></>} />
          <div className="why-grid">
            {[
              { t: "No front desk", b: "You talk to me directly — from first message to final healing check." },
              { t: "I travel to you", b: "Tattooing across India, so great work isn’t limited to big-city studios." },
              { t: "Design-first", b: "I guide you on style, size and placement, and draw the design for you." },
              { t: "Same standards everywhere", b: "Single-use needles, barrier protection and a sterile setup in every city." },
            ].map((w) => (
              <div className="why-card reveal-up" key={w.t}>
                <h3>{w.t}</h3>
                <p>{w.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="skills-section">
        <div className="wrap">
          <SectionHead label="Skills & credentials" title={<>The toolkit.</>} />
          <div className="chip-cloud reveal-up">
            {skills.map((s) => <span className="chip" key={s}>{s}</span>)}
          </div>
          <div className="cert-row reveal-up">
            <div className="cert"><Linework art="check" className="tone-jade" strokeWidth={2.4} /> Bloodborne Pathogens Certified</div>
            <div className="cert"><Linework art="check" className="tone-jade" strokeWidth={2.4} /> Hepatitis B Vaccinated</div>
            <div className="cert"><Linework art="check" className="tone-jade" strokeWidth={2.4} /> {YEARS}+ years professional experience</div>
          </div>
        </div>
      </section>

      <ClosingCta
        title={<>Let’s make <em>your chapter</em> next.</>}
        body="Have an idea, a memory or just a vibe? Message me — I’ll help you turn it into a design."
      />
    </>
  );
}
