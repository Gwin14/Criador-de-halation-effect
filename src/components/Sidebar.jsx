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
      <div className="sidebar-controls">
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
        <div className="color-picker">
          <div className="color-picker-header">
            <span className="color-label">Cor</span>
            <span className="color-hint">halogênico</span>
          </div>
          <input
            type="color"
            value={rgbToHex(color)}
            onChange={(e) => onColorChange(hexToRgb(e.target.value))}
            className="color-input"
          />
        </div>
      </div>

      <PresetList onSelect={onPresetSelect} />

      <div className="sidebar-buttons">
        <button
          onClick={onToggleOriginal}
          className={`sidebar-button toggle-original ${showOriginal ? "active" : ""}`}
          disabled={!imageLoaded}
        >
          {showOriginal ? "Ver com efeito" : "Ver original"}
        </button>
        <button
          onClick={onDownload}
          className="sidebar-button"
          disabled={!imageLoaded}
        >
          Baixar Imagem
        </button>
        <button
          onClick={clearImage}
          className="sidebar-button"
          disabled={!imageLoaded}
        >
          <FiTrash2 />
        </button>
      </div>
    </aside>
  );
}
