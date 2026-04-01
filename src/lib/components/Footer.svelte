<script lang="ts">
  import { formatPeriod } from '$lib/utils/dates';
  import type { Trip } from '$lib/types';

  let { trip }: { trip: Trip } = $props();
</script>

<footer class="site-footer">
  <div class="footer-shamrock">&#9752;</div>
  <p>Ireland Road Trip 2026, Wild Atlantic Way en famille</p>
  <p class="family">{trip.family} &middot; {formatPeriod(trip.startDate, trip.endDate)}</p>
</footer>
