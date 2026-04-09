import "./CanvasPreview.css";

export function CanvasPreview({ canvasRef, imageLoaded }) {
  return (
    <main className="canvas-preview">
      {!imageLoaded && (
        <div className="placeholder">
          <div className="placeholder-circle" />
          <span className="placeholder-text">Carregue uma foto</span>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className={`canvas ${imageLoaded ? "visible" : ""}`}
      />
    </main>
  );
}
