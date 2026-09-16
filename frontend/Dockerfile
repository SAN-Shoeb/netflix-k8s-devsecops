# Stage 1: Build the React Application
FROM node:18-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
ENV CI=false
ENV NODE_OPTIONS="--openssl-legacy-provider --max-old-space-size=2048"

RUN npm run build

# Stage 2: Serve using lightweight Nginx Alpine
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]