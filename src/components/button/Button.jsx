import "./Button.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { isSafeHref } from "../../lib/sanitize";

const MotionLink = motion.create(Link);

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1 },
};

export default function Button({ label, href }) {
  const content = (
    <>
      {label}
      <span className="btn-arrow">→</span>
    </>
  );

  if (href) {
    // Block javascript:, data:, and other dangerous schemes
    const safeHref = isSafeHref(href) ? href : "#";
    const isExternal = safeHref.startsWith("http://") || safeHref.startsWith("https://") || safeHref.startsWith("//");
    if (isExternal) {
      return (
        <motion.a href={safeHref} className="btn-container" target="_blank" rel="noopener noreferrer" {...fadeUp}>
          {content}
        </motion.a>
      );
    }
    return (
      <MotionLink to={safeHref} className="btn-container" {...fadeUp}>
        {content}
      </MotionLink>
    );
  } else {
    return (
      <motion.button className="btn-container" {...fadeUp}>
        {content}
      </motion.button>
    );
  }
}
