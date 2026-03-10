import { useState } from "react";
import "./FAQ.css";
import { FAQ_ITEMS } from "../../constants/faq";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section id="faq-section">
      <h2>FAQ</h2>
      <div className="faq-container">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = i === openIndex;
          return (
            <div
              key={item.q}
              className={`faq-item fadeUp${isOpen ? " faq-item--open" : ""}`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="faq-question"
              >
                {item.q}
                <span className="faq-chevron">{isOpen ? "–" : "+"}</span>
              </button>

              <div className="faq-answer-wrapper">
                <div className="faq-answer">{item.a}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
