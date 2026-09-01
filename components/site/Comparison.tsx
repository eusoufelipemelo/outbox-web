import Image from "next/image";
import { Check, X } from "lucide-react";
import { COMPARISON } from "@/lib/site";
import RevealTitle from "@/components/ui/reveal-title";

export default function Comparison() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="container-outbox relative z-10">
        <div className="mx-auto max-w-[42ch] text-center">
          <span className="pill reveal">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]"
            />
            Nosso diferencial
          </span>
          <RevealTitle
            as="h2"
            className="mt-6 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.07] text-white"
          >
            A diferença entre ter um site e ser encontrado.
          </RevealTitle>
        </div>

        <div className="mx-auto mt-14 grid max-w-[900px] gap-5 md:grid-cols-2">
          {/* Como a maioria faz */}
          <div className="reveal rounded-[var(--radius-xl2)] border border-white/8 bg-white/[0.02] p-7 md:p-8">
            <h3 className="font-display text-[21px] text-white/60">
              O jeito de sempre
            </h3>
            <ul className="mt-6 flex flex-col gap-4">
              {COMPARISON.others.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[14.5px] leading-relaxed text-[var(--color-fg-subtle)]"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/6">
                    <X className="h-3 w-3 text-white/40" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Como a OutBox faz */}
          <div
            className="reveal relative overflow-hidden rounded-[var(--radius-xl2)] border border-[var(--color-brand)]/35 bg-gradient-to-b from-[var(--color-brand)]/10 to-transparent p-7 md:p-8"
            style={{ transitionDelay: "120ms" }}
          >
            <div
              aria-hidden
              className="glow glow--brand absolute -right-16 -top-16 h-56 w-56"
            />
            <h3 className="relative z-10 flex items-center gap-2.5 font-display text-[21px] text-white">
              <Image
                src="/brand/logo-mark.svg"
                alt=""
                width={26}
                height={26}
                className="h-[26px] w-[26px]"
              />
              Com a OutBox
            </h3>
            <ul className="relative z-10 mt-6 flex flex-col gap-4">
              {COMPARISON.outbox.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[14.5px] leading-relaxed text-white/90"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)]">
                    <Check className="h-3 w-3 text-white" strokeWidth={3.2} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
