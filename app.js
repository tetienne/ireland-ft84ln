// ─── DAY COLOR PALETTE (shared across roadbook, map, mini-maps) ───
const DAY_COLORS = [
  "#1a5632",
  "#1a3a5c",
  "#2a9d8f",
  "#7a5a6a",
  "#c8942e",
  "#c86432",
  "#2a5a8c",
  "#3a2f28",
];

// ─── DATE FORMATTING ───
function parseIsoDate(isoStr) {
  const [y, m, d] = isoStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDateLong(isoStr) {
  const dt = parseIsoDate(isoStr);
  const formatted = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(dt);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function formatPeriod(startIso, endIso) {
  const s = parseIsoDate(startIso);
  const e = parseIsoDate(endIso);
  const month = new Intl.DateTimeFormat("fr-FR", { month: "long" }).format(s);
  return `${s.getDate()}\u2013${e.getDate()} ${month} ${s.getFullYear()}`;
}

// ─── Load data and render everything ───
function boot(data) {
  computeBudgetTotals(data.days);
  const stats = computeStats(data);
  const todayDayNum = getTodayDayNum(data.days);
  renderHero(data.trip, stats);
  renderRoadBook(data.days);
  initDayPanels(data.days);
  renderDayNav(data.days, todayDayNum);
  renderDashboard(data.days);
  if (data.tips) renderTips(data.tips);
  if (data.blogs) renderBlogs(data.blogs);
  initMap(data);
  initScrollAnimations();
  initNavbar();
  initPrintButton();
  initDeepLinks(todayDayNum);
  fetchWeather(data.days);
  const footerEl = document.getElementById("footerFamily");
  if (footerEl) {
    footerEl.innerHTML = `${data.trip.family} &middot; ${formatPeriod(data.trip.startDate, data.trip.endDate)}`;
  }
}

// Try fetch first, fallback to global TRIP_DATA (set via <script src="data.js">)
if (typeof TRIP_DATA !== "undefined") {
  boot(TRIP_DATA);
} else {
  fetch("data.json")
    .then((r) => r.json())
    .then(boot)
    .catch(() => {
      console.error("Cannot load data.json — create data.js with: const TRIP_DATA = { ... }");
    });
}

// ─── COMPUTED STATS ───
function computeStats(data) {
  const days = data.days;

  const kilometres = days.reduce((sum, d) => {
    if (!d.distance) return sum;
    const num = parseInt(d.distance.replace(/[^0-9]/g, ""), 10);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const comtes = new Set(days.flatMap((d) => d.counties || [])).size;

  return {
    jours: days.length,
    voyageurs: data.trip.stats.voyageurs,
    kilometres: `~${kilometres}`,
    comtes,
  };
}

function computeBudgetTotals(days) {
  days.forEach((day) => {
    if (day.budget && day.budget.entries) {
      day.budget.total = day.budget.entries.reduce((sum, e) => sum + (e.amount || 0), 0);
    }
  });
}

// ─── HERO ───
function renderHero(trip, stats) {
  document.querySelector(".hero-eyebrow").textContent =
    `${trip.family} · ${formatPeriod(trip.startDate, trip.endDate)}`;
  const meta = document.querySelector(".hero-meta");
  meta.innerHTML = [
    { v: stats.jours, l: "Jours" },
    { v: stats.voyageurs, l: "Voyageurs" },
    { v: stats.kilometres, l: "Kilometres" },
    { v: stats.comtes, l: "Comtes" },
  ]
    .map(
      (s) => `
    <div class="hero-meta-item">
      <span class="value">${s.v}</span>
      <span class="label">${s.l}</span>
    </div>
  `,
    )
    .join("");
}

// ─── ROAD BOOK ───
function renderRoadBook(days) {
  const timeline = document.querySelector(".timeline");
  timeline.innerHTML = days
    .map(
      (day) => `
    <div class="day-card" id="jour-${day.day}" data-day="${day.day}">
      <div class="day-number" style="background:${DAY_COLORS[day.day - 1]}">J${day.day}</div>
      <div class="day-content">
        <div class="day-top">
          <h3 class="day-title">${day.title}</h3>
          <span class="day-date">${formatDateLong(day.isoDate)}</span>
          <span class="weather-badge"></span>
        </div>
        <p class="day-route">
          <i class="fa-solid ${day.routeIcon}"></i> ${day.routeDesc}
        </p>
        ${day.morning ? `<div class="day-narrative morning"><i class="fa-solid fa-sun"></i> ${day.morning}</div>` : ""}
        <ul class="day-stops">
          ${day.stops.map((stop) => renderStop(stop)).join("")}
        </ul>
        ${day.nightInfo ? `<div class="day-narrative night-info"><i class="fa-solid fa-moon"></i> ${day.nightInfo}</div>` : ""}
        ${day.rainyDay ? `<div class="day-narrative rainy-day"><i class="fa-solid fa-cloud-rain"></i> <strong>Plan B pluie :</strong> ${day.rainyDay}</div>` : ""}
        <div class="day-footer">
          ${day.night ? `<span><i class="fa-solid fa-bed"></i> ${day.night}</span>` : ""}
          ${day.distance ? `<span><i class="fa-solid fa-car"></i> ${day.distance}</span>` : ""}
          ${day.driveTime ? `<span><i class="fa-solid fa-clock"></i> ${day.driveTime}</span>` : ""}
          ${day.highlight ? `<span><i class="fa-solid fa-star"></i> ${day.highlight}</span>` : ""}
        </div>
        ${renderDayPills(day)}
        ${renderDayPanels(day)}
      </div>
    </div>
  `,
    )
    .join("");
}

function renderStop(stop) {
  const photoHtml = stop.photo
    ? `<div class="stop-photo"><img src="${stop.photo}" alt="${stop.name}" loading="lazy"></div>`
    : "";

  const links = [];
  if (stop.gmaps)
    links.push(
      `<a href="${stop.gmaps}" target="_blank" class="link-map"><i class="fa-solid fa-map-pin"></i> Maps</a>`,
    );

  // Navigation links: extract coords from gmaps URL
  const coords = extractCoords(stop.gmaps);
  if (coords) {
    links.push(
      `<a href="https://waze.com/ul?ll=${coords[0]},${coords[1]}&navigate=yes" target="_blank" class="link-waze"><i class="fa-solid fa-car"></i> Waze</a>`,
    );
    links.push(
      `<a href="https://www.google.com/maps/dir/?api=1&destination=${coords[0]},${coords[1]}&travelmode=walking" target="_blank" class="link-walk"><i class="fa-solid fa-person-walking"></i> A pied</a>`,
    );
  }

  if (stop.web)
    links.push(
      `<a href="${stop.web}" target="_blank" class="link-web"><i class="fa-solid fa-globe"></i> Site officiel</a>`,
    );
  if (stop.tripadvisor)
    links.push(
      `<a href="${stop.tripadvisor}" target="_blank" class="link-ta"><i class="fa-solid fa-star"></i> TripAdvisor</a>`,
    );
  if (stop.routard)
    links.push(
      `<a href="${stop.routard}" target="_blank" class="link-routard"><i class="fa-solid fa-book-open"></i> Routard</a>`,
    );
  if (stop.alltrails)
    links.push(
      `<a href="${stop.alltrails}" target="_blank" class="link-trail"><i class="fa-solid fa-person-hiking"></i> AllTrails</a>`,
    );
  if (stop.trailMap)
    links.push(
      `<a href="${stop.trailMap}" target="_blank" class="link-trail"><i class="fa-solid fa-map"></i> Carte rando</a>`,
    );
  const linksHtml = links.length ? `<div class="stop-links">${links.join("")}</div>` : "";

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

// ─── DAY DETAIL PILLS & PANELS ───
function renderDayPills(day) {
  const has = day.schedule || day.budget || day.dayRoute || day.practicalTips;
  if (!has) return "";
  const pills = [];
  if (day.schedule)
    pills.push(
      `<button data-panel="schedule" title="Planning"><i class="fa-solid fa-clock"></i> <span>Planning</span></button>`,
    );
  if (day.budget)
    pills.push(
      `<button data-panel="budget" title="Budget"><i class="fa-solid fa-coins"></i> <span>Budget</span></button>`,
    );
  if (day.dayRoute)
    pills.push(
      `<button data-panel="map" title="Carte"><i class="fa-solid fa-map"></i> <span>Carte</span></button>`,
    );
  if (day.practicalTips)
    pills.push(
      `<button data-panel="tips" title="Tips"><i class="fa-solid fa-lightbulb"></i> <span>Tips</span></button>`,
    );
  return `<div class="day-pills">${pills.join("")}</div>`;
}

function renderDayPanels(day) {
  let panels = "";
  if (day.schedule)
    panels += `<div class="day-panel" data-panel="schedule">${renderSchedule(day.schedule)}</div>`;
  if (day.budget)
    panels += `<div class="day-panel" data-panel="budget">${renderBudget(day.budget)}</div>`;
  if (day.dayRoute)
    panels += `<div class="day-panel" data-panel="map"><div class="day-map-container" data-day="${day.day}"></div></div>`;
  if (day.practicalTips)
    panels += `<div class="day-panel" data-panel="tips">${renderPracticalTips(day.practicalTips)}</div>`;
  return panels;
}

function renderSchedule(schedule) {
  const items = schedule
    .map((s) => {
      const isDrive =
        s.icon === "fa-car" ||
        s.icon === "fa-plane" ||
        s.icon === "fa-plane-arrival" ||
        s.icon === "fa-plane-departure";
      const dur = s.duration ? `<span class="schedule-duration">${s.duration}</span>` : "";
      return `
      <li class="schedule-item${isDrive ? " drive" : ""}">
        <span class="schedule-time">${s.time}</span>
        <span class="schedule-label"><i class="fa-solid ${s.icon}"></i> ${s.label}</span>
        ${dur}
      </li>`;
    })
    .join("");
  return `<ul class="schedule-timeline">${items}</ul>`;
}

function renderBudget(budget) {
  const rows = budget.entries
    .map(
      (e) =>
        `<div class="budget-row"><span>${e.label}</span><span class="budget-amount">${e.amount} &euro;</span></div>`,
    )
    .join("");
  const total = `<div class="budget-row total"><span>Total journee</span><span class="budget-amount">${budget.total} &euro;</span></div>`;
  const notes = budget.notes
    ? `<div class="budget-notes"><i class="fa-solid fa-lightbulb"></i> ${budget.notes}</div>`
    : "";
  return `<div class="budget-table">${rows}${total}</div>${notes}`;
}

function renderPracticalTips(tips) {
  return tips
    .map((group) => {
      const items = group.tips.map((t) => `<li>${t}</li>`).join("");
      return `
      <div class="tips-group">
        <div class="tips-group-header"><i class="fa-solid ${group.icon}"></i> ${group.stop}</div>
        <ul>${items}</ul>
      </div>`;
    })
    .join("");
}

function extractCoords(gmapsUrl) {
  if (!gmapsUrl) return null;
  const match = gmapsUrl.match(/q=([-\d.]+),([-\d.]+)/);
  return match ? [parseFloat(match[1]), parseFloat(match[2])] : null;
}

const dayMapsInitialized = new Set();

function initSingleDayMap(card, days) {
  const dayNum = parseInt(card.dataset.day);
  if (dayMapsInitialized.has(dayNum)) return;
  dayMapsInitialized.add(dayNum);

  const container = card.querySelector(".day-map-container");
  if (!container) return;

  const day = days.find((d) => d.day === dayNum);
  if (!day || !day.dayRoute) return;

  const map = L.map(container, { zoomControl: true, scrollWheelZoom: false, dragging: true });
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OSM &copy; CARTO",
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(map);

  // Route polyline
  L.polyline(day.dayRoute, {
    color: DAY_COLORS[dayNum - 1],
    weight: 3,
    opacity: 0.7,
    lineCap: "round",
    lineJoin: "round",
  }).addTo(map);

  // Stop markers from gmaps URLs
  const dayColor = DAY_COLORS[dayNum - 1];
  day.stops.forEach((stop) => {
    const coords = extractCoords(stop.gmaps);
    if (!coords) return;
    const icon = L.divIcon({
      className: "poi-marker",
      html: `<div class="poi-marker-inner" style="background:${dayColor}"><i class="fa-solid ${stop.icon}" style="font-size:10px"></i></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
    L.marker(coords, { icon }).addTo(map).bindPopup(`<strong>${stop.name}</strong>`);
  });

  // Fit bounds
  const bounds = L.latLngBounds(day.dayRoute);
  map.fitBounds(bounds.pad(0.15));
}

function initDayPanels(days) {
  document.querySelectorAll(".day-pills button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = btn.closest(".day-card");
      const target = btn.dataset.panel;
      const panel = card.querySelector(`.day-panel[data-panel="${target}"]`);
      const wasActive = btn.classList.contains("active");

      // Close all panels in this card
      card.querySelectorAll(".day-pills button").forEach((b) => b.classList.remove("active"));
      card.querySelectorAll(".day-panel").forEach((p) => p.classList.remove("open"));

      if (!wasActive) {
        btn.classList.add("active");
        panel.classList.add("open");
        // Lazy-init map
        if (target === "map") {
          setTimeout(() => initSingleDayMap(card, days), 100);
        }
      }
    });
  });
}

// ─── STICKY DAY NAV ───
function getTodayDayNum(days) {
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  for (const day of days) {
    if (day.isoDate === todayStr) return day.day;
  }
  return null;
}

function renderDayNav(days, todayNum) {
  const nav = document.getElementById("dayNav");
  if (!nav) return;

  nav.innerHTML = days
    .map((day) => {
      const isToday = day.day === todayNum;
      const todayBadge = isToday ? ' <span class="pill-today">Auj.</span>' : "";
      return `<button class="day-nav-pill" data-day="${day.day}">
        <span class="pill-day">J${day.day}</span>
        <span class="pill-label">${day.shortLabel || ""}</span>${todayBadge}
      </button>`;
    })
    .join("");

  // Click handler: scroll to day card
  nav.querySelectorAll(".day-nav-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      const dayNum = pill.dataset.day;
      const card = document.getElementById(`jour-${dayNum}`);
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#jour-${dayNum}`);
      }
    });
  });

  // IntersectionObserver: highlight active day on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const dayNum = entry.target.dataset.day;
          nav.querySelectorAll(".day-nav-pill").forEach((p) => p.classList.remove("active"));
          const activePill = nav.querySelector(`.day-nav-pill[data-day="${dayNum}"]`);
          if (activePill) {
            activePill.classList.add("active");
            activePill.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
          }
          history.replaceState(null, "", `#jour-${dayNum}`);
        }
      });
    },
    { threshold: 0.3, rootMargin: "-80px 0px -60% 0px" },
  );
  document.querySelectorAll(".day-card").forEach((card) => observer.observe(card));

  // Mobile: show on scroll up, hide on scroll down
  let lastScrollY = window.scrollY;
  window.addEventListener(
    "scroll",
    () => {
      if (window.innerWidth > 480) return;
      const currentY = window.scrollY;
      nav.classList.toggle("nav-hidden", currentY > lastScrollY && currentY > 200);
      lastScrollY = currentY;
    },
    { passive: true },
  );
}

