# Backend - Airneis

## Contexte
Le backend d'Airneis est une API RESTful développée avec Node.js et Express. Il utilise MongoDB pour la base de données. L'intégralité du backend est déployée dans un conteneur Docker pour simplifier le développement, le déploiement et la gestion de l'application.

## Structure du Projet
/config/: Contient la configuration pour la connection à la base de données
/controller/ : Contient la logique métier pour les différentes opérations.
/middleware/: Contient une fonction pour vérifier l'authenticité du token retourné par le front
/model/ : Contient les modèles Mongoose pour MongoDB.
/routes/ : Contient les routes Express pour l'API.
/seed.js : Script de seed pour initialiser la base de données.

## Remplir la base de données
Pour initialiser la base de données avec des données de développement, exécutez la commande suivante :

`docker-compose exec api node seed`

Cela va exécuter un script de "seed" qui remplit la base de données avec des catégories et des articles de démonstration.