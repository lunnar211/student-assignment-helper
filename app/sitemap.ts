import type { MetadataRoute } from "next";

const BASE = "https://student-assignment-helper.vercel.app";

const ROUTES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/all-in-one", priority: 1.0, changeFrequency: "weekly" },
  { path: "/paraphraser", priority: 0.9, changeFrequency: "weekly" },
  { path: "/humanizer", priority: 0.9, changeFrequency: "weekly" },
  { path: "/sop-writer", priority: 0.9, changeFrequency: "weekly" },
  { path: "/ai-checker", priority: 0.9, changeFrequency: "weekly" },
  { path: "/similarity-checker", priority: 0.9, changeFrequency: "weekly" },
  { path: "/grammar-checker", priority: 0.9, changeFrequency: "weekly" },
  { path: "/guides", priority: 0.7, changeFrequency: "weekly" },
  { path: "/guides/how-to-write-an-sop", priority: 0.7, changeFrequency: "monthly" },
  { path: "/guides/how-to-paraphrase", priority: 0.7, changeFrequency: "monthly" },
  { path: "/guides/grammar-tips", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.5, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.5, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: new Date("2026-11-18"),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
