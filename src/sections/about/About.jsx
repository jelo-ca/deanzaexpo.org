import {useInView} from "react-intersection-observer";
import { motion } from "framer-motion";

import Logo from "../../components/logo/Logo";
import "./About.css";

export default function About() {
  return (
    <section id="about-section">
      {/* <img class="about-image" src="DAX_logo.png" alt="About DAX" /> */}
      <Logo className="about-logo" width={300} height={240} />
      <div class="about-text-container">
        <h2>Who we are</h2>
        <p>
          At DAX, we’re passionate about showcasing the creativity and
          innovation of De Anza students. Whether you’re a tech enthusiast, a
          budding engineer, or just curious about the latest student projects,
          you’ll find exciting demos, hands-on workshops, and opportunities to
          connect with peers and professionals.
        </p>
      </div>
    </section>
  );
}
