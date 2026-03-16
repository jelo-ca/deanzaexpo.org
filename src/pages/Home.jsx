import { useHomeData } from "../hooks/useHomeData";

import Hero     from "../sections/hero/Hero";
import About    from "../sections/about/About";
import Speakers from "../sections/speakers/Speakers";
import Projects from "../sections/projects/Projects";
import FAQ      from "../sections/faq/FAQ";
import Header   from "../sections/header/Header.jsx";
import Footer   from "../sections/footer/Footer.jsx";
import Team     from "../sections/team/Team.jsx";
import Timeline from "../sections/timeline/Timeline.jsx";
import NavDots  from "../components/nav-dots/NavDots.jsx";

export default function Home() {
  const { speakers, projects, organizers } = useHomeData();

  const sections = [
    { id: "hero-section",     label: "Home"     },
    { id: "about-section",    label: "About"    },
    ...(speakers.length   > 3 ? [{ id: "speakers-section", label: "Speakers" }] : []),
    ...(projects.length   > 3 ? [{ id: "projects-section", label: "Projects" }] : []),
    ...(organizers.length > 3 ? [{ id: "team-section",     label: "Team"     }] : []),
    { id: "timeline-section", label: "Timeline" },
    { id: "faq-section",      label: "FAQ"      },
  ];

  return (
    <>
      <Header />
      <NavDots sections={sections} />
      <Hero />
      <About />
      {speakers.length   > 3 && <Speakers speakerData={speakers}     />}
      {projects.length   > 3 && <Projects projectData={projects}     />}
      {organizers.length > 3 && <Team     organizerData={organizers} />}
      <Timeline />
      {/* <Sponsors /> */}
      <FAQ />
      <Footer />
    </>
  );
}
