import { useState } from "react";
import { Link } from "react-router-dom";
import "./SponsorForm.css";
import { sendEmail, TEMPLATE_IDS } from "../lib/email";

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
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Honeypot check — bots fill hidden fields, humans don't
    if (honeypot) {
      setStatus("success");
      return;
    }

    setStatus("loading");
    try {
      await sendEmail(TEMPLATE_IDS.sponsor, {
        sponsor_org: form.org,
        from_name: form.contact,
        reply_to: form.email,
        sponsor_phone: form.phone || "—",
        sponsor_tier: form.tier || "Not specified",
        message: form.message || "—",
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="sponsor-form-page">
        <div className="sponsor-form-card">
          <h2>Thanks for reaching out!</h2>
          <p>We received your inquiry and will be in touch soon at <span>{form.email}</span>.</p>
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
          {/* Honeypot — hidden from real users, bots fill it */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px" }}
          />

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

          {status === "error" && (
            <p className="sf-error">Something went wrong. Please try again or email us at contact@deanzaexpo.org.</p>
          )}

          <button type="submit" className="btn-container sf-submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : <>Send Inquiry <span className="btn-arrow">→</span></>}
          </button>
        </form>
      </div>
    </div>
  );
}
