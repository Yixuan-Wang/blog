<script lang="ts">
  import { lightFormat, formatDistanceToNow } from "date-fns";
  import { onMount } from "svelte";
  interface Props {
    time: Date | number;
    elapse?: string;
  }

  let { time, elapse = $bindable("") }: Props = $props();
  onMount(() => {
    elapse = formatDistanceToNow(time, { addSuffix: true });
  })
</script>

<time>{lightFormat(time, "yyyy/MM/dd")} ({elapse})</time>
