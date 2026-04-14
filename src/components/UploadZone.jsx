import "./UploadZone.css";

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
      className={`upload-zone ${dragging ? "dragging" : ""}`}
    >
      <span className="upload-zone-text">
        Arraste uma foto ou clique para carregar
      </span>
      <input type="file" accept="image/*" onChange={onFile} />
    </label>
  );
}
