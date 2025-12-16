import "./Hero.css";

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-inner">
        <p className="hero-kicker">De Anza Tech & Academic Expo</p>
        <h1 className="hero-title">
          DAX <span>2026</span>
        </h1>
        <p className="hero-subtitle">
          Innovation expo <span>for the students</span>,{" "}
          <span>by the students.</span>
        </p>

        <div className="hero-cta-row">
          <button className="hero-cta primary">Learn more</button>
          <button className="hero-cta secondary">Get involved</button>
        </div>

        <p className="hero-meta">
          Spring 2026 · De Anza College · Clubs · Projects · Speakers · Demos
        </p>
      </div>
    </section>
  );
}

export default Hero;
