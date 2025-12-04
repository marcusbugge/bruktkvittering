import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconClassName, textClassName, iconOnly = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-1.5 select-none", className)}>
      <div className={cn("relative flex items-center justify-center text-primary", iconClassName)}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full"
        >
          <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
          <path d="M14 8H8" />
          <path d="M16 12H8" />
          <path d="M13 16H8" />
        </svg>
      </div>
      {!iconOnly && (
        <span className={cn("font-bold text-2xl tracking-tight leading-none", textClassName)}>
          Bruktkvittering
        </span>
      )}
    </div>
  );
}
