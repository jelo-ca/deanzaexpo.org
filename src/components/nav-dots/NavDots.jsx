import { useState, useEffect, useRef } from "react";
import "./NavDots.css";

export default function NavDots({ sections }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const sectionsRef = useRef(sections);

  useEffect(() => {
    sectionsRef.current = sections;
  }, [sections]);

  useEffect(() => {
    const handleScroll = () => {
      const midY = window.innerHeight * 0.5;
      for (const { id } of sectionsRef.current) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= midY && rect.bottom > midY) {
          setActive(id);
          return;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="nav-dots" aria-label="Section navigation">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          className={`nav-dot ${active === id ? "nav-dot--active" : ""}`}
          onClick={() =>
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
          }
          aria-label={`Go to ${label}`}
          data-label={label}
        />
      ))}
    </nav>
  );
}
