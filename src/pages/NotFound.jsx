import { Link } from "react-router-dom";
import { PageHero } from "../components/ui";

export default function NotFound() {
  return (
    <>
      <PageHero label="404" title={<>This page <em>wandered off.</em></>} art="moth" tone="sakura">
        Like a stray line, it’s not where it should be.
      </PageHero>
      <section style={{ paddingTop: 0 }}>
        <div className="wrap"><Link className="btn btn-ghost" to="/">Back home</Link></div>
      </section>
    </>
  );
}
