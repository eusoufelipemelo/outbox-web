import Image from "next/image";

const CLIENTES = [
  { nome: "Jônas Pastore", logo: "/img/logo-jonas.svg" },
  { nome: "Escola de Planejados", logo: "/img/logo-nicoli.png" },
  { nome: "Couros do Valleh", logo: "/img/logo-patricia.svg" },
  { nome: "Clínica Paz Pediatria", logo: "/img/logo-alexandre.svg" },
  { nome: "Dr. Fabrício Sanches", logo: "/img/logo-fabricio.png" },
  { nome: "Dra. Michelle Sanches", logo: "/img/logo-michelle.svg" },
];

/* Faixa de logos em cartões brancos, como "Our Clients" da referência. */
export default function Clientes() {
  const lista = [...CLIENTES, ...CLIENTES];
  return (
    <section aria-labelledby="clientes-titulo" className="bg-[var(--color-creme)] pb-24 md:pb-32">
      <div className="container-outbox flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 id="clientes-titulo" className="v3-titulo">
          Nossos clientes
        </h2>
        <p className="v3-sub max-w-[34ch] md:text-right">Quem já trabalhou com a gente</p>
      </div>

      <div
        className="mt-10 overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
        }}
      >
        <ul className="v3-faixa gap-3 pr-3" style={{ ["--dur" as string]: "38s" }}>
          {lista.map((c, i) => (
            <li
              key={i}
              aria-hidden={i >= CLIENTES.length || undefined}
              className="flex h-[92px] shrink-0 items-center gap-3 rounded-[18px] bg-white px-7"
            >
              <Image src={c.logo} alt="" width={44} height={44} className="h-11 w-11 object-contain" />
              <span className="whitespace-nowrap text-[19px] font-bold tracking-[-0.02em]">{c.nome}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
