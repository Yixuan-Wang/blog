export const pageTitle = ref<string | null>()
export const title = computed(() => pageTitle.value ? `${pageTitle.value} | Pak` : 'Pak')
