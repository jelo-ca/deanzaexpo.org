import Card from "../../components/card/Card";
import "./Projects.css";

export default function Projects({ projectData }) {
  return (
    <section id="projects-section">
      <h2>Projects</h2>
      <div className="project-container">
        {projectData.map((p) => (
          <Card id={p.id} data={p} type="project" />
        ))}
      </div>
    </section>
  );
}
