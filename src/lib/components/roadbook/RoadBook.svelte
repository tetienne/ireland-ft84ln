<script>
  import DayCard from './DayCard.svelte';
  import DayNav from './DayNav.svelte';

  let { days, weatherByDay = new Map(), todayDayNum = null } = $props();
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
  <DayNav {days} {todayDayNum} />
  <div class="timeline">
    {#each days as day}
      <DayCard {day} weatherHtml={weatherByDay.get(day.day) || ''} />
    {/each}
  </div>
</section>
