<script>
  import { onMount } from 'svelte';
  import { DAY_COLORS } from '$lib/utils/colors.js';
  import { addBaseLayer } from '$lib/utils/map.js';

  let { data } = $props();

  let mapEl;
  let map;
  let dayLayerGroups = [];
  let soloIndex = $state(-1);

  onMount(async () => {
    const L = (await import('leaflet')).default;

    map = L.map(mapEl, { zoomControl: false, scrollWheelZoom: true }).setView([53.1, -8.5], 7.5);
    L.control.zoom({ position: 'topright' }).addTo(map);
    addBaseLayer(L, map);

    // Day markers + polylines
    data.days.forEach((d, i) => {
      const group = L.layerGroup();
      const color = DAY_COLORS[i];

      const icon = L.divIcon({
        className: 'day-marker',
        html: `<div class="day-marker-inner" style="background:${color}">${d.day}</div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });

      const imgHtml = d.mapImg ? `<img src="${d.mapImg}" alt="${d.title}">` : '';
      L.marker([d.mapCenter.lat, d.mapCenter.lng], { icon })
        .bindPopup(`${imgHtml}<strong>J${d.day} — ${d.title}</strong><br>${d.mapDesc || ''}`)
        .addTo(group);

      if (d.dayRoute && d.dayRoute.length > 0) {
        L.polyline(d.dayRoute, {
          color,
          weight: 4,
          opacity: 0.7
        }).addTo(group);
      }

      group.addTo(map);
      dayLayerGroups.push(group);
    });

    // POIs
    const defaultPoiConfig = {
      castles: { color: '#c86432', icon: 'fa-chess-rook' },
      monasteries: { color: '#7a5a6a', icon: 'fa-place-of-worship' },
      nature: { color: '#5a8a3a', icon: 'fa-mountain-sun' },
      beaches: { color: '#2a5a8c', icon: 'fa-umbrella-beach' },
      towns: { color: '#e8b84a', icon: 'fa-city' },
      museums: { color: '#3a2f28', icon: 'fa-museum' },
      panoramas: { color: '#2d7a4a', icon: 'fa-binoculars' }
    };
    const poiConfig = { ...defaultPoiConfig, ...(data.poiConfig || {}) };

    if (data.pois) {
      Object.entries(data.pois).forEach(([type, pois]) => {
        const cfg = poiConfig[type] || { color: '#888', icon: 'fa-circle' };
        pois.forEach((poi) => {
          const poiIcon = L.divIcon({
            className: 'poi-marker',
            html: `<div class="poi-marker-inner" style="background:${cfg.color}"><i class="fa-solid ${cfg.icon}"></i></div>`,
            iconSize: [28, 28],
            iconAnchor: [14, 14]
          });
          const links = [];
          if (poi.gmaps)
            links.push(`<a href="${poi.gmaps}" target="_blank">Google Maps</a>`);
          if (poi.web)
            links.push(`<a href="${poi.web}" target="_blank">Site web</a>`);
          const linksHtml = links.length ? `<br>${links.join(' · ')}` : '';
          L.marker([poi.lat, poi.lng], { icon: poiIcon })
            .bindPopup(`<strong>${poi.name}</strong>${poi.desc ? `<br>${poi.desc}` : ''}${linksHtml}`)
            .addTo(map);
        });
      });
    }

    // Fit bounds
    const bounds = L.latLngBounds(data.days.map((d) => [d.mapCenter.lat, d.mapCenter.lng]));
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40] });
    }

    return () => {
      map.remove();
    };
  });

  function toggleDay(index) {
    if (!map) return;
    if (soloIndex === index) {
      // Show all
      dayLayerGroups.forEach((g) => map.addLayer(g));
      soloIndex = -1;
    } else {
      // Solo mode
      dayLayerGroups.forEach((g, i) => {
        if (i === index) map.addLayer(g);
        else map.removeLayer(g);
      });
      soloIndex = index;
    }
  }
</script>

<section class="map-section" id="map-section">
  <header class="map-header">
    <h2>Notre Itineraire</h2>
    <p>De Dublin aux falaises de l'Atlantique</p>
  </header>
  <figure>
    <div id="map" bind:this={mapEl}></div>
    <figcaption class="sr-only">Carte interactive de l'itineraire en Irlande</figcaption>
  </figure>
  <aside class="map-legend" aria-label="Filtres de la carte">
    <h4><i class="fa-solid fa-filter"></i> Filtrer</h4>
    <div id="dayLegend">
      {#each data.days as day, i (day.day)}
        <div
          class="map-legend-item"
          class:active={soloIndex === -1 || soloIndex === i}
          onclick={() => toggleDay(i)}
          onkeydown={(e) => e.key === 'Enter' && toggleDay(i)}
          role="button"
          tabindex="0"
        >
          <div class="legend-dot" style:background={DAY_COLORS[i]}></div>
          <span>J{day.day} {day.shortLabel}</span>
        </div>
      {/each}
    </div>
  </aside>
</section>
