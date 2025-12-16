import "./SpeakerCard.css";

function SpeakerCard({ speaker }) {
  const { name, role, org, image } = speaker;

  return (
    <article className="speaker-card">
      <div className="speaker-card-avatar-wrap">
        <img className="speaker-card-avatar" src={image} alt={name} />
      </div>
      <div className="speaker-card-body">
        <h3 className="speaker-card-name">{name}</h3>
        <p className="speaker-card-role">{role}</p>
        <p className="speaker-card-org">{org}</p>
      </div>
    </article>
  );
}

export default SpeakerCard;
