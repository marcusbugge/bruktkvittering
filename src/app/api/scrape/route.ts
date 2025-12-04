import { NextRequest, NextResponse } from "next/server";
import { scrapeUrl, detectPlatform } from "@/lib/scrapers";
import { ScrapeResponse } from "@/lib/types";

export async function POST(
  request: NextRequest
): Promise<NextResponse<ScrapeResponse>> {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { success: false, error: "URL er påkrevd" },
        { status: 400 }
      );
    }

    // Valider URL-format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { success: false, error: "Ugyldig URL-format" },
        { status: 400 }
      );
    }

    // Sjekk om plattformen støttes
    const platform = detectPlatform(url);
    if (platform === "unknown") {
      return NextResponse.json(
        {
          success: false,
          error: "Ukjent plattform. Støtter kun Finn.no og Tise.",
        },
        { status: 400 }
      );
    }

    const data = await scrapeUrl(url);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Scraping error:", error);

    const message =
      error instanceof Error ? error.message : "En ukjent feil oppstod";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
