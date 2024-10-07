import { useState, useEffect } from "react";

export default function DeviceInfo() {
  const [deviceInfo, setDeviceInfo] = useState({});

  useEffect(() => {
    setDeviceInfo({
      cameraId: "my-id-@-camera",
      macAddress: "1:2:3:4:5:6",
      model: "pvp-12-doorbell",
      manufacturer: "vishkash",
      serialNo: "aforapple",
      uin: "987654321012",
      ipAddress: "1.2.3.4",
    });
  }, []);

  return (
    <div className="card-ui w-[30rem]">
      <div className="flex justify-between">
        <h1 className="w-40">Camera ID</h1>
        <p>{deviceInfo.cameraId || "Loading..."}</p>
      </div>
      <div className="flex justify-between mt-5">
        <h1 className="w-40">MAC ADDRESS</h1>
        <p>{deviceInfo.macAddress || "Loading..."}</p>
      </div>
      <div className="flex justify-between mt-5">
        <h1 className="w-40">MODEL</h1>
        <p>{deviceInfo.model || "Loading..."}</p>
      </div>
      <div className="flex justify-between mt-5">
        <h1 className="w-40">MANUFACTURER</h1>
        <p>{deviceInfo.manufacturer || "Loading..."}</p>
      </div>
      <div className="flex justify-between mt-5">
        <h1 className="w-40">SERIAL NO.</h1>
        <p>{deviceInfo.serialNo || "Loading..."}</p>
      </div>
      <div className="flex justify-between mt-5">
        <h1 className="w-40">UIN</h1>
        <p>{deviceInfo.uin || "Loading..."}</p>
      </div>
      <div className="flex justify-between mt-5">
        <h1 className="w-40">IP ADDRESS</h1>
        <p>{deviceInfo.ipAddress || "Loading..."}</p>
      </div>
    </div>
  );
}
