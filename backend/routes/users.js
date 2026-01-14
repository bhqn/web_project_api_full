const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  getUsers,
  getUser,
  getCurrentUser,
  updateAvatar,
  updateDescription
} = require("../controllers/users");

// Apenas estas rotas conectadas aos controllers
router.get("/", auth, getUsers);
router.get("/me", auth, getCurrentUser);
router.patch("/me/avatar", auth, updateAvatar);
router.patch("/me", auth, updateDescription);
router.get("/:userId", auth, getUser);
// router.post("/", createUser); <- REMOVIDA

module.exports = router;
