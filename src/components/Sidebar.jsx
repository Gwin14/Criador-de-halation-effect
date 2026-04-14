import { SliderControl } from "./SliderControl";
import { UploadZone } from "./UploadZone";
import { PresetList } from "./PresetList";
import { hexToRgb, rgbToHex } from "../utils/color";
import "./Sidebar.css";
import { FiTrash2 } from "react-icons/fi";

export function Sidebar({
  // sliders
  threshold,
  blur,
  intensity,
  vignette,
  color,
  onThresholdChange,
  onBlurChange,
  onIntensityChange,
  onVignetteChange,
  onColorChange,
  // presets
  onPresetSelect,
  // original preview
  showOriginal,
  onToggleOriginal,
  // download
  imageLoaded,
  clearImage,
  onDownload,
}) {
  return (
    <aside className="sidebar">
      <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
        <SliderControl
          label="Threshold"
          hint="Luzes afetadas"
          value={threshold}
          min={100}
          max={254}
          step={1}
          onChange={onThresholdChange}
          displayValue={threshold}
        />
        <SliderControl
          label="Blur"
          hint="Raio do bloom"
          value={blur}
          min={1}
          max={80}
          step={1}
          onChange={onBlurChange}
          displayValue={`${blur}px`}
        />
        <SliderControl
          label="Intensidade"
          hint="Força do efeito"
          value={intensity}
          min={0}
          max={1}
          step={0.01}
          onChange={onIntensityChange}
          displayValue={`${Math.round(intensity * 100)}%`}
        />
        <SliderControl
          label="Vinheta"
          hint="Corta o efeito nas bordas"
          value={vignette}
          min={0}
          max={1}
          step={0.01}
          onChange={onVignetteChange}
          displayValue={
            vignette === 0 ? "off" : `${Math.round(vignette * 100)}%`
          }
        />

        {/* Color picker */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#9a7070",
              }}
            >
              Cor
            </span>
            <span style={{ fontSize: "11px", color: "#6a5050" }}>
              halogênico
            </span>
          </div>
          <input
            type="color"
            value={rgbToHex(color)}
            onChange={(e) => onColorChange(hexToRgb(e.target.value))}
            style={{
              width: "100%",
              height: "36px",
              border: "1px solid #2a1a1a",
              borderRadius: "3px",
              cursor: "pointer",
              background: "none",
              padding: "2px",
            }}
          />
        </div>
      </div>

      <PresetList onSelect={onPresetSelect} />

      <div style={{ marginTop: "auto", display: "flex", gap: "10px" }}>
        <button
          onClick={onToggleOriginal}
          style={{
            flex: 1,
            background: imageLoaded
              ? showOriginal
                ? "#4a4038"
                : "#2a1a1a"
              : "#2a1a1a",
            color: imageLoaded ? "#fff" : "#4a3030",
            border: "none",
            padding: "12px",
            cursor: imageLoaded ? "pointer" : "default",
            fontSize: "13px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            borderRadius: "3px",
            transition: "background 0.2s",
          }}
          disabled={!imageLoaded}
        >
          {showOriginal ? "Ver com efeito" : "Ver sem efeito"}
        </button>
        <button
          onClick={onDownload}
          style={{
            flex: 1,
            background: imageLoaded ? "#ff4422" : "#2a1a1a",
            color: imageLoaded ? "#fff" : "#4a3030",
            border: "none",
            padding: "12px",
            cursor: imageLoaded ? "pointer" : "default",
            fontSize: "13px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            borderRadius: "3px",
            transition: "background 0.2s",
          }}
          disabled={!imageLoaded}
        >
          Baixar Imagem
        </button>
        <button
          onClick={clearImage}
          style={{
            flex: 1,
            background: imageLoaded ? "#ff4422" : "#2a1a1a",
            color: imageLoaded ? "#fff" : "#4a3030",
            border: "none",
            padding: "12px",
            cursor: imageLoaded ? "pointer" : "default",
            fontSize: "13px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            borderRadius: "3px",
            transition: "background 0.2s",
          }}
          disabled={!imageLoaded}
        >
          <FiTrash2 />
        </button>
      </div>
    </aside>
  );
}
