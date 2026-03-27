<script>
  import { onMount, tick } from 'svelte';
  import { computeStats, computeBudgetTotals } from '$lib/utils/stats.js';
  import { getTodayDayNum } from '$lib/utils/dates.js';
  import { fetchWeather } from '$lib/utils/weather.js';
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
  let todayDayNum = $state(null);

  onMount(async () => {
    const res = await fetch('/data.json');
    data = await res.json();
    computeBudgetTotals(data.days);
    stats = computeStats(data);
    todayDayNum = getTodayDayNum(data.days);

    // Fetch weather data
    fetchWeather(data.days, (updated) => {
      weatherByDay = updated;
    });

    // Wait for DOM to update, then handle deep links
    await tick();
    initDeepLinks();
    initScrollAnimations();
  });

  function initDeepLinks() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#jour-')) {
      const card = document.getElementById(hash.slice(1));
      if (card) {
        setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
      }
    } else if (todayDayNum) {
      const card = document.getElementById(`jour-${todayDayNum}`);
      if (card) {
        setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
      }
    }
  }

  function initScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.05 }
    );
    document.querySelectorAll('.day-card').forEach((card) => observer.observe(card));
  }
</script>

{#if data && stats}
  <Hero trip={data.trip} {stats} />
  <MapSection {data} />
  <RoadBook days={data.days} {weatherByDay} {todayDayNum} />
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
