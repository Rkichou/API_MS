# Utiliser une image node officielle
FROM node:14

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier le package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code source
COPY . .

# Exposer le port
EXPOSE 3000

# Démarrer l'application
CMD ["node", "src/app.js"]
