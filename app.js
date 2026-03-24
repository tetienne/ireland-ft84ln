// ─── Load data and render everything ───
// Works both with a server (fetch) and without (inline script tag)
function boot(data) {
  renderHero(data.trip);
  renderRoadBook(data.days);
  if (data.tips) renderTips(data.tips);
  if (data.blogs) renderBlogs(data.blogs);
  initMap(data);
  initScrollAnimations();
  initNavbar();
}

// Try fetch first, fallback to global TRIP_DATA (set via <script src="data.js">)
if (typeof TRIP_DATA !== 'undefined') {
  boot(TRIP_DATA);
} else {
  fetch('data.json')
    .then(r => r.json())
    .then(boot)
    .catch(() => {
      console.error('Cannot load data.json — create data.js with: const TRIP_DATA = { ... }');
    });
}

// ─── HERO ───
function renderHero(trip) {
  document.querySelector('.hero-eyebrow').textContent = `${trip.family} · ${trip.period}`;
  const stats = trip.stats;
  const meta = document.querySelector('.hero-meta');
  meta.innerHTML = [
    { v: stats.jours, l: 'Jours' },
    { v: stats.voyageurs, l: 'Voyageurs' },
    { v: stats.kilometres, l: 'Kilometres' },
    { v: stats.comtes, l: 'Comtes' }
  ].map(s => `
    <div class="hero-meta-item">
      <span class="value">${s.v}</span>
      <span class="label">${s.l}</span>
    </div>
  `).join('');
}

