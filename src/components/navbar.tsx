import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Image from "next/image";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-lg rounded-b-3xl px-4 sm:px-6 py-4 mb-8 navbar-pattern relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="navbar-orb navbar-orb-1" />
      <div className="navbar-orb navbar-orb-2" />
      
      {/* Light lines */}
      <div className="navbar-glow" />
      <div className="navbar-glow-bottom" />
      
      {/* Shimmer effect */}
      <div className="navbar-shimmer" />
      
      <div className="container mx-auto max-w-7xl flex items-center justify-between relative z-10">
        <Link 
          href="/" 
          className="flex items-center gap-2 hover:opacity-90 transition-opacity group"
        >
          <Logo textClassName="text-white" iconClassName="text-white w-8 h-8" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors outline-none">
              Guider <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/faq/finn" className="flex items-center gap-2">
                  <div className="relative w-4 h-4">
                    <Image src="/finn.png" alt="Finn" fill className="object-contain" />
                  </div>
                  Finn.no Guide
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/faq/tise" className="flex items-center gap-2">
                  <div className="relative w-4 h-4">
                    <Image src="/tise.png" alt="Tise" fill className="object-contain" />
                  </div>
                  Tise Guide
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link 
            href="/faq" 
            className="text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          >
            Hjelpesenter
          </Link>
          
          <Button 
            asChild 
            variant="secondary" 
            className="rounded-full font-bold shadow-sm hover:shadow-md transition-all bg-background text-foreground hover:bg-background/90"
          >
            <Link href="/">
              Lag ny kvittering
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Menu className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2">
              <DropdownMenuItem asChild className="cursor-pointer mb-1 bg-secondary/50 font-semibold">
                <Link href="/">
                  Lag ny kvittering
                </Link>
              </DropdownMenuItem>
              <div className="h-px bg-border my-2" />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/faq">Hjelpesenter</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/faq/finn" className="flex items-center gap-2">
                  <div className="relative w-4 h-4">
                    <Image src="/finn.png" alt="Finn" fill className="object-contain" />
                  </div>
                  Finn.no Guide
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/faq/tise" className="flex items-center gap-2">
                  <div className="relative w-4 h-4">
                    <Image src="/tise.png" alt="Tise" fill className="object-contain" />
                  </div>
                  Tise Guide
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
