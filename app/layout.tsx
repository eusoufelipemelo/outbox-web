import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE } from "@/lib/site";
import CookieConsent from "@/components/site/CookieConsent";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Sites, Sistemas, Branding e Apresentações`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "agência digital",
    "desenvolvimento de sistemas",
    "criação de sites",
    "SEO",
    "GEO",
    "branding",
    "apresentação de negócios",
    "Santa Cruz do Rio Pardo",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Sites, Sistemas, Branding e Apresentações`,
    description: SITE.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Sites, Sistemas, Branding e Apresentações`,
    description: SITE.description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE.url },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phoneE164,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Santa Cruz do Rio Pardo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    sameAs: [SITE.instagramBrand, SITE.instagramPersonal],
    areaServed: "BR",
    knowsAbout: [
      "Desenvolvimento de sistemas personalizados",
      "Criação de sites com SEO e GEO",
      "Branding e identidade visual",
      "Apresentações de negócios",
    ],
  };

  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 247 247'%3E%3Crect width='246.166' height='246.166' rx='123.083' fill='%23F15532'/%3E%3Cpath d='M118.614 87.4689V136.172L128.575 136.172L128.575 87.4689L140.324 99.2111L147.368 92.171L123.594 68.4106L99.8206 92.171L106.865 99.2111L118.614 87.4689Z' fill='white'/%3E%3Cpath d='M216.349 120.191V178.329H30.8398V120.191H40.1901V168.984H206.999V120.191H216.349Z' fill='white'/%3E%3C/svg%3E"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="grain antialiased">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
