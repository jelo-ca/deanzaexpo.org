import "./Card.css";
export default function Card({ data }) {
  console.log(data);

  return (
    <div className="card">
      <img src="data.image_url" alt="" />
      <h4>{data.name}test</h4>
      <p>{data.role}</p>
    </div>
  )
}
