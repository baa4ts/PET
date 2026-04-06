import { useState } from "react";
import { API } from "../../actions/configuracion/API.config";

export const Administracion = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const handleFetch = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await API.post("http://localhost:3000/api/v1/ausencias");
      setResult({ ok: true, message: `${res.status} OK` });
    } catch (err: any) {
      setResult({ ok: false, message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleFetch} disabled={loading}>
        {loading ? "Enviando..." : "POST /ausencias"}
      </button>
      {result && (
        <p style={{ color: result.ok ? "green" : "red" }}>{result.message}</p>
      )}
    </div>
  );
};