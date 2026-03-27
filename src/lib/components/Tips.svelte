<script>
  let { tips } = $props();
</script>

<section class="tips-section" id="tips">
  <header class="tips-header">
    <h2>Conseils pratiques</h2>
    <p>Ce que les blogueurs francais recommandent unanimement</p>
    <div class="line"></div>
  </header>
  <div class="tips-grid">
    {#each tips as tip}
      <article class="tip-card">
        <div class="tip-icon"><i class="fa-solid {tip.icon}"></i></div>
        <h4>{tip.title}</h4>
        <p>{tip.text}</p>
      </article>
    {/each}
  </div>
</section>
