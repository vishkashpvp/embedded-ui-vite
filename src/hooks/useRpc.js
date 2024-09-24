import { useState, useEffect, useCallback } from "react";

const hostname = window.location.hostname;
const RPC_SERVER_URL = `ws://${hostname}:8000/websocket`;
const JSON_RPC_TIMEOUT_MS = 5000;

export default function useRpc() {
  const [rpc, setRpc] = useState(null);
  const [isRpcConnected, setIsRpcConnected] = useState(
    localStorage.getItem("isRpcConnected") === "true"
  );

  const jsonRpc = useCallback(({ onopen, onclose, onnotification }) => {
    let rpcid = 0;
    const pending = {};
    const ws = new WebSocket(RPC_SERVER_URL);

    return new Promise((resolve, reject) => {
      ws.onopen = () => {
        console.log("WebSocket connection established.");
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
        reject(new Error("Failed to connect to WebSocket server."));
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed.");
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
      setIsRpcConnected(true);
    } catch (error) {
      console.error("Error connecting to RPC:", error);
      setRpc(null);
      setIsRpcConnected(false);
    }
  }, [jsonRpc]);

  useEffect(() => {
    localStorage.setItem("isRpcConnected", isRpcConnected);
  }, [isRpcConnected]);

  useEffect(() => {
    connectRpc();
  }, [connectRpc]);

  return { isRpcConnected, connectRpc, rpc };
}
