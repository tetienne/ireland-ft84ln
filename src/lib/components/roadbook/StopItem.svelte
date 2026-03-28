<script>
  import { gmapsUrl, wazeUrl, walkUrl } from '$lib/utils/coords.js';

  let { stop } = $props();

  let hasHike = $derived(stop.links.some((l) => l.type === 'alltrails' || l.type === 'trailMap'));

  const LINK_META = {
    gmaps: { icon: 'fa-map-pin', label: 'Maps', class: 'link-map' },
    web: { icon: 'fa-globe', label: 'Site officiel', class: 'link-web' },
    tripadvisor: { icon: 'fa-star', label: 'TripAdvisor', class: 'link-ta' },
    routard: { icon: 'fa-book-open', label: 'Routard', class: 'link-routard' },
    alltrails: { icon: 'fa-person-hiking', label: 'AllTrails', class: 'link-trail' },
    trailMap: { icon: 'fa-map', label: 'Carte rando', class: 'link-trail' }
  };
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

      {#if stop.links.length > 0 || stop.lat}
        <div class="stop-links">
          {#each stop.links as link (link.type)}
            {@const meta = LINK_META[link.type]}
            {#if meta}
              <a href={link.url} target="_blank" class={meta.class}><i class="fa-solid {meta.icon}"></i> {meta.label}</a>
            {/if}
          {/each}
          {#if stop.lat}
            <a href={wazeUrl(stop.lat, stop.lng)} target="_blank" class="link-waze"><i class="fa-solid fa-car"></i> Waze</a>
            <a href={walkUrl(stop.lat, stop.lng)} target="_blank" class="link-walk"><i class="fa-solid fa-person-walking"></i> A pied</a>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</li>
