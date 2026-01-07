const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  getUsers,
  getUser,
  getCurrentUser,
  updateAvatar,
} = require("../controllers/users");

// Apenas estas rotas conectadas aos controllers
router.get("/", auth, getUsers);
router.get("/me", auth, getCurrentUser);
router.patch("/me/avatar", auth, updateAvatar);
router.get("/:userId", auth, getUser);
// router.post("/", createUser); <- REMOVIDA

module.exports = router;
