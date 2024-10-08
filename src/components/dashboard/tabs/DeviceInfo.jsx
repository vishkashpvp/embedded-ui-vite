import { useState, useEffect } from "react";

const EMPTY_VALUES = { MAC: "", model: "", manufacturer: "", serial_no: "", IP: "" };

export default function DeviceInfo() {
  const [deviceInfo, setDeviceInfo] = useState(EMPTY_VALUES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hostname = window.location.hostname;
  const API_URL = `http://${hostname}:8000/getDeviceInfo`;

  const fetchDeviceInfo = async () => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setDeviceInfo(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDeviceInfo();
  }, []);

  if (loading) return <p>Loading device info data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="card-ui w-[30rem]">
      <div className="flex justify-between">
        <h1 className="w-40 text-gray-500">MAC ADDRESS</h1>
        <p>{deviceInfo.MAC || "Loading..."}</p>
      </div>
      <div className="flex justify-between mt-5">
        <h1 className="w-40 text-gray-500">MODEL</h1>
        <p>{deviceInfo.model || "Loading..."}</p>
      </div>
      <div className="flex justify-between mt-5">
        <h1 className="w-40 text-gray-500">MANUFACTURER</h1>
        <p>{deviceInfo.manufacturer || "Loading..."}</p>
      </div>
      <div className="flex justify-between mt-5">
        <h1 className="w-40 text-gray-500">SERIAL NO.</h1>
        <p>{deviceInfo.serial_no || "Loading..."}</p>
      </div>
      <div className="flex justify-between mt-5">
        <h1 className="w-40 text-gray-500">IP ADDRESS</h1>
        <p>{deviceInfo.IP || "Loading..."}</p>
      </div>
    </div>
  );
}
