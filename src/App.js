import "./App.css";
import "./Animation.css";
import Hero from "./sections/hero/Hero";
import About from "./sections/about/About";
import Speakers from "./sections/speakers/Speakers";

function App() {
  return (
    <>
      <span class="blob blob-1"></span>
      <span class="blob blob-2"></span>
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

export default App;
