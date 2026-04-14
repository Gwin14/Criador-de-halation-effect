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
    clearImage,
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
      <div style={{ display: "flex", flex: 1, flexWrap: "wrap" }}>
        <CanvasPreview
          canvasRef={canvasRef}
          imageLoaded={imageLoaded}
          dragging={dragging}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onFile={handleFile}
        />

        <Sidebar
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
          clearImage={clearImage}
          onDownload={handleDownload}
        />
      </div>
    </div>
  );
}
