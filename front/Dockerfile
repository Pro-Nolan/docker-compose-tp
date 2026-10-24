# 1. Choisir une image Node.js
FROM node:20-alpine AS builder

# 2. Définir le répertoire de travail
WORKDIR /app

# 3. Copier les fichiers nécessaires à l'installation des dépendances
COPY package*.json ./

# 4. Installer les dépendances
RUN npm install

# 5. Copier le code source
COPY . .

# 6. Construire l'application React
RUN npm run build

# 7. Choisir une image Nginx
FROM nginx:alpine

# Copie des fichiers statiques compilés vers le répertoire web de Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Exposition du port web HTTP
EXPOSE 80

# Commande de démarrage de Nginx au premier plan
CMD ["nginx", "-g", "daemon off;"]
