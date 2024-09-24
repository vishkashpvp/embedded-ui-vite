import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRpc from "../hooks/useRpc";

export default function Dashboard() {
  const navigate = useNavigate();
  const { isRpcConnected, rpc } = useRpc();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      navigate("/");
    } else if (!isRpcConnected) {
      navigate("/error");
    } else {
      setUsername(username);
    }
  }, [isRpcConnected, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      resolution: document.getElementById("resolution").value,
      bitrate: document.getElementById("bitrate").value,
      fps: document.getElementById("fps").value,
      audioFormat: document.getElementById("audioFormat").value,
      videoFormat: document.getElementById("videoFormat").value,
    };
    const params = { mainStream: formData, subStream: formData };
    rpc.call("av_settings", params);
  };

  return (
    <div id="dashboardPage" className="dashboard active">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1 style={{ margin: 0 }}>Welcome Dashboard</h1>
        <button onClick={handleLogout} style={{ width: "100px" }}>
          Logout
        </button>
      </div>
      <h3>{`Hello, ${username}!`}</h3>

      <h2>Camera Settings</h2>
      <h3 style={{ background: "#efef04", width: "fit-content", padding: "1rem" }}>Video</h3>

      <div id="video-settings">
        <h3>Main Stream</h3>
        <form id="resolutionForm" onSubmit={handleSubmit}>
          <div style={{ display: "flex" }}>
            <label htmlFor="resolution" style={{ width: "150px" }}>
              Resolution:
            </label>
            <select id="resolution">
              <option value="" disabled selected>
                Select a resolution
              </option>
              <option value="1280x720">1280x720</option>
              <option value="1920x1080">1920x1080</option>
              <option value="3840x2160">3840×2160</option>
            </select>
          </div>
          <div style={{ display: "flex", marginTop: "0.75rem" }}>
            <label htmlFor="bitrate" style={{ width: "150px" }}>
              Bitrate:
            </label>
            <select id="bitrate">
              <option value="" disabled selected>
                Select a bitrate
              </option>
              <option value="512">512</option>
              <option value="1024">1024</option>
              <option value="2048">2048</option>
              <option value="3172">3172</option>
              <option value="4096">4096</option>
              <option value="5120">5120</option>
              <option value="8192">8192</option>
            </select>
          </div>
          <div style={{ display: "flex", marginTop: "0.75rem" }}>
            <label htmlFor="fps" style={{ width: "150px" }}>
              FPS:
            </label>
            <select id="fps">
              <option value="" disabled selected>
                Select FPS
              </option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
          </div>
          <div style={{ display: "flex", marginTop: "0.75rem" }}>
            <label htmlFor="audioFormat" style={{ width: "150px" }}>
              Audio Format:
            </label>
            <select id="audioFormat">
              <option value="" disabled selected>
                Select an audio format
              </option>
              <option value="PCM">PCM</option>
              <option value="AAC">AAC</option>
            </select>
          </div>
          <div style={{ display: "flex", marginTop: "0.75rem" }}>
            <label htmlFor="videoFormat" style={{ width: "150px" }}>
              Video Format:
            </label>
            <select id="videoFormat">
              <option value="" disabled selected>
                Select a video format
              </option>
              <option value="H264">H264</option>
              <option value="H265">H265</option>
            </select>
          </div>

          <button type="submit" style={{ marginTop: "1rem" }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
