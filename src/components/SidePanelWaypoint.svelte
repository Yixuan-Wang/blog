<script lang="ts">
  import type { Marker } from "~/components/geo/Geo.svelte";
  import Geo from "~/components/geo/Geo.svelte";

  interface Props {
    waypoints: Marker[];
  }

  const { waypoints }: Props = $props();

  let hovered = $state<Marker | null>(null);

  function handleSelect(marker: Marker) {
    const targetElement = document.getElementById(marker.id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function handleHover(marker: Marker | null) {
    hovered = marker;
  }
</script>

<Geo
  markers={waypoints}
  zoom={16}
  interactive={true}
  onselect={handleSelect}
  onhover={handleHover}
/>
<div class="side-panel-waypoint-info">
  {#if hovered}
    <div class="font-bold text-xl" role="heading" aria-level="1">{hovered.title}</div>
    <p class="font-mono">{hovered.lat}, {hovered.lng}</p>
  {/if}
</div>

<style>
.side-panel-waypoint-info {
  display: none;
}

@media (min-width: 1024px) {
  .side-panel-waypoint-info {
    display: block;
    top: 100%;
    bottom: auto;
    margin-top: 1rem;
    background: unset;
    padding: 0;
    border-radius: 0;
  }
}
</style>
