"use client";

import { useState } from "react";
import { ReceiptData } from "@/lib/types";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  FileText,
  Image as ImageIcon,
  Printer,
  Download,
  Loader2,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ExportButtonsProps {
  receiptRef: React.RefObject<HTMLDivElement | null>;
  data: ReceiptData;
}

export function ExportButtons({ receiptRef, data }: ExportButtonsProps) {
  const [exporting, setExporting] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("nb-NO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("nb-NO", {
      style: "currency",
      currency: "NOK",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const generateFilename = () => {
    const date = data.purchaseDate
      ? data.purchaseDate.replace(/-/g, "")
      : new Date().toISOString().split("T")[0].replace(/-/g, "");
    const product = data.productName
      .replace(/[^a-zA-Z0-9æøåÆØÅ]/g, "_")
      .substring(0, 20);
    return `kvittering_${date}_${product}`;
  };

  const handleExportPNG = async () => {
    if (!receiptRef.current) return;
    setExporting("png");

    try {
      // Bruk html2canvas for bedre støtte for eksterne bilder
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      const dataUrl = canvas.toDataURL("image/png", 1.0);

      const link = document.createElement("a");
      link.download = `${generateFilename()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("PNG export error:", error);
    } finally {
      setExporting(null);
    }
  };

  const handleExportPDF = async () => {
    if (!receiptRef.current) return;
    setExporting("pdf");

    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = Math.min(
        (pageWidth - 40) / imgWidth,
        (pageHeight - 40) / imgHeight
      );
      const width = imgWidth * ratio;
      const height = imgHeight * ratio;

      const x = (pageWidth - width) / 2;
      const y = 20;

      pdf.addImage(imgData, "PNG", x, y, width, height);
      pdf.save(`${generateFilename()}.pdf`);
    } catch (error) {
      console.error("PDF export error:", error);
    } finally {
      setExporting(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportText = () => {
    setExporting("text");

    const text = `KVITTERING
Kjøp mellom privatpersoner
================================

PRODUKT
${data.productName || "—"}
${data.description ? data.description + "\n" : ""}
BELØP: ${formatPrice(data.price || 0)}
DATO: ${formatDate(data.purchaseDate)}
${data.location ? "STED: " + data.location + "\n" : ""}${
      data.paymentMethod ? "BETALT MED: " + data.paymentMethod + "\n" : ""
    }
--------------------------------

SELGER
${data.sellerName || "—"}
${data.sellerPhone ? "Tlf: " + data.sellerPhone + "\n" : ""}${
      data.sellerEmail ? "E-post: " + data.sellerEmail + "\n" : ""
    }
KJØPER
${data.buyerName || "—"}
${data.buyerPhone ? "Tlf: " + data.buyerPhone + "\n" : ""}${
      data.buyerEmail ? "E-post: " + data.buyerEmail + "\n" : ""
    }
--------------------------------

Ref: ${data.adId || "—"}
Plattform: ${
      data.platform === "finn"
        ? "Finn.no"
        : data.platform === "tise"
        ? "Tise"
        : data.platform || "—"
    }
${data.originalUrl ? "URL: " + data.originalUrl + "\n" : ""}
================================
Generert: ${new Date().toLocaleDateString("nb-NO")}
`;

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${generateFilename()}.txt`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);

    setExporting(null);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="lg" className="w-full font-semibold shadow-sm">
          <Download className="mr-2 h-4 w-4" />
          Last ned kvittering
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        sideOffset={8}
        className="w-[calc(100vw-32px)] sm:w-56"
      >
        <DropdownMenuItem
          onClick={handleExportPDF}
          disabled={exporting !== null}
          className="rounded-lg py-2.5 cursor-pointer focus:bg-primary/5"
        >
          {exporting === "pdf" ? (
            <Loader2 className="w-4 h-4 mr-2.5 animate-spin text-primary" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3 text-red-600">
              <FileText className="w-4 h-4" />
            </div>
          )}
          <span className="font-medium">PDF Dokument</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleExportPNG}
          disabled={exporting !== null}
          className="rounded-lg py-2.5 cursor-pointer focus:bg-primary/5"
        >
          {exporting === "png" ? (
            <Loader2 className="w-4 h-4 mr-2.5 animate-spin text-primary" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-600">
              <ImageIcon className="w-4 h-4" />
            </div>
          )}
          <span className="font-medium">Bilde (PNG)</span>
        </DropdownMenuItem>

        <div className="h-px bg-border/50 my-1 mx-2" />

        <DropdownMenuItem
          onClick={handlePrint}
          className="rounded-lg py-2.5 cursor-pointer focus:bg-primary/5"
        >
          <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center mr-3 text-zinc-600">
            <Printer className="w-4 h-4" />
          </div>
          <span className="font-medium">Skriv ut</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleExportText}
          disabled={exporting !== null}
          className="rounded-lg py-2.5 cursor-pointer focus:bg-primary/5"
        >
          {exporting === "text" ? (
            <Loader2 className="w-4 h-4 mr-2.5 animate-spin text-primary" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center mr-3 text-zinc-600">
              <FileText className="w-4 h-4" />
            </div>
          )}
          <span className="font-medium">Tekstfil</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
