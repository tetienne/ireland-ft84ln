#!/usr/bin/env node
/**
 * Downloads all photo URLs from data.json, converts to WebP,
 * resizes to max 480px wide, and rewrites paths in data.js.
 * Run during CI build — no images stored in the repo.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import sharp from "sharp";

const MAX_WIDTH = 480;
const OUT_DIR = "img";
const DATA_JSON = "data.json";
const DATA_JS = "data.js";
const USER_AGENT = "IrelandTripSiteBuilder/1.0 (GitHub Actions; contact: github)";
const DELAY_MS = 500; // polite delay between requests
const MAX_RETRIES = 3;

async function main() {
  const data = JSON.parse(await readFile(DATA_JSON, "utf8"));
  await mkdir(OUT_DIR, { recursive: true });

  // Collect all photo URLs from stops across all days
  const entries = [];
  for (const day of data.days) {
    for (const stop of day.stops || []) {
      if (stop.photo) {
        entries.push(stop);
      }
    }
  }

  console.log(`Found ${entries.length} photos to optimize`);

  // Download and convert sequentially (respect Wikimedia rate limits)
  const urlMap = new Map(); // original URL -> local path
  const seen = new Set();

  for (const stop of entries) {
    const url = stop.photo;
    if (seen.has(url)) continue;
    seen.add(url);

    const hash = createHash("md5").update(url).digest("hex").slice(0, 10);
    const outPath = `${OUT_DIR}/${hash}.webp`;

    try {
      let res;
      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        res = await fetch(url, {
          headers: { "User-Agent": USER_AGENT },
        });
        if (res.status !== 429) break;
        const wait = (attempt + 1) * 2000;
        console.warn(`  429 for ${url.slice(-40)}, retry in ${wait}ms...`);
        await new Promise((r) => setTimeout(r, wait));
      }
      if (!res.ok) {
        console.warn(`  SKIP ${url} (${res.status})`);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      await sharp(buffer)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(outPath);

      const orig = (buffer.length / 1024).toFixed(1);
      const { size } = await import("node:fs").then((fs) =>
        fs.statSync(outPath),
      );
      const opt = (size / 1024).toFixed(1);
      console.log(`  ${orig} Ko -> ${opt} Ko  ${outPath}`);

      urlMap.set(url, outPath);
    } catch (err) {
      console.warn(`  ERROR ${url}: ${err.message}`);
    }

    await new Promise((r) => setTimeout(r, DELAY_MS));
  }

  // Rewrite data.js with local paths
  let dataJs = await readFile(DATA_JS, "utf8");
  for (const [url, localPath] of urlMap) {
    dataJs = dataJs.replaceAll(url, localPath);
  }
  await writeFile(DATA_JS, dataJs);

  console.log(`\nDone: ${urlMap.size}/${entries.length} images optimized`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
