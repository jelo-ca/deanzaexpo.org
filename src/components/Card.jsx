import "./Card.css";

// person card component
// Props: person (object with name, role, org, image)

function Card({ person }) {
  const { name, role, org, image } = person;

  return (
    <article className="person-card">
      <div className="person-card-avatar-wrap">
        <img className="person-card-avatar" src={image} alt={name} />
      </div>
      <div className="person-card-body">
        <h3 className="person-card-name">{name}</h3>
        <p className="person-card-role">{role}</p>
        <p className="person-card-org">{org}</p>
      </div>
    </article>
  );
}

export default Card;
