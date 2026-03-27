export function computeStats(data) {
  const days = data.days;

  const kilometres = days.reduce((sum, d) => {
    if (!d.distance) return sum;
    const num = parseInt(d.distance.replace(/[^0-9]/g, ''), 10);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const comtes = new Set(days.flatMap((d) => d.counties || [])).size;

  return {
    jours: days.length,
    voyageurs: data.trip.stats.voyageurs,
    kilometres: `~${kilometres}`,
    comtes
  };
}

export function computeBudgetTotals(days) {
  days.forEach((day) => {
    if (day.budget && day.budget.entries) {
      day.budget.total = day.budget.entries.reduce((sum, e) => sum + (e.amount || 0), 0);
    }
  });
}
