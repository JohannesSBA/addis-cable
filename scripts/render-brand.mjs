import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";
const browser = await chromium.launch();
const page = await browser.newPage();
const favicon = readFileSync("public/brand/favicon.svg", "utf8");
for (const [size, name] of [
  [32, "favicon-32.png"],
  [180, "apple-touch-icon.png"],
]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(
    '<html><body style="margin:0">' +
      favicon.replace(
        "viewBox=",
        'width="' + size + '" height="' + size + '" viewBox=',
      ) +
      "</body></html>",
  );
  await page.screenshot({ path: "public/brand/" + name, omitBackground: true });
}
const image = readFileSync("public/brand/copper-hero.webp").toString("base64");
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(
  '<html><body style="margin:0;background:#101512;color:#f6f5f0;font-family:Arial,sans-serif;width:1200px;height:630px;overflow:hidden;position:relative"><img src="data:image/webp;base64,' +
    image +
    '" style="position:absolute;width:1200px;height:675px;object-fit:cover;top:-22px;left:0"/><div style="position:absolute;inset:0;background:linear-gradient(90deg,#101512a6,transparent 90%)"></div><div style="position:relative;padding:48px 65px"><div style="display:flex;align-items:center;gap:16px">' +
    favicon.replace("viewBox=", 'width="48" height="48" viewBox=') +
    '<strong style="font-size:23px;letter-spacing:2px">ADDIS CABLE</strong></div><div style="font-size:13px;letter-spacing:2px;margin-top:65px;color:#d7dbcf">ENGINEERED IN ETHIOPIA.</div><h1 style="font-size:83px;line-height:1.04;letter-spacing:-4px;margin:30px 0 0;font-weight:500">The power<br/>behind <em style="font-family:Georgia;color:#dc956b;font-weight:400">progress.</em></h1><div style="font-size:17px;margin-top:34px;color:#d7dbcf">PRECISION IN EVERY STRAND.</div></div></body></html>',
);
await page.screenshot({ path: "public/brand/og-image.png" });
await browser.close();
console.log("Rendered favicon, touch icon, and 1200×630 social image");
