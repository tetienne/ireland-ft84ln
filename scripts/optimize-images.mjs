#!/usr/bin/env node
/**
 * Downloads all photo URLs from data.json, converts to WebP,
 * resizes to max 480px wide, and rewrites paths in data.js.
 * Run during CI build — no images stored in the repo.
 */
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import sharp from "sharp";

const MAX_WIDTH = 480;
const OUT_DIR = "img";
const DATA_JSON = "data.json";
const DATA_JS = "data.js";
const USER_AGENT = "IrelandTripSiteBuilder/1.0 (GitHub Actions; contact: github)";
const DELAY_MS = 1500;
const MAX_RETRIES = 5;

async function main() {
  const data = JSON.parse(await readFile(DATA_JSON, "utf8"));
  await mkdir(OUT_DIR, { recursive: true });

  // Collect unique photo URLs from stops across all days
  const urlMap = new Map();
  const urls = [];
  for (const day of data.days) {
    for (const stop of day.stops || []) {
      if (stop.photo && !urlMap.has(stop.photo)) {
        const hash = createHash("md5").update(stop.photo).digest("hex").slice(0, 10);
        const outPath = `${OUT_DIR}/${hash}.webp`;
        urlMap.set(stop.photo, outPath);
        urls.push(stop.photo);
      }
    }
  }

  console.log(`Found ${urls.length} photos to optimize`);

  for (const url of urls) {
    const outPath = urlMap.get(url);

    // Skip if already cached from a previous build
    try {
      const s = await stat(outPath);
      if (s.size > 0) {
        console.log(`  CACHED ${outPath}`);
        continue;
      }
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
    }

    try {
      let res;
      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        res = await fetch(url, {
          headers: { "User-Agent": USER_AGENT },
        });
        if (res.status !== 429) break;
        const wait = (attempt + 1) * 3000;
        console.warn(`  429 for ${url.slice(-40)}, retry in ${wait}ms...`);
        await new Promise((r) => setTimeout(r, wait));
      }
      if (!res.ok) {
        console.warn(`  SKIP ${url} (${res.status})`);
        urlMap.delete(url);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      await sharp(buffer)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(outPath);

      const orig = (buffer.length / 1024).toFixed(1);
      const { size } = await stat(outPath);
      const opt = (size / 1024).toFixed(1);
      console.log(`  ${orig} Ko -> ${opt} Ko  ${outPath}`);
    } catch (err) {
      console.warn(`  ERROR ${url}: ${err.message}`);
      urlMap.delete(url);
    }

    await new Promise((r) => setTimeout(r, DELAY_MS));
  }

  // Rewrite data.js with local paths in a single pass
  let dataJs = await readFile(DATA_JS, "utf8");
  const escaped = [...urlMap.keys()].map((u) => u.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (escaped.length > 0) {
    const re = new RegExp(escaped.join("|"), "g");
    dataJs = dataJs.replace(re, (match) => urlMap.get(match));
  }
  await writeFile(DATA_JS, dataJs);

  console.log(`\nDone: ${urlMap.size}/${urls.length} images optimized`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
