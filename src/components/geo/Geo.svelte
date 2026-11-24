<script lang="ts" module>
  export interface Marker {
    id: string;
    title: string;
    lat: number;
    lng: number;
  }
</script>

<script lang="ts">
  import * as maplibregl from "maplibre-gl";
  import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?url"; // Explictly specify the worker URL for Vite
  import { PALETTE_STYLE, registerPaletteProperties, resolvePaletteAsRGBA, getStyleSpec } from "./style";
  import "maplibre-gl/dist/maplibre-gl.css";

  maplibregl.setWorkerUrl(workerUrl);

  // type LatLng = [lat: number, lng: number];
  type LngLat = [lng: number, lat: number];

  interface Props {
    bounds?: [LngLat, LngLat];
    markers?: Marker[];
    view?: LngLat;
    zoom?: number;
    interactive?: boolean;
    onselect?: (marker: Marker) => void;
    onhover?: (marker: Marker | null) => void;
  }

  const {
    bounds: boundsRawProp,
    view,
    markers = [],
    zoom = 16,
    interactive = false,
    onselect,
    onhover,
  }: Props = $props();

  // Without explicit bounds or view, fit the map to the markers.
  const bounds: [LngLat, LngLat] | undefined = $derived(boundsRawProp ?? (!view && markers.length
    ? [
      [
        Math.min(...markers.map(m => m.lng)),
        Math.min(...markers.map(m => m.lat)),
      ],
      [
        Math.max(...markers.map(m => m.lng)),
        Math.max(...markers.map(m => m.lat)),
      ],
    ]
    : undefined));

  function createMap(node: HTMLElement) {
    registerPaletteProperties();
    const font = getComputedStyle(node)
      .fontFamily
      .split(",")
      .map(font => font.trim().replace(/^['"]|['"]$/g, ""));

    console.log(font);

    const buildStyle = () => getStyleSpec(resolvePaletteAsRGBA(node), font);

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
        ...(bounds
          ? {
            bounds,
            fitBoundsOptions: { padding: 48, maxZoom: 16 },
          }
          : {
            center: view ?? [39.9935, 116.303873],
            zoom,
          }),
      });
      map = m;

      if (interactive) {
        m.addControl(new maplibregl.NavigationControl({ showCompass: false }));
      }

      if (view) {
        const el = document.createElement("div");
        el.className = "geo-marker";
        new maplibregl.Marker({ element: el, anchor: "center" }).setLngLat(view).addTo(m);
      }

      for (const marker of markers) {
        const el = document.createElement("button");
        el.type = "button";
        el.className = "geo-marker cursor-pointer";
        el.title = marker.title;
        el.setAttribute("aria-label", marker.title);
        el.addEventListener("click", () => {
          onselect?.(marker);
        });
        el.addEventListener("mouseenter", () => {
          onhover?.(marker);
        });
        el.addEventListener("mouseleave", () => {
          onhover?.(null);
        });
        new maplibregl.Marker({ element: el, anchor: "center" }).setLngLat([marker.lng, marker.lat]).addTo(m);
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
  <div class="h-full w-full text-one geo" style={PALETTE_STYLE} use:createMap></div>
</div>

<style>
  .geo {
    font-family: var(--font-sans);
  }

  :global(.geo .geo-marker) {
    line-height: 0;
  }

  :global(.geo-marker) {
    transition: background-color 0.2s, border-color 0.2s;
    width: 12px;
    height: 12px;
    background: rgb(from var(--color-one) r g b / 50%);
    border-radius: 50%;
    border: 2px solid var(--color-one-front);

    &:hover {
      background: rgb(from var(--color-two) r g b / 75%);
      border: 2px solid var(--color-two-front);
    }
  }

  :global(.maplibregl-ctrl-group) {
    background-color: rgb(var(--color-back));
  }

  :global(.maplibregl-ctrl button .maplibregl-ctrl-icon) {
    background-color: rgb(var(--color-front));
    mask-repeat: no-repeat;
    mask-position: 50%;
  }
  
  :global(.maplibregl-ctrl button.maplibregl-ctrl-zoom-in .maplibregl-ctrl-icon) {
    background-image: none;
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3C!-- Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE --%3E%3Cpath fill='currentColor' d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z'/%3E%3C/svg%3E");
  }
  
  :global(.maplibregl-ctrl button.maplibregl-ctrl-zoom-out .maplibregl-ctrl-icon) {
    background-image: none;
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3C!-- Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE --%3E%3Cpath fill='currentColor' d='M19 13H5v-2h14z'/%3E%3C/svg%3E");
  }
</style>
