import { useState, useEffect, useCallback } from "react";

const RPC_SERVER_URL = "ws://10.0.2.15:8000/websocket";
const JSON_RPC_TIMEOUT_MS = 5000;

const useRpc = () => {
  const [rpc, setRpc] = useState(null);
  const [isRpcConnected, setIsRpcConnected] = useState(false);

  const updateConnectionStatus = (isConnected) => {
    setIsRpcConnected(isConnected);
    localStorage.setItem("isRpcConnected", isConnected);
  };

  const jsonRpc = useCallback(({ onopen, onclose, onnotification }) => {
    let rpcid = 0;
    const pending = {};
    const ws = new WebSocket(RPC_SERVER_URL);

    return new Promise((resolve, reject) => {
      ws.onopen = () => {
        console.log("WebSocket connection established.");
        updateConnectionStatus(true);
        if (onopen) onopen();

        resolve({
          close: () => ws.close(),
          call: (method, params) => {
            const id = rpcid++;
            const request = { id, method, params };
            ws.send(JSON.stringify(request));
            console.log("Sent:", request);

            return new Promise((resolve, reject) => {
              const timeoutId = setTimeout(() => {
                console.log("Timing out frame:", JSON.stringify(request));
                delete pending[id];
                reject(new Error("Request timed out."));
              }, JSON_RPC_TIMEOUT_MS);

              pending[id] = (response) => {
                clearTimeout(timeoutId);
                resolve(response);
              };
            });
          },
        });
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        updateConnectionStatus(false);
        reject(new Error("Failed to connect to WebSocket server."));
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed.");
        updateConnectionStatus(false);
        if (onclose) onclose();
        reject(new Error("WebSocket connection closed."));
      };

      ws.onmessage = (ev) => {
        const frame = JSON.parse(ev.data);
        console.log("Frame received:", frame);

        if (frame.id !== undefined) {
          const resolve = pending[frame.id];
          if (resolve) {
            resolve(frame);
            delete pending[frame.id];
          }
        } else {
          if (onnotification) onnotification(frame);
        }
      };
    });
  }, []);

  const connectRpc = useCallback(async () => {
    try {
      const rpcInstance = await jsonRpc({
        onnotification: (msg) => console.log("Received notification:", JSON.stringify(msg)),
      });
      setRpc(rpcInstance);
      updateConnectionStatus(true);
    } catch (error) {
      console.error("Error connecting to RPC:", error);
      updateConnectionStatus(false);
    }
  }, [jsonRpc]);

  useEffect(() => {
    connectRpc();

    return () => {
      if (rpc) rpc.close();
    };
  }, [connectRpc, rpc]);

  return { isRpcConnected, connectRpc, rpc };
};

export default useRpc;
