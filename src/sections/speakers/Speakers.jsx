import Card from "../../components/card/Card";
import { useState, useEffect } from "react";
import { getSpeakers } from "../../lib/apiSpeakers";
import "./Speakers.css"


export default function Speakers() {

    const [speakers, setSpeakers] = useState([]);
    const [err, setErr] = useState("");

    async function refresh() {
  setErr("");

  const res = await getSpeakers();

  if (res?.error) throw res.error;

  setSpeakers(res);
}

  useEffect(() => {
      refresh().catch((e) => setErr(e.message));
    }, []);

  return (
    <section id="speakers-section">
      <h2>Speakers</h2>
      <div className="speaker-carousel">
        {speakers.map((s) => <Card key={s.id} data={s}/>)}
      </div>
    </section>
  );
}
