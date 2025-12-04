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
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-black/5 transition-all">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 h-12 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <Logo
            textClassName="text-black text-[17px] font-semibold tracking-normal"
            iconClassName="text-black w-5 h-5"
          />
        </Link>

        {/* Desktop Menu - Apple Style (Text Links) */}
        <div className="hidden md:flex items-center gap-8">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-[12px] font-normal text-gray-600 hover:text-black transition-colors outline-none tracking-wide">
              Guider <ChevronDown className="w-3 h-3 opacity-50" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="w-48 p-1 rounded-xl border-black/5 shadow-xl bg-white/95 backdrop-blur-xl"
            >
              <DropdownMenuItem
                asChild
                className="cursor-pointer rounded-lg text-[13px]"
              >
                <Link href="/faq/finn" className="flex items-center gap-3 py-1">
                  <div className="relative w-4 h-4 grayscale opacity-80">
                    <Image
                      src="/finn.png"
                      alt="Finn"
                      fill
                      className="object-contain"
                    />
                  </div>
                  Finn.no Guide
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="cursor-pointer rounded-lg text-[13px]"
              >
                <Link href="/faq/tise" className="flex items-center gap-3 py-1">
                  <div className="relative w-4 h-4 grayscale opacity-80">
                    <Image
                      src="/tise.png"
                      alt="Tise"
                      fill
                      className="object-contain"
                    />
                  </div>
                  Tise Guide
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/faq"
            className="text-[12px] font-normal text-gray-600 hover:text-black transition-colors tracking-wide"
          >
            Hjelpesenter
          </Link>

          <Button
            asChild
            size="sm"
            className="h-7 px-3 rounded-full bg-black hover:bg-gray-800 text-white text-[12px] font-medium shadow-none transition-all"
          >
            <Link href="/">Lag kvittering</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-black hover:bg-black/5"
              >
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 p-2 rounded-xl border-black/5 shadow-xl bg-white/95 backdrop-blur-xl mt-2"
            >
              <DropdownMenuItem
                asChild
                className="cursor-pointer mb-1 bg-black text-white focus:bg-gray-800 focus:text-white rounded-lg"
              >
                <Link href="/" className="justify-center font-medium">
                  Lag ny kvittering
                </Link>
              </DropdownMenuItem>
              <div className="h-px bg-gray-100 my-2" />
              <DropdownMenuItem
                asChild
                className="cursor-pointer rounded-lg text-[15px]"
              >
                <Link href="/faq">Hjelpesenter</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="cursor-pointer rounded-lg text-[15px]"
              >
                <Link href="/faq/finn" className="flex items-center gap-2">
                  <div className="relative w-4 h-4">
                    <Image
                      src="/finn.png"
                      alt="Finn"
                      fill
                      className="object-contain"
                    />
                  </div>
                  Finn.no Guide
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="cursor-pointer rounded-lg text-[15px]"
              >
                <Link href="/faq/tise" className="flex items-center gap-2">
                  <div className="relative w-4 h-4">
                    <Image
                      src="/tise.png"
                      alt="Tise"
                      fill
                      className="object-contain"
                    />
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
