<template>
  <header class="flex justify-between items-center my-4 gap-2">
    <nav
      class="inline-block px-2 py-1 rounded transition-lively"
      text="bgd"
      bg="acc hover:sec"
      font="mono bold"
    >
      <router-link to="/">
        pαk
      </router-link>
    </nav>
    <nav class="flex justify-between items-center gap-3">
      <button transition-lively class="hover:text-sec">
        <router-link to="/archive">
          <div i-mdi-text-box />
        </router-link>
      </button>
      <button transition-lively class="hover:text-sec">
        <router-link to="/posts">
          <div i-mdi-file />
        </router-link>
      </button>
      <button transition-lively class="hover:text-sec">
        <router-link to="/sheets">
          <div i-mdi-table-large />
        </router-link>
      </button>
      <button transition-lively class="hover:text-sec">
        <router-link to="/notes">
          <div i-mdi-folder />
        </router-link>
      </button>
    </nav>
  </header>
</template>

<style scoped>
button {
  padding: 0.25rem;
  font-size: 1.125rem; /* 18px */
  line-height: 1.75rem; /* 28px */
  color: rgba(var(--color-accent));
}
</style>
