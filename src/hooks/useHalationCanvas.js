import { useState, useRef, useEffect, useCallback } from "react";
import { applyHalation } from "../utils/applyHalation";

const MAX_CANVAS_WIDTH = 900;

/**
 * Gerencia o ciclo de vida da imagem e do canvas:
 * carregamento, redimensionamento proporcional e redesenho com efeito.
 */
export function useHalationCanvas({ threshold, blur, intensity, color, vignette }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [dragging, setDragging] = useState(false);

  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  const redraw = useCallback(() => {
    if (!imgRef.current || !canvasRef.current) return;
    applyHalation(
      canvasRef.current,
      imgRef.current,
      threshold,
      blur,
      intensity,
      color,
      vignette,
    );
  }, [threshold, blur, intensity, color, vignette]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  const loadImage = useCallback(
    (file) => {
      if (!file || !file.type.startsWith("image/")) return;

      const url = URL.createObjectURL(file);
      const img = new Image();

      img.onload = () => {
        imgRef.current = img;

        const scale = Math.min(1, MAX_CANVAS_WIDTH / img.naturalWidth);
        canvasRef.current.width = img.naturalWidth * scale;
        canvasRef.current.height = img.naturalHeight * scale;

        setImageLoaded(true);
        redraw();
        URL.revokeObjectURL(url);
      };

      img.src = url;
    },
    [redraw],
  );

  const handleFile = useCallback(
    (e) => loadImage(e.target.files[0]),
    [loadImage],
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      loadImage(e.dataTransfer.files[0]);
    },
    [loadImage],
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragging(false);
  }, []);

  const handleDownload = useCallback(() => {
    if (!canvasRef.current) return;
    const a = document.createElement("a");
    a.download = "halation.jpg";
    a.href = canvasRef.current.toDataURL("image/jpeg", 0.95);
    a.click();
  }, []);

  return {
    canvasRef,
    imageLoaded,
    dragging,
    handleFile,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleDownload,
  };
}