// ─── ROAD BOOK ───
function renderRoadBook(days) {
  const timeline = document.querySelector('.timeline');
  timeline.innerHTML = days.map(day => `
    <div class="day-card" data-day="${day.day}">
      <div class="day-number">J${day.day}</div>
      <div class="day-content">
        <div class="day-top">
          <h3 class="day-title">${day.title}</h3>
          <span class="day-date">${day.date}</span>
        </div>
        <p class="day-route">
          <i class="fa-solid ${day.routeIcon}"></i> ${day.routeDesc}
        </p>
        ${day.morning ? `<div class="day-narrative morning"><i class="fa-solid fa-sun"></i> ${day.morning}</div>` : ''}
        <ul class="day-stops">
          ${day.stops.map(stop => renderStop(stop)).join('')}
        </ul>
        ${day.nightInfo ? `<div class="day-narrative night-info"><i class="fa-solid fa-moon"></i> ${day.nightInfo}</div>` : ''}
        ${day.rainyDay ? `<div class="day-narrative rainy-day"><i class="fa-solid fa-cloud-rain"></i> <strong>Plan B pluie :</strong> ${day.rainyDay}</div>` : ''}
        <div class="day-footer">
          ${day.night ? `<span><i class="fa-solid fa-bed"></i> ${day.night}</span>` : ''}
          ${day.distance ? `<span><i class="fa-solid fa-car"></i> ${day.distance}</span>` : ''}
          ${day.driveTime ? `<span><i class="fa-solid fa-clock"></i> ${day.driveTime}</span>` : ''}
          ${day.highlight ? `<span><i class="fa-solid fa-star"></i> ${day.highlight}</span>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

function renderStop(stop) {
  const photoHtml = stop.photo
    ? `<div class="stop-photo" style="background-image:url('${stop.photo}')"></div>`
    : '';

  const links = [];
  if (stop.gmaps) links.push(`<a href="${stop.gmaps}" target="_blank" class="link-map"><i class="fa-solid fa-map-pin"></i> Maps</a>`);
  if (stop.web) links.push(`<a href="${stop.web}" target="_blank" class="link-web"><i class="fa-solid fa-globe"></i> Site officiel</a>`);
  if (stop.tripadvisor) links.push(`<a href="${stop.tripadvisor}" target="_blank" class="link-ta"><i class="fa-solid fa-star"></i> TripAdvisor</a>`);
  if (stop.routard) links.push(`<a href="${stop.routard}" target="_blank" class="link-routard"><i class="fa-solid fa-book-open"></i> Routard</a>`);
  const linksHtml = links.length ? `<div class="stop-links">${links.join('')}</div>` : '';

  return `
    <li class="day-stop">
      ${photoHtml}
      <div class="stop-body">
        <div class="stop-icon ${stop.iconClass}"><i class="fa-solid ${stop.icon}"></i></div>
        <div class="stop-info">
          <h4>${stop.name}</h4>
          <p>${stop.desc}</p>
          ${linksHtml}
        </div>
      </div>
    </li>
  `;
}

// ─── MAP ───
function initMap(data) {
  const map = L.map('map', { zoomControl: false, scrollWheelZoom: true }).setView([53.1, -8.5], 7.5);
  L.control.zoom({ position: 'topright' }).addTo(map);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  const dayColors = ['#1a5632','#2d7a4a','#1a3a5c','#2a5a8c','#7a5a6a','#c8942e','#1a5632','#3a2f28'];

  // Day markers
  data.days.forEach((d, i) => {
    const icon = L.divIcon({
      className: 'day-marker',
      html: `<div class="day-marker-inner" style="background:${dayColors[i]}">${d.day}</div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });
    const imgHtml = d.mapImg ? `<img src="${d.mapImg}" alt="${d.title}">` : '';
    L.marker([d.mapCenter.lat, d.mapCenter.lng], { icon })
      .addTo(map)
      .bindPopup(`
        ${imgHtml}
        <div class="popup-tag" style="background:${dayColors[i]}20; color:${dayColors[i]}">Jour ${d.day}</div>
        <h3>${d.title}</h3>
        <p style="color:#666; margin:0">${d.mapDesc}</p>
      `, { maxWidth: 280 });
  });

  // Route polyline
  L.polyline(data.route, { color: '#c8942e', weight: 6, opacity: 0.15, smoothFactor: 1.5, lineCap: 'round' }).addTo(map);
  L.polyline(data.route, { color: '#c8942e', weight: 3, opacity: 0.7, smoothFactor: 1.5, dashArray: '8, 6', lineCap: 'round' }).addTo(map);

  // POI markers — grouped in LayerGroups for filtering
  const defaultPoiConfig = {
    castles:     { color: '#c86432', icon: 'fa-chess-rook', label: 'Chateaux' },
    monasteries: { color: '#7a5a6a', icon: 'fa-place-of-worship', label: 'Monasteres / Histoire' },
    nature:      { color: '#5a8a3a', icon: 'fa-mountain-sun', label: 'Nature / Panoramas' },
    beaches:     { color: '#2a5a8c', icon: 'fa-umbrella-beach', label: 'Plages' },
    towns:       { color: '#e8b84a', icon: 'fa-city', label: 'Villes / Villages' },
    museums:     { color: '#3a2f28', icon: 'fa-museum', label: 'Musees' },
    panoramas:   { color: '#5a8a3a', icon: 'fa-binoculars', label: 'Panoramas' }
  };
  const poiConfig = { ...defaultPoiConfig, ...(data.poiConfig || {}) };
  const poiLayers = {};

  Object.entries(data.pois).forEach(([category, pois]) => {
    const cfg = poiConfig[category] || defaultPoiConfig[category];
    if (!cfg) return;
    const layerGroup = L.layerGroup();
    pois.forEach(poi => {
      const icon = L.divIcon({
        className: 'poi-marker',
        html: `<div class="poi-marker-inner" style="background:${cfg.color}"><i class="fa-solid ${cfg.icon}" style="font-size:10px"></i></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
      const links = [];
      if (poi.gmaps) links.push(`<a href="${poi.gmaps}" target="_blank" style="font-size:11px;color:#2d7a4a"><i class="fa-solid fa-map-pin"></i> Google Maps</a>`);
      if (poi.web) links.push(`<a href="${poi.web}" target="_blank" style="font-size:11px;color:#c8942e"><i class="fa-solid fa-globe"></i> Site officiel</a>`);
      const linksHtml = links.length ? `<div style="display:flex;gap:8px;margin-top:4px">${links.join('')}</div>` : '';
      L.marker([poi.lat, poi.lng], { icon })
        .bindPopup(`<h3>${poi.name}</h3><p style="color:#666;margin:0 0 4px">${poi.desc}</p>${linksHtml}`, { maxWidth: 280 })
        .addTo(layerGroup);
    });
    layerGroup.addTo(map);
    poiLayers[category] = { layer: layerGroup, cfg, count: pois.length };
  });

  // Wire up filter buttons in legend
  initFilters(map, poiLayers);

  // Fit bounds
  const allPoints = data.days.map(d => [d.mapCenter.lat, d.mapCenter.lng]);
  map.fitBounds(L.latLngBounds(allPoints).pad(0.15));

  // Click day card → fly to map
  document.querySelectorAll('.day-card').forEach((card) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const dayNum = parseInt(card.dataset.day);
      const d = data.days[dayNum - 1];
      map.flyTo([d.mapCenter.lat, d.mapCenter.lng], 11, { duration: 1.2 });
      document.getElementById('map-section').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Expose for debugging
  window._map = map;
}

// ─── SCROLL ANIMATIONS ───
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.day-card').forEach(card => observer.observe(card));
}

// ─── TIPS ───
function renderTips(tips) {
  const section = document.getElementById('tips');
  if (!section) return;
  const grid = section.querySelector('.tips-grid');
  grid.innerHTML = tips.map(tip => `
    <div class="tip-card">
      <div class="tip-icon"><i class="fa-solid ${tip.icon}"></i></div>
      <h4>${tip.title}</h4>
      <p>${tip.text}</p>
    </div>
  `).join('');
}

// ─── BLOGS ───
function renderBlogs(blogs) {
  const section = document.getElementById('blogs');
  if (!section) return;
  const grid = section.querySelector('.blogs-grid');
  grid.innerHTML = blogs.map(blog => {
    const badge = blog.type === 'famille' ? '<span class="blog-badge famille"><i class="fa-solid fa-child"></i> Famille</span>'
                : blog.type === 'couple' ? '<span class="blog-badge couple"><i class="fa-solid fa-heart"></i> Couple</span>'
                : blog.type === 'forum' ? '<span class="blog-badge forum"><i class="fa-solid fa-comments"></i> Forum</span>'
                : `<span class="blog-badge other"><i class="fa-solid fa-users"></i> ${blog.type}</span>`;
    return `
      <a href="${blog.url}" target="_blank" class="blog-card">
        <div class="blog-source">${blog.source}</div>
        <div class="blog-title">${blog.title}</div>
        ${badge}
      </a>
    `;
  }).join('');
}

// ─── MAP FILTERS ───
function initFilters(map, poiLayers) {
  const container = document.getElementById('mapFilters');
  if (!container) return;
  container.innerHTML = '';

  Object.entries(poiLayers).forEach(([cat, { layer, cfg, count }]) => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn active';
    btn.dataset.category = cat;
    btn.innerHTML = `<span class="filter-dot" style="background:${cfg.color}"></span>${cfg.label || cat} <span class="filter-count">${count}</span>`;
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      if (btn.classList.contains('active')) {
        map.addLayer(layer);
      } else {
        map.removeLayer(layer);
      }
    });
    container.appendChild(btn);
  });

  // "All" / "None" buttons
  const allBtn = document.createElement('button');
  allBtn.className = 'filter-toggle';
  allBtn.textContent = 'Tout';
  allBtn.addEventListener('click', () => {
    container.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.add('active');
      const cat = b.dataset.category;
      if (poiLayers[cat]) map.addLayer(poiLayers[cat].layer);
    });
  });

  const noneBtn = document.createElement('button');
  noneBtn.className = 'filter-toggle';
  noneBtn.textContent = 'Aucun';
  noneBtn.addEventListener('click', () => {
    container.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('active');
      const cat = b.dataset.category;
      if (poiLayers[cat]) map.removeLayer(poiLayers[cat].layer);
    });
  });

  const toggleRow = document.createElement('div');
  toggleRow.className = 'filter-toggles';
  toggleRow.appendChild(allBtn);
  toggleRow.appendChild(noneBtn);
  container.appendChild(toggleRow);
}

// ─── NAVBAR ───
function initNavbar() {
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 100);
  });

  // Hamburger menu
  const hamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }
}
