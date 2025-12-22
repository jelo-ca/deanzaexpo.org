import { useState, useEffect } from "react";
import { getSpeakers } from "../lib/apiSpeakers.js";
import { getProjects } from "../lib/apiProjects.js";

// SECTIONS
import Hero from "../sections/hero/Hero";
import About from "../sections/about/About";
import Speakers from "../sections/speakers/Speakers";
import Projects from "../sections/projects/Projects";
import Sponsors from "../sections/sponsors/Sponsors";
import FAQ from "../sections/faq/FAQ";
import Header from "../sections/header/Header.jsx";

export default function Home() {
  const [speakers, setSpeakers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [err, setErr] = useState("");

  async function refresh() {
    setErr("");

    const s = await getSpeakers();
    const p = await getProjects();

    if (s?.error) throw s.error;
    if (p?.error) throw p.error;

    setSpeakers(s);
    setProjects(p);
  }

  useEffect(() => {
    refresh().catch((e) => setErr(e.message));
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <About />
      <Speakers speakerData={speakers} />
      <Projects projectData={projects} />
      <Sponsors />
      <FAQ />
      <footer>
        <p>&copy; 2026 De Anza Tech & Academic Expo</p>
      </footer>
    </>
  );
}
