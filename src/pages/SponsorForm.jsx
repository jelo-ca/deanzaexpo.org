import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import "./SponsorForm.css";
import { sendEmail, TEMPLATE_IDS } from "../lib/email";
import { sanitizeText, sanitizeEmail } from "../lib/sanitize";

const fadeSlideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const fadeSlideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.1 } },
};

const staggerList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
};

const tierItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

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
  const lastSubmitRef = useRef(0);

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

    // Client-side rate limit: one submission per 30 seconds
    const now = Date.now();
    if (now - lastSubmitRef.current < 30_000) {
      setStatus("error");
      return;
    }
    lastSubmitRef.current = now;

    // Sanitize all user inputs before sending to external service
    const safe = {
      org:     sanitizeText(form.org, 120),
      contact: sanitizeText(form.contact, 100),
      email:   sanitizeEmail(form.email),
      phone:   sanitizeText(form.phone, 30),
      tier:    TIERS.includes(form.tier) ? form.tier : "Not specified",
      message: sanitizeText(form.message, 1000),
    };

    setStatus("loading");
    try {
      await sendEmail(TEMPLATE_IDS.sponsor, {
        sponsor_org: safe.org,
        from_name:   safe.contact,
        reply_to:    safe.email,
        sponsor_phone: safe.phone || "—",
        sponsor_tier:  safe.tier,
        message:       safe.message || "—",
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="sponsor-form-page">
        <motion.div
          className="sponsor-form-card"
          variants={fadeSlideLeft}
          initial="hidden"
          animate="visible"
        >
          <h2>Thanks for reaching out!</h2>
          <p>We received your inquiry and will be in touch soon at <span>{form.email}</span>.</p>
          <Link to="/" className="btn-container sponsor-back-btn">← Back to home</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="sponsor-form-page">
      <div className="sponsor-layout">

        {/* ── Form ── */}
        <motion.div
          className="sponsor-form-card"
          variants={fadeSlideLeft}
          initial="hidden"
          animate="visible"
        >
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
              <input id="org" name="org" value={form.org} onChange={handleChange} required maxLength={120} />
            </div>

            <div className="sf-field">
              <label htmlFor="contact">Contact Name *</label>
              <input id="contact" name="contact" value={form.contact} onChange={handleChange} required maxLength={100} />
            </div>

            <div className="sf-row">
              <div className="sf-field">
                <label htmlFor="email">Email *</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required maxLength={254} />
              </div>
              <div className="sf-field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} maxLength={30} />
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
              <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange} maxLength={1000} />
            </div>

            {status === "error" && (
              <p className="sf-error">Something went wrong. Please try again or email us at contact@deanzaexpo.org.</p>
            )}

            <button type="submit" className="btn-container sf-submit" disabled={status === "loading"}>
              {status === "loading" ? "Sending…" : <>Send Inquiry <span className="btn-arrow">→</span></>}
            </button>
          </form>
        </motion.div>

        {/* ── Tiers Panel ── */}
        <motion.div
          className="sponsor-tiers-panel"
          variants={fadeSlideRight}
          initial="hidden"
          animate="visible"
        >
          <h2>Sponsorship Tiers</h2>
          <p className="sponsor-tiers-subtitle">
            Every tier includes logo placement on our website, banner, and on-site signage.
          </p>

          <motion.div
            className="sponsor-tiers-list"
            variants={staggerList}
            initial="hidden"
            animate="visible"
          >
            {SPONSOR_TIERS.map((tier) => {
              const isOpen = openTiers.has(tier.name);
              return (
                <motion.div key={tier.name} variants={tierItem} className={`sponsor-tier-card${isOpen ? " is-open" : ""}`} style={{ "--tier-accent": tier.accent }} onClick={() => toggleTier(tier.name)} role="button" aria-expanded={isOpen} tabIndex={0} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleTier(tier.name)}>
                  <div
                    className="stc-header"
                  >
                    <span className="stc-name">{tier.name}</span>
                    <span className="stc-header-right">
                      <span className="stc-price">{tier.price}</span>
                      <span className="stc-chevron">▼</span>
                    </span>
                  </div>
                  <div className="stc-perks-wrap">
                    <ul className="stc-perks">
                      {tier.perks.map((perk) => (
                        <li key={perk}>{perk}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="sponsor-all-perks">
            <p className="spa-label">All sponsors receive</p>
            <ul>
              {ALL_PERKS.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
