// user controller to register with bcyptjs, login, update user, delete user

const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.password) {
      return res.status(400).send({ error: "Password is required" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(401).send({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: process.env.JWT_EXPIRES_IN } // Options
    );

    res.status(200).send({ message: "Login successful", token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const filter = {};

    if (req.query.name) {
      filter.name = { $regex: req.query.name, $options: "i" };
    }

    const users = await User.find(filter);
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};


const updateUser = async (req, res) => {
  try {
    // Vérifier si le mot de passe est présent dans le body
    if (req.body.password) {
      // Générer un sel et hacher le mot de passe
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    // Mettre à jour l'utilisateur
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Retourne l'objet mis à jour
      runValidators: true, // Exécute les validateurs Mongoose
    });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUsers, updateUser, deleteUser };
