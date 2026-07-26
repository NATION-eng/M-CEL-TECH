"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/useMagnetic";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const baseStyles =
  "relative inline-flex items-center justify-center gap-2.5 rounded-full font-extrabold tracking-wide transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 text-white shadow-[0_0_25px_rgba(34,211,238,0.45)] hover:shadow-[0_0_35px_rgba(34,211,238,0.75)] border border-cyan-300/40 hover:border-white/70",
  secondary:
    "bg-slate-800/90 text-white border-2 border-slate-400/50 hover:border-cyan-400/90 hover:bg-slate-700/95 shadow-lg shadow-black/50 backdrop-blur-md",
  outline:
    "bg-cyan-500/15 text-cyan-300 border-2 border-cyan-400 hover:bg-cyan-400 hover:text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.35)] backdrop-blur-md",
  ghost:
    "text-slate-200 bg-white/10 hover:bg-white/20 border border-white/20 shadow-md",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-11 px-5 text-xs sm:text-sm",
  md: "h-13 px-7 text-sm sm:text-base",
  lg: "h-14 px-8 text-base sm:text-lg",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> & {
    href: string;
    external?: boolean;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Section 3.19 — magnetic pull, glow, and radius-999 pill shape on every button.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
  const magnetic = useMagnetic<HTMLElement>(0.2);

  function composeStyle(callerStyle?: React.CSSProperties) {
    return { ...callerStyle, ...magnetic.style };
  }

  if ("href" in props && props.href) {
    const { href, external, style, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    if (external || href.startsWith("http") || href.startsWith("https://wa.me")) {
      return (
        <motion.a
          ref={magnetic.ref as React.Ref<HTMLAnchorElement>}
          style={composeStyle(style)}
          onMouseMove={(e) => magnetic.onMouseMove(e as unknown as React.MouseEvent<HTMLElement>)}
          onMouseLeave={() => magnetic.onMouseLeave()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          data-cursor="true"
          onClick={rest.onClick as React.MouseEventHandler<HTMLAnchorElement>}
          id={rest.id}
          title={rest.title}
          tabIndex={rest.tabIndex}
          aria-label={rest["aria-label"]}
        >
          {children}
        </motion.a>
      );
    }
    return (
      <motion.div
        ref={magnetic.ref as React.Ref<HTMLDivElement>}
        style={composeStyle(style)}
        onMouseMove={(e) => magnetic.onMouseMove(e as unknown as React.MouseEvent<HTMLElement>)}
        onMouseLeave={() => magnetic.onMouseLeave()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block"
      >
        <Link
          href={href}
          className={classes}
          data-cursor="true"
          onClick={rest.onClick as React.MouseEventHandler<HTMLAnchorElement>}
          id={rest.id}
          title={rest.title}
          tabIndex={rest.tabIndex}
          aria-label={rest["aria-label"]}
        >
          {children}
        </Link>
      </motion.div>
    );
  }

  const { variant: _v, size: _s, className: _c, style, type = "button", disabled, ...rest } = props as ButtonAsButton;
  return (
    <motion.button
      ref={magnetic.ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      style={composeStyle(style)}
      onMouseMove={(e) => magnetic.onMouseMove(e as unknown as React.MouseEvent<HTMLElement>)}
      onMouseLeave={() => magnetic.onMouseLeave()}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={classes}
      data-cursor="true"
      onClick={rest.onClick}
      id={rest.id}
      title={rest.title}
      tabIndex={rest.tabIndex}
      aria-label={rest["aria-label"]}
    >
      {children}
    </motion.button>
  );
}
