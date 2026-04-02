/**
 * Aplica o efeito de halation (bloom halogênico) em um canvas.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {HTMLImageElement} img
 * @param {number} threshold  - Luminância mínima para considerar como highlight (0–254)
 * @param {number} blurRadius - Raio do Gaussian blur em pixels
 * @param {number} intensity  - Força do efeito (0–1)
 * @param {{ r: number, g: number, b: number }} color - Cor do bloom
 * @param {number} vignette   - Intensidade do fade nas bordas (0 = sem fade, 1 = tudo apagado)
 */
export function applyHalation(
  canvas,
  img,
  threshold,
  blurRadius,
  intensity,
  color,
  vignette,
) {
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;

  // Desenha a imagem original
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);

  // Obtém os dados de pixel
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  // Passo 1: Cria máscara de highlights com base no threshold de luminância
  const maskCanvas = document.createElement("canvas");
  maskCanvas.width = w;
  maskCanvas.height = h;
  const mCtx = maskCanvas.getContext("2d");
  const maskData = mCtx.createImageData(w, h);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const val = lum >= threshold ? 255 : 0;
    maskData.data[i] = val;
    maskData.data[i + 1] = val;
    maskData.data[i + 2] = val;
    maskData.data[i + 3] = 255;
  }
  mCtx.putImageData(maskData, 0, 0);

  // Passo 2: Aplica Gaussian blur com padding para evitar vazamento nas bordas
  const pad = blurRadius * 3;
  const blurCanvas = document.createElement("canvas");
  blurCanvas.width = w + pad * 2;
  blurCanvas.height = h + pad * 2;
  const bCtx = blurCanvas.getContext("2d");
  bCtx.filter = `blur(${blurRadius}px)`;
  bCtx.drawImage(maskCanvas, pad, pad);
  bCtx.filter = "none";

  // Passo 3: Colore o blur com a cor de halation via blend "multiply"
  const tintCanvas = document.createElement("canvas");
  tintCanvas.width = w;
  tintCanvas.height = h;
  const tCtx = tintCanvas.getContext("2d");

  // Recorta apenas a área central (sem padding) para evitar vazamento nas bordas
  tCtx.drawImage(blurCanvas, pad, pad, w, h, 0, 0, w, h);

  tCtx.globalCompositeOperation = "multiply";
  tCtx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
  tCtx.fillRect(0, 0, w, h);

  // Passo 4 (opcional): Vinheta retangular via máscara de pixel
  // O fade é calculado por pixel com smoothstep para suavidade.
  if (vignette > 0) {
    const vigCanvas = document.createElement("canvas");
    vigCanvas.width = w;
    vigCanvas.height = h;
    const vCtx = vigCanvas.getContext("2d");

    const fadeW = w * vignette * 0.5;
    const fadeH = h * vignette * 0.5;
    const vigData = vCtx.createImageData(w, h);

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const fx = Math.min(x / fadeW, 1, (w - 1 - x) / fadeW);
        const fy = Math.min(y / fadeH, 1, (h - 1 - y) / fadeH);
        // Smoothstep cúbico para fade suave
        const sx = fx * fx * (3 - 2 * fx);
        const sy = fy * fy * (3 - 2 * fy);
        const alpha = sx * sy;
        const idx = (y * w + x) * 4;
        vigData.data[idx] = 255;
        vigData.data[idx + 1] = 255;
        vigData.data[idx + 2] = 255;
        vigData.data[idx + 3] = Math.round(alpha * 255);
      }
    }

    vCtx.putImageData(vigData, 0, 0);
    tCtx.globalCompositeOperation = "destination-in";
    tCtx.drawImage(vigCanvas, 0, 0);
    tCtx.globalCompositeOperation = "source-over";
  }

  // Passo 5: Compõe o bloom sobre a imagem original com blend "screen"
  ctx.globalCompositeOperation = "screen";
  ctx.globalAlpha = intensity;
  ctx.drawImage(tintCanvas, 0, 0);
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
}
