import { useMemo } from "react";
import Card from "../../components/card/Card";
import "./Team.css";

export default function Team({ organizerData }) {
  const grouped = useMemo(() => {
    const groups = {
      Executive: [],
      Product: [],
      Programs: [],
      Operations: [],
    };
    organizerData
      .slice()
      .reverse()
      .forEach((o) => {
        if (groups[o.team]) groups[o.team].push(o);
      });
    return groups;
  }, [organizerData]);

  return (
    <section id="team-section">
      <h2>Team</h2>
      <div className="team-container">
        <div className="executive-team-container pillar">
          <h3>Outreach Team</h3>
          {grouped.Executive.map((o) => (
            <Card key={o.id} data={o} type="team" />
          ))}
        </div>
        <div className="product-container pillar">
          <h3>Product Team</h3>
          {grouped.Product.map((o) => (
            <Card key={o.id} data={o} type="team" />
          ))}
        </div>
        <div className="programs-container pillar">
          <h3>Programs Team</h3>
          {grouped.Programs.map((o) => (
            <Card key={o.id} data={o} type="team" />
          ))}
        </div>
        <div className="operations-container pillar">
          <h3>Operations Team</h3>
          {grouped.Operations.map((o) => (
            <Card key={o.id} data={o} type="team" />
          ))}
        </div>
      </div>
    </section>
  );
}
