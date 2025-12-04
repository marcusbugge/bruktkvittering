import * as cheerio from "cheerio";
import { ScrapedData } from "../types";

export async function scrapeFinn(url: string): Promise<ScrapedData> {
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

  // Forsøk 1: JSON-LD (primær kilde for FINN - har nå struktur uten __NEXT_DATA__)
  const jsonLdScripts = $('script[type="application/ld+json"]');
  jsonLdScripts.each((_, script) => {
    try {
      const jsonContent = $(script).html();
      if (!jsonContent) return;

      const structuredData = JSON.parse(jsonContent);

      // Sjekk om dette er Product-typen (annonsen)
      if (structuredData["@type"] === "Product") {
        if (!title) title = (structuredData.name as string) || "";

        // Hent pris fra offers
        if (!price && structuredData.offers) {
          const priceValue = structuredData.offers.price;
          price =
            typeof priceValue === "string"
              ? parseInt(priceValue, 10)
              : priceValue || 0;
        }

        // Hent bilde fra JSON-LD (dette er en pålitelig kilde)
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
      }
    } catch (e) {
      console.error("Feil ved parsing av JSON-LD:", e);
    }
  });

  // Forsøk 2: __NEXT_DATA__ (fallback - eldre FINN-sider)
  if (!title || !description) {
    try {
      const nextDataScript = $("#__NEXT_DATA__").html();
      if (nextDataScript) {
        const nextData = JSON.parse(nextDataScript);
        const adData =
          nextData?.props?.pageProps?.ad?.data ||
          nextData?.props?.pageProps?.initialState?.ad?.data;

        if (adData) {
          if (!title) title = adData.heading || adData.title || "";

          const rawDesc = adData.description || "";
          if (!description && rawDesc) {
            description = rawDesc
              .replace(/<br\s*\/?>/gi, "\n")
              .replace(/<[^>]*>/g, "")
              .trim();
          }

          if (!price) {
            price = adData.price?.total || adData.main_price?.amount || 0;
          }

          if (images.length === 0) {
            if (adData.image_urls && Array.isArray(adData.image_urls)) {
              images = adData.image_urls;
            } else if (adData.images && Array.isArray(adData.images)) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              images = adData.images.map((img: any) => img.url || img.path);
            }
          }

          if (!seller) seller = adData.user?.name || adData.seller?.name || "";
        }
      }
    } catch (e) {
      console.error("Feil ved parsing av __NEXT_DATA__:", e);
    }
  }

  // Forsøk 3: HTML Scraping for tittel
  if (!title) {
    title =
      $("h1").first().text().trim() ||
      $('[data-testid="ad-title"]').text().trim() ||
      "";
  }

  // VIKTIG: Hent full beskrivelse fra HTML (JSON-LD har ofte avkortet versjon)
  // Finn bruker aria-label="Om annonsen" for beskrivelsesseksjonen
  const descSection = $('[aria-label="Om annonsen"]');
  if (descSection.length) {
    const paragraphs: string[] = [];
    descSection.find("p").each((_, p) => {
      const text = $(p).text().trim();
      if (text) {
        paragraphs.push(text);
      }
    });
    if (paragraphs.length > 0) {
      description = paragraphs.join("\n\n");
    }
  }

  // Fallback for beskrivelse
  if (!description) {
    const descEl = $(
      '[data-testid="ad-description"], .import-decoration, [class*="Description"]'
    );
    if (descEl.length) {
      descEl.find("br").replaceWith("\n");
      description = descEl.text().trim();
    }
  }

  // Fallback: Prøv å hente fra region "Beskrivelse av varen"
  if (!description) {
    const descRegion = $('section[aria-label="Beskrivelse av varen"]');
    if (descRegion.length) {
      const paragraphs: string[] = [];
      descRegion.find("p").each((_, p) => {
        const text = $(p).text().trim();
        if (text) {
          paragraphs.push(text);
        }
      });
      if (paragraphs.length > 0) {
        description = paragraphs.join("\n\n");
      }
    }
  }

  if (!price) {
    const priceText =
      $('[data-testid="pricing-amount"]').text() ||
      $(".u-t3").first().text() ||
      "";
    const priceMatch = priceText.replace(/\s/g, "").match(/(\d+)/);
    if (priceMatch) {
      price = parseInt(priceMatch[1], 10);
    }
  }

  // Prøv å finne bilder fra img-tagger hvis ingen fra JSON-LD
  if (images.length === 0) {
    $("img").each((_, el) => {
      const src = $(el).attr("src") || $(el).attr("data-src");
      if (src && src.includes("images.finncdn.no")) {
        images.push(src);
      }
    });
  }

  if (!seller) {
    seller =
      $('[data-testid="seller-name"]').text().trim() ||
      $(".u-strong").first().text().trim() ||
      "";
  }

  // Ekstraher annonse-ID fra URL
  const adIdMatch = url.match(/finnkode=(\d+)|item\/(\d+)|\/(\d+)(?:\?|$)/);
  const adId = adIdMatch ? adIdMatch[1] || adIdMatch[2] || adIdMatch[3] : "";

  return {
    title,
    description,
    price,
    images: images.slice(0, 5),
    seller,
    adId,
    platform: "finn",
    originalUrl: url,
  };
}
