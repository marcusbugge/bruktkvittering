"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ReceiptData } from "@/lib/types";
import { SignaturePad } from "./signature-pad";
import { Sparkles, MapPin, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

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

  // iOS-style classes
  const groupClass =
    "bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 mb-6";
  const rowClass =
    "flex items-center px-4 py-3 border-b border-gray-100 last:border-0 bg-white min-h-[52px]";
  const labelClass = "w-28 text-[15px] text-gray-900 font-medium shrink-0";
  const inputClass =
    "w-full text-[15px] text-gray-900 placeholder:text-gray-400 bg-transparent border-0 p-0 focus:ring-0 leading-normal";
  const sectionHeaderClass =
    "text-[13px] font-normal text-gray-500 uppercase tracking-wide ml-4 mb-2 mt-6 first:mt-2";

  return (
    <div className="max-w-xl mx-auto pb-6">
      {/* Produkt Seksjon */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className={sectionHeaderClass}>Produktdetaljer</h3>
        <div className={groupClass}>
          <div className={rowClass}>
            <label className={labelClass}>Produkt</label>
            <input
              type="text"
              value={data.productName}
              onChange={(e) => handleChange("productName", e.target.value)}
              placeholder="F.eks. iPhone 14"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col px-4 py-3 border-b border-gray-100 bg-white">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[15px] text-gray-900 font-medium">
                Beskrivelse
              </label>
              {data.description && (
                <button
                  type="button"
                  onClick={handleImproveDescription}
                  disabled={aiLoading}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 disabled:opacity-40 transition-colors flex items-center gap-1"
                >
                  {aiLoading ? (
                    <Sparkles className="w-3 h-3 animate-spin" />
                  ) : (
                    <Sparkles className="w-3 h-3" />
                  )}
                  {aiLoading ? "Forbedrer..." : "Forbedre"}
                </button>
              )}
            </div>
            <textarea
              value={data.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Kort beskrivelse..."
              rows={3}
              className="w-full text-[15px] text-gray-900 placeholder:text-gray-400 bg-transparent border-0 p-0 focus:ring-0 resize-none"
            />
          </div>

          <div className={rowClass}>
            <label className={labelClass}>Pris</label>
            <div className="flex items-center flex-1">
              <input
                type="number"
                value={data.price || ""}
                onChange={(e) =>
                  handleChange("price", parseInt(e.target.value) || 0)
                }
                placeholder="0"
                className={inputClass}
              />
              <span className="text-gray-400 text-[15px] ml-2">kr</span>
            </div>
          </div>

          <div className={rowClass}>
            <label className={labelClass}>Dato</label>
            <div className="flex-1 relative">
              <input
                type="date"
                value={data.purchaseDate}
                onChange={(e) => handleChange("purchaseDate", e.target.value)}
                className={`${inputClass} appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                <span className="text-gray-400 text-[15px] mr-1">
                  {data.purchaseDate
                    ? new Date(data.purchaseDate).toLocaleDateString("nb-NO", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "Velg dato"}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </div>
            </div>
          </div>

          <div className={rowClass}>
            <label className={labelClass}>Sted</label>
            <div className="flex items-center flex-1">
              <input
                type="text"
                value={data.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="Oslo"
                className={inputClass}
              />
              {data.location && (
                <MapPin className="w-4 h-4 text-gray-300 ml-2" />
              )}
            </div>
          </div>

          <div className={rowClass}>
            <label className={labelClass}>Betaling</label>
            <div className="flex-1 relative">
              <select
                value={data.paymentMethod}
                onChange={(e) => handleChange("paymentMethod", e.target.value)}
                className={`${inputClass} appearance-none pr-8`}
              >
                <option value="">Velg...</option>
                <option value="Vipps">Vipps</option>
                <option value="Kontant">Kontant</option>
                <option value="Bankoverføring">Bankoverføring</option>
                <option value="Kort">Kort</option>
                <option value="PayPal">PayPal</option>
                <option value="Annet">Annet</option>
              </select>
              <ChevronRight className="w-4 h-4 text-gray-300 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Selger Seksjon */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h3 className={sectionHeaderClass}>Selger</h3>
        <div className={groupClass}>
          <div className={rowClass}>
            <label className={labelClass}>Navn</label>
            <input
              type="text"
              value={data.sellerName}
              onChange={(e) => handleChange("sellerName", e.target.value)}
              placeholder="Fullt navn"
              className={inputClass}
            />
          </div>
          <div className={rowClass}>
            <label className={labelClass}>Telefon</label>
            <input
              type="tel"
              value={data.sellerPhone || ""}
              onChange={(e) => handleChange("sellerPhone", e.target.value)}
              placeholder="Valgfritt"
              className={inputClass}
            />
          </div>
          <div className={rowClass}>
            <label className={labelClass}>E-post</label>
            <input
              type="email"
              value={data.sellerEmail || ""}
              onChange={(e) => handleChange("sellerEmail", e.target.value)}
              placeholder="Valgfritt"
              className={inputClass}
            />
          </div>
        </div>
      </motion.div>

      {/* Kjøper Seksjon */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h3 className={sectionHeaderClass}>Kjøper</h3>
        <div className={groupClass}>
          <div className={rowClass}>
            <label className={labelClass}>Navn</label>
            <input
              type="text"
              value={data.buyerName}
              onChange={(e) => handleChange("buyerName", e.target.value)}
              placeholder="Fullt navn"
              className={inputClass}
            />
          </div>
          <div className={rowClass}>
            <label className={labelClass}>Telefon</label>
            <input
              type="tel"
              value={data.buyerPhone || ""}
              onChange={(e) => handleChange("buyerPhone", e.target.value)}
              placeholder="Valgfritt"
              className={inputClass}
            />
          </div>
          <div className={rowClass}>
            <label className={labelClass}>E-post</label>
            <input
              type="email"
              value={data.buyerEmail || ""}
              onChange={(e) => handleChange("buyerEmail", e.target.value)}
              placeholder="Valgfritt"
              className={inputClass}
            />
          </div>
        </div>
      </motion.div>

      {/* Signatur Seksjon */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <h3 className={sectionHeaderClass}>Signering</h3>
        <div className="grid grid-cols-2 gap-3">
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
        </div>
      </motion.div>
    </div>
  );
}
