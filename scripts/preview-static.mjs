import http from "node:http";
import { existsSync, statSync, readFileSync } from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";
const root = path.resolve("out"),
  port = Number(process.argv[2] || 3001);
const mime = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".mp4": "video/mp4",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".xml": "application/xml",
};
http
  .createServer((req, res) => {
    let pathname;
    try {
      pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
    } catch {
      res.writeHead(400).end();
      return;
    }
    let file = path.resolve(root, "." + pathname);
    if (!file.startsWith(root + path.sep) && file !== root) {
      res.writeHead(403).end();
      return;
    }
    if (existsSync(file) && statSync(file).isDirectory())
      file = path.join(file, "index.html");
    const status = existsSync(file) && statSync(file).isFile() ? 200 : 404;
    if (status === 404) file = path.join(root, "404.html");
    let data = readFileSync(file);
    const type = mime[path.extname(file)] || "application/octet-stream";
    const headers = {
      "Content-Type": type,
      "Cache-Control": "public, max-age=3600",
    };
    const range = req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    if (range && type === "video/mp4") {
      const start = Number(range[1]),
        end = range[2]
          ? Math.min(Number(range[2]), data.length - 1)
          : data.length - 1;
      headers["Accept-Ranges"] = "bytes";
      headers["Content-Range"] =
        "bytes " + start + "-" + end + "/" + data.length;
      data = data.subarray(start, end + 1);
      headers["Content-Length"] = data.length;
      res.writeHead(206, headers);
      res.end(req.method === "HEAD" ? undefined : data);
      return;
    }
    if (
      req.headers["accept-encoding"]?.includes("gzip") &&
      /html|css|javascript|json|svg|text|xml/.test(type)
    ) {
      data = gzipSync(data);
      headers["Content-Encoding"] = "gzip";
      headers.Vary = "Accept-Encoding";
    }
    headers["Content-Length"] = data.length;
    res.writeHead(status, headers);
    res.end(req.method === "HEAD" ? undefined : data);
  })
  .listen(port, "127.0.0.1", () =>
    console.log("Static production preview on http://127.0.0.1:" + port),
  );
