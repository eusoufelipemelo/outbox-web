import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Gera o servidor mínimo para rodar em container (EasyPanel).
  output: "standalone",

  images: {
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

  // IndexNow: /<chave>.txt é respondido pela rota que confere a chave no OutBox CMS
  async rewrites() {
    return [{ source: "/:key([a-f0-9]{32}).txt", destination: "/api/outbox/indexnow/:key" }];
  },

  async headers() {
    return [
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
