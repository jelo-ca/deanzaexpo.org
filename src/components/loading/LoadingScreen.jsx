import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../logo/Logo";
import "./LoadingScreen.css";

export default function LoadingScreen({ visible }) {
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          <Logo immediate width={360} height={288} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
