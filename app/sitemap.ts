import { MetadataRoute } from "next";

const baseUrl = "https://www.addiscable.com";

const routes = [
  "/",
  "/about",
  "/contact",
  "/csr",
  "/factory",
  "/markets",
  "/privacy-policy",
  "/terms-of-service",
  "/site-map",
  "/products/low-voltage",
  "/products/medium-voltage",
  "/products/high-voltage",
  "/products/conductors-abc",
  "/products/winding-wires",
  "/resources/product-catalog",
  "/resources/technical-specs",
  "/resources/installation-guides",
  "/resources/certifications",
  "/resources/contact-support",
  "/company/about-us",
  "/company/our-story",
  "/company/quality-standards",
  "/company/sustainability",
  "/company/partnerships",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${baseUrl}${route === "/" ? "" : route}`,
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
