import type { ReactNode } from "react";
import { SITE } from "@/lib/site";
import CookieConsent from "@/components/site/CookieConsent";
import { HTML_LANG, type Locale } from "@/lib/i18n/config";
import { DICIONARIOS } from "@/lib/i18n/dicionarios";
import { I18nProvider } from "@/lib/i18n/client";
import { getT } from "@/lib/i18n/server";

/** O <html> do site, igual nos quatro idiomas. Só muda o lang e o dicionário. */
export default function Documento({ locale, children }: { locale: Locale; children: ReactNode }) {
  const { t } = getT();
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    url: SITE.url,
    description: t(SITE.description),
    email: SITE.email,
    telephone: SITE.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.endereco.rua,
      postalCode: SITE.endereco.cep,
      addressLocality: "Santa Cruz do Rio Pardo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    logo: `${SITE.url}/brand/outbox-logo-512.png`,
    image: `${SITE.url}/og.png`,
    sameAs: [SITE.instagramBrand, SITE.instagramPersonal],
    areaServed: "BR",
    availableLanguage: ["pt-BR", "en", "es", "ca"],
    knowsAbout: [
      t("Desenvolvimento de sistemas personalizados"),
      t("Criação de sites com SEO e GEO"),
      t("Branding e identidade visual"),
      t("Apresentações de negócios"),
    ],
  };

  return (
    <html lang={HTML_LANG[locale]}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body className="grain antialiased">
        <I18nProvider locale={locale} dict={DICIONARIOS[locale]}>
          {children}
          <CookieConsent />
        </I18nProvider>
      </body>
    </html>
  );
}
