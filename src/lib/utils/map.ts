import type L from "leaflet";

export const TILE_URL = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

export const TILE_OPTIONS: L.TileLayerOptions = {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
  subdomains: "abcd",
  maxZoom: 19,
};

export function addBaseLayer(leaflet: typeof L, map: L.Map): void {
  leaflet.tileLayer(TILE_URL, TILE_OPTIONS).addTo(map);
}
