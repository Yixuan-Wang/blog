<script lang="ts">
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";

  interface Props {
    bounds?: L.LatLngBoundsExpression;
    view?: L.LatLngExpression;
    zoom?: number;
    tileType?: "osm" | "carto" | "tianditu";
    interactive?: boolean;
  }

  let {
    bounds,
    view,
    zoom,
    tileType = "osm",
    interactive = false,
  }: Props = $props();

  const TIANDITU_KEY = "56ef33e53f58fee8a33e75e2e9e71c1c";

  if (!["osm", "carto", "tianditu"].includes(tileType)) {
    tileType = "osm";
  }

  const attribution =
    "<a href='https://www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap</a>";

  function createLeaflet(node: HTMLElement) {
    const map = L.map(node, {
      attributionControl: true,
      ...(!!interactive
        ? {}
        : {
            zoomControl: false,
            preferCanvas: true,
            dragging: false,
            touchZoom: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            boxZoom: false,
            keyboard: false,
          }),
    });
    if (bounds) {
      map.fitBounds(bounds);
    } else {
      map.setView(view, zoom);
    }
    
    map.attributionControl.setPrefix(false);

    var myIcon = L.divIcon({
      html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE --><path fill="currentColor" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"/></svg>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    switch (tileType) {
      case "osm":
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);
        break;
      case "carto":
        L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png",
          {
            attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
        <a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
            subdomains: "abcd",
          },
        ).addTo(map);
        break;
      case "tianditu":
        L.tileLayer(
          `http://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIANDITU_KEY}`,
          {
            subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
            attribution: 
              '&copy; <a href="http://www.tianditu.gov.cn" target="_blank">天地图</a>',
          },
        ).addTo(map);
        L.tileLayer(
          `http://t{s}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIANDITU_KEY}`,
          {
            subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
          },
        ).addTo(map);
    }

    L.marker(view, { icon: myIcon }).addTo(map);
  }
</script>

<div class="relative h-full w-full">
  <div class="h-full w-full rounded-2 text-one" use:createLeaflet></div>
  <div class="map-overlay"></div>
</div>

<style>
  .map-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
    z-index: 400;
    opacity: 0.75;
    mix-blend-mode: color;
  }

  :global(:root.dark img.leaflet-tile) {
    /* Invert the colors for dark mode */
    filter: invert(1) hue-rotate(180deg) contrast(0.975) brightness(1.25);
  }

  :global(:root:not(.dark) img.leaflet-tile) {
    /* Make the contrast higher and more vibrant */
    filter: brightness(0.95) contrast(1.125);
  }

  :global(:root.dark) .map-overlay {
    background-color: oklch(from var(--color-one) 75% calc(0.45 * c) h);
  }

  :global(:root:not(.dark)) .map-overlay {
    background-color: oklch(from var(--color-one) 25% calc(0.25 * c) h);
  }

  :global(.leaflet-marker-icon) {
    background: transparent;
    background: rgb(from var(--color-one-back) r g b 0.5);
    border: none;
    box-shadow: none;
  }

  :global(.leaflet-container) {
    font-family: var(--font-sans);
  }
</style>
