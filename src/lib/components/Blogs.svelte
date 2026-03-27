<script>
  let { blogs } = $props();

  function badgeClass(type) {
    if (type === 'famille') return 'famille';
    if (type === 'couple') return 'couple';
    if (type === 'forum') return 'forum';
    return 'other';
  }

  function badgeIcon(type) {
    if (type === 'famille') return 'fa-child';
    if (type === 'couple') return 'fa-heart';
    if (type === 'forum') return 'fa-comments';
    return 'fa-users';
  }

  function badgeLabel(type) {
    if (type === 'famille') return 'Famille';
    if (type === 'couple') return 'Couple';
    if (type === 'forum') return 'Forum';
    return type;
  }
</script>

<section class="blogs-section" id="blogs">
  <header class="blogs-header">
    <h2>Blogs & recits de voyage</h2>
    <p>Retours d'experience de familles francaises en Irlande</p>
    <div class="line"></div>
  </header>
  <div class="blogs-grid">
    {#each blogs as blog}
      <a href={blog.url} target="_blank" class="blog-card">
        <div class="blog-source">{blog.source}</div>
        <div class="blog-title">{blog.title}</div>
        <span class="blog-badge {badgeClass(blog.type)}">
          <i class="fa-solid {badgeIcon(blog.type)}"></i> {badgeLabel(blog.type)}
        </span>
      </a>
    {/each}
  </div>
</section>
