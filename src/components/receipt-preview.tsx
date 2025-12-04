"use client";

import { forwardRef } from "react";
import { ReceiptData } from "@/lib/types";
import { Check } from "lucide-react";

interface ReceiptPreviewProps {
  data: ReceiptData;
}

export const ReceiptPreview = forwardRef<HTMLDivElement, ReceiptPreviewProps>(
  function ReceiptPreview({ data }, ref) {
    const formatDate = (dateString: string) => {
      if (!dateString) return "—";
      const date = new Date(dateString);
      return date.toLocaleDateString("nb-NO", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    };

    const formatPrice = (price: number) => {
      return new Intl.NumberFormat("nb-NO", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
    };

    const formatTime = () => {
      const now = new Date();
      return now.toLocaleTimeString("nb-NO", {
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    // Apple-style typography
    const labelStyle = {
      fontSize: "11px",
      color: "#8E8E93",
      marginBottom: "2px",
      textTransform: "uppercase" as const,
      letterSpacing: "0.02em",
      fontWeight: 500,
    };

    const valueStyle = {
      fontSize: "15px",
      color: "#000000",
      fontWeight: 400,
      lineHeight: "1.3",
    };

    const sectionStyle = {
      padding: "12px 0",
      borderBottom: "1px solid #E5E5EA",
    };

    return (
      <div
        ref={ref}
        style={{
          backgroundColor: "#ffffff",
          width: "320px",
          margin: "0 auto",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
          borderRadius: "16px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#007AFF",
            padding: "24px 20px 20px",
            color: "white",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "12px",
              margin: "0 auto 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Check size={24} color="white" strokeWidth={3} />
          </div>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: 700,
              margin: "0 0 4px",
              letterSpacing: "-0.01em",
            }}
          >
            Kvittering
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.8)" }}>
            Bruktkvittering
          </p>
        </div>

        {/* Content */}
        <div style={{ padding: "0 20px 24px" }}>
          {/* Main Info */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "20px",
              paddingBottom: "16px",
              borderBottom: "1px solid #E5E5EA",
            }}
          >
            <div>
              <p style={labelStyle}>Dato</p>
              <p style={valueStyle}>{formatDate(data.purchaseDate)}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={labelStyle}>Tid</p>
              <p style={valueStyle}>{formatTime()}</p>
            </div>
          </div>

          {/* Product */}
          <div style={sectionStyle}>
            <p style={labelStyle}>Produkt</p>
            <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
              {data.productImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`/api/proxy-image?url=${encodeURIComponent(
                    data.productImage
                  )}`}
                  alt="Produkt"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "8px",
                    objectFit: "cover",
                    backgroundColor: "#F2F2F7",
                  }}
                />
              )}
              <div style={{ flex: 1 }}>
                <p style={{ ...valueStyle, fontWeight: 600 }}>
                  {data.productName || "—"}
                </p>
                {data.description && (
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#8E8E93",
                      marginTop: "2px",
                    }}
                  >
                    {data.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div style={sectionStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "4px",
              }}
            >
              <span style={{ fontSize: "15px", color: "#000" }}>Beløp</span>
              <span style={{ fontSize: "15px", color: "#000" }}>
                kr {formatPrice(data.price || 0)}
              </span>
            </div>
            {data.paymentMethod && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: "13px", color: "#8E8E93" }}>
                  Betalt med
                </span>
                <span style={{ fontSize: "13px", color: "#8E8E93" }}>
                  {data.paymentMethod}
                </span>
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "12px",
                paddingTop: "12px",
                borderTop: "1px dashed #E5E5EA",
              }}
            >
              <span style={{ fontSize: "17px", fontWeight: 700 }}>Total</span>
              <span style={{ fontSize: "17px", fontWeight: 700 }}>
                kr {formatPrice(data.price || 0)}
              </span>
            </div>
          </div>

          {/* Seller / Buyer Grid */}
          <div style={sectionStyle}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div>
                <p style={labelStyle}>Selger</p>
                <p style={{ ...valueStyle, fontWeight: 500 }}>
                  {data.sellerName || "—"}
                </p>
                {data.sellerPhone && (
                  <p style={{ fontSize: "13px", color: "#8E8E93" }}>
                    {data.sellerPhone}
                  </p>
                )}
              </div>
              <div>
                <p style={labelStyle}>Kjøper</p>
                <p style={{ ...valueStyle, fontWeight: 500 }}>
                  {data.buyerName || "—"}
                </p>
                {data.buyerPhone && (
                  <p style={{ fontSize: "13px", color: "#8E8E93" }}>
                    {data.buyerPhone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Location */}
          {data.location && (
            <div style={sectionStyle}>
              <p style={labelStyle}>Sted</p>
              <p style={valueStyle}>{data.location}</p>
            </div>
          )}

          {/* Signatures */}
          {(data.sellerSignature || data.buyerSignature) && (
            <div style={{ paddingTop: "12px", paddingBottom: "12px" }}>
              <p style={labelStyle}>Signert</p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginTop: "8px",
                }}
              >
                {data.sellerSignature && (
                  <div style={{ textAlign: "center" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={data.sellerSignature}
                      alt="Selger"
                      style={{ height: "32px", maxWidth: "100%" }}
                    />
                    <p
                      style={{
                        fontSize: "10px",
                        color: "#C7C7CC",
                        marginTop: "4px",
                      }}
                    >
                      Selger
                    </p>
                  </div>
                )}
                {data.buyerSignature && (
                  <div style={{ textAlign: "center" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={data.buyerSignature}
                      alt="Kjøper"
                      style={{ height: "32px", maxWidth: "100%" }}
                    />
                    <p
                      style={{
                        fontSize: "10px",
                        color: "#C7C7CC",
                        marginTop: "4px",
                      }}
                    >
                      Kjøper
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Barcode Illusion */}
        <div
          style={{
            backgroundColor: "#F2F2F7",
            padding: "16px 20px",
            textAlign: "center",
          }}
        >
          {/* Barcode Lines Illusion */}
          <div
            style={{
              height: "32px",
              backgroundImage:
                "linear-gradient(90deg, #000 1px, transparent 1px, transparent 3px, #000 3px, #000 4px, transparent 4px, transparent 6px, #000 6px, #000 7px, transparent 7px, transparent 9px, #000 9px, #000 11px, transparent 11px, transparent 13px, #000 13px)",
              backgroundSize: "14px 100%",
              opacity: 0.15,
              marginBottom: "8px",
            }}
          />
          <p
            style={{
              fontSize: "10px",
              color: "#8E8E93",
              fontFamily: "monospace",
              marginBottom: "4px",
            }}
          >
            {data.adId || "NO-" + new Date().getFullYear() + "REC"}
          </p>
          <p style={{ fontSize: "9px", color: "#C7C7CC" }}>
            Laget med lagkvittering.no
          </p>
        </div>
      </div>
    );
  }
);
