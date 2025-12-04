"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ReceiptData } from "@/lib/types";
import { SignaturePad } from "./signature-pad";
import {
  Package,
  User,
  ShoppingCart,
  PenTool,
  Sparkles,
  Calendar,
  MapPin,
  CreditCard,
  Phone,
  Mail,
  Banknote,
} from "lucide-react";
import { motion } from "framer-motion";

// TypeWriter component for section titles
function TypeWriter({
  text,
  delay = 60,
  startDelay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  startDelay?: number;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, startDelay);
    return () => clearTimeout(startTimeout);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text, started]);

  return (
    <span className={className}>
      {displayText}
      {started && currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="inline-block w-[2px] h-[1em] bg-primary ml-0.5 align-middle"
        />
      )}
    </span>
  );
}

interface ReceiptFormProps {
  data: ReceiptData;
  onChange: (data: ReceiptData) => void;
}

export function ReceiptForm({ data, onChange }: ReceiptFormProps) {
  const [aiLoading, setAiLoading] = useState(false);

  // Bruk ref for å unngå stale closure i callbacks
  const dataRef = useRef(data);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    dataRef.current = data;
    onChangeRef.current = onChange;
  }, [data, onChange]);

  const handleChange = useCallback(
    (field: keyof ReceiptData, value: string | number) => {
      onChange({ ...data, [field]: value });
    },
    [data, onChange]
  );

  const handleImproveDescription = async () => {
    if (!data.description) return;

    setAiLoading(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: data.description }),
      });

      if (!response.ok) throw new Error("AI-feil");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("Ingen respons");

      const decoder = new TextDecoder();
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
      }

      if (result) {
        onChangeRef.current({ ...dataRef.current, description: result });
      }
    } catch (error) {
      console.error("AI-forbedring feilet:", error);
    } finally {
      setAiLoading(false);
    }
  };

  // Renere input stil: Hvit bakgrunn, delikat skygge, ingen border før focus
  const inputClass =
    "w-full h-10 px-3 rounded-lg bg-white text-sm text-foreground shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/40";
  const labelClass =
    "text-xs font-medium text-muted-foreground mb-1 block ml-0.5";

  const sectionClass = "mb-5";
  const sectionHeaderClass = "flex items-center gap-2 mb-3";
  const sectionTitleClass = "text-lg font-bold text-foreground tracking-tight";
  const sectionIconClass =
    "w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm text-primary";

  return (
    <div className="max-w-xl mx-auto">
      {/* Produkt Seksjon */}
      <motion.section
        className={sectionClass}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={sectionHeaderClass}>
          <motion.div
            className={sectionIconClass}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0,
            }}
          >
            <Package className="w-4 h-4" />
          </motion.div>
          <h3 className={sectionTitleClass}>
            <TypeWriter text="Produktdetaljer" delay={50} startDelay={100} />
          </h3>
        </div>

        <motion.div
          className="space-y-3 pl-3 border-l-2 border-primary/5 ml-3.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <div>
            <label className={labelClass}>Hva selges?</label>
            <input
              type="text"
              value={data.productName}
              onChange={(e) => handleChange("productName", e.target.value)}
              placeholder="F.eks. iPhone 14 Pro"
              className={inputClass}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2 ml-1">
              <label className="text-xs font-medium text-muted-foreground">
                Beskrivelse
              </label>
              {data.description && (
                <button
                  type="button"
                  onClick={handleImproveDescription}
                  disabled={aiLoading}
                  className="text-xs font-medium text-primary hover:text-primary/80 disabled:opacity-40 transition-colors flex items-center gap-1.5 bg-primary/5 px-2 py-1 rounded-full"
                >
                  {aiLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                    >
                      <Sparkles className="w-3 h-3" />
                    </motion.div>
                  ) : (
                    <Sparkles className="w-3 h-3" />
                  )}
                  {aiLoading ? "Forbedrer..." : "Forbedre med AI"}
                </button>
              )}
            </div>
            <div className="relative">
              <textarea
                value={data.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Kort beskrivelse av tilstand og utstyr..."
                rows={2}
                className={`${inputClass} h-auto py-2 resize-y min-h-[60px]`}
              />
              {aiLoading && (
                <div className="absolute inset-[1px] pointer-events-none rounded-lg overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.3), rgba(167, 139, 250, 0.5), rgba(124, 58, 237, 0.3), transparent)",
                      backgroundSize: "200% 100%",
                      animation: "ai-border-flow 1.5s linear infinite",
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Pris (kr)</label>
              <div className="relative">
                <input
                  type="number"
                  value={data.price || ""}
                  onChange={(e) =>
                    handleChange("price", parseInt(e.target.value) || 0)
                  }
                  placeholder="0"
                  className={`${inputClass} pl-10`}
                />
                <Banknote className="w-4 h-4 text-muted-foreground/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Dato</label>
              <div className="relative">
                <input
                  type="date"
                  value={data.purchaseDate}
                  onChange={(e) => handleChange("purchaseDate", e.target.value)}
                  className={`${inputClass} pl-10`}
                />
                <Calendar className="w-4 h-4 text-muted-foreground/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Sted</label>
              <div className="relative">
                <input
                  type="text"
                  value={data.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  placeholder="Oslo"
                  className={`${inputClass} pl-10`}
                />
                <MapPin className="w-4 h-4 text-muted-foreground/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Betalingsmåte</label>
              <div className="relative">
                <select
                  value={data.paymentMethod}
                  onChange={(e) =>
                    handleChange("paymentMethod", e.target.value)
                  }
                  className={`${inputClass} pl-10 appearance-none`}
                >
                  <option value="">Velg...</option>
                  <option value="Vipps">Vipps</option>
                  <option value="Kontant">Kontant</option>
                  <option value="Bankoverføring">Bankoverføring</option>
                  <option value="Kort">Kort</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Annet">Annet</option>
                </select>
                <CreditCard className="w-4 h-4 text-muted-foreground/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Selger Seksjon */}
      <motion.section
        className={sectionClass}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <div className={sectionHeaderClass}>
          <motion.div
            className={sectionIconClass}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.6,
            }}
          >
            <User className="w-4 h-4" />
          </motion.div>
          <h3 className={sectionTitleClass}>
            <TypeWriter text="Selger" delay={70} startDelay={700} />
          </h3>
        </div>

        <motion.div
          className="space-y-3 pl-3 border-l-2 border-primary/5 ml-3.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
        >
          <div>
            <label className={labelClass}>Navn</label>
            <input
              type="text"
              value={data.sellerName}
              onChange={(e) => handleChange("sellerName", e.target.value)}
              placeholder="Navn på selger"
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Telefon</label>
              <div className="relative">
                <input
                  type="tel"
                  value={data.sellerPhone || ""}
                  onChange={(e) => handleChange("sellerPhone", e.target.value)}
                  placeholder="Valgfritt"
                  className={`${inputClass} pl-10`}
                />
                <Phone className="w-4 h-4 text-muted-foreground/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            <div>
              <label className={labelClass}>E-post</label>
              <div className="relative">
                <input
                  type="email"
                  value={data.sellerEmail || ""}
                  onChange={(e) => handleChange("sellerEmail", e.target.value)}
                  placeholder="Valgfritt"
                  className={`${inputClass} pl-10`}
                />
                <Mail className="w-4 h-4 text-muted-foreground/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Kjøper Seksjon */}
      <motion.section
        className={sectionClass}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className={sectionHeaderClass}>
          <motion.div
            className={sectionIconClass}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 1.1,
            }}
          >
            <ShoppingCart className="w-4 h-4" />
          </motion.div>
          <h3 className={sectionTitleClass}>
            <TypeWriter text="Kjøper" delay={70} startDelay={1200} />
          </h3>
        </div>

        <motion.div
          className="space-y-3 pl-3 border-l-2 border-primary/5 ml-3.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.5 }}
        >
          <div>
            <label className={labelClass}>Navn</label>
            <input
              type="text"
              value={data.buyerName}
              onChange={(e) => handleChange("buyerName", e.target.value)}
              placeholder="Navn på kjøper"
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Telefon</label>
              <div className="relative">
                <input
                  type="tel"
                  value={data.buyerPhone || ""}
                  onChange={(e) => handleChange("buyerPhone", e.target.value)}
                  placeholder="Valgfritt"
                  className={`${inputClass} pl-10`}
                />
                <Phone className="w-4 h-4 text-muted-foreground/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            <div>
              <label className={labelClass}>E-post</label>
              <div className="relative">
                <input
                  type="email"
                  value={data.buyerEmail || ""}
                  onChange={(e) => handleChange("buyerEmail", e.target.value)}
                  placeholder="Valgfritt"
                  className={`${inputClass} pl-10`}
                />
                <Mail className="w-4 h-4 text-muted-foreground/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Signatur Seksjon */}
      <motion.section
        className={sectionClass}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45 }}
      >
        <div className={sectionHeaderClass}>
          <motion.div
            className={sectionIconClass}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 1.6,
            }}
          >
            <PenTool className="w-4 h-4" />
          </motion.div>
          <h3 className={sectionTitleClass}>
            <TypeWriter text="Signaturer" delay={60} startDelay={1700} />
          </h3>
        </div>

        <motion.div
          className="grid grid-cols-2 gap-3 pl-3 border-l-2 border-primary/5 ml-3.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 2 }}
        >
          <SignaturePad
            label="Selger"
            value={data.sellerSignature}
            onChange={(sig) => handleChange("sellerSignature", sig)}
          />
          <SignaturePad
            label="Kjøper"
            value={data.buyerSignature}
            onChange={(sig) => handleChange("buyerSignature", sig)}
          />
        </motion.div>
      </motion.section>
    </div>
  );
}
