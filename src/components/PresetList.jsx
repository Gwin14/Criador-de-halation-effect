import { PRESETS } from "../constants/halation";

export function PresetList({ onSelect }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <span
        style={{
          fontSize: "11px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#9a7070",
        }}
      >
        Presets
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
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
            style={{
              background: "transparent",
              border: "1px solid #2a1a1a",
              color: "#c0a090",
              padding: "7px 10px",
              cursor: "pointer",
              fontSize: "12px",
              textAlign: "left",
              borderRadius: "3px",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "#ff4422";
              e.target.style.color = "#ff4422";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "#2a1a1a";
              e.target.style.color = "#c0a090";
            }}
          >
            {p.name}
          </button>
        ))}
      </div>
    </div>
  );
}
