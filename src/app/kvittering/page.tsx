"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ReceiptForm } from "@/components/receipt-form";
import { ReceiptPreview } from "@/components/receipt-preview";
import { ExportButtons } from "@/components/export-buttons";
import { ReceiptData } from "@/lib/types";
import { motion, Variants } from "framer-motion";

function getInitialReceiptData(): ReceiptData {
  return {
    productName: "",
    description: "",
    price: 0,
    productImage: "",
    purchaseDate: new Date().toISOString().split("T")[0],
    location: "",
    paymentMethod: "",
    adId: "",
    originalUrl: "",
    platform: "",
    sellerName: "",
    sellerPhone: "",
    sellerEmail: "",
    buyerName: "",
    buyerPhone: "",
    buyerEmail: "",
    sellerSignature: "",
    buyerSignature: "",
  };
}

export default function KvitteringPage() {
  const router = useRouter();
  const [receiptData, setReceiptData] = useState<ReceiptData>(
    getInitialReceiptData()
  );
  const [loading, setLoading] = useState(true);
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sjekk om vi har data fra forsiden
    const storedData = sessionStorage.getItem("receiptData");

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setReceiptData(parsedData);
      } catch (e) {
        console.error("Kunne ikke lese data fra sessionStorage", e);
      }
    }
    // Vi tillater at man kommer hit uten data (blankt skjema),
    // men vi setter loading til false uansett
    setLoading(false);
  }, []);

  // Animation variants - kun fade up, ingen slide
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const previewVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  const receiptCardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        delay: 0.3,
      },
    },
  };

  if (loading) {
    return null;
  }

  return (
    <main className="min-h-screen no-print pb-20 bg-[#F2F2F7]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-2 sm:px-6 py-4 sm:py-8 max-w-7xl"
      >
        <div className="grid lg:grid-cols-2  items-start">
          {/* Left: Form - vises først på mobil */}
          <motion.div
            variants={fadeUpVariants}
            className="order-2 lg:order-1 lg:pr-8"
          >
            <ReceiptForm data={receiptData} onChange={setReceiptData} />
            <div className="mt-8">
              <ExportButtons receiptRef={receiptRef} data={receiptData} />
            </div>
          </motion.div>

          {/* Right: Preview - vises øverst på mobil */}
          <motion.div
            variants={previewVariants}
            className="order-1 lg:order-2 lg:sticky lg:top-32"
          >
            <motion.div
              variants={receiptCardVariants}
              className="flex justify-center overflow-x-auto py-4"
            >
              <div className="min-w-fit">
                <ReceiptPreview ref={receiptRef} data={receiptData} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
