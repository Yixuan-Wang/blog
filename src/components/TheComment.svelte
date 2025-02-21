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
    theme="transparent_dark"
    lang="en"
    loading="lazy"
  />
</div>
