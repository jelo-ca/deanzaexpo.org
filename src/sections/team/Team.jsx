import Card from "../../components/card/Card";
import "./Team.css";

export default function Team(organizerData) {
  return (
    <section id="team-section">
      <h2>Team</h2>
      <div className="team-container">
        {/* {organizerData.map((member) => (
            <Card id={member.id} data={member} type="team" />
          ))} */}
        <Card
          id={"member1"}
          data={{ name: "Anjoelo Calderon", role: "Founder & Director" }}
          type="team"
        />
        <Card
          id={"member4"}
          data={{ name: "Enzo Emami", role: "Co-Director" }}
          type="team"
        />
        <Card
          id={"member2"}
          data={{ name: "Jasmine Tu", role: "Founder & Outreach Lead" }}
          type="team"
        />
        <Card
          id={"member3"}
          data={{ name: "Fabiola Diaz", role: "Finance Lead" }}
          type="team"
        />
        <Card
          id={"member5"}
          data={{ name: "Dicanio Liong", role: "Logistics Lead" }}
          type="team"
        />
      </div>
    </section>
  );
}
