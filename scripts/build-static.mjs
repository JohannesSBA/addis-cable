import {
  cpSync,
  mkdirSync,
  rmSync,
  writeFileSync,
  readFileSync,
  existsSync,
  symlinkSync,
} from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
const root = process.cwd(),
  scratch = path.join(root, ".sites-runtime/export");
rmSync(scratch, { recursive: true, force: true });
mkdirSync(scratch, { recursive: true });
for (const name of [
  "app",
  "components",
  "lib",
  "hooks",
  "tsconfig.json",
  "postcss.config.mjs",
  "package.json",
  "pnpm-lock.yaml",
])
  cpSync(path.join(root, name), path.join(scratch, name), { recursive: true });
symlinkSync(
  path.join(root, "node_modules"),
  path.join(scratch, "node_modules"),
  "dir",
);
rmSync(path.join(scratch, "app/[...catchall]"), {
  recursive: true,
  force: true,
});
rmSync(path.join(scratch, "app/authorized"), { recursive: true, force: true });
mkdirSync(path.join(scratch, "app/authorized"), { recursive: true });
writeFileSync(
  path.join(scratch, "app/authorized/page.tsx"),
  'import {InfoPage} from "@/components/info-page"; export default function Verify(){return <InfoPage title="Verify your Addis Cable" intro="Use our secure verification service to check the QR label on your cable packaging." primaryCta={{label:"Open cable verification",href:"https://www.addiscable.com/authorized"}}/>;}',
);
writeFileSync(
  path.join(scratch, "next.config.mjs"),
  'export default {output:"export",outputFileTracingRoot:process.cwd(),trailingSlash:true,images:{unoptimized:true}};',
);
const assets = [
  "brand/logo.svg",
  "brand/favicon.svg",
  "brand/favicon-32.png",
  "brand/apple-touch-icon.png",
  "brand/og-image.png",
  "brand/copper-hero.webp",
  "brand/hero-poster.webp",
  "brand/low-voltage.svg",
  "brand/medium-voltage.svg",
  "brand/conductors.svg",
  "media/copper-loop.mp4",
  "media/factory-poster.jpg",
];
for (const asset of assets) {
  const dest = path.join(scratch, "public", asset);
  mkdirSync(path.dirname(dest), { recursive: true });
  cpSync(path.join(root, "public", asset), dest);
}
const result = spawnSync(
  process.execPath,
  [path.join(root, "node_modules/next/dist/bin/next"), "build", "--webpack"],
  {
    cwd: scratch,
    stdio: "inherit",
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
  },
);
if (result.status !== 0) process.exit(result.status || 1);
rmSync(path.join(root, "out"), { recursive: true, force: true });
cpSync(path.join(scratch, "out"), path.join(root, "out"), { recursive: true });
console.log(
  "Marketing site exported. The production PostgreSQL verification service remains at www.addiscable.com/authorized.",
);
