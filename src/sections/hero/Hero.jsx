import "./Hero.css";
import Button from "../../components/button/Button";


export default function Hero() {
  return (
    <section id="hero-section">
      <img class="hero-background" src="expo.jpg" alt="" />
      <div class="overlay">
        <h2 class="tagline">
          Innovation expo for the students, by the students
        </h2>
        <Button label="Register Now" width={150} href={"https://www.eventbrite.com/e/1978756589225?aff=oddtdtcreator"} />
      </div>
    </section>
  );
}
