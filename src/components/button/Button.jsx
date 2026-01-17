import "./Button.css";
import { motion } from "framer-motion";

export default function Button({ label, width, href }) {
  if (href) {
    return (
      <motion.a
        href={href}
        className="btn-container"
        target="_blank"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {label}
      </motion.a>
    );
  } else {
    return <button className="btn-container">{label}</button>;
  }
}
