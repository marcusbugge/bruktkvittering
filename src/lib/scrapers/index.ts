import { ScrapedData } from "../types";
import { scrapeFinn } from "./finn";
import { scrapeTise } from "./tise";

export function detectPlatform(url: string): "finn" | "tise" | "unknown" {
  const lowerUrl = url.toLowerCase();

  if (lowerUrl.includes("finn.no")) {
    return "finn";
  }

  if (lowerUrl.includes("tise.com") || lowerUrl.includes("tise.no")) {
    return "tise";
  }

  return "unknown";
}

export async function scrapeUrl(url: string): Promise<ScrapedData> {
  const platform = detectPlatform(url);

  switch (platform) {
    case "finn":
      return scrapeFinn(url);
    case "tise":
      return scrapeTise(url);
    default:
      throw new Error("Ukjent plattform. Støtter kun Finn.no og Tise.");
  }
}
