import "./Button.css";
import { motion } from "framer-motion";

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
    return (
      <motion.a href={href} className="btn-container" target="_blank" {...fadeUp}>
        {content}
      </motion.a>
    );
  } else {
    return (
      <motion.button className="btn-container" {...fadeUp}>
        {content}
      </motion.button>
    );
  }
}
