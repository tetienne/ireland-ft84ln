<script>
  import { scrollToDay } from '$lib/utils/scroll.js';

  let { days, todayDayNum = null } = $props();

  let activeDayNum = $state(null);
  let navEl;

  // IntersectionObserver: track active day card
  $effect(() => {
    // eslint-disable-next-line svelte/prefer-svelte-reactivity -- not reactive state, local to observer
    const visibleCards = new Map();
    const targetLine = 100;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleCards.set(entry.target, entry.isIntersecting);
        });

        let best = null;
        let bestDist = Infinity;
        visibleCards.forEach((visible, card) => {
          if (!visible) return;
          const dist = Math.abs(card.getBoundingClientRect().top - targetLine);
          if (dist < bestDist) {
            bestDist = dist;
            best = card;
          }
        });

        if (best) {
          const dayNum = parseInt(best.dataset.day);
          activeDayNum = dayNum;
          history.replaceState(null, '', `#jour-${dayNum}`);

          // Auto-scroll nav to keep active pill visible
          if (navEl) {
            const activePill = navEl.querySelector(`.day-nav-pill[data-day="${dayNum}"]`);
            if (activePill) {
              const navRect = navEl.getBoundingClientRect();
              const pillRect = activePill.getBoundingClientRect();
              navEl.scrollBy({
                left: pillRect.left - navRect.left - navRect.width / 2 + pillRect.width / 2,
                behavior: 'smooth'
              });
            }
          }
        }
      },
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    );

    document.querySelectorAll('.day-card').forEach((card) => {
      visibleCards.set(card, false);
      observer.observe(card);
    });

    return () => observer.disconnect();
  });

  // Mobile: show on scroll up, hide on scroll down
  let navHidden = $state(false);

  $effect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      if (window.innerWidth > 480) {
        navHidden = false;
        return;
      }
      const currentY = window.scrollY;
      const next = currentY > lastScrollY && currentY > 200;
      if (next !== navHidden) navHidden = next;
      lastScrollY = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });
</script>

<nav class="day-nav" id="dayNav" class:nav-hidden={navHidden} aria-label="Navigation par jour" bind:this={navEl}>
  {#each days as day (day.day)}
    <button
      class="day-nav-pill"
      class:active={activeDayNum === day.day}
      data-day={day.day}
      onclick={() => scrollToDay(day.day, true)}
    >
      <span class="pill-day">J{day.day}</span>
      <span class="pill-label">{day.shortLabel || ''}</span>
      {#if day.day === todayDayNum}
        <span class="pill-today">Auj.</span>
      {/if}
    </button>
  {/each}
</nav>
