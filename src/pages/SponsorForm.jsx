import { useState } from "react";
import { Link } from "react-router-dom";
import "./SponsorForm.css";

const TIERS = ["Gold", "Silver", "Bronze", "Other / Not sure"];

export default function SponsorForm() {
  const [form, setForm] = useState({
    org: "",
    contact: "",
    email: "",
    phone: "",
    tier: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Sponsorship Inquiry – ${form.org}`);
    const body = encodeURIComponent(
      `Organization: ${form.org}\nContact: ${form.contact}\nEmail: ${form.email}\nPhone: ${form.phone}\nTier interest: ${form.tier}\n\n${form.message}`
    );
    window.location.href = `mailto:contact@deanzaexpo.org?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="sponsor-form-page">
        <div className="sponsor-form-card">
          <h2>Thanks for reaching out!</h2>
          <p>Your email client should have opened with your inquiry. If not, email us directly at <span>contact@deanzaexpo.org</span>.</p>
          <Link to="/" className="btn-container sponsor-back-btn">← Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="sponsor-form-page">
      <div className="sponsor-form-card">
        <Link to="/" className="sponsor-back-link">← Back</Link>
        <h2>Become a Sponsor</h2>
        <p className="sponsor-form-subtitle">
          Interested in supporting De Anza Expo? Fill out the form below and we'll be in touch.
        </p>

        <form onSubmit={handleSubmit} className="sponsor-form">
          <div className="sf-field">
            <label htmlFor="org">Organization / Company *</label>
            <input id="org" name="org" value={form.org} onChange={handleChange} required />
          </div>

          <div className="sf-field">
            <label htmlFor="contact">Contact Name *</label>
            <input id="contact" name="contact" value={form.contact} onChange={handleChange} required />
          </div>

          <div className="sf-row">
            <div className="sf-field">
              <label htmlFor="email">Email *</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="sf-field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} />
            </div>
          </div>

          <div className="sf-field">
            <label htmlFor="tier">Sponsorship Tier Interest</label>
            <select id="tier" name="tier" value={form.tier} onChange={handleChange}>
              <option value="">Select a tier…</option>
              {TIERS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="sf-field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange} />
          </div>

          <button type="submit" className="btn-container sf-submit">
            Send Inquiry <span className="btn-arrow">→</span>
          </button>
        </form>
      </div>
    </div>
  );
}
