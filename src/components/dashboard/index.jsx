import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRpc from "../../hooks/useRpc";
import CameraSettings from "../CameraSettings";
import SdCard from "../SdCard";
import { Tab, Tabs } from "../../ui/Tabs";
import DeviceInfo from "../DeviceInfo";
import SystemSettings from "../SystemSettings";
import Firmware from "../Firmware";
import Network from "../Network";

export default function Dashboard() {
  const navigate = useNavigate();
  const { isRpcConnected } = useRpc();
  const [username, setUsername] = useState("");
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hostname = window.location.hostname;
  const API_CONFIG = `http://${hostname}:8000/config/get`;

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("isRpcConnected");
    navigate("/");
  };

  useEffect(() => {
    console.log("apiData :>> ", apiData);
  }, [apiData]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      navigate("/");
    }
    //  else if (!isRpcConnected) {
    //   navigate("/error");
    // }
    else {
      setUsername(username);

      fetch(API_CONFIG)
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then((data) => {
          setApiData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [API_CONFIG, isRpcConnected, navigate]);

  if (loading) return <p>Loading dashboard data...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div id="dashboardPage" className="flex flex-col w-screen h-screen overflow-y-auto">
      <div className="flex items-center justify-between w-full p-3 text-white bg-black">
        <h1 className="m-0 text-3xl font-bold">Welcome Dashboard</h1>
        <div className="flex items-center">
          <p className="text-xl">{username}</p>
          <button className="ms-5 w-[100px]" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <Tabs>
        <Tab component={<CameraSettings />}>Camera Settings</Tab>
        <Tab component={<SdCard />}>SD Card</Tab>
        <Tab component={<DeviceInfo />}>Device Info</Tab>
        <Tab component={<SystemSettings />}>System Settings</Tab>
        <Tab component={<Firmware />}>Firmware</Tab>
        <Tab component={<Network />}>Network</Tab>
      </Tabs>
    </div>
  );
}
