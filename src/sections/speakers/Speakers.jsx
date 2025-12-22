import Card from "../../components/card/Card";
import "./Speakers.css";

export default function Speakers({ speakerData }) {
  return (
    <section id="speakers-section">
      <h2>Speakers</h2>
      <div className="speaker-carousel">
        {speakerData.map((s) => (
          <Card key={s.id} data={s} type="speaker" />
        ))}
      </div>
    </section>
  );
}
