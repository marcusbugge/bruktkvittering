import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hvordan kopiere lenke fra Finn.no",
  description:
    "Steg-for-steg guide for å kopiere lenken fra en Finn.no-annonse. Lær hvordan du henter lenken fra appen eller nettleseren for å lage kvittering.",
  keywords: [
    "finn.no lenke",
    "kopiere finn lenke",
    "finn annonse lenke",
    "finn kvittering",
    "bruktkvittering finn",
  ],
  alternates: {
    canonical: "https://lagkvittering.no/faq/finn",
  },
  openGraph: {
    title: "Hvordan kopiere lenke fra Finn.no - Bruktkvittering",
    description:
      "Steg-for-steg guide for å kopiere lenken fra en Finn.no-annonse for å lage kvittering.",
    url: "https://lagkvittering.no/faq/finn",
    type: "article",
  },
};

export default function FinnGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

