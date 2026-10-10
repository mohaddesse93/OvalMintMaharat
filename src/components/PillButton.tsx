import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../utils/cn";

export type PillVariant =
  | "deepForest"
  | "forest"
  | "pine"
  | "jade"
  | "sage"
  | "mist";

const variants: Record<
  PillVariant,
  { base: string; text: string; shadow: string; highlight: string }
> = {
  deepForest: {
    base: "bg-[#051F20]",
    text: "text-[#DAF1DE]",
    shadow:
      "shadow-[0_18px_30px_-10px_rgba(0,0,0,0.9),0_6px_10px_-4px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-2px_4px_rgba(0,0,0,0.45)]",
    highlight: "from-white/8",
  },
  forest: {
    base: "bg-[#0B2B26]",
    text: "text-[#DAF1DE]",
    shadow:
      "shadow-[0_18px_30px_-10px_rgba(0,0,0,0.88),0_6px_10px_-4px_rgba(0,0,0,0.68),inset_0_1px_0_rgba(255,255,255,0.09),inset_0_-2px_4px_rgba(0,0,0,0.4)]",
    highlight: "from-white/9",
  },
  pine: {
    base: "bg-[#163832]",
    text: "text-[#DAF1DE]",
    shadow:
      "shadow-[0_18px_30px_-10px_rgba(0,0,0,0.85),0_6px_10px_-4px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.36)]",
    highlight: "from-white/10",
  },
  jade: {
    base: "bg-[#235347]",
    text: "text-[#DAF1DE]",
    shadow:
      "shadow-[0_18px_30px_-10px_rgba(0,0,0,0.82),0_6px_10px_-4px_rgba(0,0,0,0.62),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-2px_4px_rgba(0,0,0,0.32)]",
    highlight: "from-white/12",
  },
  sage: {
    base: "bg-[#8EB69B]",
    text: "text-[#051F20]",
    shadow:
      "shadow-[0_18px_30px_-10px_rgba(0,0,0,0.78),0_6px_10px_-4px_rgba(0,0,0,0.58),inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-2px_4px_rgba(0,0,0,0.2)]",
    highlight: "from-white/24",
  },
  mist: {
    base: "bg-[#DAF1DE]",
    text: "text-[#051F20]",
    shadow:
      "shadow-[0_18px_30px_-10px_rgba(0,0,0,0.74),0_6px_10px_-4px_rgba(0,0,0,0.54),inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-2px_4px_rgba(0,0,0,0.14)]",
    highlight: "from-white/40",
  },
};

const sizes = {
  sm: "h-12 px-8 text-sm",
  md: "h-16 px-12 text-base",
  lg: "h-24 px-16 text-lg",
  xl: "h-24 px-16 text-lg sm:h-28 sm:px-20 sm:text-xl",
};

export interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PillVariant;
  size?: keyof typeof sizes;
}

const PillButton = forwardRef<HTMLButtonElement, PillButtonProps>(
  ({ variant = "mist", size = "lg", className, children, ...props }, ref) => {
    const v = variants[variant];
    return (
      <button
        ref={ref}
        className={cn(
          "group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full",
          "font-medium tracking-wide select-none",
          "transition-all duration-300 ease-out",
          "hover:-translate-y-0.5 hover:brightness-105",
          "active:translate-y-0.5 active:scale-[0.985] active:brightness-95 active:duration-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#1e1f25]",
          "disabled:pointer-events-none disabled:opacity-50",
          v.base,
          v.text,
          v.shadow,
          sizes[size],
          className
        )}
        {...props}
      >
        {/* soft top-left sheen */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br to-transparent to-60% opacity-80 transition-opacity duration-300 group-hover:opacity-100",
            v.highlight
          )}
        />
        {/* fine grain / matte texture */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

PillButton.displayName = "PillButton";

export default PillButton;
