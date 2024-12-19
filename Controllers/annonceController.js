const { get } = require("mongoose");
const Annonce = require("../Models/annonceModel");

const getAnnonces = async (req, res) => {
  try {
    const filter = {};

    if (req.query.title) {
      filter.title = { $regex: req.query.title, $options: "i" };
    }

    const Annonces = await Annonce.find(filter).populate("user", "username");
    res.status(200).send(Annonces);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getAnnonceById = async (req, res) => {
  try {
    // Récupérer l'annonce avec les informations de l'utilisateur
    const annonce = await Annonce.findById(req.params.id).populate("user", "name"); // Récupère uniquement le champ `name` de l'utilisateur

    if (!annonce) {
      return res.status(404).send({ error: "Annonce not found" });
    }

    // Vérifier si l'utilisateur existe et remplacer le champ `user` par le `name`
    const annonceData = annonce.toObject(); // Convertir en objet JS
    if (annonce.user) {
      annonceData.user = annonce.user.name;
    }

    res.status(200).send(annonceData);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const createAnnonce = async (req, res) => {
  const userId = req.user.id;
  console.log(req.user);
  try {
    const annonce = new Annonce({
      ...req.body,
      user: userId,
    });
    await annonce.save();
    res.status(201).send(annonce);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updateAnnonce = async (req, res) => {
  try {
    const annonce = await Annonce.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!annonce) {
      return res.status(404).send({ error: "Annonce not found" });
    }
    res.status(200).send(annonce);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteAnnonce = async (req, res) => {
  try {
    const annonce = await Annonce.findByIdAndDelete(req.params.id);
    if (!annonce) {
      return res.status(404).send({ error: "Annonce not found" });
    }
    res.status(200).send(annonce);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};


module.exports = {
  getAnnonces,
  createAnnonce,
  getAnnonceById,
  updateAnnonce,
  deleteAnnonce,
};
