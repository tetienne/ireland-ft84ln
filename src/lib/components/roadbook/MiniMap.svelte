<script lang="ts">
  import { onMount } from 'svelte';
  import { DAY_COLORS } from '$lib/utils/colors';
  import { addBaseLayer } from '$lib/utils/map';
  import type { Day } from '$lib/types';
  import type L from 'leaflet';

  let { day }: { day: Day } = $props();

  let mapEl: HTMLDivElement;

  onMount(() => {
    let map: L.Map | undefined;

    (async () => {
      const L = (await import('leaflet')).default;

      map = L.map(mapEl, {
        zoomControl: true,
        scrollWheelZoom: false
      });

      addBaseLayer(L, map);

      const color = DAY_COLORS[day.day - 1];
      const bounds = L.latLngBounds([]);

      if (day.dayRoute && day.dayRoute.length > 0) {
        const polyline = L.polyline(day.dayRoute, {
          color,
          weight: 3,
          opacity: 0.7
        }).addTo(map);
        bounds.extend(polyline.getBounds());
      }

      day.stops.forEach((stop) => {
        if (stop.lat && stop.lng) {
          const pos: L.LatLngTuple = [stop.lat, stop.lng];
          L.marker(pos).addTo(map!).bindPopup(`<strong>${stop.name}</strong>`);
          bounds.extend(pos);
        }
      });

      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [30, 30] });
      } else if (day.mapCenter) {
        map.setView([day.mapCenter.lat, day.mapCenter.lng], 12);
      }
    })();

    return () => {
      map?.remove();
    };
  });
</script>

<div class="day-map-container" bind:this={mapEl} data-day={day.day}></div>
