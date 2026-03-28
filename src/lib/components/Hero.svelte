<script>
  import { formatPeriod } from '$lib/utils/dates.js';

  let { trip, stats } = $props();

  const celticSvg = `<svg viewBox="0 0 100 100" fill="none" stroke="rgba(200,148,46,0.8)" stroke-width="1.5">
    <path d="M10,90 Q10,10 90,10" />
    <path d="M20,90 Q20,20 90,20" />
    <path d="M10,90 C10,50 50,10 90,10" stroke-dasharray="4,4" />
    <circle cx="10" cy="90" r="4" fill="rgba(200,148,46,0.5)" />
    <circle cx="90" cy="10" r="4" fill="rgba(200,148,46,0.5)" />
  </svg>`;

  let metaItems = $derived([
    { v: stats.jours, l: 'Jours' },
    { v: stats.voyageurs, l: 'Voyageurs' },
    { v: stats.kilometres, l: 'Kilometres' },
    { v: stats.comtes, l: 'Comtes' }
  ]);
</script>

<section class="hero">
  <div class="hero-pattern"></div>
  <div class="celtic-corner celtic-corner--tl">{@html celticSvg}</div>
  <div class="celtic-corner celtic-corner--tr">{@html celticSvg}</div>
  <div class="celtic-corner celtic-corner--bl">{@html celticSvg}</div>
  <div class="celtic-corner celtic-corner--br">{@html celticSvg}</div>
  <div class="hero-content">
    <div class="hero-eyebrow">{trip.family} · {formatPeriod(trip.startDate, trip.endDate)}</div>
    <h2 class="hero-title">Ireland<em>Road Trip</em></h2>
    <p class="hero-subtitle">Wild Atlantic Way en famille</p>
    <div class="hero-divider"></div>
    <div class="hero-meta">
      {#each metaItems as item (item.l)}
        <div class="hero-meta-item">
          <span class="value">{item.v}</span>
          <span class="label">{item.l}</span>
        </div>
      {/each}
    </div>
  </div>
  <a href="#map-section" class="hero-scroll">
    <span>Explorer</span><i class="fa-solid fa-chevron-down"></i>
  </a>
</section>
