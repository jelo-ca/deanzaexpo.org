import { motion } from "motion/react";
import { TIMELINE_MILESTONES } from "../../constants/timeline";
import "./Timeline.css";

function Milestone({ milestone, index }) {
  const isLeft = index % 2 === 0;

  const variants = {
    hidden: { opacity: 0, x: isLeft ? -60 : 60 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className={`timeline-row ${isLeft ? "timeline-row--left" : "timeline-row--right"}`}>
      <motion.div
        className="timeline-card"
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <span className="timeline-date">{milestone.date}</span>
        <h3 className="timeline-title">{milestone.title}</h3>
        <p className="timeline-desc">{milestone.description}</p>
      </motion.div>

      <div className="timeline-dot" />
    </div>
  );
}

export default function Timeline() {
  return (
    <section id="timeline-section">
      <h2>Our Journey</h2>
      <div className="timeline-wrapper">
        <div className="timeline-line" />
        {TIMELINE_MILESTONES.map((milestone, i) => (
          <Milestone key={milestone.date} milestone={milestone} index={i} />
        ))}
      </div>
    </section>
  );
}
