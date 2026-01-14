const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

// Apenas estas rotas conectadas aos controllers
router.get("/", auth, getCards);
router.post("/", auth, createCard);
router.put("/:cardId/likes", auth, likeCard);
router.delete("/:cardId/likes", auth, dislikeCard);
router.delete("/:cardId", auth, deleteCard);


module.exports = router;
