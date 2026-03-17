import Card from "../../components/card/Card";
import Carousel from "../../components/carousel/Carousel";
import Button from "../../components/button/Button";
import "./Speakers.css";

export default function Speakers({ speakerData }) {
  return (
    <section id="speakers-section">
      <h2>
        <span>2026</span> Speakers
      </h2>
      {speakerData.length > 3 && (
        <Carousel>
          {speakerData.map((s) => (
            <Card key={s.id} data={s} type="speaker" />
          ))}
        </Carousel>
      )}
      <div className="speakers-placeholder">
        {speakerData.length <= 3 && <p>Speakers will be announced soon.</p>}
        <p className="speakers-cta-sub">Want to share your story at DAX 2026?</p>
        <Button label="Apply to Speak" href="/speak" />
      </div>
    </section>
  );
}
