import "./Card.css";
export default function Card({ data, type }) {
  console.log(data);
  if (type == "speaker")
    return (
      <div className="card speaker">
        {data.headshot_url && (
          <img src={data.headshot_url} alt="speaker_headshot" />
        )}
        <div className="card-text">
          <h4>{data.name}</h4>
          <p className="text">{data.role}</p>
          <p style={{ color: "var(--gold)" }}>{data.org}</p>
        </div>
      </div>
    );
  if (type == "project")
    return (
      <div className="card project">
        {data.image_url && <img src={data.image_url} alt="project_thumbnail" />}
        <div className="card-text">
          <h4>{data.title}</h4>
          <p className="text">{data.description}</p>
        </div>
      </div>
    );
  if (type == "team")
    return (
      <div style={{ margin: "0 0 1rem 0" }} className="card team-member fadeUp">
        {data.headshot_url && (
          <img src={data.headshot_url} alt="team_headshot" />
        )}
        <div className="card-text">
          <h4>{data.name}</h4>
          <p className="text" style={{ color: "var(--gold)" }}>
            {data.role}
          </p>
        </div>
      </div>
    );
}
