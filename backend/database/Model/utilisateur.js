const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définition du schéma pour la collection "utilisateurs"
const utilisateurSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  mot_de_passe: {
    type: String,
    required: true
  },
  prenom: {
    type: String
  },
  nom: {
    type: String
  },
  adresses: [{
    rue: String,
    ville: String,
    region: String,
    code_postal: String,
    pays: String
  }],
  telephone: {
    type: String
  },
  carte_credit: {
    nom_carte: String,
    numero_carte: String,
    date_expiration: String,
    CVV: String
  }
});

// Création du modèle "Utilisateur" basé sur le schéma
const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);

module.exports = Utilisateur;