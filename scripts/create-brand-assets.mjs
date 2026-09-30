import { writeFileSync, mkdirSync } from "node:fs";
mkdirSync("public/brand", { recursive: true });
const mark =
  '<path d="M5 35 20 8h5l15 27M12 35 23 15l11 20M18 35l5-9 5 9" fill="none" stroke="currentColor" stroke-width="3.2"/><path d="M9 29h28" stroke="currentColor" stroke-width="3.2"/>';
writeFileSync(
  "public/brand/logo.svg",
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 52"><g transform="translate(2 3)" color="#c87547">' +
    mark +
    '</g><text x="58" y="27" font-family="Arial,sans-serif" font-weight="bold" font-size="27" fill="#18221d">ADDIS</text><text x="59" y="44" font-family="Arial,sans-serif" font-size="13" letter-spacing="5.8" fill="#18221d">CABLE</text></svg>',
);
writeFileSync(
  "public/brand/favicon.svg",
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="10" fill="#18221d"/><g transform="translate(10 10)" color="#dc956b">' +
    mark +
    "</g></svg>",
);
const defs =
  '<defs><linearGradient id="rubber" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#34423d"/><stop offset=".45" stop-color="#171e1b"/><stop offset="1" stop-color="#070d0b"/></linearGradient><linearGradient id="copper" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f2c9a0"/><stop offset=".35" stop-color="#ce8551"/><stop offset=".7" stop-color="#8d4a2d"/><stop offset="1" stop-color="#d59665"/></linearGradient><linearGradient id="silver" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f0f0e8"/><stop offset=".35" stop-color="#a8b3ab"/><stop offset=".7" stop-color="#68776e"/><stop offset="1" stop-color="#ced5cb"/></linearGradient><filter id="shadow"><feGaussianBlur stdDeviation="10"/></filter></defs>';
const start =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 390">' +
  defs +
  '<ellipse cx="270" cy="306" rx="155" ry="13" fill="#a6ae9d" opacity=".38" filter="url(#shadow)"/>';
function bundle(cx, cy, r, fill = "copper") {
  let out =
    '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#8b502f"/>';
  const rr = r / 4.8;
  for (let row = -2; row <= 2; row++) {
    for (let col = -2; col <= 2; col++) {
      const x = cx + col * rr * 1.9 + (row % 2 ? rr * 0.9 : 0),
        y = cy + row * rr * 1.65;
      if (Math.hypot(x - cx, y - cy) < r - rr * 0.5)
        out +=
          '<circle cx="' +
          x +
          '" cy="' +
          y +
          '" r="' +
          rr +
          '" fill="url(#' +
          fill +
          ')" stroke="#885235" stroke-width=".6"/>';
    }
  }
  return out;
}
let low =
  start +
  '<g transform="translate(50 220) rotate(-23)"><path d="M80-48H365V48H80Z" fill="url(#rubber)"/><ellipse cx="365" cy="0" rx="25" ry="48" fill="#202d27"/><ellipse cx="80" cy="0" rx="28" ry="48" fill="#36463b" stroke="#819080" stroke-width="2"/><ellipse cx="77" cy="0" rx="24" ry="42" fill="#111b16"/><g transform="translate(77 0) scale(.58 1)"><circle cx="0" cy="-21" r="17" fill="#556957"/><circle cx="-18" cy="14" r="17" fill="#293d4f"/><circle cx="19" cy="14" r="17" fill="#73503b"/>' +
  bundle(0, -21, 12) +
  bundle(-18, 14, 12) +
  bundle(19, 14, 12) +
  '</g><path d="M116-32H350" stroke="#788578" stroke-width="2" opacity=".6"/><path d="M115 30H350" stroke="#050c08" stroke-width="4"/></g></svg>';
writeFileSync("public/brand/low-voltage.svg", low);
let med =
  start +
  '<g transform="translate(25 220) rotate(-23)"><path d="M95-60H400V60H95Z" fill="url(#rubber)"/><ellipse cx="400" cy="0" rx="32" ry="60" fill="#25332a"/><ellipse cx="95" cy="0" rx="34" ry="60" fill="#6e7b70" stroke="#94a28b" stroke-width="2"/><ellipse cx="90" cy="0" rx="30" ry="55" fill="#202c24"/><ellipse cx="87" cy="0" rx="24" ry="45" fill="#b9c2b1"/><ellipse cx="84" cy="0" rx="21" ry="41" fill="#273c32"/><ellipse cx="81" cy="0" rx="18" ry="33" fill="#dfd9c2"/><g transform="translate(78 0) scale(.55 1)">' +
  bundle(0, 0, 27) +
  '</g><path d="M135-40H385" stroke="#849183" stroke-width="2" opacity=".7"/><path d="M140 39H385" stroke="#0a140e" stroke-width="5"/></g></svg>';
writeFileSync("public/brand/medium-voltage.svg", med);
let con = start + '<g transform="translate(30 235) rotate(-25)">';
for (let j = -2; j <= 2; j++) {
  let y = j * 21;
  con +=
    '<path d="M80 ' +
    (y - 10) +
    "Q200 " +
    (y - 23) +
    " 405 " +
    (y - 9) +
    "L410 " +
    (y + 8) +
    "Q205 " +
    (y - 1) +
    " 82 " +
    (y + 10) +
    'Z" fill="url(#silver)" stroke="#7e8e80" stroke-width=".5"/>';
}
con +=
  '<g transform="translate(80 0) scale(.6 1)"><circle r="58" fill="#778779"/>';
for (let j = -2; j <= 2; j++)
  for (let k = -2; k <= 2; k++) {
    let x = k * 22 + (j % 2 ? 11 : 0),
      y = j * 19;
    if (Math.hypot(x, y) < 54)
      con +=
        '<circle cx="' +
        x +
        '" cy="' +
        y +
        '" r="11" fill="url(#silver)" stroke="#5f7564" stroke-width="1.2"/>';
  }
con +=
  '</g><path d="M113-48Q240-60 402-48" stroke="#e5e9db" stroke-width="1" opacity=".8"/></g></svg>';
writeFileSync("public/brand/conductors.svg", con);
console.log(
  "Created bespoke conductor mark and three technical product illustrations",
);
