import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import "./SponsorForm.css";
import { sendEmail, submitToSheets, TEMPLATE_IDS } from "../lib/email";

export default function Speak() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    org: "",
    topic: "",
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
      await Promise.all([
        sendEmail(TEMPLATE_IDS.speaker, {
          from_name: form.name,
          reply_to: form.email,
          speaker_org: form.org || "—",
          speaker_topic: form.topic,
          message: form.message || "—",
        }),
        submitToSheets("Speakers", {
          timestamp: new Date().toISOString(),
          name: form.name,
          email: form.email,
          org: form.org || "",
          topic: form.topic,
          message: form.message || "",
        }),
      ]);
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
          <p>
            We received your speaker inquiry and will follow up at{" "}
            <span>{form.email}</span> soon.
          </p>
          <Link to="/" className="btn-container sponsor-back-btn">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="sponsor-form-page">
      <div className="sponsor-form-card">
        <motion.button
          onClick={() => navigate(-1)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="sponsor-back-link"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit", fontSize: "0.9rem" }}
        >
          ← Back
        </motion.button>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Speak at DAX 2026
        </motion.h2>

        <motion.p
          className="sponsor-form-subtitle"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          We're looking for industry professionals, researchers, and founders to
          inspire the next generation of builders. Share your story.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="sponsor-form"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
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

          <div className="sf-row">
            <div className="sf-field">
              <label htmlFor="name">Name *</label>
              <input id="name" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="sf-field">
              <label htmlFor="email">Email *</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>
          </div>

          <div className="sf-field">
            <label htmlFor="org">Organization / Title</label>
            <input id="org" name="org" value={form.org} onChange={handleChange} placeholder="e.g. Senior Engineer at Acme Corp" />
          </div>

          <div className="sf-field">
            <label htmlFor="topic">Talk Topic *</label>
            <input id="topic" name="topic" value={form.topic} onChange={handleChange} required placeholder="What would you like to speak about?" />
          </div>

          <div className="sf-field">
            <label htmlFor="message">Anything else you'd like to share</label>
            <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange} />
          </div>

          {status === "error" && (
            <p className="sf-error">Something went wrong. Please try again or email us at contact@deanzaexpo.org.</p>
          )}

          <button type="submit" className="btn-container sf-submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : <>Submit Inquiry <span className="btn-arrow">→</span></>}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
