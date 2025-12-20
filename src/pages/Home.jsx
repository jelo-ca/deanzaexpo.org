import Hero from "../sections/hero/Hero";
import About from "../sections/about/About";
import Speakers from "../sections/speakers/Speakers";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Speakers />

      {/* <Team />
      <Sponsors />
      <FAQ /> */}
      <footer>
        <p>&copy; 2026 De Anza Tech & Academic Expo</p>
      </footer>
    </>
  );
}
