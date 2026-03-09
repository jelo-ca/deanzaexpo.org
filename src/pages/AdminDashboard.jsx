import { useEffect, useState } from "react";

import { logout } from "../lib/auth";
import { uploadToMediaBucket } from "../lib/upload";
import AdminForm from "./dashboardPages/AdminForm.jsx";
import "./AdminDashboard.css";

import { getData, createData, updateData, deleteData } from "../lib/apiData.js";

const emptyProject = {
  title: "",
  description: "",
  image_url: "",
  repo_url: "",
};

export default function AdminDashboard() {
  const [tab, setTab] = useState("projects");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <div id="admin-dashboard">
      {/*Header  */}
      <header>
        <h1>Admin Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </header>
      <nav>
        <button onClick={() => setTab("projects")}>Projects</button>
        <button onClick={() => setTab("speakers")}>Speakers</button>
        <button onClick={() => setTab("organizers")}>Organizers</button>
      </nav>
      {/* Content section */}
      <section>
        {tab === "projects" && (
          <AdminForm dataType="projects" dataFormat={emptyProject} />
        )}
        {tab === "speakers" && (
          <AdminForm dataType="speakers" dataFormat={emptyProject} />
        )}
        {tab === "organizers" && (
          <AdminForm dataType="organizers" dataFormat={emptyProject} />
        )}
      </section>
    </div>
  );
}
