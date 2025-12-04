import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hjelp og FAQ",
  description:
    "Lær hvordan du bruker Bruktkvittering. Se guider for Finn.no og Tise, og finn svar på vanlige spørsmål om kvitteringer for bruktkjøp.",
  alternates: {
    canonical: "https://lagkvittering.no/faq",
  },
  openGraph: {
    title: "Hjelp og FAQ - Bruktkvittering",
    description:
      "Lær hvordan du bruker Bruktkvittering. Se guider for Finn.no og Tise, og finn svar på vanlige spørsmål.",
    url: "https://lagkvittering.no/faq",
    type: "website",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

