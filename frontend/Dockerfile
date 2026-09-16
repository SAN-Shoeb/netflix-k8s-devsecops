# Stage 1: Build the React Application using standard debian-slim (avoids alpine memory/glibc crashes)
FROM node:18-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
ENV CI=false
RUN npm run build

# Stage 2: Serve using lightweight Nginx Alpine (< 25MB runtime)
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]