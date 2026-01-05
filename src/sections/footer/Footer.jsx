import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-div">
        <img src="/DAX_logo.png" alt="DAX logo" className="logo" />

        <div className="info-container">
          <div className="info">
            <p>Email:</p>
            <p>contact@deanzaexpo.org</p>
          </div>

          <div className="info">
            <p>Instagram:</p>
            <p>@deanzaexpo</p>
          </div>

          <div className="info">
            <p>Address:</p>
            <p>21250 Stevens Creek Blvd. Cupertino, CA</p>
          </div>

          <div className="info">
            <p>Phone:</p>
            <p>(747) 305-4716</p>
          </div>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <ul>
            <li>
              <a href="#about-section">About</a>
            </li>
            <li>
              <a href="#speakers-section">Speakers</a>
            </li>
            <li>
              <a href="#projects-section">Projects</a>
            </li>
            <li>
              <a href="#sponsors-section">Sponsors</a>
            </li>
            <li>
              <a href="#faq-section">FAQ</a>
            </li>
          </ul>
        </nav>
      </div>

      <p className="creative-commons">
        De Anza Expo © 2025 All Rights Reserved • Privacy Policy • Code of
        Conduct
      </p>
    </footer>
  );
}
