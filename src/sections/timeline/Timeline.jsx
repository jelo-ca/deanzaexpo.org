import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValue, useMotionValueEvent, useTransform } from "motion/react";
import { TIMELINE_MILESTONES } from "../../constants/timeline";
import "./Timeline.css";

function Milestone({ milestone, index, threshold, maxProgress, onDotRef }) {
  const isLeft = index % 2 === 0;
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const [triggered, setTriggered] = useState(false);

  useMotionValueEvent(maxProgress, "change", (v) => {
    if (!triggered && v >= threshold) setTriggered(true);
  });

  const variants = {
    hidden: { opacity: 0, x: isMobile ? 60 : isLeft ? -60 : 60 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className={`timeline-row ${isLeft ? "timeline-row--left" : "timeline-row--right"}`}>
      <motion.div
        className={`timeline-card${triggered ? " timeline-card--hit" : ""}`}
        variants={variants}
        animate={triggered ? "visible" : "hidden"}
        initial="hidden"
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <span className="timeline-date">{milestone.date}</span>
        <h3 className="timeline-title">{milestone.title}</h3>
        <p className="timeline-desc">{milestone.description}</p>
      </motion.div>

      <div
        ref={(el) => onDotRef(index, el)}
        className={`timeline-dot${triggered ? " timeline-dot--hit" : ""}`}
      />
    </div>
  );
}

export default function Timeline() {
  const wrapperRef = useRef(null);
  const dotRefs = useRef([]);
  const N = TIMELINE_MILESTONES.length;

  // Start with even fallback, replace after mount with measured positions
  const [thresholds, setThresholds] = useState(() =>
    Array.from({ length: N }, (_, i) => i / (N - 1))
  );

  useEffect(() => {
    if (!wrapperRef.current) return;
    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const wrapperHeight = wrapperRef.current.offsetHeight;
    setThresholds(
      dotRefs.current.map((dot) => {
        if (!dot) return 0;
        const dotRect = dot.getBoundingClientRect();
        const dotCenter = dotRect.top + dotRect.height / 2 - wrapperRect.top;
        return dotCenter / wrapperHeight;
      })
    );
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start 0.7", "end 0.7"],
  });

  // One-way ratchet — never decreases
  const maxProgress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > maxProgress.get()) maxProgress.set(v);
  });

  const scaleY = useTransform(maxProgress, [0, 1], [0, 1]);

  return (
    <section id="timeline-section">
      <h2>Our Journey</h2>
      <div className="timeline-wrapper" ref={wrapperRef}>
        <div className="timeline-line timeline-line--bg" />
        <motion.div
          className="timeline-line timeline-line--fill"
          style={{ scaleY, transformOrigin: "top" }}
        />
        {TIMELINE_MILESTONES.map((milestone, i) => (
          <Milestone
            key={milestone.date}
            milestone={milestone}
            index={i}
            threshold={thresholds[i]}
            maxProgress={maxProgress}
            onDotRef={(idx, el) => { dotRefs.current[idx] = el; }}
          />
        ))}
      </div>
    </section>
  );
}
