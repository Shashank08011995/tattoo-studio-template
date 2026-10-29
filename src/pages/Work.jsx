import Linework from "../components/Linework";
import { ClosingCta, InstagramButton, PageHero, SectionHead } from "../components/ui";
import { styles, workItems } from "../data";

const primary = ["Japanese", "Colour", "Fine Line", "Geometric", "Microrealism", "Blackwork", "Dotwork", "Black & Grey"];
const additional = ["Custom Designs", "Lettering", "Minimalist", "Ornamental / Symbolic"];

export default function Work() {
  return (
    <>
      <PageHero label="Work & styles" title={<>Every piece, <em>drawn for one person.</em></>} art="koi" tone="koi">
        Japanese flow, bright colour and clean detail. No flash off the wall —
        each design starts with your idea and is built for your body.
      </PageHero>

      <section className="styles-section">
        <div className="wrap">
          <SectionHead label="Styles" title={<>What I love <em>to make.</em></>} />
          <div className="style-grid">
            {styles.map((s) => (
              <div className={`style-card reveal-up tone-${s.tone}`} key={s.name}>
                <Linework art={s.art} className="style-art" strokeWidth={1.4} />
                <h3>{s.name}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
          <div className="style-lists reveal-up">
            <div>
              <h4 className="label"><span className="rule" />Primary</h4>
              <div className="chip-cloud">{primary.map((p) => <span className="chip chip-hot" key={p}>{p}</span>)}</div>
            </div>
            <div>
              <h4 className="label"><span className="rule" />Also</h4>
              <div className="chip-cloud">{additional.map((p) => <span className="chip" key={p}>{p}</span>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <SectionHead label="Portfolio" title={<>The <em>gallery.</em></>}>
            <p>New pieces land on Instagram first — follow along for healed shots, works in progress and life on the road.</p>
          </SectionHead>
          <div className="work-grid">
            {workItems.map((w) => (
              <figure className={`work-item reveal-up ${w.cls}`} key={w.src}>
                <img src={w.src} alt={`${w.style} tattoo — ${w.place}`} loading="lazy" />
                <figcaption className="work-cap"><span>{w.style}</span><span>{w.place}</span></figcaption>
              </figure>
            ))}
          </div>
          <div className="insta-strip reveal-up">
            <Linework art="sparkle" className="tone-gold" strokeWidth={1.6} />
            <p className="serif">See the full portfolio on Instagram</p>
            <InstagramButton>Follow @coilbugatul</InstagramButton>
          </div>
        </div>
      </section>

      <ClosingCta
        title={<>Seen something <em>you love?</em></>}
        body="Send a screenshot and your idea on WhatsApp — I’ll suggest how to make it uniquely yours."
      />
    </>
  );
}
