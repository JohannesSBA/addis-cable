import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { createInterface } from "node:readline";
const zxing = createRequire(import.meta.resolve("@zxing/browser"))(
  "@zxing/library",
);
const base = process.argv[2] || "http://127.0.0.1:3001";
const browser = await chromium.launch();
const privateReview = process.argv.includes("--private-sites");
let bearer = null;
if (privateReview) {
  console.log("Ready for private review QA JSON on stdin.");
  const input = createInterface({ input: process.stdin });
  const line = await new Promise((resolve) => input.once("line", resolve));
  input.close();
  process.stdin.pause();
  bearer = JSON.parse(line).bearer;
}
const origin = new URL(base).origin;
const artifact = (name) =>
  "artifacts/qa/" + (privateReview ? "live-" : "") + name;
async function createTestContext(options) {
  const context = await browser.newContext(options);
  if (bearer)
    await context.route(origin + "/**", (route) =>
      route.continue({
        headers: {
          ...route.request().headers(),
          "OAI-Sites-Authorization": "Bearer " + bearer,
        },
      }),
    );
  return context;
}
mkdirSync("artifacts/qa", { recursive: true });
const result = { base, checks: [], errors: [], accessibility: [] };
const assert = (value, message) => {
  result.checks.push({ message, passed: Boolean(value) });
  if (!value) throw new Error(message);
};
try {
  const desktop = await (
    await createTestContext({ viewport: { width: 1440, height: 1000 } })
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
  const video = await desktop.locator("video").evaluate((v) => ({
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
    path: artifact("desktop.png"),
    fullPage: true,
  });
  await desktop.screenshot({ path: artifact("hero-desktop.png") });
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
    const response = await desktop.request.get(base + link, {
      headers: bearer ? { "OAI-Sites-Authorization": "Bearer " + bearer } : {},
    });
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
    await createTestContext({
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
  await mobile.screenshot({ path: artifact("mobile.png"), fullPage: true });
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
  // Synthetic label fixtures are intercepted before reaching the real scan database.
  const verify = await (
    await createTestContext({ viewport: { width: 1440, height: 1000 } })
  ).newPage();
  verify.on("pageerror", (e) => result.errors.push(e.message));
  await verify.addInitScript(() => {
    navigator.mediaDevices.getUserMedia = async () => {
      throw new DOMException("Test permission denial", "NotAllowedError");
    };
  });
  await verify.route("**/authorized/*/*", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<h1>Intercepted verification fixture</h1>",
    }),
  );
  await verify.goto(base + "/authorized", { waitUntil: "networkidle" });
  assert(
    await verify.getByRole("button", { name: "Start camera" }).isVisible(),
    "Verification has an explicit camera start control",
  );
  await verify.getByRole("button", { name: "Start camera" }).click();
  await verify.locator(".scanner-panel .verification-error").waitFor();
  assert(
    (
      await verify.locator(".scanner-panel .verification-error").innerText()
    ).includes("declined"),
    "Camera permission denial offers manual entry",
  );
  await verify
    .getByLabel("QR label link or product code")
    .fill("bad incomplete input");
  await verify
    .getByRole("button", { name: "Verify product", exact: true })
    .click();
  assert(
    await verify.locator("#verification-form-error").isVisible(),
    "Malformed codes show an actionable validation error",
  );
  await verify.getByLabel("Cable size").selectOption("1.5");
  await verify
    .getByLabel("QR label link or product code")
    .fill("REVIEW-MANUAL-CODE");
  await verify
    .getByRole("button", { name: "Verify product", exact: true })
    .click();
  await verify.waitForURL("**/authorized/1.5/REVIEW-MANUAL-CODE");
  assert(true, "Printed code and size open the correct verification record");
  await verify.goto(base + "/authorized", { waitUntil: "networkidle" });
  await verify
    .getByLabel("QR label link or product code")
    .fill("https://www.addiscable.com/authorized/25/REVIEW%2FCODE%2B");
  await verify
    .getByRole("button", { name: "Verify product", exact: true })
    .click();
  await verify.waitForURL("**/authorized/25/REVIEW%2FCODE%2B");
  assert(true, "Pasted QR URLs preserve encoded product IDs");
  await verify.goto(base + "/authorized", { waitUntil: "networkidle" });
  const verificationScan = await new AxeBuilder({ page: verify })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  assert(
    !verificationScan.violations.length,
    "Desktop verification has no WCAG A/AA violations",
  );
  await verify.screenshot({
    path: artifact("verification-desktop.png"),
    fullPage: true,
  });
  await verify.setViewportSize({ width: 390, height: 844 });
  assert(
    await verify.evaluate(
      () => innerWidth === document.documentElement.scrollWidth,
    ),
    "Mobile verification has no horizontal overflow",
  );
  const verificationMobileScan = await new AxeBuilder({ page: verify })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  assert(
    !verificationMobileScan.violations.length,
    "Mobile verification has no WCAG A/AA violations",
  );
  await verify.screenshot({
    path: artifact("verification-mobile.png"),
    fullPage: true,
  });
  await verify.getByRole("button", { name: "Open navigation" }).click();
  await verify
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Verify product" })
    .waitFor({ state: "visible" });
  assert(
    await verify
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Verify product" })
      .isVisible(),
    "Verify product is prominent in the mobile navigation",
  );

  const camera = await (
    await createTestContext({ viewport: { width: 390, height: 844 } })
  ).newPage();
  camera.on("pageerror", (e) => result.errors.push(e.message));
  const matrix = new zxing.QRCodeWriter().encode(
    "https://www.addiscable.com/authorized/4/REVIEW-CAMERA-CODE",
    zxing.BarcodeFormat.QR_CODE,
    256,
    256,
    null,
  );
  const pixels = Array.from({ length: 256 * 256 }, (_, i) =>
    matrix.get(i % 256, Math.floor(i / 256)),
  );
  await camera.addInitScript((pixels) => {
    navigator.mediaDevices.getUserMedia = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 512, 512);
      const stream = canvas.captureStream(0);
      const track = stream.getVideoTracks()[0];
      const frames = setInterval(() => track.requestFrame(), 80);
      track.addEventListener("ended", () => clearInterval(frames));
      window.testCamera = {
        stream,
        canvas,
        showCode() {
          ctx.fillStyle = "black";
          pixels.forEach((black, i) => {
            if (black)
              ctx.fillRect((i % 256) * 2, Math.floor(i / 256) * 2, 2, 2);
          });
          track.requestFrame();
        },
      };
      return stream;
    };
  }, pixels);
  await camera.route("**/authorized/*/*", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<h1>Intercepted camera verification fixture</h1>",
    }),
  );
  await camera.goto(base + "/authorized", { waitUntil: "networkidle" });
  await camera.getByRole("button", { name: "Start camera" }).click();
  await camera
    .getByRole("status")
    .filter({ hasText: "Camera active" })
    .waitFor();
  await camera.getByRole("button", { name: "Stop camera" }).click();
  assert(
    await camera.evaluate(() =>
      window.testCamera.stream
        .getTracks()
        .every((track) => track.readyState === "ended"),
    ),
    "Stopping the scanner releases all camera tracks",
  );
  await camera.getByRole("button", { name: "Start camera" }).click();
  await camera
    .getByRole("status")
    .filter({ hasText: "Camera active" })
    .waitFor();
  await camera.evaluate(() => window.testCamera.showCode());
  await camera.waitForURL("**/authorized/4/REVIEW-CAMERA-CODE", {
    timeout: 15000,
  });
  assert(
    true,
    "The actual QR decoder reads a camera frame and opens its matching record",
  );
  const reduced = await (
    await createTestContext({
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
  writeFileSync(artifact("report.json"), JSON.stringify(result, null, 2));
  await browser.close();
  console.log(JSON.stringify(result, null, 2));
  if (!result.passed) process.exitCode = 1;
}
