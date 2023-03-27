<script lang="ts">
  import Giscus from "@giscus/svelte";

  const repo = import.meta.env.PUBLIC_GISCUS_REPO;
  const repoId = import.meta.env.PUBLIC_GISCUS_REPO_ID;
</script>

<div class="overflow-y-visible">
  <Giscus
    id="giscus"
    {repo}
    {repoId}
    category="Comments"
    categoryId="DIC_kwDOFCqai84CURtF"
    mapping="pathname"
    strict="1"
    reactionsEnabled="1"
    emitMetadata="0"
    inputPosition="top"
    theme={new URL(`${import.meta.env.BASE_URL}comments.css`, import.meta.env.PUBLIC_BUILD_SITE_URL).toString()}
    lang="en"
    loading="lazy"
  />
</div>

<style>
  /* giscus-widget {
    display: flex;
    margin: auto;
    max-height: 50%;
  } */
</style>