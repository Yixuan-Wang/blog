<script lang="ts">
  import * as maplibregl from "maplibre-gl";
  import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?url"; // Explictly specify the worker URL for Vite
  import { resolvePalette, vectorStyle } from "./style";
  import "maplibre-gl/dist/maplibre-gl.css";

  maplibregl.setWorkerUrl(workerUrl);

  type LatLng = [lat: number, lng: number];

  interface Props {
    bounds?: [LatLng, LatLng];
    view?: LatLng;
    /// The zoom level of the map. Defaults to 17.
    zoom?: number;
    interactive?: boolean;
  }

  const { bounds, view, zoom = 17, interactive = false }: Props = $props();

  const swapLatLng = ([lat, lng]: LatLng): [number, number] => [lng, lat];

  const MARKER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE --><path fill="currentColor" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"/></svg>`;

  function createMap(node: HTMLElement) {
    const font = [getComputedStyle(node).fontFamily];
    const buildStyle = () => vectorStyle(resolvePalette(node), font);

    let map: maplibregl.Map | undefined;
    let observer: MutationObserver | undefined;
    let destroyed = false;

    // Wait for fonts
    document.fonts.ready.then(() => {
      if (destroyed) return;

      const m = new maplibregl.Map({
        container: node,
        style: buildStyle(),
        interactive,
        // Replaced by the short credit line in the markup below.
        attributionControl: false,
        // MapLibre uses 512px tiles so use zoom - 1 to match original zoom level.
        ...(bounds
          ? {
            bounds: [
              swapLatLng(bounds[0]),
              swapLatLng(bounds[1]),
            ],
            fitBoundsOptions: { padding: 24 },
          }
          : {
            center: view
              ? swapLatLng(view)
              : [116.303873, 39.9935],
            zoom: zoom - 1,
          }),
      });
      map = m;

      if (interactive) {
        m.addControl(new maplibregl.NavigationControl({ showCompass: false }));
      }

      if (view) {
        const el = document.createElement("div");
        el.className = "geo-marker";
        el.innerHTML = MARKER_SVG;
        new maplibregl.Marker({ element: el, anchor: "bottom" }).setLngLat(swapLatLng(view)).addTo(m);
      }

      // Re-theme when light/dark mode toggles.
      observer = new MutationObserver(() => m.setStyle(buildStyle()));
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    });

    return {
      destroy() {
        destroyed = true;
        observer?.disconnect();
        map?.remove();
      },
    };
  }
</script>

<div class="relative h-full w-full overflow-hidden rounded-2">
  <div class="h-full w-full text-one geo" use:createMap></div>
  <a class="geo-attrib" href="/copyright#map" title="Map data © OpenStreetMap contributors, OpenMapTiles, OpenFreeMap">&copy;</a>
</div>

<style>
  .geo {
    font-family: var(--font-sans);
  }

  :global(.geo .geo-marker) {
    line-height: 0;
  }

  .geo-attrib {
    position: absolute;
    right: 6px;
    bottom: 6px;
    font-family: var(--font-sans);
    font-size: 9px;
    line-height: 1.4;
    padding: 1px 6px;
    border-radius: 4px;
    background: rgb(from var(--color-one-back) r g b / 0.6);
    color: color-mix(in oklab, rgb(var(--color-front)), transparent 35%);
    text-decoration: none;
  }

  .geo-attrib:hover {
    color: rgb(var(--color-front));
  }
</style>
