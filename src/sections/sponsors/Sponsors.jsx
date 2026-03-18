import { Link } from "react-router-dom";
import { motion } from "motion/react";
import "./Sponsors.css";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const logoItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function Sponsors() {
  return (
    <section id="sponsors-section">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        Sponsors
      </motion.h2>
      <div className="gold-sponsor-container">
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          Gold Sponsors
        </motion.h3>
        <motion.div
          className="logo-container"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.img
            variants={logoItem}
            src="https://fhda.academicworks.com/image_uploads/W1siZiIsImltYWdlX3VwbG9hZHMvMS8wYjlkMmIwNS1iNzEzLTQzYTktODM3YS1lZWNjNjc0Mzc5MDIvSUNDIGxvZ28uanBnIl1d?sha=f41292a7963cff54"
            alt=""
            className="sponsor-logo"
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
          <motion.img
            variants={logoItem}
            src="https://www.deanza.edu/dasg/images/old-dasb-logos/old-dasb-logo-hands-full.png"
            alt=""
            className="sponsor-logo"
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
          <motion.img
            variants={logoItem}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDIvAaib-qidLGgu9KasyhP_bvQbrIPfFvrQ&s"
            alt=""
            className="sponsor-logo"
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </motion.div>
        {/* <h3 style={{ color: "#b0b0b8" }}>Silver Sponsors</h3>
        <div className="logo-container">
          <img src="" alt="" className="sponsor-logo" />
          <img src="" alt="" className="sponsor-logo" />
          <img src="" alt="" className="sponsor-logo" />
        </div>
        <h3 style={{ color: "#c47f3a" }}>Bronze Sponsors</h3>
        <div className="logo-container">
          <img src="" alt="" className="sponsor-logo" />
          <img src="" alt="" className="sponsor-logo" />
          <img src="" alt="" className="sponsor-logo" />
        </div> */}
      </div>
      <motion.div
        className="sponsor-cta"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="sponsor-cta-text">Interested in becoming a sponsor?</p>
        <Link to="/sponsor" className="btn-container sponsor-btn">
          Get in touch <span className="btn-arrow">→</span>
        </Link>
      </motion.div>
    </section>
  );
}
