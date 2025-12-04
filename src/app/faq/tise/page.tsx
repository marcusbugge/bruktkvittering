import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function TiseGuidePage() {
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
          <div className="w-24 h-10 relative">
             <Image src="/tise.png" alt="Tise" fill className="object-contain object-left" />
          </div>
          <Badge variant="outline" className="border-pink-200 text-pink-700 bg-pink-50">Guide</Badge>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Slik henter du lenke fra Tise
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Tise er primært en app, noe som kan gjøre det litt annerledes å finne lenken. Slik gjør du det.
        </p>
      </div>

      <div className="space-y-16">
        {/* Steg 1 */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 space-y-4">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-pink-100 text-pink-600 font-bold text-lg mb-2">1</div>
            <h3 className="text-2xl font-bold">Åpne Tisen</h3>
            <p className="text-muted-foreground text-lg">
              Finn frem til produktet ("Tisen") du har kjøpt eller solgt i appen.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 p-3 rounded-lg border border-border">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Du kan også finne dine egne solgte varer under profilen din.
            </div>
          </div>
          <div className="order-1 md:order-2 bg-zinc-100 dark:bg-zinc-800 rounded-2xl aspect-square md:aspect-video flex items-center justify-center relative overflow-hidden border border-border">
             <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 text-6xl font-black uppercase tracking-tighter">
                Tise
             </div>
          </div>
        </div>

        {/* Steg 2 */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl aspect-square md:aspect-video flex items-center justify-center relative overflow-hidden border border-border">
             <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 text-6xl font-black uppercase tracking-tighter">
                Tre prikker
             </div>
          </div>
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-pink-100 text-pink-600 font-bold text-lg mb-2">2</div>
            <h3 className="text-2xl font-bold">Trykk på de tre prikkene</h3>
            <p className="text-muted-foreground text-lg">
              Øverst i høyre hjørne av annonsen ser du tre prikker (•••) eller et delingsikon. Trykk på dette.
            </p>
          </div>
        </div>

        {/* Steg 3 */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 space-y-4">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-pink-100 text-pink-600 font-bold text-lg mb-2">3</div>
            <h3 className="text-2xl font-bold">Velg "Del" og "Kopier"</h3>
            <p className="text-muted-foreground text-lg">
              Velg "Del" fra menyen, og deretter "Kopier" eller "Kopier lenke".
            </p>
            <p className="text-muted-foreground">
              Lim lenken inn i Bruktkvittering, så henter vi bildet og prisen for deg!
            </p>
          </div>
           <div className="order-1 md:order-2 bg-zinc-100 dark:bg-zinc-800 rounded-2xl aspect-square md:aspect-video flex items-center justify-center relative overflow-hidden border border-border">
             <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 text-6xl font-black uppercase tracking-tighter">
                Kopier
             </div>
          </div>
        </div>
      </div>

      <div className="mt-20 p-8 bg-pink-50 dark:bg-pink-950/20 rounded-3xl text-center">
        <h3 className="text-2xl font-bold mb-4">Klar til å lage kvittering?</h3>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Har du lenken klar? Gå tilbake til forsiden for å starte.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-white bg-pink-500 rounded-full hover:bg-pink-600 transition-colors shadow-lg shadow-pink-500/20"
        >
          Lag kvittering nå
        </Link>
      </div>
    </main>
  );
}

