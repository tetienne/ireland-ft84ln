<script>
  import DayCard from './DayCard.svelte';

  let { days, weatherByDay = new Map() } = $props();
</script>

<section class="roadbook" id="roadbook">
  <header class="roadbook-header">
    <h2>Road Book</h2>
    <p>Jour par jour, etape par etape</p>
    <div class="line"></div>
    <button class="print-btn" onclick={() => window.print()}>
      <i class="fa-solid fa-print"></i> Imprimer le road book
    </button>
  </header>
  <nav class="day-nav" id="dayNav" aria-label="Navigation par jour">
    <!-- DayNav will be rendered here by +page.svelte -->
  </nav>
  <div class="timeline">
    {#each days as day}
      <DayCard {day} weatherHtml={weatherByDay.get(day.day) || ''} />
    {/each}
  </div>
</section>
