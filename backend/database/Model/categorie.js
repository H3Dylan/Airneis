const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définition du schéma pour la collection "utilisateurs"
const categorieSchema = new Schema({
  nom: {
    type: String,
    required: true
  }
});

// Création du modèle "Utilisateur" basé sur le schéma
const Categorie = mongoose.model('Categorie', categorieSchema);

module.exports = Categorie;