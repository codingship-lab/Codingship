import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.APP_ORIGIN ?? "http://localhost:3000";
  return ["", "/labs", "/about", "/login"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date()
  }));
}
