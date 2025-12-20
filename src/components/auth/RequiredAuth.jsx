import { useEffect, useState } from "react";
import { getSession } from "../../lib/auth";

export default function RequiredAuth({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (!session) {
        window.location.href = "/admin/login";
        return;
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;
  return children;
}
