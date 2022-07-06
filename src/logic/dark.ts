export const actualColorMode = useColorMode({
  modes: {
    auto: "auto",
  },
  storageKey: "color-scheme",
});

export const storedColorMode = useStorage("color-scheme", "auto");

export const { state: colorMode, next: nextColorMode } = useCycleList(["auto", "light", "dark"]);
syncRef(storedColorMode, colorMode);
syncRef(colorMode, actualColorMode);
