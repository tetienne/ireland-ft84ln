<script>
  let scrolled = $state(false);
  let menuOpen = $state(false);

  $effect(() => {
    const onScroll = () => {
      const next = window.scrollY > 100;
      if (next !== scrolled) scrolled = next;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  function closeMenu() {
    menuOpen = false;
  }
</script>

<header class="nav-bar" id="navbar" class:scrolled>
  <h1 class="nav-logo">Ireland 2026</h1>
  <nav>
    <ul class="nav-links" class:open={menuOpen}>
      <li><a href="#map-section" onclick={closeMenu}>Carte</a></li>
      <li><a href="#roadbook" onclick={closeMenu}>Road Book</a></li>
      <li><a href="#dashboard" onclick={closeMenu}>Resume</a></li>
      <li><a href="#tips" onclick={closeMenu}>Conseils</a></li>
      <li><a href="#blogs" onclick={closeMenu}>Blogs</a></li>
    </ul>
  </nav>
  <button
    class="nav-hamburger"
    class:open={menuOpen}
    aria-label="Menu"
    onclick={() => (menuOpen = !menuOpen)}
  >
    <span></span><span></span><span></span>
  </button>
</header>
