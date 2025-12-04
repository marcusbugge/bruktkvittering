import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function FinnGuidePage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl min-h-screen">
      <nav className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-12">
        <Link href="/faq" className="hover:text-blue-600 transition-colors">
          Hjelpesenter
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-300" />
        <span className="text-foreground">Finn.no Guide</span>
      </nav>

      <div className="text-center space-y-6 mb-24">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#0063FB]/10 rounded-2xl flex items-center justify-center">
            <div className="relative w-10 h-10">
              <Image
                src="/finn.png"
                alt="Finn.no"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground max-w-2xl mx-auto">
          Slik henter du lenken fra Finn.no
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto font-normal">
          For å lage en kvittering trenger vi lenken til annonsen. Her ser du
          hvordan du finner den i appen eller nettleseren.
        </p>
      </div>

      <div className="space-y-24 max-w-3xl mx-auto">
        {/* Steg 1 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg shadow-md shadow-blue-600/20 mb-2">
              1
            </div>
            <h3 className="text-2xl font-bold">Gå til annonsen</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Åpne Finn-appen eller gå til finn.no. Finn annonsen for varen du
              har kjøpt eller solgt.
            </p>
            <div className="flex items-start gap-3 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span>
                Annonsen må være synlig (ikke slettet), men kan være markert som
                solgt.
              </span>
            </div>
          </div>
          <div className="bg-gray-100 rounded-3xl aspect-square md:aspect-[4/3] flex items-center justify-center relative overflow-hidden shadow-inner">
            <div className="text-gray-300 font-bold text-xl">
              Illustrasjon: Finn annonse
            </div>
          </div>
        </div>

        {/* Steg 2 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 bg-gray-100 rounded-3xl aspect-square md:aspect-[4/3] flex items-center justify-center relative overflow-hidden shadow-inner">
            <div className="text-gray-300 font-bold text-xl">
              Illustrasjon: Del-knapp
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-4">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg shadow-md shadow-blue-600/20 mb-2">
              2
            </div>
            <h3 className="text-2xl font-bold">Trykk på del-knappen</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              I appen finner du del-ikonet (en pil som peker oppover) vanligvis
              under bildene eller øverst til høyre.
            </p>
            <p className="text-muted-foreground">
              På PC kopierer du bare adressen i toppen av nettleseren.
            </p>
          </div>
        </div>

        {/* Steg 3 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg shadow-md shadow-blue-600/20 mb-2">
              3
            </div>
            <h3 className="text-2xl font-bold">Kopier lenke</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Velg "Kopier lenke" fra menyen som dukker opp. Nå har du lenken
              klar til å limes inn.
            </p>
          </div>
          <div className="bg-gray-100 rounded-3xl aspect-square md:aspect-[4/3] flex items-center justify-center relative overflow-hidden shadow-inner">
            <div className="text-gray-300 font-bold text-xl">
              Illustrasjon: Kopier meny
            </div>
          </div>
        </div>
      </div>

      <div className="mt-32 text-center">
        <h3 className="text-2xl font-bold mb-6">Har du lenken klar?</h3>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-[#007AFF] rounded-full hover:bg-blue-600 transition-all shadow-lg shadow-blue-600/20 hover:shadow-xl hover:-translate-y-0.5"
        >
          Lag kvittering nå
        </Link>
      </div>
    </main>
  );
}
