import { useState } from "react";
import { logout } from "../lib/auth";
import AdminForm from "./dashboardPages/AdminForm.jsx";
import "./AdminDashboard.css";

const emptyProject = {
  title: "",
  description: "",
  image_url: "",
  repo_url: "",
};
const emptySpeaker = {
  name: "",
  role: "",
  org: "",
  headshot_url: "",
};
const emptyOrganizer = {
  name: "",
  role: "",
  team: "",
  linkedinURL: "",
};

const TAB_CONFIG = {
  projects: {
    label: "Projects",
    dataFormat: emptyProject,
  },
  speakers: {
    label: "Speakers",
    dataFormat: emptySpeaker,
  },
  organizers: {
    label: "Organizers",
    dataFormat: emptyOrganizer,
  },
};

export default function AdminDashboard() {
  const [tab, setTab] = useState("projects");

  return (
    <div id="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </div>
      <nav>
        {Object.entries(TAB_CONFIG).map(([key, config]) => (
          <button
            key={key}
            className={tab === key ? "active" : ""}
            onClick={() => setTab(key)}
          >
            {config.label}
          </button>
        ))}
      </nav>
      <section className="admin-content">
        <h2>{TAB_CONFIG[tab].label}</h2>
        <AdminForm dataType={tab} dataFormat={TAB_CONFIG[tab].dataFormat} />
      </section>
    </div>
  );
}
