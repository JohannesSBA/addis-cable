import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync, writeFileSync } from "node:fs";
const base = process.argv[2] || "http://127.0.0.1:3001";
const browser = await chromium.launch();
mkdirSync("artifacts/qa", { recursive: true });
const result = { base, checks: [], errors: [], accessibility: [] };
const assert = (value, message) => {
  result.checks.push({ message, passed: Boolean(value) });
  if (!value) throw new Error(message);
};
try {
  const desktop = await (
    await browser.newContext({ viewport: { width: 1440, height: 1000 } })
  ).newPage();
  desktop.on("pageerror", (e) => result.errors.push(e.message));
  await desktop.goto(base, { waitUntil: "networkidle" });
  await desktop.evaluate(() => document.fonts.ready);
  await desktop.waitForFunction(
    () => {
      const v = document.querySelector("video");
      return v && v.currentTime > 0.25 && !v.paused;
    },
    { timeout: 20000 },
  );
  const video = await desktop
    .locator("video")
    .evaluate((v) => ({
      width: v.videoWidth,
      height: v.videoHeight,
      muted: v.muted,
      loop: v.loop,
      autoplay: v.autoplay,
      playsInline: v.playsInline,
      poster: v.poster,
      time: v.currentTime,
    }));
  result.video = video;
  assert(
    video.height >= 1080 &&
      video.muted &&
      video.loop &&
      video.autoplay &&
      video.playsInline &&
      !!video.poster,
    "Hero plays muted at 1080p with loop, autoplay, inline playback, and poster",
  );
  const pause = desktop.getByRole("button", { name: "Pause background film" });
  await pause.click();
  await desktop.waitForFunction(() => document.querySelector("video").paused);
  assert(true, "Background film can be paused with its visible control");
  await desktop.getByRole("button", { name: "Play background film" }).click();
  await desktop.waitForFunction(() => !document.querySelector("video").paused);
  await desktop.screenshot({
    path: "artifacts/qa/desktop.png",
    fullPage: true,
  });
  await desktop.screenshot({ path: "artifacts/qa/hero-desktop.png" });
  const scan = await new AxeBuilder({ page: desktop })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  result.accessibility = scan.violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    description: v.description,
    nodes: v.nodes.map((n) => ({
      target: n.target,
      summary: n.failureSummary,
    })),
  }));
  assert(!result.accessibility.length, "Desktop has no WCAG A/AA violations");
  await desktop.mouse.wheel(0, 330);
  await desktop.waitForFunction(() =>
    Array.from(document.querySelectorAll(".hero-cinema [data-depth]")).every(
      (e) => getComputedStyle(e).transform !== "none",
    ),
  );
  const transforms = await desktop
    .locator(".hero-cinema [data-depth]")
    .evaluateAll((nodes) =>
      nodes.map((n) => ({
        depth: n.dataset.depth,
        transform: getComputedStyle(n).transform,
      })),
    );
  result.parallax = transforms;
  assert(
    new Set(transforms.map((t) => t.transform)).size === 3,
    "Hero parallax has three distinct transform depths",
  );
  const links = await desktop
    .locator('a[href^="/"]')
    .evaluateAll((nodes) => [
      ...new Set(nodes.map((n) => n.getAttribute("href").split("#")[0] || "/")),
    ]);
  result.links = [];
  for (const link of links) {
    const response = await desktop.request.get(base + link);
    result.links.push({ path: link, status: response.status() });
    assert(response.ok(), "Internal link responds: " + link);
  }
  await desktop.goto(base + "/contact", { waitUntil: "networkidle" });
  const formScan = await new AxeBuilder({ page: desktop })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  assert(
    !formScan.violations.length,
    "Enquiry form has no WCAG A/AA violations",
  );
  await desktop.getByLabel("Your name").fill("Test Project");
  await desktop.getByLabel("Email address").fill("test@example.com");
  await desktop
    .getByLabel("Tell us about your project")
    .fill("Verification only. No message will be sent.");
  await desktop.getByRole("button", { name: "Prepare email enquiry" }).click();
  await desktop.getByRole("status").waitFor();
  assert(
    await desktop.getByRole("status").isVisible(),
    "Enquiry creates an email draft without pretending it was sent",
  );
  const mobile = await (
    await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    })
  ).newPage();
  await mobile.goto(base, { waitUntil: "networkidle" });
  const dimensions = await mobile.evaluate(() => ({
    width: innerWidth,
    content: document.documentElement.scrollWidth,
  }));
  assert(
    dimensions.width === dimensions.content,
    "Mobile page has no horizontal overflow",
  );
  await mobile.getByRole("button", { name: "Open navigation" }).click();
  await mobile
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Start a project" })
    .waitFor({ state: "visible" });
  assert(
    await mobile
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Start a project" })
      .isVisible(),
    "Mobile navigation opens and exposes the project link",
  );
  await mobile.getByRole("button", { name: "Close navigation" }).click();
  await mobile.screenshot({ path: "artifacts/qa/mobile.png", fullPage: true });
  const mobileScan = await new AxeBuilder({ page: mobile })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  result.mobileAccessibility = mobileScan.violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    nodes: v.nodes.map((n) => n.target),
  }));
  assert(!mobileScan.violations.length, "Mobile has no WCAG A/AA violations");
  await mobile.mouse.wheel(0, 280);
  await mobile.waitForFunction(() =>
    Array.from(document.querySelectorAll(".hero-cinema [data-depth]")).some(
      (e) => getComputedStyle(e).transform !== "none",
    ),
  );
  assert(true, "Mobile parallax responds to scrolling");
  const reduced = await (
    await browser.newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    })
  ).newPage();
  await reduced.goto(base, { waitUntil: "networkidle" });
  await reduced.mouse.wheel(0, 280);
  const reducedState = await reduced.evaluate(() => ({
    paused: document.querySelector("video").paused,
    transforms: Array.from(document.querySelectorAll("[data-depth]")).map(
      (e) => getComputedStyle(e).transform,
    ),
  }));
  result.reducedMotion = reducedState;
  assert(
    reducedState.paused && reducedState.transforms.every((t) => t === "none"),
    "Reduced motion keeps the poster still and disables all parallax",
  );
  assert(result.errors.length === 0, "No browser runtime errors");
  result.passed = true;
} catch (e) {
  result.passed = false;
  result.failure = e.message;
} finally {
  writeFileSync("artifacts/qa/report.json", JSON.stringify(result, null, 2));
  await browser.close();
  console.log(JSON.stringify(result, null, 2));
  if (!result.passed) process.exitCode = 1;
}
