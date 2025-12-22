import "./Carousel.css";
import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Based off of @ProgrammerCloud's carousel
export default function Carousel({
  children,
  auto = true,
  intervalMs = 2500,
  pauseOnHover = true,
}) {
  const CARDS = 10;
  const MAX_VISIBILITY = 3;

  const [active, setActive] = useState(2);
  const count = React.Children.count(children);

  const prev = () => setActive((i) => (i <= 0 ? count - 1 : i - 1));
  const next = () => setActive((i) => (i >= count - 1 ? 0 : i + 1));

  return (
    <div className="carousel">
      {count > 1 && (
        <button className="nav left" onClick={prev}>
          <FiChevronLeft />
        </button>
      )}
      {React.Children.map(children, (child, i) => (
        <div
          className="card-container"
          style={{
            "--active": i === active ? 1 : 0,
            "--offset": (active - i) / 3,
            "--direction": Math.sign(active - i),
            "--abs-offset": Math.abs(active - i) / 3,
            "pointer-events": active === i ? "auto" : "none",
            opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
          }}
        >
          {child}
        </div>
      ))}
      {count > 1 && (
        <button className="nav right" onClick={next}>
          <FiChevronRight />
        </button>
      )}
    </div>
  );
}
