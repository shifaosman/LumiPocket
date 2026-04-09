export type ThemeTokens = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  success: string;
  warning: string;
  error: string;
};

export type CompanionExpression =
  | "happy"
  | "curious"
  | "focused"
  | "sleepy";

export type EyeStyle = "dot" | "sparkle" | "oval" | "wink";
export type Accessory = "none" | "hat" | "bow" | "glasses" | "star clip" | "scarf";
export type IdleStyle = "float" | "bounce" | "tilt";
export type CompanionSkin = "classic-cream" | "minty-pop" | "peachy-glow";

export const defaultTheme: ThemeTokens = {
  primary: "#7c5cff",
  secondary: "#ff8ec7",
  accent: "#54d8ff",
  background: "#f8f8ff",
  surface: "#ffffff",
  text: "#1d2032",
  muted: "#646b8c",
  success: "#35c18f",
  warning: "#f1a43f",
  error: "#ef5277",
};

export const themePresets: Array<{ name: string; tokens: ThemeTokens }> = [
  { name: "Cotton Candy", tokens: defaultTheme },
  {
    name: "Matcha Milk",
    tokens: {
      primary: "#6aa66f",
      secondary: "#8dc9a3",
      accent: "#d5ef8f",
      background: "#f4f8ef",
      surface: "#ffffff",
      text: "#21322a",
      muted: "#69806f",
      success: "#2e9d69",
      warning: "#d49b38",
      error: "#d95e66",
    },
  },
  {
    name: "Sunset Jam",
    tokens: {
      primary: "#ff6f91",
      secondary: "#ff9671",
      accent: "#ffc75f",
      background: "#fff7f2",
      surface: "#ffffff",
      text: "#2e1f30",
      muted: "#7f657f",
      success: "#3daa7a",
      warning: "#ea9b33",
      error: "#dd556f",
    },
  },
  {
    name: "Blueberry Soda",
    tokens: {
      primary: "#4c6fff",
      secondary: "#73b5ff",
      accent: "#85e6ff",
      background: "#f3f8ff",
      surface: "#ffffff",
      text: "#1f2a4f",
      muted: "#6676a3",
      success: "#2ca693",
      warning: "#e8a348",
      error: "#e05477",
    },
  },
  {
    name: "Midnight Glow",
    tokens: {
      primary: "#a884ff",
      secondary: "#5f7dff",
      accent: "#52d7ff",
      background: "#141724",
      surface: "#1f2336",
      text: "#ecf0ff",
      muted: "#9da8cb",
      success: "#48d6a7",
      warning: "#ffc969",
      error: "#ff7596",
    },
  },
];
