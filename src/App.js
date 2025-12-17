import "./App.css";
import "./Animation.css";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Speakers from "./components/sections/Speakers";
import Sponsors from "./components/sections/Sponsors";
import Team from "./components/sections/Team";
import FAQ from "./components/sections/FAQ";

function App() {
  return (
    <>
      <span class="blob blob-1"></span>
      <span class="blob blob-2"></span>
      <Hero />
      <About />
      <Speakers />
      <Team />
      <Sponsors />
      <FAQ />
      <footer>
        <p>&copy; 2026 De Anza Tech & Academic Expo</p>
      </footer>
    </>
  );
}

export default App;
