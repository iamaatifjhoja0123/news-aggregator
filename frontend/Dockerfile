
# STAGE 1: Builder (React/Vite Code ko compile karne ke liye)
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# React app ko build karein (yeh 'dist' folder banayega)
RUN npm run build

# STAGE 2: Production Nginx (HTML/CSS serve karne ke liye)
FROM nginx:alpine

# Nginx ke default HTML pages delete karein
RUN rm -rf /usr/share/nginx/html/*

# Stage 1 (builder) se sirf compiled 'dist' folder copy karein
COPY --from=builder /app/dist /usr/share/nginx/html

# Apni custom Nginx config copy karein
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]