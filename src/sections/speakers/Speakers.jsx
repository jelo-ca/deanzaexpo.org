import Card from "../../components/card/Card";
import Carousel from "../../components/carousel/Carousel";
import "./Speakers.css";

export default function Speakers({ speakerData }) {
  return (
    <section id="speakers-section">
      <h2>
        <span>2026</span> Speakers
      </h2>
      <Carousel>
        {speakerData.map((s) => (
          <Card key={s.id} data={s} type="speaker" />
        ))}
      </Carousel>
    </section>
  );
}
