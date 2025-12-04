import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function FinnGuidePage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl min-h-screen">
      <Link 
        href="/faq" 
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Tilbake til oversikt
      </Link>

      <div className="space-y-6 mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-32 h-10 relative">
             <Image src="/finn.png" alt="Finn.no" fill className="object-contain object-left" />
          </div>
          <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">Guide</Badge>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Slik henter du lenke fra Finn.no
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          For å lage en kvittering trenger vi lenken til annonsen. Her ser du hvordan du finner den, enten du bruker appen eller nettleser.
        </p>
      </div>

      <div className="space-y-16">
        {/* Steg 1 */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 space-y-4">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold text-lg mb-2">1</div>
            <h3 className="text-2xl font-bold">Gå til annonsen</h3>
            <p className="text-muted-foreground text-lg">
              Åpne Finn-appen eller gå til finn.no i nettleseren din. Finn annonsen for varen du har kjøpt eller solgt.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 p-3 rounded-lg border border-border">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Annonsen må være synlig (ikke slettet helt), men kan være markert som solgt.
            </div>
          </div>
          <div className="order-1 md:order-2 bg-zinc-100 dark:bg-zinc-800 rounded-2xl aspect-square md:aspect-video flex items-center justify-center relative overflow-hidden border border-border">
             <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 text-6xl font-black uppercase tracking-tighter">
                Finn.no
             </div>
          </div>
        </div>

        {/* Steg 2 */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl aspect-square md:aspect-video flex items-center justify-center relative overflow-hidden border border-border">
             <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 text-6xl font-black uppercase tracking-tighter">
                Del
             </div>
          </div>
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold text-lg mb-2">2</div>
            <h3 className="text-2xl font-bold">Trykk på del-knappen</h3>
            <p className="text-muted-foreground text-lg">
              I appen finner du del-ikonet (en pil som peker oppover eller ut av en boks) vanligvis øverst til høyre eller under bildene.
            </p>
            <p className="text-muted-foreground">
              I nettleser kan du enkelt kopiere URL-en direkte fra adressefeltet på toppen av vinduet.
            </p>
          </div>
        </div>

        {/* Steg 3 */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 space-y-4">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold text-lg mb-2">3</div>
            <h3 className="text-2xl font-bold">Kopier lenke</h3>
            <p className="text-muted-foreground text-lg">
              Velg "Kopier lenke" fra menyen som dukker opp.
            </p>
            <p className="text-muted-foreground">
              Nå har du lenken i utklippstavlen din. Gå tilbake til Bruktkvittering og lim den inn i søkefeltet.
            </p>
          </div>
           <div className="order-1 md:order-2 bg-zinc-100 dark:bg-zinc-800 rounded-2xl aspect-square md:aspect-video flex items-center justify-center relative overflow-hidden border border-border">
             <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 text-6xl font-black uppercase tracking-tighter">
                Kopier
             </div>
          </div>
        </div>
      </div>

      <div className="mt-20 p-8 bg-blue-50 dark:bg-blue-950/20 rounded-3xl text-center">
        <h3 className="text-2xl font-bold mb-4">Klar til å lage kvittering?</h3>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Nå som du har lenken, kan du gå tilbake til forsiden og generere kvitteringen din på sekunder.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
        >
          Lag kvittering nå
        </Link>
      </div>
    </main>
  );
}

