import "./Card.css";
import {motion} from "framer-motion";

const observer = new IntersectionObserver((entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {}
  }
, []}));


export default function Card({ data, type }) {
  console.log(data);
  if (type == "speaker")
    return (
      <motion.div
        className="card speaker"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {data.headshot_url && (
          <img src={data.headshot_url} alt="speaker_headshot" />
        )}
        <div className="card-text">
          <h4>{data.name}</h4>
          <p className="text">{data.role}</p>
          <p style={{ color: "var(--gold)" }}>{data.org}</p>
        </div>
      </motion.div>
    );
  if (type == "project")
    return (
      <motion.div
        className="card project"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {data.image_url && <img src={data.image_url} alt="project_thumbnail" />}
        <div className="card-text">
          <h4>{data.title}</h4>
          <p className="text">{data.description}</p>
        </div>
      </motion.div>
    );
  if (type == "team")
    return (
      <motion.div
        style={{ margin: "0 0 1rem 0" }}
        className="card team-member fadeUp"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {data.headshot_url && (
          <img src={data.headshot_url} alt="team_headshot" />
        )}
        <div className="card-text">
          <h4>{data.name}</h4>
          <p className="text" style={{ color: "var(--gold)" }}>
            {data.role}
          </p>
        </div>
    </motion.div>
    );
}