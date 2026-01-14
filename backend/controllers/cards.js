const Card = require('../models/card');

// GET /cards - retorna todos os cartões
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .sort({ _id: -1 })
    .then(cards => res.send({ data: cards }))
    .catch(next);
};

// POST /cards - cria novo cartão
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch(next); // erros de validação virão parar no middleware
};

// PUT /cards/:cardId/likes - dá like no cartão
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Card não encontrado" });
      }
      res.send({ data: card });
    })
    .catch(next);
};

// PUT /cards/:cardId/likes - dá like no cartão
module.exports.dislikeCard = (req, res, next) => {
  console.log("REQ.USER:", req.user);
  console.log("REQ.USER._ID:", req.user?._id);
  if (!req.user || !req.user._id) {
    return res.status(401).send({ message: "Usuário não autenticado" });
  }

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: new mongoose.Types.ObjectId(req.user._id) } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Card não encontrado" });
      }
      res.send({ data: card });
    })
    .catch(next);
};

// DELETE /cards/:cardId - deleta cartão
/* module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Cartão não encontrado' });
      }
      res.send({ data: card });
    })
    .catch(next);
}; */


module.exports.deleteCard = (req, res, next) => {
  // Primeiro: buscar o cartão para verificar o dono
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Cartão não encontrado' });
      }
      
      // Segundo: verificar se o usuário é o dono do cartão
      if (card.owner.toString() !== req.user._id) {
        return res.status(403).send({ message: 'Acesso negado' });
      }
      
      // Terceiro: se for o dono, pode deletar
      return Card.findByIdAndDelete(req.params.cardId);
    })
    .then((deletedCard) => {
      res.send({ data: deletedCard });
    })
    .catch(next);
};