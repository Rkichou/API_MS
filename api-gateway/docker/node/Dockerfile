# Utiliser une image Node.js officielle
FROM node:lts-slim

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier package.json et package-lock.json (s'il existe)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel l'application écoute
EXPOSE 3005

# Démarrer l'application
CMD ["node", "app.js"]
