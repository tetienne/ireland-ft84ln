<script>
  import { onMount } from 'svelte';
  import { DAY_COLORS } from '$lib/utils/colors.js';
  import { addBaseLayer } from '$lib/utils/map.js';

  let { day } = $props();

  let mapEl;

  onMount(async () => {
    const L = (await import('leaflet')).default;

    const map = L.map(mapEl, {
      zoomControl: true,
      scrollWheelZoom: false
    });

    addBaseLayer(L, map);

    const color = DAY_COLORS[day.day - 1];
    const bounds = L.latLngBounds();

    // Route polyline
    if (day.dayRoute && day.dayRoute.length > 0) {
      const polyline = L.polyline(day.dayRoute, {
        color,
        weight: 3,
        opacity: 0.7
      }).addTo(map);
      bounds.extend(polyline.getBounds());
    }

    // Stop markers — use lat/lng directly
    day.stops.forEach((stop) => {
      if (stop.lat && stop.lng) {
        L.marker([stop.lat, stop.lng]).addTo(map).bindPopup(`<strong>${stop.name}</strong>`);
        bounds.extend([stop.lat, stop.lng]);
      }
    });

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [30, 30] });
    } else if (day.mapCenter) {
      map.setView([day.mapCenter.lat, day.mapCenter.lng], 12);
    }

    return () => {
      map.remove();
    };
  });
</script>

<div class="day-map-container" bind:this={mapEl} data-day={day.day}></div>
