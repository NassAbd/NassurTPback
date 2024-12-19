// model for Annonce with title, ingredients, instructions, cuisine, image, createdAt, user ( ref to user model )
const mongoose = require("mongoose");
const User = require("./userModel");

const annonceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categorie: {
    type: String,
    required: true,
  },
  prix: {
    type: String,
    required: true,  
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Annonce = mongoose.model("Annonce", annonceSchema);

module.exports = Annonce;
