import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";
function moduleFrom(file, require, env = {}) {
  const exports = {};
  const source = ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.CommonJS,
    },
  }).outputText;
  vm.runInNewContext(source, {
    exports,
    require,
    URL,
    process: { env },
    console: { error() {} },
  });
  return exports;
}
const { parseQrPayload, verificationPath } = moduleFrom("lib/qr-payload.ts");
const cases = [
  [
    "https://www.addiscable.com/authorized/1.5/REVIEW-CODE",
    undefined,
    "1.5",
    "REVIEW-CODE",
  ],
  ["/authorized/25/REVIEW%2FCODE%2B", undefined, "25", "REVIEW/CODE+"],
  [
    "https://www.addiscable.com/?gauge=4&qr=REVIEW-CODE",
    undefined,
    "4",
    "REVIEW-CODE",
  ],
  ["authorized:2.5/REVIEW-CODE", undefined, "2.5", "REVIEW-CODE"],
  ["4 REVIEW-CODE", undefined, "4", "REVIEW-CODE"],
  ["REVIEW-CODE", "1.5", "1.5", "REVIEW-CODE"],
  [
    "https://untrusted.example/authorized/4/REVIEW-CODE",
    undefined,
    "4",
    "REVIEW-CODE",
  ],
];
for (const [raw, selected, size, encryptedId] of cases) {
  const result = parseQrPayload(raw, selected);
  assert.equal(result?.size, size);
  assert.equal(result?.encryptedId, encryptedId);
  assert.ok(verificationPath(result).startsWith("/authorized/"));
}
for (const raw of [
  "",
  "https://untrusted.example/",
  "/authorized/4/%ZZ",
  "/authorized/4/",
  "/authorized/4/ID/extra",
  "javascript:alert(1)",
  "4 wrong code",
  "x".repeat(5000),
])
  assert.equal(parseQrPayload(raw), null, raw);
assert.equal(parseQrPayload("REVIEW-CODE", "4;DROP TABLE"), null);
let row,
  table = true;
const queries = [];
class Pool {
  async query(query, values) {
    queries.push({ query, values });
    if (query.startsWith("SELECT to_regclass"))
      return { rows: table ? [{ name: "qr_codes15" }] : [] };
    if (query.startsWith("ALTER")) return { rows: [] };
    return { rows: row ? [row] : [] };
  }
}
const { verifyCable } = moduleFrom("lib/qr-verification.ts", () => ({ Pool }), {
  DATABASE_URL: "mock://only",
});
row = { prev_scan_count: 0, url: null };
assert.equal((await verifyCable("1.5", "REVIEW-CODE")).status, "fresh");
row = { prev_scan_count: 3, url: null };
const repeat = await verifyCable("1.5", "REVIEW-CODE");
assert.equal(repeat.status, "repeat");
assert.equal(repeat.scanCount, 3);
row = null;
assert.equal((await verifyCable("1.5", "REVIEW-CODE")).status, "invalid");
table = false;
assert.equal((await verifyCable("4", "REVIEW-CODE")).status, "invalid");
assert.equal((await verifyCable("bad-size", "REVIEW-CODE")).status, "invalid");
const offline = moduleFrom("lib/qr-verification.ts", () => ({ Pool }));
assert.equal(
  (await offline.verifyCable("1.5", "REVIEW-CODE")).status,
  "unavailable",
);
const update = queries.find(({ query }) => query.includes("WITH updated"));
assert.ok(update.query.includes("scan_count - 1 AS prev_scan_count"));
assert.ok(update.query.includes("WHERE encrypted_id = $1"));
assert.equal(update.values[0], "REVIEW-CODE");
console.log(
  "Verification parser, safe routing, and fresh/repeat/invalid/unavailable database outcomes passed using isolated fixtures.",
);
