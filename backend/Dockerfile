# Node.js sürümünü seçiyoruz (Hafif bir sürüm: Alpine)
FROM node:20-alpine

# Çalışma klasörünü oluşturuyoruz
WORKDIR /app

# Sadece bağımlılık dosyalarını kopyalıyoruz
COPY package*.json ./

# Temiz bir yükleme yapıyoruz
RUN npm install

# Geri kalan tüm kodları kopyalıyoruz
COPY . .

# Backend'in çalıştığı portu dışarı açıyoruz
EXPOSE 5000

# Uygulamayı başlatıyoruz
CMD ["npm", "start"]
