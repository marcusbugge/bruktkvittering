import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Link as LinkIcon,
  Download,
  FileText,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

export default function FAQPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-5xl min-h-screen">
      {/* Hero Section */}
      <div className="text-center mb-24 space-y-6">
        <Badge
          variant="secondary"
          className="px-3 py-1 text-[13px] font-medium bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100 transition-colors"
        >
          Hjelpesenter
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground max-w-3xl mx-auto">
          Alt du trenger for å lage en god kvittering.
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-normal">
          Vi har gjort det enkelt å dokumentere bruktkjøp. Velg din plattform
          for å se guide, eller les vanlige spørsmål.
        </p>
      </div>

      {/* Platform Guides - Bento Grid Style */}
      <div className="grid md:grid-cols-2 gap-6 mb-24">
        <Link
          href="/faq/finn"
          className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
        >
          <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-blue-50 rounded-full p-2">
              <ArrowRight className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="flex flex-col h-full justify-between space-y-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-[#0063FB]/10 rounded-2xl flex items-center justify-center">
                <div className="relative w-8 h-8">
                  <Image
                    src="/finn.png"
                    alt="Finn.no"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Guide for Finn.no
              </h2>
              <p className="text-gray-500 font-medium text-[17px] leading-relaxed">
                Lær hvordan du enkelt henter annonselenken fra Finn-appen eller
                nettleseren.
              </p>
            </div>
            <div className="flex items-center text-blue-600 font-semibold">
              Les guiden
            </div>
          </div>
        </Link>

        <Link
          href="/faq/tise"
          className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
        >
          <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-blue-50 rounded-full p-2">
              <ArrowRight className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="flex flex-col h-full justify-between space-y-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-[#FA7268]/10 rounded-2xl flex items-center justify-center">
                <div className="relative w-8 h-4">
                  <Image
                    src="/tise.png"
                    alt="Tise"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Guide for Tise
              </h2>
              <p className="text-gray-500 font-medium text-[17px] leading-relaxed">
                Se hvordan du finner delingslenken i Tise-appen og lager en
                gyldig kvittering.
              </p>
            </div>
            <div className="flex items-center text-blue-600 font-semibold">
              Les guiden
            </div>
          </div>
        </Link>
      </div>

      {/* General Steps */}
      <div className="mb-32">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight">
          Slik fungerer det
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center space-y-4 p-4">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-2 text-blue-600 shadow-sm">
              <LinkIcon className="w-7 h-7" strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-bold">1. Lim inn lenke</h3>
            <p className="text-muted-foreground leading-relaxed">
              Kopier lenken fra annonsen og lim den inn. Vi henter automatisk
              tittel, pris og bilde.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 p-4">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-2 text-blue-600 shadow-sm">
              <FileText className="w-7 h-7" strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-bold">2. Se over detaljer</h3>
            <p className="text-muted-foreground leading-relaxed">
              Sjekk at informasjonen stemmer. Legg til navn på kjøper og selger
              for en komplett kvittering.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 p-4">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-2 text-blue-600 shadow-sm">
              <Download className="w-7 h-7" strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-bold">3. Last ned</h3>
            <p className="text-muted-foreground leading-relaxed">
              Last ned kvitteringen som PDF eller bilde. Klar til å sendes eller
              lagres i regnskapet.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion - Clean Style */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center tracking-tight">
          Vanlige spørsmål
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-0">
          <AccordionItem value="item-1" className="border-b border-gray-200">
            <AccordionTrigger className="hover:no-underline py-6 text-lg font-medium text-left">
              Er kvitteringen gyldig som bilag?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6 text-[17px] leading-relaxed">
              Ja, en kvittering for bruktkjøp mellom privatpersoner er gyldig
              som regnskapsbilag så lenge den inneholder nødvendig informasjon
              som selgers navn, gjenstand, pris, dato og signatur. Vår generator
              sørger for at disse feltene er tilgjengelige.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b border-gray-200">
            <AccordionTrigger className="hover:no-underline py-6 text-lg font-medium text-left">
              Koster det noe å bruke tjenesten?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6 text-[17px] leading-relaxed">
              Nei, Bruktkvittering er helt gratis å bruke for privatpersoner. Vi
              tar ingen gebyrer.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-b border-gray-200">
            <AccordionTrigger className="hover:no-underline py-6 text-lg font-medium text-left">
              Lagrer dere informasjonen min?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6 text-[17px] leading-relaxed">
              Nei, vi lagrer ingen informasjon om dine kjøp eller
              personopplysninger på våre servere. All prosessering skjer
              midlertidig, og dataene dine blir borte når du lukker nettleseren.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-4"
            className="border-b border-gray-200 border-none"
          >
            <AccordionTrigger className="hover:no-underline py-6 text-lg font-medium text-left">
              Kan jeg bruke dette for andre plattformer?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6 text-[17px] leading-relaxed">
              Absolutt! Selv om vi har automatisk import fra Finn og Tise, kan
              du bruke "Fyll inn manuelt" funksjonen for kjøp gjort via Facebook
              Marketplace, Shpock, eller vennekjøp.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
}
