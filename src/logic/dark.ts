/* // import { useDark, useToggle } from '@vueuse/core'

export const isDark = useDark()
export const toggleDark = useToggle(isDark)
 */

import { watch } from "vue-demi";
import { useStorage, useMediaQuery } from "@vueuse/core";
import { tryOnMounted } from "@vueuse/shared";
import { useSwitch } from "./switch";

// export const isDark = useDark()
// export const toggleDark = useToggle(isDark)

/**
 * Reactive dark mode with auto data persistence.
 *
 */
/* export function useDarkMode() {
  if (!import.meta.env.SSR) {
    const preferredDark = useMediaQuery("(prefers-color-scheme: dark)");
    const darkMode = useStorage<string>("color-scheme", "auto", window?.localStorage, { window, listenToStorageChanges: true });

    const onChanged = (v: string) => {
      const el = document.documentElement;
      if (v === "dark" || (v === "auto" && preferredDark.value)) {
        alert("add dark");
        el.className = "dark";
      }
      else {
        alert("remove dark")
        el.className = "";
      }
    };

    watch(darkMode, onChanged, { flush: "post" });
    watch(preferredDark, () => darkMode.value === "auto" && onChanged(darkMode.value));

    tryOnMounted(() => onChanged(darkMode.value));

    return darkMode;
  }
}

export const darkMode = useDarkMode();
export const toggleDarkMode = useSwitch(["auto", "light", "dark"], darkMode!); */
export const actualColorMode = useColorMode({
  modes: {
      auto: "auto",
  },
  storageKey: "color-"
});

export const { state: colorMode, next: nextColorMode } = useCycleList(["auto", "light", "dark"]);
colorMode.value = actualColorMode.value;
syncRef(colorMode, actualColorMode);