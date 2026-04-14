import "./SliderControl.css";

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
    <div className="slider-control">
      <div className="slider-header">
        <span className="slider-label">{label}</span>
        <span className="slider-value">{displayValue}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider-input"
      />
      <span className="slider-hint">{hint}</span>
    </div>
  );
}
