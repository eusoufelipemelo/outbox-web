"use client";

import React, { type ComponentPropsWithoutRef, useRef } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  /** Inverte o sentido da animação. */
  reverse?: boolean;
  /** Pausa ao passar o mouse. */
  pauseOnHover?: boolean;
  children: React.ReactNode;
  /** Anima na vertical em vez da horizontal. */
  vertical?: boolean;
  /** Quantas vezes repetir o conteúdo para preencher. */
  repeat?: number;
  ariaLabel?: string;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ariaLabel,
  ...props
}: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  const copias = React.useMemo(
    () => (
      <>
        {Array.from({ length: repeat }, (_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around [gap:var(--gap)]",
              !vertical && "animate-marquee flex-row",
              vertical && "animate-marquee-vertical flex-col",
              pauseOnHover && "group-hover:[animation-play-state:paused]",
              reverse && "[animation-direction:reverse]"
            )}
          >
            {children}
          </div>
        ))}
      </>
    ),
    [repeat, children, vertical, pauseOnHover, reverse]
  );

  return (
    <div
      {...props}
      ref={marqueeRef}
      data-slot="marquee"
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
      aria-label={ariaLabel}
      aria-hidden="true"
    >
      {copias}
    </div>
  );
}

export default Marquee;
