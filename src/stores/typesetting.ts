import { persistentMap } from "@nanostores/persistent";

export type Typeface = "sans" | "serif";
export type FontFamily = "sans" | "serif" | "mono";

export type StoreTypeface = {
  postHeading: Typeface;
  postContent: Typeface;
}

export type StoreFontFamily = Record<FontFamily, string>;

export const typeface = persistentMap<StoreTypeface>("typeface:", {
  postHeading: "sans",
  postContent: "serif",
});

export const fontFamily = persistentMap<StoreFontFamily>("font-family:", {
  sans: "",
  serif: "",
  mono: "",
});
