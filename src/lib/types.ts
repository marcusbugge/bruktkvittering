export interface ScrapedData {
  title: string;
  description: string;
  price: number;
  images: string[];
  seller: string;
  adId: string;
  platform: "finn" | "tise" | "unknown";
  originalUrl: string;
}

export interface ReceiptData {
  // Produkt
  productName: string;
  description: string;
  price: number;
  productImage?: string;

  // Transaksjon
  purchaseDate: string;
  location: string;
  paymentMethod: string;
  adId: string;
  originalUrl: string;
  platform: string;

  // Selger
  sellerName: string;
  sellerPhone?: string;
  sellerEmail?: string;

  // Kjøper
  buyerName: string;
  buyerPhone?: string;
  buyerEmail?: string;

  // Signaturer
  sellerSignature?: string;
  buyerSignature?: string;
}

export interface ScrapeResponse {
  success: boolean;
  data?: ScrapedData;
  error?: string;
}
