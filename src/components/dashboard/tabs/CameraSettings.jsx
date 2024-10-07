import { useState } from "react";
import StreamSettings from "./StreamSettings";
import useRpc from "../hooks/useRpc";

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

export default function CameraSettings() {
  const { rpc } = useRpc();
  const [mainStreamValues, setMainStreamValues] = useState(defaultStreamValues);
  const [subStreamValues, setSubStreamValues] = useState(defaultStreamValues);

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

  return (
    <div className="w-[30rem] card-ui">
      <h2 className="text-lg font-bold">Video</h2>
      <hr className="mt-3" />
      <form id="resolutionForm" className="gap-5" onSubmit={handleSubmit}>
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
        <button type="submit" className="mt-4 w-[300px]" disabled={!isFormValid()}>
          Submit
        </button>
      </form>
    </div>
  );
}
