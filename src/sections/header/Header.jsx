import "./Header.css";
export default function Header() {
  return (
    <header>
      <nav>
        <li>
          <a href="#about-section">About</a>
        </li>
        {/* <li>
          <a href="#speakers-section">Speakers</a>
        </li> */}
        <li>
          <a href="#projects-section">Projects</a>
        </li>
        {/* <li>
          <a href="#sponsors-section">Sponsors</a>
        </li> */}
        <li>
          <a href="#faq-section">FAQ</a>
        </li>
      </nav>
      <img className="header-logo" src="/DAX_logo.png" alt="DAX logo" />
    </header>
  );
}
