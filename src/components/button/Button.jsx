import "./Button.css";

export default function Button({ label, width, href }) {
  if (href) {
    return (
      <a href={href} className="btn-container">
        {label}
      </a>
    );
  } else {
    return <button className="btn-container">{label}</button>;
  }
}
