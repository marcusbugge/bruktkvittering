import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavbarWrapper } from "@/components/navbar-wrapper";
import { FooterWrapper } from "@/components/footer-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://lagkvittering.no";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Bruktkvittering - Gratis kvittering for bruktkjøp | Finn.no & Tise",
    template: "%s | Bruktkvittering",
  },
  description:
    "Lag profesjonelle kvitteringer for bruktkjøp gratis. Hent automatisk data fra Finn.no og Tise. Perfekt for privatpersoner, regnskapsbilag og dokumentasjon av brukthandel.",
  keywords: [
    "bruktkvittering",
    "kvittering bruktkjøp",
    "kvittering finn",
    "kvittering tise",
    "gratis kvittering",
    "brukthandel kvittering",
    "salgskvittering privat",
    "kvittering generator",
    "kvittering mal",
    "brukt kvittering",
    "privatkjøp kvittering",
    "regnskapsbilag brukt",
    "dokumentasjon bruktsalg",
    "finn.no kvittering",
    "tise kvittering",
    "facebook marketplace kvittering",
  ],
  authors: [{ name: "Bruktkvittering" }],
  creator: "Bruktkvittering",
  publisher: "Bruktkvittering",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    url: siteUrl,
    siteName: "Bruktkvittering",
    title: "Bruktkvittering - Gratis kvittering for bruktkjøp",
    description:
      "Lag profesjonelle kvitteringer for bruktkjøp gratis. Hent automatisk data fra Finn.no og Tise. Last ned som PDF eller bilde.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bruktkvittering - Lag kvitteringer for bruktkjøp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bruktkvittering - Gratis kvittering for bruktkjøp",
    description:
      "Lag profesjonelle kvitteringer for bruktkjøp gratis. Hent automatisk data fra Finn.no og Tise.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Legg til dine verifiseringskoder her
    // google: "din-google-verifiseringskode",
  },
  category: "utilities",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Bruktkvittering",
  url: siteUrl,
  description:
    "Lag profesjonelle kvitteringer for bruktkjøp gratis. Hent automatisk data fra Finn.no og Tise.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "NOK",
  },
  featureList: [
    "Automatisk import fra Finn.no",
    "Automatisk import fra Tise",
    "Last ned som PDF",
    "Last ned som bilde",
    "Digital signatur",
    "Gratis å bruke",
  ],
  screenshot: `${siteUrl}/og-image.png`,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    ratingCount: "100",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Bruktkvittering",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description: "Gratis kvitteringsgenerator for brukthandel i Norge",
  sameAs: [],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Er kvitteringen gyldig som bilag?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, en kvittering for bruktkjøp mellom privatpersoner er gyldig som regnskapsbilag så lenge den inneholder nødvendig informasjon som selgers navn, gjenstand, pris, dato og signatur.",
      },
    },
    {
      "@type": "Question",
      name: "Koster det noe å bruke Bruktkvittering?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nei, Bruktkvittering er helt gratis å bruke for privatpersoner. Vi tar ingen gebyrer.",
      },
    },
    {
      "@type": "Question",
      name: "Lagrer dere informasjonen min?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nei, vi lagrer ingen informasjon om dine kjøp eller personopplysninger på våre servere. All prosessering skjer midlertidig.",
      },
    },
    {
      "@type": "Question",
      name: "Hvilke plattformer støttes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vi har automatisk import fra Finn.no og Tise. Du kan også bruke manuell inntasting for kjøp fra Facebook Marketplace, Shpock eller andre plattformer.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-background to-secondary/20 min-h-screen flex flex-col`}
      >
        <NavbarWrapper />
        <div className="flex-1">{children}</div>
        <FooterWrapper />
      </body>
    </html>
  );
}
