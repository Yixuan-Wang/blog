export const pageTitle = ref<string | null>(null)
export const title = computed(() => pageTitle.value ? `${pageTitle.value} | Pak` : 'Pak')
