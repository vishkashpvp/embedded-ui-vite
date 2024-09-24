import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useRpc from "../hooks/useRpc";

export default function Error() {
  const navigate = useNavigate();
  const { connectRpc, isRpcConnected } = useRpc();

  const handleReconnect = async () => {
    try {
      await connectRpc();

      if (isRpcConnected) navigate("/dashboard");
      else alert("Failed to reconnect. Please try again.");
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    if (isRpcConnected) navigate("/dashboard");
  }, [isRpcConnected, navigate]);

  return (
    <div className="error-page">
      <h1>RPC Connection Error</h1>
      <button onClick={handleReconnect}>Reconnect to RPC</button>
    </div>
  );
}
