import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Gera o servidor mínimo para rodar em container (EasyPanel).
  output: "standalone",

  // inlineCss foi testado em 24/11/2026 e saiu: o Next manda o CSS duas vezes
  // (no <style> e no payload do React) e o HTML da home dobrou de 300 KB para
  // 600 KB. Ler o HTML era o maior custo do celular no PageSpeed (1,3 s de
  // processador), então o CSS continua num arquivo, com cache de um ano.

  images: {
    // AVIF primeiro (cerca de 40% menor que WebP), WebP para quem não aceita.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fqfisqifwtaavxdttypy.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      // imagens dos artigos do OutBox CMS no Cloudflare R2
      { protocol: "https", hostname: "**.r2.dev" },
      // imagens antigas do OutBox CMS no Supabase
      {
        protocol: "https",
        hostname: "qvkkivnlbmktnykllkqc.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  // Espanhol e catalão saíram do site em 18/11/2026: os links antigos levam ao português.
  async redirects() {
    return ["es", "ca"].flatMap((l) => [
      { source: `/${l}`, destination: "/", permanent: true },
      { source: `/${l}/:path*`, destination: "/:path*", permanent: true },
    ]);
  },

  // IndexNow: /<chave>.txt é respondido pela rota que confere a chave no OutBox CMS
  async rewrites() {
    return [{ source: "/:key([a-f0-9]{32}).txt", destination: "/api/outbox/indexnow/:key" }];
  },

  async headers() {
    // Imagens, marca e fontes da pasta public mudam raramente: cache de 30
    // dias no navegador (antes era max-age=0, revalidando a cada visita).
    const estaticos = {
      key: "Cache-Control",
      value: "public, max-age=2592000, stale-while-revalidate=86400",
    };
    return [
      { source: "/img/:path*", headers: [estaticos] },
      { source: "/brand/:path*", headers: [estaticos] },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
