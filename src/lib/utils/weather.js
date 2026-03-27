import { parseIsoDate } from './dates.js';

const WEATHER_TABLE = [
  { max: 1, icon: 'fa-sun', label: 'Ensoleillé' },
  { max: 3, icon: 'fa-cloud-sun', label: 'Nuageux' },
  { max: 48, icon: 'fa-cloud', label: 'Couvert' },
  { max: 67, icon: 'fa-cloud-rain', label: 'Pluie' },
  { max: 77, icon: 'fa-snowflake', label: 'Neige' },
  { max: 82, icon: 'fa-cloud-showers-heavy', label: 'Averses' }
];

function weatherInfo(code) {
  return (
    WEATHER_TABLE.find((e) => code <= e.max) || {
      icon: 'fa-cloud-bolt',
      label: 'Orage'
    }
  );
}

function buildWeatherHtml({ daily, useForecast, refYear }) {
  const code = daily.weather_code[0];
  const tMax = Math.round(daily.temperature_2m_max[0]);
  const tMin = Math.round(daily.temperature_2m_min[0]);
  const { icon } = weatherInfo(code);

  let html = `<i class="fa-solid ${icon}"></i> ${tMin}–${tMax}°C`;
  if (useForecast && daily.precipitation_probability_max?.[0] != null) {
    html += ` · <i class="fa-solid fa-droplet"></i> ${daily.precipitation_probability_max[0]}%`;
  } else if (!useForecast && daily.precipitation_sum?.[0] > 0) {
    html += ` · <i class="fa-solid fa-droplet"></i> ${daily.precipitation_sum[0].toFixed(1)} mm`;
  }
  if (!useForecast) html += ` <span class="weather-ref">(réf. ${refYear})</span>`;
  return html;
}

/**
 * Fetch weather data for all days and return a Map<dayNum, htmlString>
 * via the onUpdate callback (called incrementally as batches complete).
 */
export function fetchWeather(days, onUpdate) {
  const entries = days
    .filter((d) => d.mapCenter)
    .map((d) => ({
      day: d.day,
      date: d.isoDate,
      lat: d.mapCenter.lat,
      lng: d.mapCenter.lng
    }));

  const now = new Date();
  const forecastLimit = new Date(now);
  forecastLimit.setDate(forecastLimit.getDate() + 15);

  const seen = new Map();
  const requests = [];
  const results = new Map();

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
      const result = JSON.parse(cached);
      const html = buildWeatherHtml(result);
      seen.get(cacheKey).forEach((d) => results.set(d, html));
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

  // Apply cached results immediately
  if (results.size > 0) {
    onUpdate(new Map(results));
  }

  // Fetch in small batches
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
            const html = buildWeatherHtml(result);
            seen.get(cacheKey).forEach((d) => results.set(d, html));
            onUpdate(new Map(results));
          })
      )
    )
      .then(() => fetchBatch(i + BATCH_SIZE))
      .catch((err) => console.warn('Weather fetch failed:', err));
  }
  fetchBatch(0);
}
