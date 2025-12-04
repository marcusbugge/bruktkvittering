import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Bruktkvittering - Kvittering for brukthandel",
  description:
    "Generer profesjonelle kvitteringer for kjøp fra Finn.no, Tise og andre brukthandel-plattformer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
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
