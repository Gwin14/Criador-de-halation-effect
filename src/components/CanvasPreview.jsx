import "./CanvasPreview.css";
import { UploadZone } from "./UploadZone";

export function CanvasPreview({
  canvasRef,
  imageLoaded,
  dragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onFile,
}) {
  return (
    <main className="canvas-preview">
      {!imageLoaded && (
        <UploadZone
          dragging={dragging}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onFile={onFile}
        />
      )}

      <canvas
        ref={canvasRef}
        className={`canvas ${imageLoaded ? "visible" : ""}`}
      />
    </main>
  );
}
