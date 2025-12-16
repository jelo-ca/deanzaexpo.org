import SpeakersSphere from "../SpeakerSphere";
import "./Speakers.css";

function Speakers() {
  return (
    <section className="speakers-section">
      <div className="speakers-copy">
        <p className="speakers-kicker">Speakers</p>
        <h2 className="speakers-title">Meet the Speakers</h2>
        <p className="speakers-subtitle">
          Drag the sphere to inspect the speakers who will be sharing their
          valuable insights at DAX 2026.
        </p>
      </div>
      <SpeakersSphere />
    </section>
  );
}

export default Speakers;
