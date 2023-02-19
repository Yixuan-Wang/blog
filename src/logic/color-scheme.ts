import { persistentAtom } from "@nanostores/persistent";
import { atom, computed } from "nanostores";

export type ColorSchemeSetting = "dark" | "light" | "auto";
export type ColorScheme = "dark" | "light";

export const colorSchemeSetting = persistentAtom<ColorSchemeSetting>(
  "color-scheme",
  "auto",
);

/* const mediaPrefersColorScheme = window.matchMedia(
  "(prefers-color-scheme: dark)"
); */
export const colorSchemePreference = atom<ColorScheme>(
  "light",
  /* mediaPrefersColorScheme.matches ? "dark" : "light" */
);

export const registerPreference = (
  mediaPrefersDark: MediaQueryList,
  hook?: (event: MediaQueryListEvent) => void,
) => {
  colorSchemePreference.set(mediaPrefersDark.matches ? "dark" : "light");
  const handler = (event: MediaQueryListEvent) => {
    colorSchemePreference.set(event.matches ? "dark" : "light");
    hook?.(event);
  };

  return [
    () => mediaPrefersDark.addEventListener("change", handler),
    () => mediaPrefersDark.removeEventListener("change", handler),
  ];
};

export const colorScheme = computed(
  [colorSchemeSetting, colorSchemePreference],
  (setting, preference) => (setting === "auto" ? preference : setting),
);
