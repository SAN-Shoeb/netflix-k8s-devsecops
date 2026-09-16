# Stage 1: Build React Frontend
FROM node:18-bullseye-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
ENV CI=false

# Run build directly with detailed logging enabled
RUN npm run build || (echo "=== NPM BUILD LOGS BEGIN ===" && cat /root/.npm/_logs/*-debug-0.log 2>/dev/null && exit 1)

# Stage 2: Serve using Nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]