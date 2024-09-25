export default function StreamSettings({ name, values, handleChange, options }) {
  return (
    <div id={`${name}-settings`}>
      <h3 style={{ textTransform: "capitalize" }}>{name} Stream</h3>
      <div style={{ display: "flex" }}>
        <label htmlFor={`${name}Resolution`} style={{ width: "150px" }}>
          Resolution:
        </label>
        <select
          id={`${name}Resolution`}
          value={values.resolution}
          onChange={(e) => handleChange(name, "resolution", e.target.value)}
        >
          <option value="" disabled>
            Select a resolution
          </option>
          {options.resolution.map((res) => (
            <option key={res} value={res}>
              {res}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: "flex", marginTop: "0.75rem" }}>
        <label htmlFor={`${name}Bitrate`} style={{ width: "150px" }}>
          Bitrate:
        </label>
        <select
          id={`${name}Bitrate`}
          value={values.bitrate}
          onChange={(e) => handleChange(name, "bitrate", e.target.value)}
        >
          <option value="" disabled>
            Select a bitrate
          </option>
          {options.bitrate.map((bit) => (
            <option key={bit} value={bit}>
              {bit}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: "flex", marginTop: "0.75rem" }}>
        <label htmlFor={`${name}Fps`} style={{ width: "150px" }}>
          FPS:
        </label>
        <select
          id={`${name}Fps`}
          value={values.fps}
          onChange={(e) => handleChange(name, "fps", e.target.value)}
        >
          <option value="" disabled>
            Select FPS
          </option>
          {options.fps.map((fps) => (
            <option key={fps} value={fps}>
              {fps}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: "flex", marginTop: "0.75rem" }}>
        <label htmlFor={`${name}AudioFormat`} style={{ width: "150px" }}>
          Audio Format:
        </label>
        <select
          id={`${name}AudioFormat`}
          value={values.audioFormat}
          onChange={(e) => handleChange(name, "audioFormat", e.target.value)}
        >
          <option value="" disabled>
            Select an audio format
          </option>
          {options.audioFormat.map((audio) => (
            <option key={audio} value={audio}>
              {audio}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: "flex", marginTop: "0.75rem" }}>
        <label htmlFor={`${name}VideoFormat`} style={{ width: "150px" }}>
          Video Format:
        </label>
        <select
          id={`${name}VideoFormat`}
          value={values.videoFormat}
          onChange={(e) => handleChange(name, "videoFormat", e.target.value)}
        >
          <option value="" disabled>
            Select a video format
          </option>
          {options.videoFormat.map((video) => (
            <option key={video} value={video}>
              {video}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
