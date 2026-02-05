import { useState } from "react";

const emptySpeaker = {
  name: "",
  role: "",
  org: "",
  bio: "",
  headshot_url: "",
  talk_title: "",
};

export default function AdminForm(data, dataType, dataFormat) {

  const [formData, setFormData] = useState([]);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  // Handle form submission
  const [dataID, setDataID] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setErr("");

    try {
        if(dataID) {
            // Update existing data
            await updateData(dataID, formData, dataType);
            setDataID(null);
        } else {
            // Create new data
            const {s} = await supabase.auth.getSession();
            console.log("Session: ", s);
            await createData(formData, dataType);
        }
    }

    return (
    <div>{dataType}</div>

    );
}