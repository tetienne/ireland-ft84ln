export function computeStats(data) {
  const days = data.days;

  const kilometres = days.reduce((sum, d) => sum + (d.distanceKm || 0), 0);
  const comtes = new Set(days.flatMap((d) => d.counties || [])).size;

  return {
    jours: days.length,
    voyageurs: data.trip.stats.voyageurs,
    kilometres: `~${kilometres}`,
    comtes,
  };
}

export function withBudgetTotals(days) {
  return days.map((day) => {
    if (day.budget && day.budget.entries) {
      return {
        ...day,
        budget: {
          ...day.budget,
          total: day.budget.entries.reduce((sum, e) => sum + (e.amount || 0), 0),
        },
      };
    }
    return day;
  });
}
