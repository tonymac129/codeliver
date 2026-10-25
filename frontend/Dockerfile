ARG NODE_VERSION=24.13.0-slim

# --- Dependencies ---

FROM node:${NODE_VERSION} AS dependencies

WORKDIR /app

COPY package.json pnpm* ./
COPY prisma ./prisma

RUN SHELL=bash apt-get update -y && apt-get install -y openssl
RUN npm install -g pnpm && pn ci

# --- Development ---

FROM dependencies AS development

EXPOSE 3000

CMD ["pn", "run", "dev"]

# --- Build ---

FROM dependencies AS builder

COPY . .

ENV NODE_ENV=production

RUN pn run build

# --- Production ---

FROM node:${NODE_VERSION} AS production

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

EXPOSE 3000

CMD ["node", "server.js"]