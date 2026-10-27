"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/moving-border";

/* Botão principal do topo da home, com a borda laranja em movimento.
   Fica num componente cliente porque o Link é passado como "as". */
export default function HeroCta() {
  return (
    <Button
      as={Link}
      href="/#contato"
      borderRadius="9999px"
      duration={3200}
      containerClassName="group h-auto w-auto cursor-pointer bg-[rgba(241,85,50,0.35)] p-[2.5px] shadow-[0_10px_40px_-8px_rgba(241,85,50,0.6)]"
      borderClassName="h-24 w-24 opacity-100 bg-[radial-gradient(#ff7a5c_30%,#f15532_45%,transparent_62%)]"
      className="gap-3 border-white/0 bg-white py-2 pl-2 pr-6 text-[15px] font-medium text-black backdrop-blur-none"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-brand)] transition-transform duration-300 group-hover:rotate-45">
        <ArrowUpRight className="h-4.5 w-4.5 text-white" strokeWidth={2.4} />
      </span>
      Começar meu projeto
    </Button>
  );
}
