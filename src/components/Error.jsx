import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useRpc from "../hooks/useRpc";

export default function Error() {
  const navigate = useNavigate();
  const { connectRpc } = useRpc();

  useEffect(() => {
    const isConnected = localStorage.getItem("isRpcConnected") === "true";
    if (isConnected) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleReconnect = async () => {
    try {
      await connectRpc();

      const isConnected = localStorage.getItem("isRpcConnected") === "true";
      if (isConnected) {
        navigate("/dashboard");
      } else {
        alert("Failed to reconnect. Please try again.");
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div className="error-page">
      <h1>RPC Connection Error</h1>
      <button onClick={handleReconnect}>Reconnect to RPC</button>
    </div>
  );
}
