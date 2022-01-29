// Process [ruby base](-ruby text)
// https://github.com/lostandfound/markdown-it-ruby

function pandoc_ruby(state, silent) {
  let token
  let tokens
  const max = state.posMax
  const start = state.pos
  let devPos
  let closePos

  if (silent) return false
  if (state.src.charCodeAt(start) !== 0x5B/* [ */) return false
  if (start + 6 >= max) return false

  state.pos = start + 1

  while (state.pos < max) {
    if (devPos) {
      if (
        state.src.charCodeAt(state.pos) === 0x29/* ) */
        && state.src.charCodeAt(state.pos - 1) !== 0x5C/* \ */
      ) {
        closePos = state.pos
        break
      }
    }
    else if (state.src.charCodeAt(state.pos) === 0x5D/* ] */
      && state.src.charCodeAt(state.pos + 1) === 0x28/* ( */
      && state.src.charCodeAt(state.pos + 2) === 0x2D/* - */
      && state.src.charCodeAt(state.pos - 1) !== 0x5C/* \ */) {
      devPos = state.pos
    }

    state.pos++
  }

  if (!closePos || start + 1 === state.pos) {
    state.pos = start
    return false
  }

  state.posMax = state.pos
  state.pos = start + 1

  token = state.push('ruby_open', 'ruby', 1)
  token.markup = '['

  const baseText = state.src.slice(start + 1, devPos)
  const rubyText = state.src.slice(devPos + 3, closePos)

  const baseArray = baseText.split('')
  const rubyArray = rubyText.split('](-')

  if (baseArray.length === rubyArray.length) {
    baseArray.forEach((content, idx) => {
      state.md.inline.parse(
        content,
        state.md,
        state.env,
        tokens = [],
      )

      tokens.forEach((t) => {
        state.tokens.push(t)
      })

      token = state.push('rt_open', 'rt', 1)

      state.md.inline.parse(
        rubyArray[idx],
        state.md,
        state.env,
        tokens = [],
      )

      tokens.forEach((t) => {
        state.tokens.push(t)
      })

      token = state.push('rt_close', 'rt', -1)
    })
  }
  else {
    state.md.inline.parse(
      baseText,
      state.md,
      state.env,
      tokens = [],
    )

    tokens.forEach((t) => {
      state.tokens.push(t)
    })

    token = state.push('rt_open', 'rt', 1)

    state.md.inline.parse(
      rubyText,
      state.md,
      state.env,
      tokens = [],
    )

    tokens.forEach((t) => {
      state.tokens.push(t)
    })

    token = state.push('rt_close', 'rt', -1)
  }

  token = state.push('ruby_close', 'ruby', -1)
  token.markup = ')'

  state.pos = state.posMax + 1
  state.posMax = max

  return true
}

export default function ruby_plugin(md) {
  md.inline.ruler.before('text', 'pandoc_ruby', pandoc_ruby)
}
