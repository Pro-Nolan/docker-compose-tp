# 1. Utiliser une image Node.js
FROM node:20-alpine

# 2. Définir le répertoire de travail
WORKDIR /app

# 3. Copier les fichiers
COPY package.json ./

# 4. Installer les dépendances de production
RUN npm install

# 5. Copier le reste du code source de l'application
COPY . .

# 6. Exposer le port utilisé
EXPOSE 3000

# 7. Définir la commande de démarrage
CMD ["node", "index.js"]
