import "./About.css";

function About() {
  return (
    <section id="about">
      <div className="about-container">
        <div className="about-text">
          <h1>ABOUT THE EVENT</h1>
          <img src="expo.jpg" alt="" />
          <p>
            De Anza Expo (DAX) 2026 is the premier collegiate technology
            exhibition, bringing together the brightest minds and most
            innovative companies for three days of discovery, learning, and
            connection.
          </p>
        </div>
        <div className="about-stats">
          <li>400</li>
          <li>400</li>
          <li>400</li>
        </div>
      </div>

      <div className="about-cont">
        <h1 className="autoBlur">INNOVATION</h1>
        <h1 className="autoBlur">WORKSHOPS</h1>
        <h1 className="autoBlur">CLUB PROJECTS</h1>
        <h1 className="autoBlur">NETWORK</h1>
        <h1 className="autoBlur">TALKS & DEMOS</h1>
      </div>
    </section>
  );
}

export default About;
