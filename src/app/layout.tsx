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
  title: "Bruktkvittering - Lag kvitteringer for brukthandel",
  description:
    "Lag profesjonelle kvitteringer for dine bruktkjøp på Finn.no og Tise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavbarWrapper />
        {children}
        <FooterWrapper />
      </body>
    </html>
  );
}
