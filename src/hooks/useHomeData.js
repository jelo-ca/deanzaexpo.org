import { useState, useEffect } from "react";
import { getData } from "../lib/api";

const MIN_LOADING_MS = 2750;

export function useHomeData() {
  const [speakers,   setSpeakers]   = useState([]);
  const [projects,   setProjects]   = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [error,      setError]      = useState("");
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    setError("");
    const start = Date.now();

    Promise.all([
      getData("speakers",   "id,headshot_url,name,role,org"),
      getData("projects",   "id,title,description,image_url"),
      getData("organizers", "id,name,role,team,linkedinURL"),
    ])
      .then(([s, p, o]) => {
        setSpeakers(s);
        setProjects(p);
        setOrganizers(o);
        const elapsed = Date.now() - start;
        const remaining = MIN_LOADING_MS - elapsed;
        setTimeout(() => setLoading(false), Math.max(0, remaining));
      })
      .catch((e) => {
        setError(e.message ?? String(e));
        setLoading(false);
      });
  }, []);

  return { speakers, projects, organizers, error, loading };
}
