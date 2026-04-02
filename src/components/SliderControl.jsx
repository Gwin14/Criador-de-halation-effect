export function SliderControl({
  label,
  hint,
  value,
  min,
  max,
  step,
  onChange,
  displayValue,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
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
          {label}
        </span>
        <span
          style={{
            fontSize: "12px",
            color: "#ff6644",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {displayValue}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: "100%",
          accentColor: "#ff4422",
          cursor: "pointer",
        }}
      />
      <span style={{ fontSize: "10px", color: "#4a3030" }}>{hint}</span>
    </div>
  );
}
