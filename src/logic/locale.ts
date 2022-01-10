import type { useI18n } from 'vue-i18n'
import { biSyncRef } from '@vueuse/shared'
import type { Ref } from 'vue-demi'
import { useSwitch } from '~/logic/switch'

const DEFAULT_LOCALE = 'zh-Hans'

function setHtmlLang(lang: string) {
  (document.firstElementChild as HTMLHtmlElement).lang = lang
}

export function initLocale(i18nHook: typeof useI18n) {
  if (!import.meta.env.SSR) {
    const { locale } = i18nHook({ useScope: 'global' })

    const storedLocale = useStorage<string>('locale', DEFAULT_LOCALE, window.localStorage, { window, listenToStorageChanges: true })
    biSyncRef(storedLocale, locale as unknown as Ref<string>)

    setHtmlLang(storedLocale.value)
    watch(storedLocale, setHtmlLang)
  }
}

export function useToggleLocales(i18nHook: typeof useI18n) {
  if (!import.meta.env.SSR) {
    const { availableLocales, locale } = i18nHook({ useScope: 'global' })

    return useSwitch(availableLocales, locale as unknown as Ref<string>)
  }
}
