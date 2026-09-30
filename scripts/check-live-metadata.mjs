import { createInterface } from "node:readline";
import { writeFileSync } from "node:fs";
if (process.stdin.isTTY) process.stdin.setRawMode(true);
console.log("Ready for private metadata check JSON on stdin.");
const input = createInterface({ input: process.stdin });
const line = await new Promise((resolve) => input.once("line", resolve));
input.close();
if (process.stdin.isTTY) process.stdin.setRawMode(false);
process.stdin.pause();
const { bearer } = JSON.parse(line);
const base = "https://addis-cable.johannesbekele537.chatgpt.site";
const headers = { "OAI-Sites-Authorization": "Bearer " + bearer };
const results = {};
for (const path of ["/", "/authorized/", "/robots.txt", "/sitemap.xml"]) {
  const r = await fetch(base + path, { headers, redirect: "manual" });
  const text = await r.text();
  results[path] = {
    status: r.status,
    containsOldHost: text.includes("zippy-field-2275"),
    correctOrigin: text.includes(base),
  };
  if (path === "/")
    results[path].canonical = text.match(
      /<link rel="canonical" href="([^"]+)"/,
    )?.[1];
  if (path === "/authorized/")
    results[path].hasScanner =
      text.includes("Start camera") &&
      text.includes("QR label link or product code");
  if (!r.ok || results[path].containsOldHost)
    throw new Error("Live metadata check failed for " + path);
}
writeFileSync(
  "artifacts/qa/live-metadata.json",
  JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results, null, 2));
