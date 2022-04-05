<template>
  <header class="flex justify-between items-center my-4 gap-2">
    <nav class="inline-block px-2 py-1 rounded bg-acc text-bgd font-bold transition-lively hover:bg-sec">
      <router-link to="/">
        Pak
      </router-link>
    </nav>
    <nav class="flex justify-between items-center gap-3">
      <button>
        <router-link to="/archive">
          <mdi-text-box />
          <!-- <mdi-text-box /> -->
        </router-link>
      </button>
      <button>
        <router-link to="/posts">
          <icon-posts />
          <!-- <mdi-text-box /> -->
        </router-link>
      </button>
      <button>
        <router-link to="/sheets">
          <icon-sheets />
          <!-- <mdi-dns /> -->
        </router-link>
      </button>
      <button>
        <router-link to="/notes">
          <icon-notes />
          <!-- <mdi-inbox /> -->
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
  color: var(--color-accent);
}

button:hover {
  color: var(--color-secondary);
}
</style>
