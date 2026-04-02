export function CanvasPreview({ canvasRef, imageLoaded }) {
  return (
    <main
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        background: "#0a0a0a",
        minHeight: "500px",
        position: "relative",
      }}
    >
      {!imageLoaded && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            opacity: 0.3,
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "radial-gradient(circle, #ff4422 0%, transparent 70%)",
              filter: "blur(8px)",
            }}
          />
          <span
            style={{
              fontSize: "14px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Carregue uma foto
          </span>
        </div>
      )}

      <canvas
        ref={canvasRef}
        style={{
          maxWidth: "100%",
          maxHeight: "80vh",
          display: imageLoaded ? "block" : "none",
          boxShadow: "0 0 60px rgba(255,40,20,0.15)",
        }}
      />
    </main>
  );
}
