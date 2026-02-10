<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
import { useState, useEffect } from "react";
>>>>>>> master
import { updateData, createData, getData, deleteData } from "../../lib/apiData";

export default function AdminForm({ dataType, dataFormat = {} }) {
  const [formData, setFormData] = useState(dataFormat || {});
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
<<<<<<< HEAD
  const [items, setItems] = useState([]);

  async function refresh() {
    const data = await getData(dataType);
    setItems(data || []);
=======

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
>>>>>>> master
  }

  useEffect(() => {
    refresh().catch((e) => setErr(e.message));
<<<<<<< HEAD
  }, [dataType]);

  useEffect(() => {
    setFormData(dataFormat || {});
    setSelectedId(null);
    setErr("");
  }, [dataType, dataFormat]);

  const fieldNames = Object.keys(dataFormat || {});

  function buildPayload() {
    return fieldNames.reduce((acc, key) => {
      acc[key] = formData[key] ?? "";
      return acc;
    }, {});
  }
=======
  }, []);
  const items =
    dataType === "projects"
      ? projects
      : dataType === "speakers"
      ? speakers
      : organizers;
>>>>>>> master

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
<<<<<<< HEAD
      const payload = buildPayload();
      if (selectedId) {
        await updateData(selectedId, payload, dataType);
      } else {
        await createData(payload, dataType);
=======
      if (selectedId) {
        await updateData(selectedId, formData, dataType);
      } else {
        await createData(formData, dataType);
>>>>>>> master
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
<<<<<<< HEAD
    setFormData(
      fieldNames.reduce((acc, key) => {
        acc[key] = item[key] ?? "";
        return acc;
      }, {}),
    );
  }

  function getItemLabel(item) {
    if (dataType === "projects") return item.title || `Project ${item.id}`;
    if (dataType === "speakers") return item.name || `Speaker ${item.id}`;
    return item.name || `Organizer ${item.id}`;
=======
    setFormData(item);
>>>>>>> master
  }

  return (
    <div className="admin-form">
      <div className="admin-list">
<<<<<<< HEAD
        <h3>Existing {dataType}</h3>
        {items && items.length ? (
          items.map((item) => (
            <div key={item.id} className="admin-list-item">
              <span>{getItemLabel(item)}</span>
=======
        {items && items.length ? (
          items.map((item) => (
            <div key={item.id} className="admin-list-item">
              <span>{item.title || item.name || item.id}</span>
>>>>>>> master
              <button onClick={() => startEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          ))
        ) : (
          <div>No items</div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="admin-edit-form">
<<<<<<< HEAD
        <h3>{selectedId ? "Edit item" : "Create item"}</h3>
        {err && <div className="error">{err}</div>}
        {fieldNames.map((key) => (
          <div key={key} className="field">
            <label htmlFor={key}>{key}</label>
            {key === "description" ? (
              <textarea
                id={key}
                name={key}
                value={formData[key] ?? ""}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, [key]: e.target.value }))
                }
              />
            ) : (
=======
        {err && <div className="error">{err}</div>}
        {Object.entries(formData || {}).map(([key, value]) =>
          key === "id" || key === "created_at" ? null : (
            <div key={key} className="field">
              <label htmlFor={key}>{key}</label>
>>>>>>> master
              <input
                id={key}
                name={key}
                value={formData[key] ?? ""}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, [key]: e.target.value }))
                }
              />
<<<<<<< HEAD
            )}
          </div>
        ))}
=======
            </div>
          ),
        )}
>>>>>>> master

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
