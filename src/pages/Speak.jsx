import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../components/button/Button";

export default function Speak() {
  const navigate = useNavigate();

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4rem 2rem",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <motion.button
        onClick={() => navigate(-1)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          background: "none",
          border: "none",
          color: "rgba(255,255,255,0.5)",
          fontSize: "1rem",
          cursor: "pointer",
          padding: 0,
          marginBottom: "3rem",
          textAlign: "left",
          fontWeight: "normal",
          letterSpacing: "0.05em",
        }}
      >
        ← Back
      </motion.button>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ fontSize: "3.5rem", marginBottom: "1rem" }}
      >
        Speak at <span>DAX 2026</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        style={{ fontSize: "1.25rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "2.5rem" }}
      >
        De Anza Expo is a student-run innovation showcase. We're looking for
        industry professionals, researchers, and founders to inspire the next
        generation of builders. If you have a story worth sharing, we'd love
        to hear from you.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Button label="Get in Touch" href="mailto:contact@deanzaexpo.org" />
      </motion.div>
    </main>
  );
}
