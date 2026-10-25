ARG NODE_VERSION=24.13.0-slim

# --- Dependencies ---

FROM node:${NODE_VERSION} AS dependencies

WORKDIR /app

COPY package.json pnpm* ./

RUN SHELL=bash apt-get update -y && apt-get install -y openssl
RUN npm install -g pnpm && pn ci

# --- Development ---

FROM dependencies AS development

EXPOSE 3001

CMD ["pnx", "tsx", "--watch","index.ts"]

# --- Build ---

FROM dependencies AS builder
COPY . .
RUN pnx esbuild index.ts --bundle --platform=node --format=cjs --outfile=dist/index.js

# --- Production ---

FROM node:${NODE_VERSION} AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder --chown=node:node /app/dist/index.js ./index.js

USER node

EXPOSE 3001

CMD ["node", "index.js"]