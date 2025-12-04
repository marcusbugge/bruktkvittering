import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lag kvittering - Bruktkvittering",
  description:
    "Fyll ut skjemaet og generer en profesjonell kvittering for ditt bruktkjøp. Last ned som PDF eller bilde med digital signatur.",
  alternates: {
    canonical: "https://lagkvittering.no/kvittering",
  },
  openGraph: {
    title: "Lag kvittering - Bruktkvittering",
    description:
      "Fyll ut skjemaet og generer en profesjonell kvittering for ditt bruktkjøp. Last ned som PDF eller bilde.",
    url: "https://lagkvittering.no/kvittering",
    type: "website",
  },
};

export default function KvitteringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

