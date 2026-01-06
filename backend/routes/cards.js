const express = require("express");
const router = express.Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

// Apenas estas rotas conectadas aos controllers
router.get("/", getCards);
router.post("/", createCard);
router.put("/:cardId/likes", likeCard);
router.put("/:cardId/dislikes", dislikeCard);
router.delete("/:cardId", deleteCard);

module.exports = router;
