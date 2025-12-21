import "./Card.css";
export default function Card({ data, type }) {
  console.log(data);
  if (type == "speaker")
    return (
      <div className="card">
        <img src={data.headshot_url} alt="speaker_headshot" />
        <div className="card-text">
          <h4>{data.name}</h4>
          <p>{data.role}</p>
        </div>
      </div>
    );
  if (type == "project")
    return (
      <div className="card">
        <img src={data.image_url} alt="project_thumbnail" />
        <div className="card-text">
          <h4>{data.name}</h4>
          <p>{data.description}</p>
        </div>
      </div>
    );
}
