import { PRESETS } from "../constants/halation";
import "./PresetList.css";

export function PresetList({ onSelect }) {
  return (
    <div className="preset-list">
      <span className="preset-label">Presets</span>
      <div className="preset-buttons">
        {PRESETS.map((p) => (
          <button
            key={p.name}
            onClick={() =>
              onSelect({
                threshold: p.t,
                blur: p.b,
                intensity: p.i,
                color: p.c,
              })
            }
            className="preset-button"
          >
            {p.name}
          </button>
        ))}
      </div>
    </div>
  );
}
