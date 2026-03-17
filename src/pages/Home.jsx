import { useHomeData } from "../hooks/useHomeData";

import Hero          from "../sections/hero/Hero";
import About         from "../sections/about/About";
import Speakers      from "../sections/speakers/Speakers";
import Projects      from "../sections/projects/Projects";
import FAQ           from "../sections/faq/FAQ";
import Header        from "../sections/header/Header.jsx";
import Footer        from "../sections/footer/Footer.jsx";
import Team          from "../sections/team/Team.jsx";
import Timeline      from "../sections/timeline/Timeline.jsx";
import NavDots       from "../components/nav-dots/NavDots.jsx";
import Sponsors      from "../sections/sponsors/Sponsors.jsx";
import LoadingScreen from "../components/loading/LoadingScreen.jsx";

export default function Home() {
  const { speakers, projects, organizers, loading } = useHomeData();

  const sections = [
    { id: "hero-section",      label: "Home"     },
    { id: "about-section",     label: "About"    },
    { id: "timeline-section",  label: "Timeline" },
    { id: "speakers-section",  label: "Speakers" },
    ...(projects.length   > 3 ? [{ id: "projects-section", label: "Projects" }] : []),
    ...(organizers.length > 3 ? [{ id: "team-section",     label: "Team"     }] : []),
    { id: "sponsors-section",  label: "Sponsors" },
    { id: "faq-section",       label: "FAQ"      },
  ];

  return (
    <>
      <LoadingScreen visible={loading} />
      <Header />
      <NavDots sections={sections} />
      <Hero />
      <About />
      <Timeline />
      <Speakers speakerData={speakers} />
      {projects.length   > 3 && <Projects projectData={projects}     />}
      {organizers.length > 3 && <Team     organizerData={organizers} />}
      <Sponsors />
      <FAQ />
      <Footer />
    </>
  );
}
