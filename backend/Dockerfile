# STAGE 1: Builder (Dependencies install karne ke liye)
FROM node:20-alpine AS builder

WORKDIR /app

# Pehle sirf package.json copy karein (Docker Layer Caching ke liye)
COPY package*.json ./

# Sirf production dependencies install karein (Dev dependencies ignore karein)
RUN npm ci --omit=dev

# Ab baaki ka code copy karein
COPY . .

# STAGE 2: Production Runner (Super Light Image)
FROM node:20-alpine

WORKDIR /app

# Builder stage se sirf zaroori files copy karein
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/server.js ./server.js

# Security Best Practice: Root user ki jagah 'node' user use karein
USER node

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "server.js"]