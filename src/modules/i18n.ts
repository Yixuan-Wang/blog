import { createI18n } from 'vue-i18n'
import { UserModule } from '~/types'

// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
//
// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
const messages = Object.fromEntries(
  Object.entries(
    import.meta.globEager('../../locales/*.y(a)?ml'))
    .map(([key, value]) => {
      const yaml = key.endsWith('.yaml')
      return [key.slice(14, yaml ? -5 : -4), value.default]
    }),
)

export const install: UserModule = ({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages,
    datetimeFormats: {
      iso: {
        short: {
          year: 'numeric', month: '2-digit', day: '2-digit',
        },
        monthDay: {
          month: '2-digit', day: '2-digit',
        },
      },
    },
  })

  app.use(i18n)
}
