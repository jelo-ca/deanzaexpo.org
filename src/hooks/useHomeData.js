import { useState, useEffect } from "react";
import { getData } from "../lib/api";

export function useHomeData() {
  const [speakers,   setSpeakers]   = useState([]);
  const [projects,   setProjects]   = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [error,      setError]      = useState("");

  useEffect(() => {
    setError("");
    Promise.all([
      getData("speakers",   "id,headshot_url,name,role,org"),
      getData("projects",   "id,title,description,image_url"),
      getData("organizers", "id,name,role,team,linkedinURL"),
    ])
      .then(([s, p, o]) => {
        setSpeakers(s);
        setProjects(p);
        setOrganizers(o);
      })
      .catch((e) => setError(e.message ?? String(e)));
  }, []);

  return { speakers, projects, organizers, error };
}
