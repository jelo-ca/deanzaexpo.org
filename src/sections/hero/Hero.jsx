import "./Hero.css";
import Button from "../../components/button/Button";
import Ticker from "../../components/ticker/Ticker";

export default function Hero() {
  return (
    <section id="hero-section">
      <img class="hero-background" src="expo.jpg" alt="" />
      <div class="overlay">
        <h2 class="tagline">
          Innovation expo for the students, by the students
        </h2>
        <Button label="Register Now" width={150} href={"register"} />
      </div>
    </section>
  );
}
