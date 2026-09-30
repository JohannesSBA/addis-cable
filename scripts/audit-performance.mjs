import { existsSync, realpathSync, writeFileSync } from "node:fs";
import { delimiter, dirname, join } from "node:path";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import { createInterface } from "node:readline";
const url = process.argv[2] || "http://127.0.0.1:3001";
const privateReview = process.argv.includes("--private-sites");
let bearer = null;
if (privateReview) {
  if (process.stdin.isTTY) process.stdin.setRawMode(true);
  console.log("Ready for private performance JSON on stdin.");
  const input = createInterface({ input: process.stdin });
  const line = await new Promise((resolve) => input.once("line", resolve));
  input.close();
  if (process.stdin.isTTY) process.stdin.setRawMode(false);
  process.stdin.pause();
  bearer = JSON.parse(line).bearer;
  const response = await fetch(url, {
    redirect: "manual",
    headers: { "OAI-Sites-Authorization": "Bearer " + bearer },
  });
  if (!response.ok)
    throw new Error(
      "Private review did not return a successful response for the performance audit.",
    );
}
const bin = process.env.PATH.split(delimiter)
  .map((dir) => join(dir, "lighthouse"))
  .find(existsSync);
if (!bin)
  throw new Error(
    "Run with pnpm --package=lighthouse dlx node scripts/audit-performance.mjs",
  );
const entry = createRequire(join(dirname(bin), "probe.js")).resolve(
  "lighthouse",
);
const { default: lighthouse } = await import(pathToFileURL(entry));
const resolve = createRequire(entry);
const chromeLauncher = await import(
  pathToFileURL(resolve.resolve("chrome-launcher"))
);
const chrome = await chromeLauncher.launch({
  chromePath:
    "/Users/johannesdev/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
  chromeFlags: ["--headless", "--no-first-run"],
});
try {
  const { lhr } = await lighthouse(url, {
    port: chrome.port,
    output: "json",
    logLevel: "error",
    extraHeaders: bearer
      ? { "OAI-Sites-Authorization": "Bearer " + bearer }
      : undefined,
  });
  let report = JSON.stringify(lhr, null, 2);
  if (bearer) report = report.split(bearer).join("[redacted]");
  writeFileSync(
    "artifacts/qa/" + (privateReview ? "live-" : "") + "lighthouse.json",
    report,
  );
  console.log(
    JSON.stringify(
      {
        url: lhr.finalDisplayedUrl,
        scores: Object.fromEntries(
          Object.entries(lhr.categories).map(([key, category]) => [
            key,
            Math.round(category.score * 100),
          ]),
        ),
        metrics: Object.fromEntries(
          [
            "first-contentful-paint",
            "largest-contentful-paint",
            "total-blocking-time",
            "cumulative-layout-shift",
          ].map((key) => [key, lhr.audits[key].displayValue]),
        ),
        runtimeError: lhr.runtimeError,
      },
      null,
      2,
    ),
  );
} finally {
  await chrome.kill();
}
