export function UploadZone({
  dragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onFile,
}) {
  return (
    <label
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: dragging ? "2px solid #ff4422" : "2px dashed #2a1a1a",
        borderRadius: "4px",
        padding: "20px 12px",
        cursor: "pointer",
        transition: "border-color 0.2s",
        background: dragging ? "#1a0800" : "transparent",
        gap: "8px",
      }}
    >
      <span
        style={{
          fontSize: "12px",
          color: "#6a5050",
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        Arraste uma foto ou clique para carregar
      </span>
      <input
        type="file"
        accept="image/*"
        onChange={onFile}
        style={{ display: "none" }}
      />
    </label>
  );
}
