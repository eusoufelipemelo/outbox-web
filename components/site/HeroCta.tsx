import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/* Botão principal do topo da home, com a borda viva (ver .borda-viva). */
export default function HeroCta() {
  return (
    <Link
      href="/#contato"
      className="borda-viva group flex min-h-14 cursor-pointer items-center gap-3 rounded-full bg-white py-2 pl-2 pr-6 text-[15px] font-medium text-black"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-brand)] transition-transform duration-300 group-hover:rotate-45">
        <ArrowUpRight className="h-4.5 w-4.5 text-white" strokeWidth={2.4} aria-hidden />
      </span>
      Começar meu projeto
    </Link>
  );
}
