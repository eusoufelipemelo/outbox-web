import type { ReactNode } from "react";
import { SITE } from "@/lib/site";
import CookieConsent from "@/components/site/CookieConsent";
import Atribuicao from "@/components/site/Atribuicao";
import { HTML_LANG, type Locale } from "@/lib/i18n/config";
import { DICIONARIOS } from "@/lib/i18n/dicionarios";
import { I18nProvider } from "@/lib/i18n/client";
import { getT } from "@/lib/i18n/server";
import { clashDisplay, geist } from "@/lib/fontes";
import { SEDE, areaServedJsonLd } from "@/lib/regiao";

const SCRIPT_INICIAL = `(function(){var d=document.documentElement;d.classList.add("js");try{if(localStorage.getItem("outbox-cookies"))d.classList.add("cookies-ok")}catch(_){}var e=["scroll","pointermove","pointerdown","touchstart","keydown","wheel"];function f(){d.classList.add("anim-ok");e.forEach(function(n){removeEventListener(n,f,true)})}e.forEach(function(n){addEventListener(n,f,{capture:true,passive:true})})})()`;

/** O <html> do site, igual nos quatro idiomas. Só muda o lang e o dicionário. */
export default function Documento({ locale, children }: { locale: Locale; children: ReactNode }) {
  const { t } = getT();
  // Empresa para o Google (busca local e mapa) e para as IAs. Só dado real:
  // endereço da sede, CNPJ, contato, redes e a região atendida (lib/regiao).
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#empresa`,
    name: SITE.name,
    alternateName: ["OutBox", "OutBox Soluções Digitais"],
    url: SITE.url,
    description: t(SITE.description),
    email: SITE.email,
    telephone: SITE.phoneE164,
    taxID: SITE.cnpj,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.endereco.rua,
      addressLocality: SEDE.cidade,
      addressRegion: SEDE.uf,
      postalCode: SITE.endereco.cep,
      addressCountry: "BR",
    },
    geo: { "@type": "GeoCoordinates", latitude: SITE.endereco.lat, longitude: SITE.endereco.lng },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${SITE.endereco.rua}, ${SITE.endereco.bairro}, ${SITE.endereco.cidade}`,
    )}`,
    logo: `${SITE.url}/brand/outbox-logo-512.png`,
    image: `${SITE.url}/og.png`,
    sameAs: [SITE.instagramBrand, SITE.instagramPersonal],
    founder: { "@type": "Person", name: "Felipe Melo", url: `${SITE.url}/felipemelo` },
    areaServed: areaServedJsonLd(),
    availableLanguage: ["pt-BR", "en"],
    knowsAbout: [
      t("Desenvolvimento de sistemas personalizados"),
      t("Criação de sites com SEO e GEO"),
      t("Branding e identidade visual"),
      t("Apresentações de negócios"),
      "Google Meu Negócio",
      t("Consultoria Empresarial"),
    ],
  };

  return (
    <html lang={HTML_LANG[locale]} className={`${clashDisplay.variable} ${geist.variable}`} suppressHydrationWarning>
      <head>
        {/* "js": as animações de entrada só escondem conteúdo quando há JS.
            "anim-ok": as animações decorativas contínuas (borda dos botões)
            começam no primeiro gesto da pessoa, não na primeira pintura.
            "cookies-ok": quem já decidiu sobre cookies não vê o aviso. */}
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_INICIAL }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body className="grain antialiased">
        <I18nProvider locale={locale} dict={DICIONARIOS[locale]}>
          {children}
          <CookieConsent />
          <Atribuicao />
        </I18nProvider>
      </body>
    </html>
  );
}
