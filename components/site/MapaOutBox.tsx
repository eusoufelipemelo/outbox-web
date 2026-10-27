"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { SITE } from "@/lib/site";
import "leaflet/dist/leaflet.css";

const E = SITE.endereco;
const ENDERECO_COMPLETO = `${E.rua}, ${E.bairro}, ${E.cidade}, ${E.cep}`;
// A sede não recebe clientes: o link mostra o lugar, sem rota até a porta.
const LINK_GOOGLE = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ENDERECO_COMPLETO)}`;

/** Mapa da sede, abaixo do formulário. O Leaflet só carrega quando o mapa chega perto da tela. */
export default function MapaOutBox() {
  const caixa = useRef<HTMLDivElement>(null);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    const el = caixa.current;
    if (!el) return;
    let mapa: import("leaflet").Map | undefined;
    let cancelado = false;

    const montar = async () => {
      if (mapa || cancelado) return;
      const L = (await import("leaflet")).default;
      if (cancelado || mapa) return;
      const toque = window.matchMedia("(pointer: coarse)").matches;
      mapa = L.map(el, {
        center: [E.lat, E.lng],
        zoom: 15,
        scrollWheelZoom: false,
        // No celular, arrastar com um dedo rolaria o mapa em vez da página.
        dragging: !toque,
        zoomControl: false,
        attributionControl: true,
      });
      mapa.attributionControl.setPrefix(false);
      L.control.zoom({ position: "bottomright", zoomInTitle: "Aproximar", zoomOutTitle: "Afastar" }).addTo(mapa);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>',
      }).addTo(mapa);

      const pino = L.divIcon({
        className: "mapa-pino",
        html: '<span class="mapa-pino__onda"></span><span class="mapa-pino__disco"><svg viewBox="0 0 1248 1248" width="20" height="20" aria-hidden="true"><path fill="#fff" d="M845.429 0C1137.29 0 1248 128.377 1248 470.681V777.319C1248 1119.62 1137.29 1248 845.429 1248H402.571C110.707 1248 0 1117.84 0 777.319V251.376H218.539V757.714C218.539 944.914 260.249 996.624 409.779 996.624H836.794C986.323 996.624 1028.03 944.914 1028.03 757.714V490.286C1028.03 303.086 986.323 251.376 836.794 251.376H218.539V0H845.429Z"/></svg></span>',
        iconSize: [56, 56],
        iconAnchor: [28, 28],
        popupAnchor: [0, -24],
      });
      L.marker([E.lat, E.lng], { icon: pino, title: "OutBox Group", alt: "OutBox Group" })
        .addTo(mapa)
        .bindPopup(
          `<strong>OutBox Group</strong><br>${E.rua}<br>${E.bairro}, ${E.cidade}<br><a href="${LINK_GOOGLE}" target="_blank" rel="noopener noreferrer">Ver no Google Maps</a>`
        );
      setPronto(true);
    };

    const io = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          io.disconnect();
          montar();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(el);

    return () => {
      cancelado = true;
      io.disconnect();
      mapa?.remove();
    };
  }, []);

  return (
    <div className="card-dark mt-6 grid gap-8 overflow-hidden p-6 md:p-8 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-center lg:gap-10">
      <div>
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-brand)]/15">
          <MapPin className="h-5 w-5 text-[var(--color-brand)]" strokeWidth={2} aria-hidden />
        </span>
        <h3 className="mt-5 font-display text-[clamp(1.5rem,2.4vw,1.9rem)] leading-tight text-white">
          Onde a OutBox fica
        </h3>
        <address className="mt-4 text-[15.5px] not-italic leading-relaxed text-white/85">
          {E.rua}
          <br />
          {E.bairro}, {E.cidade}
          <br />
          CEP {E.cep}
        </address>
        <p className="mt-4 max-w-[38ch] text-[14.5px] leading-relaxed text-[var(--color-fg-muted)]">
          Atendemos empresas de todo o Brasil on-line. Para falar com a gente, use o formulário acima ou o WhatsApp.
        </p>
        <a
          href={LINK_GOOGLE}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-white/14 px-5 py-2.5 text-[14.5px] text-white/85 transition-colors duration-300 hover:border-white/30 hover:text-white"
        >
          <Navigation className="h-4 w-4" strokeWidth={2.2} aria-hidden />
          Ver no Google Maps
        </a>
      </div>

      <div className="relative">
        <div
          ref={caixa}
          role="region"
          aria-label={`Mapa com a localização da OutBox Group: ${ENDERECO_COMPLETO}`}
          className="mapa-outbox h-[300px] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#1a1917] md:h-[380px]"
        />
        {!pronto && (
          <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl text-[13.5px] text-[var(--color-fg-subtle)]">
            Carregando o mapa
          </div>
        )}
      </div>
    </div>
  );
}
