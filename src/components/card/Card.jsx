import "./Card.css";
import {motion, scale, spring} from "framer-motion";

const observer = new IntersectionObserver(() => {
    
}, {threshold: 0.5});

const variant = {
    hidden: {opacity: 0, y: 50},
    visible: {opacity: 1, y: 0}
}

export default function Card({ data, type }) {
  console.log(data);
  if (type == "speaker")
    return (
      <motion.div
        className="card speaker"
        variants={variant}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.2 }}

        whileHover={{scale: 1.1}}
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
        initial={{ opacity: 0, y: 80, originX:0 }}
        animate={{ opacity: 1, y: 0, originX:0 }}
        transition={{ duration: .2 }}

        whileHover={{scale: 1.1}}
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
        initial={{ opacity: 0, y: 50, originX:0 }}
        animate={{ opacity: 1, y: 0, originX:0  }}
        transition={{ duration: .2 }}

        whileHover={{scale: 1.1}}
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