# Projet Airneis

## Contexte
Airneis est un projet de développement d'une application e-commerce pour la vente de meubles. Le projet est divisé en deux parties principales : un frontend pour l'interface utilisateur et un backend pour la gestion des données et de l'API. 

## Structure du Projet
- **backend/** : Contient tout le code relatif à l'API, à la gestion de la base de données, développée avec Node, Express et MongoDB.
- **frontend/** : Contient tout le code pour l'interface utilisateur, développée avec React.
- **docker-compose.yml** : Fichier Docker Compose pour orchestrer les services.

## Prérequis
- **Docker Desktop** : Assurez-vous que Docker Desktop soit installé sur votre machine.

## Installation
Clonez le dépôt et lancez le docker-compose

```bash
git clone https://github.com/H3Dylan/Airneis.git
cd airneis
docker-compose up --build -d
```

## Accès aux Services
- Frontend : Accessible à http://localhost:5173
- Backend : Accessible à http://localhost:5050
- Mongo Express (interface pour MongoDB) : Accessible à http://localhost:8080