"use client";

import { forwardRef } from "react";
import { ReceiptData } from "@/lib/types";
import { Package, User, ShoppingCart, PenTool } from "lucide-react";

interface ReceiptPreviewProps {
  data: ReceiptData;
}

export const ReceiptPreview = forwardRef<HTMLDivElement, ReceiptPreviewProps>(
  function ReceiptPreview({ data }, ref) {
    const formatDate = (dateString: string) => {
      if (!dateString) return "—";
      const date = new Date(dateString);
      return date.toLocaleDateString("nb-NO", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    };

    const formatTime = () => {
      return new Date().toLocaleTimeString("nb-NO", {
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const formatPrice = (price: number) => {
      return new Intl.NumberFormat("nb-NO", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price);
    };

    const sectionTitleStyle = {
      fontSize: "10px",
      fontWeight: "bold",
      color: "#1a1a1a",
      letterSpacing: "2px",
      marginBottom: "8px",
      display: "flex",
      alignItems: "center",
      textTransform: "uppercase" as const,
    };

    const sectionContentStyle = {
      paddingLeft: "8px",
      borderLeft: "2px solid #e5e5e5",
    };

    return (
      <div
        ref={ref}
        style={{
          backgroundColor: "#ffffff",
          color: "#1a1a1a",
          padding: "24px 20px",
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: "12px",
          width: "320px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
          borderRadius: "4px",
          position: "relative",
          margin: "0 auto",
        }}
      >
        {/* Torn edge effect top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background:
              "linear-gradient(135deg, transparent 33.33%, #fff 33.33%, #fff 66.66%, transparent 66.66%), linear-gradient(225deg, transparent 33.33%, #fff 33.33%, #fff 66.66%, transparent 66.66%)",
            backgroundSize: "8px 8px",
            marginTop: "-4px",
          }}
        />

        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "16px",
            paddingTop: "8px",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              letterSpacing: "4px",
              marginBottom: "4px",
            }}
          >
            KVITTERING
          </p>
          <p style={{ fontSize: "10px", color: "#666" }}>
            Kjøp mellom privatpersoner
          </p>
        </div>

        <div style={{ borderTop: "1px dashed #ccc", marginBottom: "12px" }} />

        {/* Date & Time */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "12px",
            fontSize: "11px",
          }}
        >
          <span>DATO: {formatDate(data.purchaseDate)}</span>
          <span>KL: {formatTime()}</span>
        </div>

        {data.location && (
          <p style={{ fontSize: "11px", marginBottom: "12px" }}>
            STED: {data.location}
          </p>
        )}

        <div style={{ borderTop: "1px dashed #ccc", marginBottom: "12px" }} />

        {/* Product */}
        <div style={{ marginBottom: "16px" }}>
          <div style={sectionTitleStyle}>
            <Package size={12} style={{ marginRight: "6px" }} />
            <span>Produkt</span>
          </div>
          <div style={sectionContentStyle}>
            {/* Product Image */}
            {data.productImage && (
              <div
                style={{
                  marginBottom: "10px",
                  borderRadius: "6px",
                  overflow: "hidden",
                  border: "1px solid #eee",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/api/proxy-image?url=${encodeURIComponent(
                    data.productImage
                  )}`}
                  alt={data.productName || "Produktbilde"}
                  crossOrigin="anonymous"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "120px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            )}
            <p
              style={{
                fontWeight: "bold",
                fontSize: "13px",
                marginBottom: data.description ? "6px" : "0",
                lineHeight: "1.3",
              }}
            >
              {data.productName || "—"}
            </p>
            {data.description && (
              <p
                style={{
                  fontSize: "11px",
                  color: "#444",
                  lineHeight: "1.5",
                  fontStyle: "italic",
                  padding: "6px 8px",
                  backgroundColor: "#fafafa",
                  borderRadius: "4px",
                  margin: "0",
                }}
              >
                {data.description}
              </p>
            )}
          </div>
        </div>

        <div style={{ borderTop: "1px dashed #ccc", marginBottom: "12px" }} />

        {/* Seller */}
        <div style={{ marginBottom: "12px" }}>
          <div style={sectionTitleStyle}>
            <User size={12} style={{ marginRight: "6px" }} />
            <span>Selger</span>
          </div>
          <div style={sectionContentStyle}>
            <p style={{ fontWeight: "bold" }}>{data.sellerName || "—"}</p>
            {data.sellerPhone && (
              <p style={{ fontSize: "10px", color: "#666" }}>
                Tlf: {data.sellerPhone}
              </p>
            )}
            {data.sellerEmail && (
              <p style={{ fontSize: "10px", color: "#666" }}>
                {data.sellerEmail}
              </p>
            )}
          </div>
        </div>

        {/* Buyer */}
        <div style={{ marginBottom: "16px" }}>
          <div style={sectionTitleStyle}>
            <ShoppingCart size={12} style={{ marginRight: "6px" }} />
            <span>Kjøper</span>
          </div>
          <div style={sectionContentStyle}>
            <p style={{ fontWeight: "bold" }}>{data.buyerName || "—"}</p>
            {data.buyerPhone && (
              <p style={{ fontSize: "10px", color: "#666" }}>
                Tlf: {data.buyerPhone}
              </p>
            )}
            {data.buyerEmail && (
              <p style={{ fontSize: "10px", color: "#666" }}>
                {data.buyerEmail}
              </p>
            )}
          </div>
        </div>

        <div style={{ borderTop: "1px dashed #ccc", marginBottom: "12px" }} />

        {/* Total */}
        <div style={{ marginBottom: "16px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "11px",
              marginBottom: "4px",
            }}
          >
            <span>Vare</span>
            <span>kr {formatPrice(data.price || 0)}</span>
          </div>
          {data.paymentMethod && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "11px",
                marginBottom: "8px",
              }}
            >
              <span>Betalt med</span>
              <span>{data.paymentMethod}</span>
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "16px",
              fontWeight: "bold",
              padding: "8px",
              backgroundColor: "#f5f5f5",
              borderRadius: "4px",
              marginTop: "8px",
            }}
          >
            <span>TOTALT</span>
            <span>kr {formatPrice(data.price || 0)}</span>
          </div>
        </div>

        {/* Signatures */}
        {(data.sellerSignature || data.buyerSignature) && (
          <>
            <div
              style={{ borderTop: "1px dashed #ccc", marginBottom: "12px" }}
            />
            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  ...sectionTitleStyle,
                  justifyContent: "center",
                  marginBottom: "12px",
                }}
              >
                <PenTool size={12} style={{ marginRight: "6px" }} />
                <span>Signaturer</span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontSize: "9px",
                      color: "#999",
                      marginBottom: "4px",
                    }}
                  >
                    Selger
                  </p>
                  {data.sellerSignature ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={data.sellerSignature}
                      alt="Selgers signatur"
                      style={{
                        maxHeight: "40px",
                        maxWidth: "100%",
                        margin: "0 auto",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        height: "40px",
                        borderBottom: "1px solid #ccc",
                      }}
                    />
                  )}
                </div>
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontSize: "9px",
                      color: "#999",
                      marginBottom: "4px",
                    }}
                  >
                    Kjøper
                  </p>
                  {data.buyerSignature ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={data.buyerSignature}
                      alt="Kjøpers signatur"
                      style={{
                        maxHeight: "40px",
                        maxWidth: "100%",
                        margin: "0 auto",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        height: "40px",
                        borderBottom: "1px solid #ccc",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        <div style={{ borderTop: "1px dashed #ccc", marginBottom: "12px" }} />

        {/* Reference */}
        <div style={{ textAlign: "center", fontSize: "10px", color: "#999" }}>
          {data.adId && <p>Ref: {data.adId}</p>}
          {data.platform && (
            <p>
              Kilde:{" "}
              {data.platform === "finn"
                ? "Finn.no"
                : data.platform === "tise"
                ? "Tise"
                : data.platform}
            </p>
          )}
          {data.originalUrl && (
            <p
              style={{
                fontSize: "8px",
                wordBreak: "break-all",
                marginTop: "4px",
              }}
            >
              {data.originalUrl}
            </p>
          )}
        </div>

        <div style={{ borderTop: "1px dashed #ccc", margin: "12px 0" }} />

        {/* Footer */}
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "10px", color: "#999", marginBottom: "8px" }}>
            Takk for handelen!
          </p>
          <p style={{ fontSize: "9px", color: "#ccc" }}>
            Generert {formatDate(new Date().toISOString())} kl {formatTime()}
          </p>
        </div>

        {/* Torn edge effect bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "8px",
            background:
              "linear-gradient(45deg, transparent 33.33%, #fff 33.33%, #fff 66.66%, transparent 66.66%), linear-gradient(315deg, transparent 33.33%, #fff 33.33%, #fff 66.66%, transparent 66.66%)",
            backgroundSize: "8px 8px",
            marginBottom: "-4px",
          }}
        />
      </div>
    );
  }
);
