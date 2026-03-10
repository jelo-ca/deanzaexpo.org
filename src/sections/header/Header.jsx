import "./Header.css";
import { NAV_LINKS } from "../../constants/navigation";

export default function Header() {
  return (
    <header>
      <nav>
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </nav>
      <img className="header-logo" src="/DAX_logo.png" alt="DAX logo" />
    </header>
  );
}
