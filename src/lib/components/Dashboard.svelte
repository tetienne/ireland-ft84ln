<script>
  import { formatDateLong } from '$lib/utils/dates.js';
  import { formatDrive } from '$lib/utils/format.js';
  import { scrollToDay } from '$lib/utils/scroll.js';

  let { days } = $props();

  let totalBudget = $derived(
    days.reduce((sum, day) => sum + (day.budget ? day.budget.total : 0), 0)
  );
</script>

<section class="dashboard-section" id="dashboard">
  <header class="dashboard-header">
    <h2>Resume du voyage</h2>
    <p>Vue d'ensemble pour tout planifier</p>
    <div class="line"></div>
  </header>
  <div class="dashboard-grid">
    <!-- Desktop table -->
    <table class="dashboard-table">
      <thead>
        <tr>
          <th>Jour</th><th>Date</th><th>Trajet</th><th>Nuit</th><th>Conduite</th><th>Budget</th><th></th>
        </tr>
      </thead>
      <tbody>
        {#each days as day (day.day)}
          <tr data-scroll-day={day.day} onclick={() => scrollToDay(day.day)}>
            <td class="dash-day">J{day.day}</td>
            <td>{formatDateLong(day.isoDate)}</td>
            <td>{day.routeDesc}</td>
            <td>{day.night || '-'}</td>
            <td>{day.driveMinutes ? formatDrive(day.driveMinutes) : '-'}</td>
            <td>{day.budget ? `${day.budget.total} €` : '-'}</td>
            <td>
              {#if day.highlight}
                <span class="dash-highlight"><i class="fa-solid fa-star"></i> {day.highlight}</span>
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5">Budget total estime</td>
          <td>{totalBudget} €</td>
          <td></td>
        </tr>
      </tfoot>
    </table>

    <!-- Mobile cards -->
    <div class="dashboard-cards">
      {#each days as day (day.day)}
        <div class="dash-card" data-scroll-day={day.day} onclick={() => scrollToDay(day.day)} onkeydown={(e) => e.key === 'Enter' && scrollToDay(day.day)} role="button" tabindex="0">
          <div class="dash-card-day">J{day.day}</div>
          <div class="dash-card-title">{day.title}</div>
          <div class="dash-card-meta">
            {#if day.night}<span><i class="fa-solid fa-bed"></i> {day.night}</span>{/if}
            {#if day.driveMinutes}<span><i class="fa-solid fa-clock"></i> {formatDrive(day.driveMinutes)}</span>{/if}
            {#if day.budget}<span><i class="fa-solid fa-coins"></i> {day.budget.total} €</span>{/if}
          </div>
        </div>
      {/each}
    </div>

    <div class="dashboard-total"><i class="fa-solid fa-coins"></i> Budget total : {totalBudget} €</div>
  </div>
</section>
