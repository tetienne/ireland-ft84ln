<script>
  import { formatDateLong } from '$lib/utils/dates.js';
  import { DAY_COLORS } from '$lib/utils/colors.js';
  import StopItem from './StopItem.svelte';
  import MiniMap from './MiniMap.svelte';

  let { day, weatherHtml = '' } = $props();

  let activePanel = $state(null);

  let color = $derived(DAY_COLORS[day.day - 1]);

  function togglePanel(panel) {
    activePanel = activePanel === panel ? null : panel;
  }

  let hasPills = $derived(day.schedule || day.budget || day.dayRoute || day.practicalTips);

  const DRIVE_ICONS = ['fa-car', 'fa-plane', 'fa-plane-arrival', 'fa-plane-departure'];
</script>

<article class="day-card" id="jour-{day.day}" data-day={day.day}>
  <div class="day-number" style:background={color}>J{day.day}</div>
  <div class="day-content">
    <div class="day-top">
      <h3 class="day-title">{day.title}</h3>
      <time class="day-date" datetime={day.isoDate}>{formatDateLong(day.isoDate)}</time>
      <span class="weather-badge" class:loaded={weatherHtml}>{@html weatherHtml}</span>
    </div>
    <p class="day-route">
      <i class="fa-solid {day.routeIcon}"></i> {day.routeDesc}
    </p>

    {#if day.morning}
      <div class="day-narrative morning"><i class="fa-solid fa-sun"></i> {@html day.morning}</div>
    {/if}

    <ul class="day-stops">
      {#each day.stops as stop (stop.name)}
        <StopItem {stop} />
      {/each}
    </ul>

    {#if day.nightInfo}
      <div class="day-narrative night-info"><i class="fa-solid fa-moon"></i> {@html day.nightInfo}</div>
    {/if}

    {#if day.rainyDay}
      <div class="day-narrative rainy-day"><i class="fa-solid fa-cloud-rain"></i> <strong>Plan B pluie :</strong> {@html day.rainyDay}</div>
    {/if}

    <div class="day-footer">
      {#if day.night}<span><i class="fa-solid fa-bed"></i> {day.night}</span>{/if}
      {#if day.distance}<span><i class="fa-solid fa-car"></i> {day.distance}</span>{/if}
      {#if day.driveTime}<span><i class="fa-solid fa-clock"></i> {day.driveTime}</span>{/if}
      {#if day.highlight}<span><i class="fa-solid fa-star"></i> {day.highlight}</span>{/if}
    </div>

    <!-- Pills -->
    {#if hasPills}
      <div class="day-pills">
        {#if day.schedule}
          <button class:active={activePanel === 'schedule'} onclick={() => togglePanel('schedule')}>
            <i class="fa-solid fa-clock"></i> <span>Planning</span>
          </button>
        {/if}
        {#if day.budget}
          <button class:active={activePanel === 'budget'} onclick={() => togglePanel('budget')}>
            <i class="fa-solid fa-coins"></i> <span>Budget</span>
          </button>
        {/if}
        {#if day.dayRoute}
          <button class:active={activePanel === 'map'} onclick={() => togglePanel('map')}>
            <i class="fa-solid fa-map"></i> <span>Carte</span>
          </button>
        {/if}
        {#if day.practicalTips}
          <button class:active={activePanel === 'tips'} onclick={() => togglePanel('tips')}>
            <i class="fa-solid fa-lightbulb"></i> <span>Tips</span>
          </button>
        {/if}
      </div>
    {/if}

    <!-- Panels -->
    {#if activePanel === 'schedule' && day.schedule}
      <div class="day-panel open" data-panel="schedule">
        <ul class="schedule-timeline">
          {#each day.schedule as s (s.time)}
            <li class="schedule-item" class:drive={DRIVE_ICONS.includes(s.icon)}>
              <span class="schedule-time">{s.time}</span>
              <span class="schedule-label"><i class="fa-solid {s.icon}"></i> {s.label}</span>
              {#if s.duration}<span class="schedule-duration">{s.duration}</span>{/if}
            </li>
          {/each}
        </ul>
      </div>
    {/if}

    {#if activePanel === 'budget' && day.budget}
      <div class="day-panel open" data-panel="budget">
        <div class="budget-table">
          {#each day.budget.entries as e (e.label)}
            <div class="budget-row">
              <span>{e.label}</span>
              <span class="budget-amount">{e.amount} &euro;</span>
            </div>
          {/each}
          <div class="budget-row total">
            <span>Total journee</span>
            <span class="budget-amount">{day.budget.total} &euro;</span>
          </div>
        </div>
        {#if day.budget.notes}
          <div class="budget-notes"><i class="fa-solid fa-lightbulb"></i> {@html day.budget.notes}</div>
        {/if}
      </div>
    {/if}

    {#if activePanel === 'map' && day.dayRoute}
      <div class="day-panel open" data-panel="map">
        <MiniMap {day} />
      </div>
    {/if}

    {#if activePanel === 'tips' && day.practicalTips}
      <div class="day-panel open" data-panel="tips">
        {#each day.practicalTips as group (group.stop)}
          <div class="tips-group">
            <div class="tips-group-header"><i class="fa-solid {group.icon}"></i> {group.stop}</div>
            <ul>
              {#each group.tips as tip, i (i)}
                <li>{@html tip}</li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</article>
