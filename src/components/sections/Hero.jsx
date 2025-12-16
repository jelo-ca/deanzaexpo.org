import "./Hero.css";

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="Logo-container">
        <img className="logo" src="/logo.png" alt="" />
      </div>
      <p className="tagline">
        Innovation expo <b>for the students, by the students</b>
      </p>
      <div>
        <button className="register-btn">Register Now</button>
      </div>

      <div className=" info-container">
        <div className="info date-info">
          <img className="icon" src="/icons/calendar.png" alt="location icon" />
          <p>April 15, 2026</p>
        </div>
        <div className="info location-info">
          <img className="icon" src="/icons/location.png" alt="location icon" />
          <p>De Anza College Campus</p>
        </div>
        <div className="info attendee-info">
          <img className="icon" src="/icons/group.png" alt="location icon" />
          <p>100+ Attendees</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
