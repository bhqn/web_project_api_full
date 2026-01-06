const User = require("../models/user");

// GET /users - retorna todos os usuários
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next); // erro para o midleware
};

// GET /users/:userId - retorna usuário específico
module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado" });
      }
      res.send({ data: user });
    })
    .catch(next);
};

// Get /users/me retorna informacoes do usuario atual
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado" });
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    // ID do usuário
    req.user._id,
    // O que atualizar
    { avatar: req.body.avatar },
    // opções
    { new: true, runValidators: true },
  )
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado" });
      }
      res.send({ data: user });
    })
    .catch(next);
};

// POST /users - cria novo usuário
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => res.status(400).send({ message: "Dados inválidos" }));
};
