import { useState } from "react";
import { Link } from "react-router-dom";
import "./SponsorForm.css";
import { sendEmail, TEMPLATE_IDS } from "../lib/email";

const TIERS = ["Platinum", "Gold", "Silver", "Bronze", "Other / Not sure"];

const SPONSOR_TIERS = [
  {
    name: "Platinum",
    price: "$2,500",
    accent: "#e8e6e0",
    perks: [
      "Naming rights: DAX presented by [Sponsor]",
      "Keynote speaking slot",
      "Priority booth on the showcase floor",
      "Premium logo on all materials & attendee badges",
      "Dedicated social media spotlight series",
      "Student contact list for post-event recruiting",
      "Post-event impact report with attendance data & photos",
    ],
  },
  {
    name: "Gold",
    price: "$1,000",
    accent: "var(--gold)",
    perks: [
      "Booth on the showcase floor",
      "30–60 min sponsored workshop",
      "Large logo on all materials & website (with backlink)",
      "Included in pre-event attendee emails",
      "Recognition in opening & closing remarks",
      "Social media package (2–3 posts)",
    ],
  },
  {
    name: "Silver",
    price: "$500",
    accent: "#b0b0b8",
    perks: [
      "Booth OR sponsored workshop",
      "Medium logo on all materials & event website",
      "Listed in the event program & agenda",
      "1 tagged social media post",
      "Branded materials at registration & refreshment tables",
    ],
  },
  {
    name: "Bronze",
    price: "$100–250",
    accent: "#c47f3a",
    perks: [
      "Logo on all materials & event website",
      "Thank-you mention in closing remarks",
      "1 item featured at the giveaway table",
    ],
  },
];

const ALL_PERKS = [
  "Digital certificate of appreciation",
  "Early access to event photos for marketing use",
  "Networking with 350+ students & professionals",
  "Visibility with Bay Area community college talent",
  "Recognition at De Anza's Silicon Valley STEM showcase",
];

export default function SponsorForm() {
  const [openTiers, setOpenTiers] = useState(new Set());

  function toggleTier(name) {
    setOpenTiers((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  }

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
      <div className="sponsor-layout">

        {/* ── Form ── */}
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

        {/* ── Tiers Panel ── */}
        <div className="sponsor-tiers-panel">
          <h2>Sponsorship Tiers</h2>
          <p className="sponsor-tiers-subtitle">
            Every tier includes logo placement on our website, banner, and on-site signage.
          </p>

          <div className="sponsor-tiers-list">
            {SPONSOR_TIERS.map((tier) => {
              const isOpen = openTiers.has(tier.name);
              return (
                <div key={tier.name} className={`sponsor-tier-card${isOpen ? " is-open" : ""}`} style={{ "--tier-accent": tier.accent }}>
                  <button
                    className="stc-header"
                    onClick={() => toggleTier(tier.name)}
                    aria-expanded={isOpen}
                  >
                    <span className="stc-name">{tier.name}</span>
                    <span className="stc-header-right">
                      <span className="stc-price">{tier.price}</span>
                      <span className="stc-chevron">▼</span>
                    </span>
                  </button>
                  <div className="stc-perks-wrap">
                    <ul className="stc-perks">
                      {tier.perks.map((perk) => (
                        <li key={perk}>{perk}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="sponsor-all-perks">
            <p className="spa-label">All sponsors receive</p>
            <ul>
              {ALL_PERKS.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
