import { defineConfig } from 'windicss/helpers'
import typography from 'windicss/plugin/typography'

export default defineConfig({
  darkMode: 'class',
  // https://windicss.org/posts/v30.html#attributify-mode
  attributify: false,

  plugins: [
    typography(),
  ],
  theme: {
    fontFamily: {
      sans: 'var(--font-sans)',
      serif: 'var(--font-serif)',
      mono: 'var(--font-mono)',
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            whiteSpace: 'pre-wrap',
            a: {
              'color': 'inherit',
              'opacity': 0.75,
              'fontWeight': '500',
              '&:hover': {
                opacity: 1,
              },
            },
            b: { color: 'inherit' },
            strong: { color: 'inherit' },
            em: { color: 'inherit' },
            h1: { color: 'inherit' },
            h2: { color: 'inherit' },
            h3: { color: 'inherit' },
            h4: { color: 'inherit' },
            code: { color: 'inherit' },
          },
        },
      },
      colors: {
        acc: 'var(--color-accent)',
        sec: 'var(--color-secondary)',
        bgd: 'var(--color-background)',
        fgd: 'var(--color-foreground)',
        dim: 'var(--color-dim)',
      },
    },
  },
})
