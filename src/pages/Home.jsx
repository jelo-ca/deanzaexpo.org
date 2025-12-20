import Hero from "../sections/hero/Hero";
import About from "../sections/about/About";
import Speakers from "../sections/speakers/Speakers";
import Projects from "../sections/projects/Projects";
import Sponsors from "../sections/sponsors/Sponsors";
import FAQ from "../sections/faq/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Speakers />
      <Projects />
      <Sponsors />
      <FAQ />
      {/* <Team />
      <Sponsors />
      <FAQ /> */}
      <footer>
        <p>&copy; 2026 De Anza Tech & Academic Expo</p>
      </footer>
    </>
  );
}
