<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { computeStats, normalizeDay } from '$lib/utils/stats';
  import { getTodayDayNum } from '$lib/utils/dates';
  import { fetchWeather } from '$lib/utils/weather';
  import { scrollToDay } from '$lib/utils/scroll';
  import { base } from '$app/paths';
  import Hero from '$lib/components/Hero.svelte';
  import MapSection from '$lib/components/MapSection.svelte';
  import RoadBook from '$lib/components/roadbook/RoadBook.svelte';
  import Dashboard from '$lib/components/Dashboard.svelte';
  import Tips from '$lib/components/Tips.svelte';
  import Blogs from '$lib/components/Blogs.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import type { TripData, RawTripData } from '$lib/types';

  let data: TripData | null = $state(null);
  let weatherByDay: Map<number, string> = $state(new Map());

  let computed = $derived.by(() => {
    if (!data) return { stats: null, todayDayNum: null };
    return { stats: computeStats(data), todayDayNum: getTodayDayNum(data.days) };
  });
  let stats = $derived(computed.stats);
  let todayDayNum = $derived(computed.todayDayNum);

  onMount(() => {
    let observer: IntersectionObserver | undefined;

    (async () => {
      const res = await fetch(`${base}/data.json`);
      const raw: RawTripData = await res.json();
      data = { ...raw, days: raw.days.map(normalizeDay) };

      fetchWeather(data.days, (updated) => {
        weatherByDay = updated;
      });

      await tick();

      const hash = window.location.hash;
      const targetDay = hash?.startsWith('#jour-') ? hash.slice(6) : todayDayNum;
      if (targetDay) {
        setTimeout(() => scrollToDay(targetDay), 300);
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer!.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05 }
      );
      document.querySelectorAll('.day-card').forEach((card) => observer!.observe(card));
    })();

    return () => observer?.disconnect();
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
