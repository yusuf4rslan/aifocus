# 1. AŞAMA: Derleme (Build)
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 2. AŞAMA: Yayınlama (Nginx)
FROM nginx:stable-alpine

# Derlenen dosyaları Nginx'in yayın klasörüne kopyalıyoruz
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx portunu dışarı açıyoruz
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
