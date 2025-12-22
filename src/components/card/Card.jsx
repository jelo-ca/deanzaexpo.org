import "./Card.css";
export default function Card({ data, type }) {
  console.log(data);
  if (type == "speaker")
    return (
      <div className="card">
        <img src={data.headshot_url} alt="speaker_headshot" />
        <div className="card-text">
          <h4>{data.name}</h4>
          <p className="role-text">{data.role}</p>
          <p style={{ color: "var(--gold)" }}>{data.org}</p>
        </div>
      </div>
    );
  if (type == "project")
    return (
      <div
        className="card"
        style={{
          flex: "0 0 50%",
          width: "50%",
          height: "auto",
          border: "2px solid black",
        }}
      >
        <img src={data.image_url} alt="project_thumbnail" />
        <div className="card-text">
          <h4>{data.title}</h4>
          <p>{data.description}</p>
        </div>
      </div>
    );
}
