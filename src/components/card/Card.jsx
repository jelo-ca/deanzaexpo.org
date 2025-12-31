import "./Card.css";
export default function Card({ data, type }) {
  console.log(data);
  if (type == "speaker")
    return (
      <div className="card speaker">
        <img src={data.headshot_url} alt="speaker_headshot" />
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
}
