"use client";

import { useState } from "react";
import { ScrapedData, ScrapeResponse } from "@/lib/types";

interface UrlInputProps {
  onDataFetched: (data: ScrapedData) => void;
}

export function UrlInput({ onDataFetched }: UrlInputProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const result: ScrapeResponse = await response.json();

      if (!result.success || !result.data) {
        throw new Error(result.error || "Kunne ikke hente data");
      }

      onDataFetched(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "En feil oppstod");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <input
          type="url"
          placeholder="Lim inn lenke fra Finn.no eller Tise..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full h-14 px-4 pr-20 sm:px-5 sm:pr-24 rounded-xl border-2 border-border bg-background text-sm sm:text-base focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/60 placeholder:text-xs sm:placeholder:text-base"
        />
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 h-9 sm:h-10 px-3 sm:px-5 rounded-lg bg-primary text-primary-foreground text-sm sm:text-base font-semibold disabled:opacity-40 hover:bg-primary/90 transition-all shadow-md hover:shadow-lg disabled:shadow-none"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            </span>
          ) : (
            "Hent"
          )}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm text-destructive text-center bg-destructive/10 py-2 px-4 rounded-lg">
          {error}
        </p>
      )}
    </form>
  );
}
