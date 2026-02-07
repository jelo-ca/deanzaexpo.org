import { useState } from "react";

export default function AdminForm(data, dataType, dataFormat) {
  const [formData, setFormData] = useState([]);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  // Handle form submission
  const [dataID, setDataID] = useState(null);

  async function submitData(e) {
    e.preventDefault();
    setBusy(true);
    setErr("");

    try {
      if (dataID) {
        // Update existing data
        // Assuming updateData takes (id, payload, table)
        await updateData(dataID, formData, dataType);
        setDataID(null);
      } else {
        // Create new data
        const { s } = await supabase.auth.getSession();
        console.log("Session: ", s);
        await createData(formData, dataType);
      }
      setFormData(emptyFormat);
      await refresh();
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setBusy(false);
    }
  }

  return Objects.entries(formData).map(([key, value]) => (
    <div key={key}>
      <label htmlFor={key}>{key}</label>
      <input
        name={key}
        value={formData[key]}
        onChange={(e) => setFormData((f) => ({ ...f, [key]: e.target.value }))}
      />
    </div>
  ));
}
