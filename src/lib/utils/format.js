export function formatDrive(minutes) {
  if (!minutes) return '';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `~${m} min`;
  if (m === 0) return `~${h}h`;
  return `~${h}h${String(m).padStart(2, '0')}`;
}

export function formatDistance(km) {
  if (!km) return '';
  return `~${km} km`;
}
