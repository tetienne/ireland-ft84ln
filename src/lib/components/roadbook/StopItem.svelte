<script>
  import { extractCoords } from '$lib/utils/coords.js';

  let { stop } = $props();

  let coords = $derived(extractCoords(stop.gmaps));
  let hasHike = $derived(stop.alltrails || stop.trailMap);
</script>

<li class="day-stop">
  {#if stop.photo}
    <div class="stop-photo">
      <img src={stop.photo} alt={stop.name} loading="lazy" />
    </div>
  {/if}
  <div class="stop-body">
    <div class="stop-icon {stop.iconClass}"><i class="fa-solid {stop.icon}"></i></div>
    <div class="stop-info">
      <h4>
        {#if hasHike}<span class="hike-badge"><i class="fa-solid fa-person-hiking"></i> Rando</span> {/if}{stop.name}
      </h4>
      <p>{@html stop.desc}</p>

      {#if stop.parking}
        <div class="stop-parking">
          <i class="fa-solid fa-square-parking"></i>
          <span>
            <strong>{stop.parking.cost}</strong> &mdash;
            {#if stop.parking.gmaps}
              <a href={stop.parking.gmaps} target="_blank">{stop.parking.location}</a>
            {:else}
              {stop.parking.location}
            {/if}
          </span>
          {#if stop.parking.tip}
            <span class="parking-tip">{stop.parking.tip}</span>
          {/if}
        </div>
      {/if}

      {#if stop.gmaps || stop.web || stop.tripadvisor || stop.routard || stop.alltrails || stop.trailMap}
        <div class="stop-links">
          {#if stop.gmaps}
            <a href={stop.gmaps} target="_blank" class="link-map"><i class="fa-solid fa-map-pin"></i> Maps</a>
          {/if}
          {#if coords}
            <a href="https://waze.com/ul?ll={coords[0]},{coords[1]}&navigate=yes" target="_blank" class="link-waze"><i class="fa-solid fa-car"></i> Waze</a>
            <a href="https://www.google.com/maps/dir/?api=1&destination={coords[0]},{coords[1]}&travelmode=walking" target="_blank" class="link-walk"><i class="fa-solid fa-person-walking"></i> A pied</a>
          {/if}
          {#if stop.web}
            <a href={stop.web} target="_blank" class="link-web"><i class="fa-solid fa-globe"></i> Site officiel</a>
          {/if}
          {#if stop.tripadvisor}
            <a href={stop.tripadvisor} target="_blank" class="link-ta"><i class="fa-solid fa-star"></i> TripAdvisor</a>
          {/if}
          {#if stop.routard}
            <a href={stop.routard} target="_blank" class="link-routard"><i class="fa-solid fa-book-open"></i> Routard</a>
          {/if}
          {#if stop.alltrails}
            <a href={stop.alltrails} target="_blank" class="link-trail"><i class="fa-solid fa-person-hiking"></i> AllTrails</a>
          {/if}
          {#if stop.trailMap}
            <a href={stop.trailMap} target="_blank" class="link-trail"><i class="fa-solid fa-map"></i> Carte rando</a>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</li>
