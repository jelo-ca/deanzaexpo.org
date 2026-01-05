import { useState } from "react";
import "./FAQ.css";

const FAQS = [
  {
    q: "What is DAX?",
    a: "",
  },
  {
    q: "Who can attend?",
    a: "",
  },
  {
    q: "How do I register?",
    a: "",
  },
  {
    q: "Can I present a project?",
    a: "",
  },
];
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(-1); // start closed

  return (
    <section id="faq-section">
      <h2>FAQ</h2>
      <div className="faq-container" style={{ display: "grid", gap: 12 }}>
        {FAQS.map((item, i) => {
          const isOpen = i === openIndex;
          return (
            <div
              key={item.q}
              style={{
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 16,
                overflow: "hidden",
                background: "rgba(255,255,255,0.04)",
              }}
              className="fadeUp"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "16px 18px",
                  cursor: "pointer",
                  background: "transparent",
                  border: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              >
                {item.q}
                <span
                  style={{
                    opacity: 0.7,
                    fontSize: "1.25rem",
                    lineHeight: 1,
                    color: "white",
                  }}
                >
                  {isOpen ? "–" : "+"}
                </span>
              </button>

              <div
                style={{
                  maxHeight: isOpen ? 200 : 0,
                  transition: "max-height 250ms ease",
                }}
              >
                <div
                  style={{
                    padding: "0 18px 16px",
                    opacity: 0.9,
                    lineHeight: 1.6,
                  }}
                >
                  {item.a}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
