const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définition du schéma pour la collection "utilisateurs"
const commandeSchema = new Schema({
    utilisateur: {
        type : Schema.Types.ObjectId,
        ref : 'Utilisateur'
    },
    nom: {
        type: String,
        required: true
      },
      prix: {
        type: Number,
        required: true
      },
      stock: {
        type: Number,
        required: true
      },
      description: {
        type: String
      },
      materiaux: {
        type: String
      },
      date_ajout: {
        type: Date,
        default: Date.now
      }
    });

// Création du modèle "Utilisateur" basé sur le schéma
const Commande = mongoose.model('Commande', commandeSchema);

module.exports = Commande;