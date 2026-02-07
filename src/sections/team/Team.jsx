import Card from "../../components/card/Card";
import "./Team.css";

function FilteredMap({ data, team }) {
  return data
    .toReversed()
    .filter((o) => o.team === team)
    .map((o) => <Card id={o.id} data={o} type="team" />);
}

export default function Team({ organizerData }) {
  return (
    <section id="team-section">
      <h2>Team</h2>
      <div className="team-container">
        <div className="executive-team-container pillar">
          <h3>Outreach Team</h3>
          <FilteredMap data={organizerData} team="Executive" />
        </div>
        <div className="product-container pillar">
          <h3>Product Team</h3>
          <FilteredMap data={organizerData} team="Product" />
        </div>
        <div className="programs-container pillar">
          <h3>Programs Team</h3>
          <FilteredMap data={organizerData} team="Programs" />
        </div>
        <div className="operations-container pillar">
          <h3>Operations Team</h3>
          <FilteredMap data={organizerData} team="Operations" />
        </div>
      </div>
    </section>
  );
}
