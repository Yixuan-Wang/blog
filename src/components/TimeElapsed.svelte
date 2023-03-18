<script lang="ts">
  import { lightFormat, formatDistanceToNow } from "date-fns";
  import { onMount } from "svelte";
  export let time: Date | number;
  export let elapse: string = "";
  onMount(() => {
    elapse = formatDistanceToNow(time, { addSuffix: true });
  })
</script>

<time>{lightFormat(time, "yyyy/MM/dd")} ({elapse})</time>
