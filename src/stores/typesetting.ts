import { persistentMap } from "@nanostores/persistent";

export type Typeface = "sans" | "serif";

export interface StoreTypeface extends Record<string, Typeface> {
  postHeading: Typeface;
  postContent: Typeface;
}

export const typeface = persistentMap<StoreTypeface>("typeface:", {
  postHeading: "sans",
  postContent: "sans",
});
