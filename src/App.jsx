import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { CanvasPreview } from "./components/CanvasPreview";
import { useHalationCanvas } from "./hooks/useHalationCanvas";
import {
  DEFAULT_THRESHOLD,
  DEFAULT_BLUR,
  DEFAULT_INTENSITY,
  DEFAULT_COLOR,
  DEFAULT_VIGNETTE,
} from "./constants/halation";

export default function App() {
  const [threshold, setThreshold] = useState(DEFAULT_THRESHOLD);
  const [blur, setBlur] = useState(DEFAULT_BLUR);
  const [intensity, setIntensity] = useState(DEFAULT_INTENSITY);
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [vignette, setVignette] = useState(DEFAULT_VIGNETTE);

  const {
    canvasRef,
    imageLoaded,
    dragging,
    handleFile,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleDownload,
  } = useHalationCanvas({ threshold, blur, intensity, color, vignette });

  const handlePresetSelect = ({
    threshold: t,
    blur: b,
    intensity: i,
    color: c,
  }) => {
    setThreshold(t);
    setBlur(b);
    setIntensity(i);
    setColor(c);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#f0e8e0",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid #2a1a1a",
          padding: "24px 40px",
          display: "flex",
          alignItems: "baseline",
          gap: "16px",
          background: "linear-gradient(180deg, #1a0800 0%, #0a0a0a 100%)",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            fontWeight: "normal",
            letterSpacing: "0.12em",
            color: "#ff4422",
            textTransform: "uppercase",
          }}
        >
          Halation
        </h1>
        <span
          style={{
            fontSize: "13px",
            color: "#6a5050",
            letterSpacing: "0.06em",
          }}
        >
          CineStill 800T · Red Film Effect
        </span>
      </header>

      <div style={{ display: "flex", flex: 1, flexWrap: "wrap" }}>
        <CanvasPreview canvasRef={canvasRef} imageLoaded={imageLoaded} />

        <Sidebar
          // upload
          dragging={dragging}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onFile={handleFile}
          // sliders
          threshold={threshold}
          blur={blur}
          intensity={intensity}
          vignette={vignette}
          color={color}
          onThresholdChange={setThreshold}
          onBlurChange={setBlur}
          onIntensityChange={setIntensity}
          onVignetteChange={setVignette}
          onColorChange={setColor}
          // presets
          onPresetSelect={handlePresetSelect}
          // download
          imageLoaded={imageLoaded}
          onDownload={handleDownload}
        />
      </div>
    </div>
  );
}
