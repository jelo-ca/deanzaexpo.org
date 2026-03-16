import { useEffect, useState } from "react";
import "./Header.css";
import { NAV_LINKS } from "../../constants/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "header--scrolled" : ""}>
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
