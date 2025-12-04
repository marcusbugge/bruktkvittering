import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // useCompletion sender "prompt", men vi støtter også "description" for bakoverkompatibilitet
    const description = body.prompt || body.description;

    if (!description || typeof description !== "string") {
      return new Response(JSON.stringify({ error: "Beskrivelse er påkrevd" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: `Du skriver korte produktbeskrivelser for kvitteringer ved kjøp/salg mellom privatpersoner.

REGLER:
- Maks 1-2 korte setninger (under 100 tegn totalt)
- Kun de viktigste fakta: merke, modell, tilstand
- Ingen pris, ingen salgsprat, ingen unødvendige detaljer
- Profesjonelt og nøytralt språk
- Aldri emoji eller utropstegn
- Start rett på beskrivelsen

EKSEMPLER:
"iPhone 14 Pro, 256GB, god stand. Inkl. lader."
"Samsung TV 55", fungerer fint. Liten ripe i rammen."
"Gaming PC: i7, GTX 1070, 16GB RAM. Nylig rengjort."
"IKEA sofa, grå, 3-seter. Noe bruksslitasje."`,
      prompt: `Lag en kort kvitteringsbeskrivelse for:\n\n${description}`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("AI error:", error);

    return new Response(
      JSON.stringify({ error: "Kunne ikke forbedre beskrivelsen" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
