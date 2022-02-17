import { storeToRefs } from 'pinia'
import type { Ref } from 'vue'
import { mapTo } from './helpers'
import type { useStore } from '~/stores/store'

type TheStore = ReturnType<typeof useStore>
export const WEBFONTS = ['Noto Sans', 'Noto Serif', 'Noto Sans CJK SC', 'Noto Serif CJK SC', 'JetBrains Mono']

function initWebfont(webfont: Ref<Record<string, boolean>>) {
  const webfontTags: Record<string, ReturnType<typeof useStyleTag>> = {
    'Noto Sans': useStyleTag(
      `@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');
      `,
      { immediate: false, id: 'webfont-noto-sans' },
    ),
    'Noto Serif': useStyleTag(
      `@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');
      `,
      { immediate: false, id: 'webfont-noto-serif' },
    ),
    'JetBrains Mono': useStyleTag(
      `@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
      `,
      { immediate: false, id: 'webfont-jetbrains-mono' },
    ),
    'Noto Sans CJK SC': useStyleTag(
      `@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Noto+Sans+SC:wght@400;700&display=swap');
      :root {
        --custom-font-sans: 'Noto Sans SC';
      }
      `,
      { immediate: false, id: 'webfont-noto-sans-cjk-sc' },
    ),
    'Noto Serif CJK SC': useStyleTag(
      `@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap');
      :root {
        --custom-font-serif: 'Noto Serif SC';
      }
      `,
      { immediate: false, id: 'webfont-noto-serif-cjk-sc' },
    ),
  }

  watchEffect(() => {
    WEBFONTS.forEach((fontName) => {
      if (webfont.value[fontName]) webfontTags[fontName].load()
      else webfontTags[fontName].unload()
    })
  })

  return webfontTags
}

export function initTypography(store: TheStore) {
  const { webfont } = storeToRefs(store)
  const webfontSt = useLocalStorage<Record<string, boolean>>('typography::webfont', mapTo(WEBFONTS, false))
  webfont.value = webfontSt.value
  syncRef(webfont, webfontSt)

  initWebfont(webfont)
}
