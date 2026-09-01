"use client";

import { useEffect, useRef, useState } from "react";
import { TextReveal, type TextRevealProps } from "@/components/ui/text-reveal";

type Props = Omit<TextRevealProps, "trigger"> & {
  /** Fração do elemento visível para disparar. */
  threshold?: number;
};

/**
 * Título que revela palavra a palavra quando entra na tela.
 * Respeita quem prefere menos movimento.
 */
export default function RevealTitle({
  threshold = 0.25,
  as = "h2",
  per = "word",
  preset = "fade-in-blur",
  speedReveal = 1.3,
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div ref={ref}>
      <TextReveal
        as={as}
        per={per}
        preset={preset}
        speedReveal={speedReveal}
        trigger={reduced ? true : inView}
        {...rest}
      />
    </div>
  );
}
