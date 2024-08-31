# Env Vars

- `POST_DRAFT`: Include draft posts if set to `true`. Exclude all other posts if set to `only`.
- `POST_NO_GH`: Ignore GitHub source if set.
- `POST_FILTER_FS`: A glob pattern to filter posts from file system. Fallback will be "\*\*/*.md".
- `POST_FILTER_GH`: A label to filter posts from GitHub. Fallback will be "+".
- `POST_SLUG`: A RegExp to filter all posts whose slug matches.