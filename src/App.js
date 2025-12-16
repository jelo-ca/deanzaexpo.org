import "./App.css";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Speakers from "./components/sections/Speakers";
import Sponsors from "./components/sections/Sponsors";
import Team from "./components/sections/Team";
import FAQ from "./components/sections/FAQ";

function App() {
  return (
    <>
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
