const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("./Controllers/userController");
const {
    getAnnonces,
    createAnnonce,
    getAnnonceById,
    updateAnnonce,
    deleteAnnonce,
} = require("./Controllers/annonceController");
const authMiddleware = require("./Middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", authMiddleware, getUsers);
router.put("/users/:id", authMiddleware, updateUser);
router.delete("/users/:id", authMiddleware, deleteUser);

router.post("/annonce", authMiddleware, createAnnonce);
router.get("/annonces", authMiddleware, getAnnonces);
router.get("/annonce/:id", getAnnonceById);
router.put("/update/:id", authMiddleware, updateAnnonce);
router.delete("/delete/:id", authMiddleware, deleteAnnonce);

module.exports = router;
