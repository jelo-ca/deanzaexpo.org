import "./Ticker.css";

export default function Ticker({ values = [], speed = 20 }) {
  // speed = seconds per full loop (lower = faster)
  const items = Array.isArray(values) ? values : [];

  return (
    <div className="ticker" role="region" aria-label="Highlights">
      <div className="ticker__fade ticker__fade--left" />
      <div className="ticker__fade ticker__fade--right" />

      <div className="ticker__viewport">
        <ul className="ticker__track" style={{ "--ticker-speed": `${speed}s` }}>
          {items.map((v, i) => (
            <li className="ticker__item" key={`a-${i}`}>
              {v}
            </li>
          ))}
          {/* duplicate for seamless looping */}
          {items.map((v, i) => (
            <li className="ticker__item" key={`b-${i}`} aria-hidden="true">
              {v}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
