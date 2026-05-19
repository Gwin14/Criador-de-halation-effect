/**
 * Aplica o efeito de halation (bloom halogênico) em um canvas.
 * Usa box blur iterativo em JS puro para compatibilidade com Safari,
 * que não suporta ctx.filter = 'blur(...)' em canvas offscreen.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {HTMLImageElement} img
 * @param {number} threshold  - Luminância mínima para considerar como highlight (0–254)
 * @param {number} blurRadius - Raio do blur em pixels
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
  // Trabalha apenas no canal R (grayscale) para economizar memória
  const mask = new Uint8ClampedArray(w * h);
  for (let i = 0; i < data.length; i += 4) {
    const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    mask[i >> 2] = lum >= threshold ? 255 : 0;
  }

  // Passo 2: Box blur iterativo (3 passes ≈ Gaussian blur)
  // Compatível com Safari — não usa ctx.filter
  const radius = Math.max(1, Math.round(blurRadius));
  const blurred = boxBlur3Pass(mask, w, h, radius);

  // Passo 3: Constrói o canvas de bloom colorido
  const bloomCanvas = document.createElement("canvas");
  bloomCanvas.width = w;
  bloomCanvas.height = h;
  const bCtx = bloomCanvas.getContext("2d");
  const bloomData = bCtx.createImageData(w, h);

  for (let i = 0; i < blurred.length; i++) {
    const val = blurred[i];
    const idx = i * 4;
    // Colore com a cor de halation, modulada pelo valor do blur
    bloomData.data[idx] = Math.round((color.r / 255) * val);
    bloomData.data[idx + 1] = Math.round((color.g / 255) * val);
    bloomData.data[idx + 2] = Math.round((color.b / 255) * val);
    bloomData.data[idx + 3] = val; // alpha = intensidade do bloom
  }
  bCtx.putImageData(bloomData, 0, 0);

  // Passo 4 (opcional): Vinheta retangular via máscara de pixel
  if (vignette > 0) {
    const vigData = bCtx.createImageData(w, h);
    const fadeW = w * vignette * 0.5;
    const fadeH = h * vignette * 0.5;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const fx = Math.min(x / fadeW, 1, (w - 1 - x) / fadeW);
        const fy = Math.min(y / fadeH, 1, (h - 1 - y) / fadeH);
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

    // Aplica vinheta como máscara de alpha no bloom
    const vigCanvas = document.createElement("canvas");
    vigCanvas.width = w;
    vigCanvas.height = h;
    const vCtx = vigCanvas.getContext("2d");
    vCtx.putImageData(vigData, 0, 0);

    bCtx.globalCompositeOperation = "destination-in";
    bCtx.drawImage(vigCanvas, 0, 0);
    bCtx.globalCompositeOperation = "source-over";
  }

  // Passo 5: Compõe o bloom sobre a imagem original com blend "screen"
  ctx.globalCompositeOperation = "screen";
  ctx.globalAlpha = intensity;
  ctx.drawImage(bloomCanvas, 0, 0);
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
}

/**
 * Box blur iterativo em canal único (Uint8ClampedArray).
 * 3 passes horizontais + verticais aproximam um Gaussian blur.
 * O(n) por pass — eficiente mesmo para imagens grandes.
 *
 * @param {Uint8ClampedArray} src - Canal único (1 byte por pixel)
 * @param {number} w
 * @param {number} h
 * @param {number} r - Raio do blur
 * @returns {Uint8ClampedArray}
 */
function boxBlur3Pass(src, w, h, r) {
  let a = new Uint8ClampedArray(src);
  let b = new Uint8ClampedArray(w * h);

  for (let pass = 0; pass < 3; pass++) {
    boxBlurH(a, b, w, h, r);
    boxBlurV(b, a, w, h, r);
  }

  return a;
}

/** Box blur horizontal com sliding window */
function boxBlurH(src, dst, w, h, r) {
  const scale = 1 / (2 * r + 1);
  for (let y = 0; y < h; y++) {
    const row = y * w;
    let sum = src[row] * (r + 1);
    // Inicializa a janela
    for (let x = 0; x < r; x++) sum += src[row + x];
    for (let x = 0; x <= r; x++) {
      sum += src[row + Math.min(x + r, w - 1)];
      dst[row + x] = Math.round(sum * scale);
      sum -= src[row + Math.max(x - r, 0)];
    }
    for (let x = r + 1; x < w - r; x++) {
      sum += src[row + x + r];
      dst[row + x] = Math.round(sum * scale);
      sum -= src[row + x - r - 1];
    }
    for (let x = w - r; x < w; x++) {
      sum += src[row + Math.min(x + r, w - 1)];
      dst[row + x] = Math.round(sum * scale);
      sum -= src[row + Math.max(x - r - 1, 0)];
    }
  }
}

/** Box blur vertical com sliding window */
function boxBlurV(src, dst, w, h, r) {
  const scale = 1 / (2 * r + 1);
  for (let x = 0; x < w; x++) {
    let sum = src[x] * (r + 1);
    for (let y = 0; y < r; y++) sum += src[y * w + x];
    for (let y = 0; y <= r; y++) {
      sum += src[Math.min(y + r, h - 1) * w + x];
      dst[y * w + x] = Math.round(sum * scale);
      sum -= src[Math.max(y - r, 0) * w + x];
    }
    for (let y = r + 1; y < h - r; y++) {
      sum += src[(y + r) * w + x];
      dst[y * w + x] = Math.round(sum * scale);
      sum -= src[(y - r - 1) * w + x];
    }
    for (let y = h - r; y < h; y++) {
      sum += src[Math.min(y + r, h - 1) * w + x];
      dst[y * w + x] = Math.round(sum * scale);
      sum -= src[Math.max(y - r - 1, 0) * w + x];
    }
  }
}
