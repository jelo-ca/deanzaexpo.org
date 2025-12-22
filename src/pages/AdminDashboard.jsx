import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { logout } from "../lib/auth";
import { uploadToMediaBucket } from "../lib/upload";
import "./AdminDashboard.css";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../lib/apiProjects";
import {
  getSpeakers,
  createSpeaker,
  updateSpeaker,
  deleteSpeaker,
} from "../lib/apiSpeakers";

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
  bio: "",
  headshot_url: "",
  talk_title: "",
};

export default function AdminDashboard() {
  const [tab, setTab] = useState("projects");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [editingProjectId, setEditingProjectId] = useState(null);

  const [speakers, setSpeakers] = useState([]);
  const [speakerForm, setSpeakerForm] = useState(emptySpeaker);
  const [editingSpeakerId, setEditingSpeakerId] = useState(null);

  async function refresh() {
    const [p, s] = await Promise.all([getProjects(), getSpeakers()]);
    setProjects(p);
    setSpeakers(s);
  }

  useEffect(() => {
    refresh().catch((e) => setErr(e.message));
  }, []);

  async function submitProject(e) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      if (editingProjectId) {
        await updateProject(editingProjectId, projectForm);
        setEditingProjectId(null);
      } else {
        const { data } = await supabase.auth.getSession();
        console.log("session:", data.session);
        await createProject(projectForm);
      }
      setProjectForm(emptyProject);
      await refresh();
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setBusy(false);
    }
  }

  async function submitSpeaker(e) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      if (editingSpeakerId) {
        await updateSpeaker(editingSpeakerId, speakerForm);
        setEditingSpeakerId(null);
      } else {
        await createSpeaker(speakerForm);
      }
      setSpeakerForm(emptySpeaker);
      await refresh();
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setBusy(false);
    }
  }
  async function handleUpload(file, folder, setForm, field) {
    setErr("");
    setBusy(true);
    try {
      const { publicUrl } = await uploadToMediaBucket(file, folder);
      setForm((f) => ({ ...f, [field]: publicUrl }));
    } catch (e) {
      setErr(e.message || String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "2rem auto",
        padding: "0 1rem",
        color: "black",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <h1>Admin Dashboard</h1>
        <button
          type="button"
          onClick={async () => {
            await logout();
            window.location.href = "/admin/login";
          }}
        >
          Logout
        </button>
      </div>

      {err && <p style={{ color: "tomato" }}>{err}</p>}

      <div style={{ display: "flex", gap: 10, margin: "1rem 0" }}>
        <button
          type="button"
          onClick={() => setTab("projects")}
          disabled={tab === "projects"}
        >
          Projects
        </button>
        <button
          type="button"
          onClick={() => setTab("speakers")}
          disabled={tab === "speakers"}
        >
          Speakers
        </button>
      </div>

      {tab === "projects" && (
        <>
          <h2>{editingProjectId ? "Edit Project" : "Create Project"}</h2>
          <form
            onSubmit={submitProject}
            style={{ display: "grid", gap: 10, marginBottom: 24 }}
          >
            <input
              name="title"
              value={projectForm.title}
              onChange={(e) =>
                setProjectForm((f) => ({ ...f, title: e.target.value }))
              }
              placeholder="Title"
              required
            />
            <textarea
              name="description"
              value={projectForm.description}
              onChange={(e) =>
                setProjectForm((f) => ({ ...f, description: e.target.value }))
              }
              placeholder="Description"
              required
            />
            <input
              name="repo_url"
              value={projectForm.repo_url}
              onChange={(e) =>
                setProjectForm((f) => ({ ...f, repo_url: e.target.value }))
              }
              placeholder="Repo URL"
            />

            <div style={{ display: "flex", gap: 10 }}>
              <button type="submit" disabled={busy}>
                {editingProjectId ? "Update" : "Create"}
              </button>
              {editingProjectId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingProjectId(null);
                    setProjectForm(emptyProject);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              disabled={busy}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file)
                  handleUpload(file, "projects", setProjectForm, "image_url");
              }}
            />

            {projectForm.image_url && (
              <img
                src={projectForm.image_url}
                alt="Project preview"
                style={{ maxWidth: 280, borderRadius: 12 }}
              />
            )}
          </form>

          <h3>Existing Projects</h3>
          <div style={{ display: "grid", gap: 12 }}>
            {projects.map((p) => (
              <div
                key={p.id}
                style={{
                  border: "1px solid rgba(0,0,0,0.15)",
                  padding: 12,
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <div>
                    <strong>{p.title}</strong>
                    <div style={{ opacity: 0.8 }}>{p.description}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => {
                        setEditingProjectId(p.id);
                        setProjectForm({
                          title: p.title ?? "",
                          description: p.description ?? "",
                          image_url: p.image_url ?? "",
                          repo_url: p.repo_url ?? "",
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => deleteProject(p.id).then(refresh)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "speakers" && (
        <>
          <h2>{editingSpeakerId ? "Edit Speaker" : "Create Speaker"}</h2>
          <form
            onSubmit={submitSpeaker}
            style={{ display: "grid", gap: 10, marginBottom: 24 }}
          >
            <input
              name="name"
              value={speakerForm.name}
              onChange={(e) =>
                setSpeakerForm((f) => ({ ...f, name: e.target.value }))
              }
              placeholder="Name"
              required
            />
            <input
              name="role"
              value={speakerForm.role}
              onChange={(e) =>
                setSpeakerForm((f) => ({ ...f, role: e.target.value }))
              }
              placeholder="Role / Title"
            />
            <input
              name="org"
              value={speakerForm.org}
              onChange={(e) =>
                setSpeakerForm((f) => ({ ...f, org: e.target.value }))
              }
              placeholder="Organization"
            />
            <input
              name="talk_title"
              value={speakerForm.talk_title}
              onChange={(e) =>
                setSpeakerForm((f) => ({ ...f, talk_title: e.target.value }))
              }
              placeholder="Talk Title"
            />
            <textarea
              name="bio"
              value={speakerForm.bio}
              onChange={(e) =>
                setSpeakerForm((f) => ({ ...f, bio: e.target.value }))
              }
              placeholder="Bio"
            />

            <div style={{ display: "flex", gap: 10 }}>
              <button type="submit" disabled={busy}>
                {editingSpeakerId ? "Update" : "Create"}
              </button>
              {editingSpeakerId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingSpeakerId(null);
                    setSpeakerForm(emptySpeaker);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              disabled={busy}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file)
                  handleUpload(
                    file,
                    "headshots",
                    setSpeakerForm,
                    "headshot_url"
                  );
              }}
            />

            {speakerForm.image_url && (
              <img
                src={speakerForm.image_url}
                alt="Speaker preview"
                style={{ maxWidth: 280, borderRadius: 12 }}
              />
            )}
          </form>

          <h3>Existing Speakers</h3>
          <div style={{ display: "grid", gap: 12 }}>
            {speakers.map((s) => (
              <div
                key={s.id}
                style={{
                  border: "1px solid rgba(0,0,0,0.15)",
                  padding: 12,
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <div>
                    <strong>{s.name}</strong>
                    <div style={{ opacity: 0.8 }}>
                      {[s.role, s.org].filter(Boolean).join(" • ")}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => {
                        setEditingSpeakerId(s.id);
                        setSpeakerForm({
                          name: s.name ?? "",
                          role: s.role ?? "",
                          org: s.org ?? "",
                          bio: s.bio ?? "",
                          headshot_url: s.headshot_url ?? "",
                          talk_title: s.talk_title ?? "",
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => deleteSpeaker(s.id).then(refresh)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
