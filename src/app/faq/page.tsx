import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Link as LinkIcon, Download, FileText, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function FAQPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-5xl min-h-screen">
      {/* Hero Section */}
      <div className="text-center mb-20 space-y-6">
        <Badge variant="secondary" className="px-4 py-1.5 text-sm rounded-full bg-secondary/50 backdrop-blur border border-secondary-foreground/10">
          Hjelpesenter
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
          Hvordan fungerer Bruktkvittering?
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Vi automatiserer prosessen med å lage kvitteringer. Velg din plattform under for å se en detaljert guide, eller les generelle spørsmål.
        </p>
      </div>

      {/* Platform Guides */}
      <div className="grid md:grid-cols-2 gap-8 mb-24">
        <Link href="/faq/finn" className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 flex flex-col items-center text-center space-y-4">
            <div className="w-32 h-12 relative mb-4 grayscale group-hover:grayscale-0 transition-all duration-300">
               <Image src="/finn.png" alt="Finn.no" fill className="object-contain" />
            </div>
            <h2 className="text-2xl font-bold group-hover:text-blue-600 transition-colors">Guide for Finn.no</h2>
            <p className="text-muted-foreground">Lær hvordan du kopierer lenken fra Finn-appen eller nettleseren og genererer kvittering.</p>
            <div className="pt-4 flex items-center text-sm font-semibold text-blue-600 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
              Les guiden <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </div>
        </Link>

        <Link href="/faq/tise" className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-transparent dark:from-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 flex flex-col items-center text-center space-y-4">
            <div className="w-24 h-12 relative mb-4 grayscale group-hover:grayscale-0 transition-all duration-300">
               <Image src="/tise.png" alt="Tise" fill className="object-contain" />
            </div>
            <h2 className="text-2xl font-bold group-hover:text-pink-600 transition-colors">Guide for Tise</h2>
            <p className="text-muted-foreground">Se hvordan du finner delingslenken i Tise-appen og lager en gyldig kvittering.</p>
            <div className="pt-4 flex items-center text-sm font-semibold text-pink-600 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
              Les guiden <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </div>
        </Link>
      </div>

      {/* General Steps */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12">Slik fungerer det generelt</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-card/50 backdrop-blur border-muted/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <LinkIcon className="w-24 h-24" />
            </div>
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 font-bold text-xl">
                1
              </div>
              <CardTitle>Lim inn lenke</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              Kopier lenken fra annonsen på Finn.no eller Tise og lim den inn i feltet på forsiden. Vi henter automatisk tittel, pris og bilde.
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-muted/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <FileText className="w-24 h-24" />
            </div>
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400 font-bold text-xl">
                2
              </div>
              <CardTitle>Se over detaljer</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              Sjekk at informasjonen stemmer. Du kan enkelt redigere pris, beskrivelse og legge til navn på kjøper og selger.
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-muted/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Download className="w-24 h-24" />
            </div>
            <CardHeader>
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-400 font-bold text-xl">
                3
              </div>
              <CardTitle>Last ned</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              Last ned kvitteringen som PDF eller bilde. Kvitteringen er klar til å sendes til kjøper eller lagres i regnskapet ditt.
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Ofte stilte spørsmål</h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="border px-4 rounded-xl bg-card/30">
            <AccordionTrigger className="hover:no-underline py-4 text-lg font-medium">
              Er kvitteringen gyldig som bilag?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              Ja, en kvittering for bruktkjøp mellom privatpersoner er gyldig som regnskapsbilag så lenge den inneholder nødvendig informasjon som selgers navn, gjenstand, pris, dato og signatur. Vår generator sørger for at disse feltene er tilgjengelige.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border px-4 rounded-xl bg-card/30">
            <AccordionTrigger className="hover:no-underline py-4 text-lg font-medium">
              Koster det noe å bruke tjenesten?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              Nei, Bruktkvittering er helt gratis å bruke for privatpersoner. Vi tar ingen gebyrer.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border px-4 rounded-xl bg-card/30">
            <AccordionTrigger className="hover:no-underline py-4 text-lg font-medium">
              Lagrer dere informasjonen min?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              Nei, vi lagrer ingen informasjon om dine kjøp eller personopplysninger på våre servere. All prosessering skjer midlertidig, og dataene dine blir borte når du lukker nettleseren (med mindre du laster ned kvitteringen).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="border px-4 rounded-xl bg-card/30">
            <AccordionTrigger className="hover:no-underline py-4 text-lg font-medium">
              Kan jeg bruke dette for andre plattformer?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              Absolutt! Selv om vi har automatisk import fra Finn og Tise, kan du bruke "Fyll inn manuelt" funksjonen for kjøp gjort via Facebook Marketplace, Shpock, eller vennekjøp.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
}