// ─── DEEP LINKS ───
function initDeepLinks(todayNum) {
  const hash = window.location.hash;

  if (hash && hash.startsWith("#jour-")) {
    const card = document.getElementById(hash.slice(1));
    if (card) {
      setTimeout(() => card.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
    }
  } else if (todayNum) {
    const card = document.getElementById(`jour-${todayNum}`);
    if (card) {
      setTimeout(() => card.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
    }
  }
}

// ─── DASHBOARD ───
function renderDashboard(days) {
  const grid = document.querySelector(".dashboard-grid");
  if (!grid) return;

  let totalBudget = 0;
  days.forEach((day) => {
    if (day.budget) totalBudget += day.budget.total;
  });

  // Desktop table
  const rows = days
    .map((day) => {
      const budget = day.budget ? `${day.budget.total} \u20ac` : "-";
      const highlight = day.highlight
        ? `<span class="dash-highlight"><i class="fa-solid fa-star"></i> ${day.highlight}</span>`
        : "";
      return `<tr data-scroll-day="${day.day}">
        <td class="dash-day">J${day.day}</td>
        <td>${formatDateLong(day.isoDate)}</td>
        <td>${day.routeDesc}</td>
        <td>${day.night || "-"}</td>
        <td>${day.driveTime || "-"}</td>
        <td>${budget}</td>
        <td>${highlight}</td>
      </tr>`;
    })
    .join("");

  const table = `<table class="dashboard-table">
    <thead><tr>
      <th>Jour</th><th>Date</th><th>Trajet</th><th>Nuit</th><th>Conduite</th><th>Budget</th><th></th>
    </tr></thead>
    <tbody>${rows}</tbody>
    <tfoot><tr>
      <td colspan="5">Budget total estime</td>
      <td>${totalBudget} \u20ac</td>
      <td></td>
    </tr></tfoot>
  </table>`;

  // Mobile cards
  const cards = days
    .map((day) => {
      const budget = day.budget ? `${day.budget.total} \u20ac` : "";
      return `<div class="dash-card" data-scroll-day="${day.day}">
        <div class="dash-card-day">J${day.day}</div>
        <div class="dash-card-title">${day.title}</div>
        <div class="dash-card-meta">
          ${day.night ? `<span><i class="fa-solid fa-bed"></i> ${day.night}</span>` : ""}
          ${day.driveTime ? `<span><i class="fa-solid fa-clock"></i> ${day.driveTime}</span>` : ""}
          ${budget ? `<span><i class="fa-solid fa-coins"></i> ${budget}</span>` : ""}
        </div>
      </div>`;
    })
    .join("");

  const totalHtml = `<div class="dashboard-total"><i class="fa-solid fa-coins"></i> Budget total : ${totalBudget} \u20ac</div>`;

  grid.innerHTML = table + `<div class="dashboard-cards">${cards}</div>` + totalHtml;

  // Click row/card to scroll to day
  grid.querySelectorAll("[data-scroll-day]").forEach((el) => {
    el.addEventListener("click", () => {
      const card = document.getElementById(`jour-${el.dataset.scrollDay}`);
      if (card) card.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

// ─── MAP ───
function initMap(data) {
  const map = L.map("map", { zoomControl: false, scrollWheelZoom: true }).setView(
    [53.1, -8.5],
    7.5,
  );
  L.control.zoom({ position: "topright" }).addTo(map);
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(map);

  const dayColors = DAY_COLORS;
  const dayLayerGroups = [];

  // Day markers + polylines, grouped per day for filtering
  const routesByDay = data.routesByDay || (data.route ? [data.route] : []);
  data.days.forEach((d, i) => {
    const group = L.layerGroup();
    const color = dayColors[i];

    const icon = L.divIcon({
      className: "day-marker",
      html: `<div class="day-marker-inner" style="background:${color}">${d.day}</div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });
    const imgHtml = d.mapImg ? `<img src="${d.mapImg}" alt="${d.title}">` : "";
    L.marker([d.mapCenter.lat, d.mapCenter.lng], { icon })
      .bindPopup(
        `
        ${imgHtml}
        <div class="popup-tag" style="background:${color}20; color:${color}">Jour ${d.day}</div>
        <h3>${d.title}</h3>
        <p style="color:#666; margin:0">${d.mapDesc}</p>
      `,
        { maxWidth: 280 },
      )
      .addTo(group);

    const segment = routesByDay[i];
    if (segment && segment.length >= 2) {
      L.polyline(segment, {
        color,
        weight: 4,
        opacity: 0.7,
        smoothFactor: 1,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(group);
    }

    group.addTo(map);
    dayLayerGroups.push(group);
  });

  // Day filter legend
  const dayLegend = document.getElementById("dayLegend");
  if (dayLegend) {
    dayLegend.innerHTML = data.days
      .map(
        (d, i) =>
          `<div class="map-legend-item active" data-day-index="${i}"><div class="legend-dot" style="background:${dayColors[i]}"></div><span>J${d.day} ${d.shortLabel}</span></div>`,
      )
      .join("");
    const allItems = dayLegend.querySelectorAll(".map-legend-item");
    let soloIndex = -1;

    allItems.forEach((item) => {
      item.addEventListener("click", () => {
        const idx = parseInt(item.dataset.dayIndex);
        if (soloIndex === idx) {
          // Re-click on soloed day: show all
          soloIndex = -1;
          allItems.forEach((it, j) => {
            it.classList.add("active");
            map.addLayer(dayLayerGroups[j]);
          });
        } else {
          // Solo this day
          soloIndex = idx;
          allItems.forEach((it, j) => {
            if (j === idx) {
              it.classList.add("active");
              map.addLayer(dayLayerGroups[j]);
            } else {
              it.classList.remove("active");
              map.removeLayer(dayLayerGroups[j]);
            }
          });
        }
      });
    });
  }

  // POI markers (always visible, no filter)
  const defaultPoiConfig = {
    castles: { color: "#c86432", icon: "fa-chess-rook" },
    monasteries: { color: "#7a5a6a", icon: "fa-place-of-worship" },
    nature: { color: "#5a8a3a", icon: "fa-mountain-sun" },
    beaches: { color: "#2a5a8c", icon: "fa-umbrella-beach" },
    towns: { color: "#e8b84a", icon: "fa-city" },
    museums: { color: "#3a2f28", icon: "fa-museum" },
    panoramas: { color: "#5a8a3a", icon: "fa-binoculars" },
  };
  const poiConfig = { ...defaultPoiConfig, ...(data.poiConfig || {}) };

  Object.entries(data.pois).forEach(([category, pois]) => {
    const cfg = poiConfig[category] || defaultPoiConfig[category];
    if (!cfg) return;
    pois.forEach((poi) => {
      const icon = L.divIcon({
        className: "poi-marker",
        html: `<div class="poi-marker-inner" style="background:${cfg.color}"><i class="fa-solid ${cfg.icon}" style="font-size:10px"></i></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });
      const links = [];
      if (poi.gmaps)
        links.push(
          `<a href="${poi.gmaps}" target="_blank" style="font-size:11px;color:#2d7a4a"><i class="fa-solid fa-map-pin"></i> Google Maps</a>`,
        );
      if (poi.web)
        links.push(
          `<a href="${poi.web}" target="_blank" style="font-size:11px;color:#c8942e"><i class="fa-solid fa-globe"></i> Site officiel</a>`,
        );
      const linksHtml = links.length
        ? `<div style="display:flex;gap:8px;margin-top:4px">${links.join("")}</div>`
        : "";
      L.marker([poi.lat, poi.lng], { icon })
        .bindPopup(
          `<h3>${poi.name}</h3><p style="color:#666;margin:0 0 4px">${poi.desc}</p>${linksHtml}`,
          { maxWidth: 280 },
        )
        .addTo(map);
    });
  });

  // Fit bounds
  const allPoints = data.days.map((d) => [d.mapCenter.lat, d.mapCenter.lng]);
  map.fitBounds(L.latLngBounds(allPoints).pad(0.15));

  // (#6) Removed: day-card click no longer hijacks scroll to map.
  // Cards are not clickable at all now; navigation is via the sticky day nav.

  // Expose for debugging
  window._map = map;
}

// ─── SCROLL ANIMATIONS ───
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
  );
  document.querySelectorAll(".day-card").forEach((card) => observer.observe(card));
}

// ─── TIPS ───
function renderTips(tips) {
  const section = document.getElementById("tips");
  if (!section) return;
  const grid = section.querySelector(".tips-grid");
  grid.innerHTML = tips
    .map(
      (tip) => `
    <div class="tip-card">
      <div class="tip-icon"><i class="fa-solid ${tip.icon}"></i></div>
      <h4>${tip.title}</h4>
      <p>${tip.text}</p>
    </div>
  `,
    )
    .join("");
}

// ─── BLOGS ───
function renderBlogs(blogs) {
  const section = document.getElementById("blogs");
  if (!section) return;
  const grid = section.querySelector(".blogs-grid");
  grid.innerHTML = blogs
    .map((blog) => {
      const badge =
        blog.type === "famille"
          ? '<span class="blog-badge famille"><i class="fa-solid fa-child"></i> Famille</span>'
          : blog.type === "couple"
            ? '<span class="blog-badge couple"><i class="fa-solid fa-heart"></i> Couple</span>'
            : blog.type === "forum"
              ? '<span class="blog-badge forum"><i class="fa-solid fa-comments"></i> Forum</span>'
              : `<span class="blog-badge other"><i class="fa-solid fa-users"></i> ${blog.type}</span>`;
      return `
      <a href="${blog.url}" target="_blank" class="blog-card">
        <div class="blog-source">${blog.source}</div>
        <div class="blog-title">${blog.title}</div>
        ${badge}
      </a>
    `;
    })
    .join("");
}

// ─── PRINT ───
function initPrintButton() {
  const header = document.querySelector(".roadbook-header");
  if (!header) return;
  const btn = document.createElement("button");
  btn.className = "print-btn";
  btn.innerHTML = '<i class="fa-solid fa-print"></i> Imprimer le road book';
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    window.print();
  });
  header.appendChild(btn);
}

// ─── NAVBAR ───
function initNavbar() {
  const navbar = document.getElementById("navbar");
  window.addEventListener(
    "scroll",
    () => {
      navbar.classList.toggle("scrolled", window.scrollY > 100);
    },
    { passive: true },
  );

  // Hamburger menu
  const hamburger = document.getElementById("navHamburger");
  const navLinks = document.getElementById("navLinks");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navLinks.classList.remove("open");
      });
    });
  }
}

