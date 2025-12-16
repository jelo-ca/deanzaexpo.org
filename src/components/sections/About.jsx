import "./About.css";
import Card from "../Card";

function About() {
  return (
    <section id="about">
      <div className="about-text">
        <h1>ABOUT THE EVENT</h1>
        <p>
          The De Anza Tech & Academic Expo (DAX) is an event that showcases the
          innovative projects by De Anza College students. It serves as a
          platform for students to present their work to peers, faculty,
          industry professionals, and the broader community. The expo features a
          diverse range of projects from various disciplines, including
          technology, science, engineering, arts, and humanities.
        </p>
      </div>
      <div className="about-card-container">
        <Card
          title="Student-Built Projects”"
          description="Discover apps, games, hardware builds, research posters, and creative work designed and built by De Anza students."
        />
        <Card
          title="Clubs on Display"
          description="Explore what De Anza’s STEM and academic clubs are working on."
        />
        <Card
          svg="http://www.w3.org/2000/svg"
          title="Talks, Demos & Workshops"
          description="Sit in on lightning talks, live demos, and hands-on sessions."
        />
        <Card
          svg="http://www.w3.org/2000/svg"
          title="Connect & Collaborate"
          description="Meet future teammates, mentors, and industry guests."
        />
      </div>
    </section>
  );
}

export default About;
