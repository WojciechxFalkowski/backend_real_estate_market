FROM node:20.11.1

WORKDIR /app

# Kopiowanie plików package.json i package-lock.json
COPY package*.json ./

# Instalacja zależności
RUN npm install

# Kopiowanie całego kodu źródłowego
COPY . .

# Budowanie aplikacji w trybie produkcyjnym
RUN npm run build

# Pruning development dependencies
RUN npm prune --production

# Przebudowanie bcrypt
RUN npm rebuild bcrypt --build-from-source

# Ustawienie zmiennej środowiskowej NODE_ENV na produkcję
ENV NODE_ENV=production

# Uruchomienie aplikacji w trybie produkcyjnym
CMD ["node", "dist/main.js"]
