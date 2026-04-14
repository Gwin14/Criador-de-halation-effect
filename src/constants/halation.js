export const DEFAULT_THRESHOLD = 200;
export const DEFAULT_BLUR = 18;
export const DEFAULT_INTENSITY = 0.7;
export const DEFAULT_COLOR = { r: 255, g: 30, b: 20 };
export const DEFAULT_VIGNETTE = 0;

export const PRESETS = [
  {
    name: "CineStill 800T",
    t: 200,
    b: 18,
    i: 0.7,
    c: { r: 255, g: 30, b: 20 },
  },
  {
    name: "Dourado Suave",
    t: 210,
    b: 12,
    i: 0.5,
    c: { r: 255, g: 160, b: 40 },
  },
  {
    name: "Azul Noturno",
    t: 190,
    b: 22,
    i: 0.65,
    c: { r: 40, g: 80, b: 255 },
  },
  {
    name: "Rosa Analógico",
    t: 205,
    b: 15,
    i: 0.6,
    c: { r: 255, g: 60, b: 120 },
  },
];
