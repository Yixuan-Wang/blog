declare module "culori/fn" {
  export interface ColorRgb {
    mode: "rgb";
    r: number;
    g: number;
    b: number;
  }

  export interface ColorOklab {
    mode: "oklab";
    l: number;
    a: number;
    b: number;
  }

  export interface ColorOklch {
    mode: "oklch";
    l: number;
    c: number;
    h: number;
  }

  declare function parseHex(hex: string): ColorRgb;
  declare function serializeHex(rgb: ColorRgb): string;
  declare function convertRgbToOklab(rgb: ColorRgb): ColorOklab;
  declare function convertOklabToRgb(oklab: ColorOklab): ColorRgb;
  declare function convertLabToLch(oklab: ColorOklab): ColorOklch;
  declare function convertLchToLab(oklch: ColorOklch): ColorOklab;
}
