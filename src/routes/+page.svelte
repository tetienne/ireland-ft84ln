<script>
  import { onMount, tick } from 'svelte';
  import { computeStats, withBudgetTotals } from '$lib/utils/stats.js';
  import { getTodayDayNum } from '$lib/utils/dates.js';
  import { fetchWeather } from '$lib/utils/weather.js';
  import { scrollToDay } from '$lib/utils/scroll.js';
  import { base } from '$app/paths';
  import Hero from '$lib/components/Hero.svelte';
  import MapSection from '$lib/components/MapSection.svelte';
  import RoadBook from '$lib/components/roadbook/RoadBook.svelte';
  import Dashboard from '$lib/components/Dashboard.svelte';
  import Tips from '$lib/components/Tips.svelte';
  import Blogs from '$lib/components/Blogs.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let data = $state(null);
  let weatherByDay = $state(new Map());

  let stats = $derived(data ? computeStats(data) : null);
  let todayDayNum = $derived(data ? getTodayDayNum(data.days) : null);

  onMount(async () => {
    const res = await fetch(`${base}/data.json`);
    const raw = await res.json();
    data = { ...raw, days: withBudgetTotals(raw.days) };

    fetchWeather(data.days, (updated) => {
      weatherByDay = updated;
    });

    await tick();

    // Deep links
    const hash = window.location.hash;
    const targetDay = hash?.startsWith('#jour-') ? hash.slice(6) : todayDayNum;
    if (targetDay) {
      setTimeout(() => scrollToDay(targetDay), 300);
    }

    // Scroll fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    document.querySelectorAll('.day-card').forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  });
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
