import * as cheerio from "cheerio";
import { ScrapedData } from "../types";

export async function scrapeTise(url: string): Promise<ScrapedData> {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });

  if (!response.ok) {
    throw new Error(`Kunne ikke hente annonsen: ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  let title = "";
  let description = "";
  let price = 0;
  let images: string[] = [];
  let seller = "";

  // Forsøk 1: Hent fra __NEXT_DATA__
  try {
    const nextDataScript = $("#__NEXT_DATA__").html();
    if (nextDataScript) {
      const nextData = JSON.parse(nextDataScript);
      // Prøv å finne tise-data i props
      const tiseData =
        nextData?.props?.pageProps?.tise ||
        nextData?.props?.pageProps?.initialState?.tise;

      if (tiseData) {
        title = tiseData.title || "";
        description = tiseData.description || "";
        price = tiseData.price || 0;

        if (tiseData.images && Array.isArray(tiseData.images)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          images = tiseData.images.map((img: any) => img.url || img);
        }

        seller = tiseData.user?.name || tiseData.user?.username || "";
      }
    }
  } catch (e) {
    console.error("Feil ved parsing av __NEXT_DATA__ (Tise):", e);
  }

  // Forsøk 2: JSON-LD
  if (!title || !description) {
    const jsonLdScript = $('script[type="application/ld+json"]').first().html();
    if (jsonLdScript) {
      try {
        const structuredData = JSON.parse(jsonLdScript);
        if (!title) title = (structuredData.name as string) || "";
        if (!description)
          description = (structuredData.description as string) || "";

        if (!price && structuredData.offers) {
          price = structuredData.offers.price || 0;
        }

        if (images.length === 0 && structuredData.image) {
          if (Array.isArray(structuredData.image)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            images = structuredData.image.map((img: any) =>
              typeof img === "string" ? img : img.url || ""
            );
          } else if (typeof structuredData.image === "string") {
            images = [structuredData.image];
          }
        }
      } catch {
        // Ignorer
      }
    }
  }

  // Forsøk 3: HTML Scraping
  if (!title) {
    title =
      $("h1").first().text().trim() ||
      $('[class*="title"]').first().text().trim() ||
      "";
  }

  if (!description) {
    // Tise beskrivelser ligger ofte i paragrafer under tittelen
    const descEl = $('[class*="description"]');
    if (descEl.length) {
      descEl.find("br").replaceWith("\n");
      description = descEl.text().trim();
    }
  }

  if (!price) {
    const priceText = $('[class*="price"]').first().text() || "";
    const priceMatch = priceText.replace(/\s/g, "").match(/(\d+)/);
    if (priceMatch) {
      price = parseInt(priceMatch[1], 10);
    }
  }

  if (images.length === 0) {
    $("img").each((_, el) => {
      const src = $(el).attr("src");
      if (src && (src.includes("tise") || src.includes("cdn"))) {
        images.push(src);
      }
    });
  }

  if (!seller) {
    seller =
      $('[class*="seller"]').text().trim() ||
      $('[class*="user"]').first().text().trim() ||
      "";
  }

  // Ekstraher annonse-ID fra URL
  const adIdMatch = url.match(/\/([a-zA-Z0-9-]+)(?:\?|$)/);
  const adId = adIdMatch ? adIdMatch[1] : "";

  return {
    title,
    description,
    price,
    images: images.slice(0, 5),
    seller,
    adId,
    platform: "tise",
    originalUrl: url,
  };
}
