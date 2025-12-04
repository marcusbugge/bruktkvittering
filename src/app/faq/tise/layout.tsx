import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hvordan kopiere lenke fra Tise",
  description:
    "Steg-for-steg guide for å kopiere lenken fra en Tise-annonse. Lær hvordan du henter delingslenken fra appen for å lage kvittering.",
  keywords: [
    "tise lenke",
    "kopiere tise lenke",
    "tise annonse lenke",
    "tise kvittering",
    "bruktkvittering tise",
  ],
  alternates: {
    canonical: "https://lagkvittering.no/faq/tise",
  },
  openGraph: {
    title: "Hvordan kopiere lenke fra Tise - Bruktkvittering",
    description:
      "Steg-for-steg guide for å kopiere lenken fra en Tise-annonse for å lage kvittering.",
    url: "https://lagkvittering.no/faq/tise",
    type: "article",
  },
};

export default function TiseGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

