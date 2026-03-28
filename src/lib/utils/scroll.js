export function scrollToDay(dayNum, updateHash = false) {
  const card = document.getElementById(`jour-${dayNum}`);
  if (!card) return;
  card.scrollIntoView({ behavior: "smooth", block: "start" });
  if (updateHash) {
    history.replaceState(null, "", `#jour-${dayNum}`);
  }
}
