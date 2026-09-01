# ============================================================
# OutBox Group — Next.js em container (EasyPanel)
# ============================================================

# ---------- Dependências ----------
FROM node:22-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* ./
RUN npm ci

# ---------- Build ----------
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# O Next embute as variáveis NEXT_PUBLIC_* no momento do build.
# Estas duas são públicas por natureza (a chave do navegador é protegida por RLS).
ARG NEXT_PUBLIC_SUPABASE_URL=https://fqfisqifwtaavxdttypy.supabase.co
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_Oshd63TA8cGjTPziXIdHSg_gkdCJ5hQ
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ---------- Execução ----------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