// ─── WEATHER (Open-Meteo historical averages) ───
const WEATHER_TABLE = [
  { max: 1, icon: "fa-sun", label: "Ensoleillé" },
  { max: 3, icon: "fa-cloud-sun", label: "Nuageux" },
  { max: 48, icon: "fa-cloud", label: "Couvert" },
  { max: 67, icon: "fa-cloud-rain", label: "Pluie" },
  { max: 77, icon: "fa-snowflake", label: "Neige" },
  { max: 82, icon: "fa-cloud-showers-heavy", label: "Averses" },
];

function weatherInfo(code) {
  const entry = WEATHER_TABLE.find((e) => code <= e.max) || {
    icon: "fa-cloud-bolt",
    label: "Orage",
  };
  return entry;
}

function fetchWeather(days) {
  const entries = days
    .filter((d) => d.mapCenter)
    .map((d) => ({
      day: d.day,
      date: d.isoDate,
      lat: d.mapCenter.lat,
      lng: d.mapCenter.lng,
    }));

  const now = new Date();
  const forecastLimit = new Date(now);
  forecastLimit.setDate(forecastLimit.getDate() + 15);

  // Build requests, deduplicating identical coordinates + date
  const seen = new Map();
  const requests = [];

  entries.forEach(({ day, date, lat, lng }) => {
    const tripDate = parseIsoDate(date);
    const useForecast = tripDate <= forecastLimit;
    const refYear = tripDate.getFullYear() - 1;
    const queryDate = useForecast ? date : date.replace(/^\d{4}/, String(refYear));
    const cacheKey = `weather_${lat}_${lng}_${queryDate}`;

    if (seen.has(cacheKey)) {
      seen.get(cacheKey).push(day);
      return;
    }
    seen.set(cacheKey, [day]);

    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      applyWeather(JSON.parse(cached), seen.get(cacheKey));
      return;
    }

    let url;
    if (useForecast) {
      url =
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
        `&start_date=${date}&end_date=${date}&timezone=Europe%2FDublin`;
    } else {
      url =
        `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lng}` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum` +
        `&start_date=${queryDate}&end_date=${queryDate}&timezone=Europe%2FDublin`;
    }

    requests.push({ url, cacheKey, useForecast, refYear });
  });

  // Fetch in small batches to avoid 429 rate limits
  const BATCH_SIZE = 3;
  function fetchBatch(i) {
    const batch = requests.slice(i, i + BATCH_SIZE);
    if (!batch.length) return;
    Promise.allSettled(
      batch.map(({ url, cacheKey, useForecast, refYear }) =>
        fetch(url)
          .then((r) => r.json())
          .then((data) => {
            if (!data.daily) return;
            const result = { daily: data.daily, useForecast, refYear };
            try {
              sessionStorage.setItem(cacheKey, JSON.stringify(result));
            } catch {
              /* ignore quota errors */
            }
            applyWeather(result, seen.get(cacheKey));
          }),
      ),
    )
      .then(() => fetchBatch(i + BATCH_SIZE))
      .catch((err) => console.warn("Weather fetch failed:", err));
  }
  fetchBatch(0);
}

function applyWeather({ daily, useForecast, refYear }, dayNums) {
  const code = daily.weather_code[0];
  const tMax = Math.round(daily.temperature_2m_max[0]);
  const tMin = Math.round(daily.temperature_2m_min[0]);
  const { icon, label } = weatherInfo(code);

  let html = `<i class="fa-solid ${icon}"></i> ${tMin}–${tMax}°C`;
  if (useForecast && daily.precipitation_probability_max?.[0] != null) {
    html += ` · <i class="fa-solid fa-droplet"></i> ${daily.precipitation_probability_max[0]}%`;
  } else if (!useForecast && daily.precipitation_sum?.[0] > 0) {
    html += ` · <i class="fa-solid fa-droplet"></i> ${daily.precipitation_sum[0].toFixed(1)} mm`;
  }
  if (!useForecast) html += ` <span class="weather-ref">(réf. ${refYear})</span>`;

  const title = useForecast ? `Prévision : ${label}` : `Météo réelle ${refYear} : ${label}`;

  dayNums.forEach((day) => {
    const badge = document.querySelector(`#jour-${day} .weather-badge`);
    if (!badge) return;
    badge.innerHTML = html;
    badge.title = title;
    badge.classList.add("loaded");
  });
}
