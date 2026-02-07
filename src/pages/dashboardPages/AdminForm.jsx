import { useState, useEffect } from "react";
import { updateData, createData, getData, deleteData } from "../../lib/apiData";

export default function AdminForm({ dataType, dataFormat = {} }) {
  const [formData, setFormData] = useState(dataFormat || {});
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [speakers, setSpeakers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [organizers, setOrganizers] = useState([]);

  async function refresh() {
    const [p, s, o] = await Promise.all([
      getData("projects"),
      getData("speakers"),
      getData("organizers"),
    ]);
    setProjects(p);
    setSpeakers(s);
    setOrganizers(o);
  }

  useEffect(() => {
    refresh().catch((e) => setErr(e.message));
  }, []);
  const items =
    dataType === "projects"
      ? projects
      : dataType === "speakers"
      ? speakers
      : organizers;

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      if (selectedId) {
        await updateData(selectedId, formData, dataType);
      } else {
        await createData(formData, dataType);
      }
      await refresh();
      setFormData(dataFormat || {});
      setSelectedId(null);
    } catch (e) {
      setErr(e.message || String(e));
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id) {
    // eslint-disable-next-line no-alert
    if (!window.confirm("Delete this item?")) return;
    setBusy(true);
    try {
      await deleteData(id, dataType);
      await refresh();
    } catch (e) {
      setErr(e.message || String(e));
    } finally {
      setBusy(false);
    }
  }

  function startEdit(item) {
    setSelectedId(item.id || null);
    setFormData(item);
  }

  return (
    <div className="admin-form">
      <div className="admin-list">
        {items && items.length ? (
          items.map((item) => (
            <div key={item.id} className="admin-list-item">
              <span>{item.title || item.name || item.id}</span>
              <button onClick={() => startEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          ))
        ) : (
          <div>No items</div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="admin-edit-form">
        {err && <div className="error">{err}</div>}
        {Object.entries(formData || {}).map(([key, value]) =>
          key === "id" || key === "created_at" ? null : (
            <div key={key} className="field">
              <label htmlFor={key}>{key}</label>
              <input
                id={key}
                name={key}
                value={formData[key] ?? ""}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, [key]: e.target.value }))
                }
              />
            </div>
          ),
        )}

        <div className="actions">
          <button type="submit" disabled={busy}>
            {selectedId ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={() => {
              setFormData(dataFormat || {});
              setSelectedId(null);
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
