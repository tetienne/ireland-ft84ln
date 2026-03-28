export function extractCoords(gmapsUrl) {
  if (!gmapsUrl) return null;
  const match = gmapsUrl.match(/q=([-\d.]+),([-\d.]+)/);
  return match ? [parseFloat(match[1]), parseFloat(match[2])] : null;
}
