# Utilise une image node officielle comme base
FROM node:16

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie le package.json et le package-lock.json dans le conteneur
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie tous les fichiers du répertoire courant dans le conteneur
COPY . .

# Expose le port sur lequel l'application va tourner
EXPOSE 3001

# Démarre l'application Vite sur le port 3001 et écoute sur toutes les interfaces
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3001"]
