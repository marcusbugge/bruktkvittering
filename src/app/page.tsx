"use client";

import { useRouter } from "next/navigation";
import { UrlInput } from "@/components/url-input";
import { ScrapedData, ReceiptData } from "@/lib/types";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { useState, useEffect } from "react";

// Typing effect component
function TypeWriter({
  text,
  delay = 50,
  className = "",
  onComplete,
}: {
  text: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, delay, text, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle"
        />
      )}
    </span>
  );
}

export default function Home() {
  const router = useRouter();
  const [showSubtitle, setShowSubtitle] = useState(false);

  const handleDataFetched = (data: ScrapedData) => {
    const receiptData: ReceiptData = {
      productName: data.title,
      description: data.description,
      price: data.price,
      productImage: data.images?.[0] || "",
      purchaseDate: new Date().toISOString().split("T")[0],
      location: "",
      paymentMethod: "",
      adId: data.adId,
      originalUrl: data.originalUrl,
      platform: data.platform,
      sellerName: data.seller,
      sellerPhone: "",
      sellerEmail: "",
      buyerName: "",
      buyerPhone: "",
      buyerEmail: "",
      sellerSignature: "",
      buyerSignature: "",
    };

    sessionStorage.setItem("receiptData", JSON.stringify(receiptData));
    router.push("/kvittering");
  };

  const handleManualEntry = () => {
    sessionStorage.removeItem("receiptData");
    router.push("/kvittering");
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const logoVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: -2,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const inputVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        delay: 0.4,
      },
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
        delay: 0.6,
      },
    },
  };

  const platformVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
        delay: 0.8 + i * 0.15,
      },
    }),
  };

  return (
    <main className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center px-4 relative overflow-hidden py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-xl text-center relative z-10"
      >
        {/* Logo */}
        <motion.div
          variants={logoVariants}
          className="mb-10 inline-block"
          whileHover={{ rotate: 0, scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-center mb-8">
            <Logo
              iconClassName="w-24 h-24 text-primary drop-shadow-xl"
              iconOnly
            />
          </div>
        </motion.div>

        {/* Title with typing effect */}
        <motion.div variants={fadeUpVariants} className="mb-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            <TypeWriter
              text="Bruktkvittering"
              delay={80}
              onComplete={() => setShowSubtitle(true)}
            />
          </h1>
        </motion.div>

        {/* Subtitle with fade in after typing */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={showSubtitle ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10"
        >
          <p className="text-muted-foreground text-lg max-w-sm mx-auto px-4">
            Lag profesjonelle kvitteringer for dine bruktkjøp på 1-2-3
          </p>
        </motion.div>

        {/* URL Input */}
        <motion.div
          variants={inputVariants}
          className="bg-white/80 backdrop-blur-xl p-2 rounded-2xl shadow-2xl border border-white/20 mb-8 mx-4 sm:mx-0"
          whileHover={{
            scale: 1.02,
            boxShadow: "0 25px 50px -12px rgba(124, 58, 237, 0.25)",
          }}
          transition={{ duration: 0.2 }}
        >
          <UrlInput onDataFetched={handleDataFetched} />
        </motion.div>

        {/* Manual entry button */}
        <motion.button
          variants={buttonVariants}
          onClick={handleManualEntry}
          className="group flex items-center gap-2 mx-auto text-sm font-medium text-muted-foreground hover:text-foreground transition-colors p-2"
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          Eller fyll inn manuelt
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        {/* Platform logos */}
        <div className="mt-16 flex items-center justify-center gap-12 text-xs font-medium text-muted-foreground/60">
          <motion.div
            custom={0}
            variants={platformVariants}
            className="flex flex-col items-center gap-3 group"
            whileHover={{ scale: 1.1, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <div className="relative w-24 h-8">
              <Image
                src="/finn.png"
                alt="Finn.no"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
          <motion.div
            custom={1}
            variants={platformVariants}
            className="flex flex-col items-center gap-3 group"
            whileHover={{ scale: 1.1, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <div className="relative w-16 h-8">
              <Image
                src="/tise.png"
                alt="Tise"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
