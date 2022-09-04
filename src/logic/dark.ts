export const colorMode = useColorMode({
  emitAuto: true,
  storageKey: "color-scheme",
});

const preferDark = usePreferredDark();
export const actualColorMode = computed(() => colorMode.value === "auto" ? (preferDark.value ? "dark" : "light") : colorMode.value);

export const { next: nextColorMode } = useCycleList(["auto", "light", "dark"], { initialValue: colorMode });
