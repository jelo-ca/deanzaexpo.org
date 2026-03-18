import { motion } from "framer-motion";

import Logo from "../../components/logo/Logo";
import "./About.css";

export default function About() {
  return (
    <section id="about-section">
      {/* <img class="about-image" src="DAX_logo.png" alt="About DAX" /> */}
      <Logo className="about-logo" width={300} height={240} />
      <div className="about-text-container">
        <h2>Who we are</h2>
        <p>
          DAX bridges the gap between community college academics & the tech
          industry by transforming our campus into a professional hub for
          innovation. We provide a platform for students to showcase their
          technical craft & for industry leaders to engage with the next
          generation of creators.
        </p>
      </div>
    </section>
  );
}
