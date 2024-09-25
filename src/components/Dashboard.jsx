import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRpc from "../hooks/useRpc";
import StreamSettings from "./StreamSettings";

const mainStreamOptions = {
  resolution: ["1280x720", "1920x1080", "3840×2160"],
  bitrate: ["512", "1024", "2048", "3172", "4096", "5120", "8192"],
  fps: ["5", "10", "15", "20", "25", "30"],
  audioFormat: ["PCM", "AAC"],
  videoFormat: ["H264", "H265"],
};

const subStreamOptions = {
  resolution: ["640x480", "720x576"],
  bitrate: ["256", "512", "1024", "2048", "5120"],
  fps: ["5", "10", "15", "20", "25", "30"],
  audioFormat: ["PCM", "AAC"],
  videoFormat: ["H264", "H265"],
};

const defaultStreamValues = {
  resolution: "",
  bitrate: "",
  fps: "",
  audioFormat: "",
  videoFormat: "",
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { isRpcConnected, rpc } = useRpc();
  const [username, setUsername] = useState("");
  const [mainStreamValues, setMainStreamValues] = useState(defaultStreamValues);
  const [subStreamValues, setSubStreamValues] = useState(defaultStreamValues);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("isRpcConnected");
    navigate("/");
  };

  const handleChange = (stream, key, value) => {
    if (stream === "main") {
      setMainStreamValues((prev) => ({ ...prev, [key]: value }));
    } else {
      setSubStreamValues((prev) => ({ ...prev, [key]: value }));
    }
  };

  const isFormValid = () => {
    const hasEmptyMainStream = Object.values(mainStreamValues).some((value) => value === "");
    const hasEmptySubStream = Object.values(subStreamValues).some((value) => value === "");
    return !hasEmptyMainStream && !hasEmptySubStream;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = { mainStream: mainStreamValues, subStream: subStreamValues };
    rpc.call("av_settings", params);
  };

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

      <h2>Video</h2>
      <form id="resolutionForm" onSubmit={handleSubmit}>
        <StreamSettings
          name={"main"}
          values={mainStreamValues}
          handleChange={handleChange}
          options={mainStreamOptions}
        />
        <StreamSettings
          name="sub"
          values={subStreamValues}
          handleChange={handleChange}
          options={subStreamOptions}
        />
        <button
          type="submit"
          style={{ marginTop: "1rem", width: "300px" }}
          disabled={!isFormValid()}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
