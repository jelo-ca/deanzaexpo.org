import { useHomeData } from "../hooks/useHomeData";

import Hero     from "../sections/hero/Hero";
import About    from "../sections/about/About";
import Speakers from "../sections/speakers/Speakers";
import Projects from "../sections/projects/Projects";
import FAQ      from "../sections/faq/FAQ";
import Header   from "../sections/header/Header.jsx";
import Footer   from "../sections/footer/Footer.jsx";
import Team     from "../sections/team/Team.jsx";

export default function Home() {
  const { speakers, projects, organizers } = useHomeData();

  return (
    <>
      <Header />
      <Hero />
      <About />
      {speakers.length   > 3 && <Speakers speakerData={speakers}     />}
      {projects.length   > 3 && <Projects projectData={projects}     />}
      {organizers.length > 3 && <Team     organizerData={organizers} />}
      {/* <Sponsors /> */}
      <FAQ />
      <Footer />
    </>
  );
}
