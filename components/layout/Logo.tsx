import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SIZES = {
  sm: { height: 32, width: 77 },
  md: { height: 44, width: 106 },
  lg: { height: 64, width: 154 },
  xl: { height: 96, width: 231 },
} as const;

export function Logo({
  size = "md",
  variant = "light",
  className,
}: {
  size?: keyof typeof SIZES;
  /**
   * The source file is dark-navy-on-transparent, designed for light
   * backgrounds. Since Section 2.5 makes nav/footer/hero dark
   * everywhere, "light" (the default) renders it as a white silhouette
   * via CSS filter so it stays legible — this trades away the logo's
   * blue color for guaranteed contrast. Use "original" only where the
   * logo sits on a light/white surface. A proper reversed/white logo
   * file from the brand would remove the need for this filter.
   */
  variant?: "light" | "original";
  className?: string;
}) {
  const { height, width } = SIZES[size];

  return (
    <Link
      href="/"
      className={cn("inline-flex items-center focus-visible:outline-none", className)}
      aria-label="M-CEL TECH — go to homepage"
      data-cursor="true"
    >
      <Image
        src="/logo-main.png"
        alt="M-CEL TECH"
        height={height}
        width={width}
        priority
        className={cn("h-auto w-auto", variant === "light" && "brightness-0 invert")}
        style={{ height }}
      />
    </Link>
  );
}
