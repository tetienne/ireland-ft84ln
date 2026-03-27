<script>
  let { blogs } = $props();

  const BADGES = {
    famille: { icon: 'fa-child', label: 'Famille' },
    couple: { icon: 'fa-heart', label: 'Couple' },
    forum: { icon: 'fa-comments', label: 'Forum' }
  };

  function badge(type) {
    return BADGES[type] || { icon: 'fa-users', label: type };
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
        <span class="blog-badge {BADGES[blog.type] ? blog.type : 'other'}">
          <i class="fa-solid {badge(blog.type).icon}"></i> {badge(blog.type).label}
        </span>
      </a>
    {/each}
  </div>
</section>
