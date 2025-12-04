import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="mt-auto w-full border-t bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
            <span className="font-medium">© 2025 Bugge Digital</span>
            <Separator orientation="vertical" className="hidden sm:block h-3" />
            <span>Org.nr: 934 591 836</span>
          </div>

          <p className="text-center max-w-md opacity-70">
            FINN.no og Tise er uavhengige tjenester. Lagkvittering.no er ikke
            tilknyttet disse plattformene.
          </p>
        </div>
      </div>
    </footer>
  );
}
