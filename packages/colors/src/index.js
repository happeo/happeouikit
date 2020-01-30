import { rgba, mix } from "polished";

// Primary Colors
export const navy = "#1A5D8D";
export const active = "#009DFF";
export const success = "#29C47F";
export const warn = "#FABD24";
export const alert = "#EC4B2F";
export const violet = "#5E2590";
export const pink = "#F62A99";
export const brown = "#894C15";

// Brand colors
export const brand = "#29C4A9";
export const brandLight = "#00E5BD";

// Grayscale
export const gray01 = "#2A3443";
export const gray02 = "#343E49";
export const gray03 = "#434F59";
export const gray04 = "#5A6872";
export const gray05 = "#8997A1";
export const gray06 = "#BAC6D0";
export const gray07 = "#D4DBE1";
export const gray08 = "#E8ECF2";
export const gray09 = "#F7F9FB";
export const gray10 = "#FBFCFD";

// B&W
export const black = "#000000";
export const black70 = rgba(black, 0.7);
export const black50 = rgba(black, 0.5);
export const black30 = rgba(black, 0.3);
export const black20 = rgba(black, 0.2);
export const white = "#FFFFFF";
export const white70 = rgba(white, 0.7);

// Backgrounds
export const bgWhite = white;
export const bgGray = gray09;

// Shadow colors
export const shadowActive = rgba(active, 0.05);
export const shadowGray06 = rgba(gray06, 0.5);
export const shadowGray08 = rgba(gray08, 0.5);

// Functions
export const darken = (color, percent) => mix(percent, black, color);
export const lighten = (color, percent) => mix(percent, white, color);

export const darken80 = color => darken(color, 0.8);
export const darken60 = color => darken(color, 0.6);
export const darken40 = color => darken(color, 0.4);
export const darken20 = color => darken(color, 0.2);
export const lighten20 = color => lighten(color, 0.2);
export const lighten40 = color => lighten(color, 0.4);
export const lighten60 = color => lighten(color, 0.6);
export const lighten80 = color => lighten(color, 0.8);
export const lighten90 = color => lighten(color, 0.9);

export const toBgLight = color => lighten(color, 0.9);
