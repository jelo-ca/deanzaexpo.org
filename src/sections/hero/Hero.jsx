import "./Hero.css";
import Button from "../../components/button/Button";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="hero-section">
      <img className="hero-background" src="expo.jpg" alt="" />
      <div className="overlay">
        <div className="hero-content">
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
            // href={"https://www.eventbrite.com/e/1978756589225?aff=oddtdtcreator"}
          />
        </div>
      </div>
    </section>
  );
}
