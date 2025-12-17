import Card from "../Card";
import "./Team.css";

const member = [
  {
    name: "Jasmine Tu",
    role: "",
    org: "Outreach Lead",
    image: "https://picsum.photos/200?random=1",
  },
  {
    name: "Fabiola Diaz",
    role: "",
    org: "Head of Finance",
    image: "https://picsum.photos/200?random=1",
  },
  {
    name: "Anjoelo Calderon",
    role: "",
    org: "",
    image: "https://picsum.photos/200?random=1",
  },
  {
    name: "Enzo Emami",
    role: "",
    org: "",
    image: "https://picsum.photos/200?random=1",
  },
];
function Team() {
  return (
    <section id="team">
      <h1>OUR TEAM</h1>
      <div className="team-container">
        {member.map((m, idx) => (
          <Card person={m} key={idx} />
        ))}
      </div>
    </section>
  );
}

export default Team;
