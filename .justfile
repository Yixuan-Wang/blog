export POST_DRAFT := "true"

draft:
  POST_DRAFT=only pnpm run dev

test:
  POST_NO_GH=true POST_NO_NTN=true POST_FILTER_FS='**/test-*.md' pnpm run dev

local glob="*":
  POST_NO_GH=true POST_NO_NTN=true POST_FILTER_FS="**/{{glob}}.md" pnpm run dev

production:
  unset POST_DRAFT && pnpm run dev

slug slug="test-local":
   POST_SLUG="{{slug}}" pnpm run dev

file path:
  POST_NO_GH=true POST_NO_NTN=true POST_DRAFT=true POST_FILTER_FS=$(realpath {{path}}) pnpm run dev

github label="+":
  POST_NO_NTN=true POST_FILTER_FS='!*.md' POST_FILTER_GH="{{label}}" pnpm run dev

notion:
  POST_NO_GH=true POST_FILTER_FS='!*.md' pnpm run dev

