import { useState } from "react";
import { logout } from "../../lib/auth";
import AdminForm from "./AdminForm.jsx";
import "./AdminDashboard.css";

const emptyProject = {
  title:       "",
  description: "",
  image_url:   "",
  repo_url:    "",
};

const emptySpeaker = {
  name:         "",
  role:         "",
  org:          "",
  headshot_url: "",
};

const emptyOrganizer = {
  name:        "",
  role:        "",
  team:        "",
  linkedinURL: "",
};

export default function AdminDashboard() {
  const [tab, setTab] = useState("projects");

  return (
    <div id="admin-dashboard">
      <header>
        <h1>Admin Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </header>

      <nav>
        <button
          className={tab === "projects" ? "active" : ""}
          onClick={() => setTab("projects")}
        >
          Projects
        </button>
        <button
          className={tab === "speakers" ? "active" : ""}
          onClick={() => setTab("speakers")}
        >
          Speakers
        </button>
        <button
          className={tab === "organizers" ? "active" : ""}
          onClick={() => setTab("organizers")}
        >
          Organizers
        </button>
      </nav>

      <section>
        {tab === "projects"   && <AdminForm dataType="projects"   dataFormat={emptyProject}   />}
        {tab === "speakers"   && <AdminForm dataType="speakers"   dataFormat={emptySpeaker}   />}
        {tab === "organizers" && <AdminForm dataType="organizers" dataFormat={emptyOrganizer} />}
      </section>
    </div>
  );
}
