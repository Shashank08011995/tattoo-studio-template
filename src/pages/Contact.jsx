import { useState } from "react";
import Linework from "../components/Linework";
import { PageHero, WaIcon } from "../components/ui";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_DISPLAY, TEL_LINK, waLink } from "../site";

const STYLE_OPTIONS = ["Not sure yet — guide me", "Japanese", "Colour work", "Fine line", "Blackwork / Dotwork", "Geometric / Ornamental", "Microrealism", "Lettering"];
const SIZE_OPTIONS = ["Tiny (under 5 cm)", "Small (palm-sized)", "Medium (half sleeve / large)", "Big project (sleeve / back)", "Not sure"];

// Composes the consultation message so it lands in WhatsApp already filled in.
function buildMessage(f) {
  const lines = ["Hi Atul! I'd like a tattoo consultation 🙏", ""];
  if (f.name) lines.push(`Name: ${f.name}`);
  if (f.city) lines.push(`City: ${f.city}`);
  lines.push(`Style: ${f.style}`);
  if (f.placement) lines.push(`Placement: ${f.placement}`);
  lines.push(`Size: ${f.size}`);
  if (f.dates) lines.push(`Preferred dates: ${f.dates}`);
  if (f.idea) lines.push("", `My idea: ${f.idea}`);
  return lines.join("\n");
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "", city: "", style: STYLE_OPTIONS[0], placement: "", size: SIZE_OPTIONS[1], dates: "", idea: "",
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const message = buildMessage(form);

  return (
    <>
      <PageHero label="Contact & booking" title={<>Let’s make <em>something.</em></>} art="chat" tone="koi">
        Consultations happen on WhatsApp. Fill in what you know below and it’ll
        open WhatsApp with your message ready to send — or just say hi.
      </PageHero>

      <section className="contact-section">
        <div className="wrap contact-grid">
          <form className="composer reveal-up" onSubmit={(e) => e.preventDefault()}>
            <div className="field-row">
              <label>Your name<input value={form.name} onChange={set("name")} placeholder="Riya" autoComplete="name" /></label>
              <label>Your city<input value={form.city} onChange={set("city")} placeholder="Delhi, Goa, Manali…" /></label>
            </div>
            <div className="field-row">
              <label>Style
                <select value={form.style} onChange={set("style")}>
                  {STYLE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
              <label>Size
                <select value={form.size} onChange={set("size")}>
                  {SIZE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
            </div>
            <div className="field-row">
              <label>Placement<input value={form.placement} onChange={set("placement")} placeholder="Forearm, back, ankle…" /></label>
              <label>Preferred dates<input value={form.dates} onChange={set("dates")} placeholder="Next month, weekends…" /></label>
            </div>
            <label>Your idea
              <textarea rows={4} value={form.idea} onChange={set("idea")} placeholder="A koi swimming up through waves, in bright orange and blue…" />
            </label>

            <div className="composer-preview" aria-live="polite">
              <span className="hand">your message preview</span>
              <pre>{message}</pre>
            </div>

            <a className="btn btn-ink btn-block" href={waLink(message)} target="_blank" rel="noopener noreferrer">
              <WaIcon /> Send on WhatsApp
            </a>
            <p className="composer-note">Tip: attach reference images in WhatsApp after the message opens.</p>
          </form>

          <aside className="contact-cards">
            <a className="contact-card reveal-up tone-jade" href={waLink()} target="_blank" rel="noopener noreferrer">
              <Linework art="chat" className="contact-art" strokeWidth={1.6} />
              <span className="label">WhatsApp</span>
              <b>{PHONE_DISPLAY}</b>
              <span>Fastest way to reach me</span>
            </a>
            <a className="contact-card reveal-up tone-gold" href={TEL_LINK}>
              <Linework art="note" className="contact-art" strokeWidth={1.6} />
              <span className="label">Call</span>
              <b>{PHONE_DISPLAY}</b>
              <span>If I’m mid-session, I’ll call you back</span>
            </a>
            <a className="contact-card reveal-up tone-sakura" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <Linework art="sparkle" className="contact-art" strokeWidth={1.6} />
              <span className="label">Instagram</span>
              <b>{INSTAGRAM_HANDLE}</b>
              <span>Portfolio, travels & DMs</span>
            </a>
            <div className="contact-card reveal-up tone-koi">
              <Linework art="pin" className="contact-art" strokeWidth={1.6} />
              <span className="label">Where</span>
              <b>Across India</b>
              <span>Freelance & travelling — ask when I’m in your city. Open to guest spots worldwide.</span>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
