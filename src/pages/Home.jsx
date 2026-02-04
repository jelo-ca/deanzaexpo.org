import { useState, useEffect } from "react";
import { getData } from "../lib/apiData.js";

// SECTIONS
import Hero from "../sections/hero/Hero";
import About from "../sections/about/About";
import Speakers from "../sections/speakers/Speakers";
import Projects from "../sections/projects/Projects";
import Sponsors from "../sections/sponsors/Sponsors";
import FAQ from "../sections/faq/FAQ";
import Header from "../sections/header/Header.jsx";
import Footer from "../sections/footer/Footer.jsx";
import Team from "../sections/team/Team.jsx";

export default function Home() {
  const [speakers, setSpeakers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [err, setErr] = useState("");

  async function refresh() {
    setErr("");

    const s = await getData("speakers");
    const p = await getData("projects");
    const o = await getData("organizers");

    if (s?.error) throw s.error;
    if (p?.error) throw p.error;
    if (o?.error) throw o.error;

    setSpeakers(s);
    setProjects(p);
    setOrganizers(o);
  }

  useEffect(() => {
    refresh().catch((e) => setErr(e.message));
  }, []);

  console.log(speakers, projects, organizers, err);

  return (
    <>
      <Header />
      <Hero />
      <About />
      {speakers.length > 3 && <Speakers speakerData={speakers} />}
      {projects.length > 3 && <Projects projectData={projects} />}
      {organizers.length > 3 && <Team organizerData={organizers} />}
      {/* <Sponsors /> */}
      <FAQ />
      <Footer />
    </>
  );
}
