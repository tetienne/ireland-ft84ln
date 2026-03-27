<script>
  import { onMount } from 'svelte';
  import { computeStats, computeBudgetTotals } from '$lib/utils/stats.js';
  import Hero from '$lib/components/Hero.svelte';
  import MapSection from '$lib/components/MapSection.svelte';
  import RoadBook from '$lib/components/roadbook/RoadBook.svelte';
  import Dashboard from '$lib/components/Dashboard.svelte';
  import Tips from '$lib/components/Tips.svelte';
  import Blogs from '$lib/components/Blogs.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let data = $state(null);
  let stats = $state(null);
  let weatherByDay = $state(new Map());

  onMount(async () => {
    const res = await fetch('/data.json');
    data = await res.json();
    computeBudgetTotals(data.days);
    stats = computeStats(data);
  });
</script>

{#if data && stats}
  <Hero trip={data.trip} {stats} />
  <MapSection {data} />
  <RoadBook days={data.days} {weatherByDay} />
  <Dashboard days={data.days} />
  {#if data.tips}
    <Tips tips={data.tips} />
  {/if}
  {#if data.blogs}
    <Blogs blogs={data.blogs} />
  {/if}
  <Footer trip={data.trip} />
{:else}
  <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;">
    <p>Chargement...</p>
  </div>
{/if}
