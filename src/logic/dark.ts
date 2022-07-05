export const actualColorMode = useColorMode({
  modes: {
      auto: "auto",
  },
  storageKey: "color-scheme"
});

export const { state: colorMode, next: nextColorMode } = useCycleList(["auto", "light", "dark"]);
colorMode.value = actualColorMode.value;
syncRef(colorMode, actualColorMode);