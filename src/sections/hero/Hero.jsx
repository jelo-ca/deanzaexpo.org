import "./Hero.css";
import Button from "../../components/button/Button";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="hero-section">
      <img className="hero-background" src="expo.jpg" alt="" />
      <div className="overlay">
        <motion.h2
          className="tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Innovation expo for the students, by the students
        </motion.h2>
        <Button
          label="Register Now"
          width={150}
          // href={"https://www.eventbrite.com/e/1978756589225?aff=oddtdtcreator"}
        />
      </div>
    </section>
  );
}
