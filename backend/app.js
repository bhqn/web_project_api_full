require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { createUser, login } = require("./controllers/users");

//para rodar teste
//if (process.env.NODE_ENV !== "test") {
//mongoose.connect(process.env.MONGO_URI);
//}
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(express.json());

// Rotas que NÃO precisam de autenticação
app.post("/signup", createUser);
app.post("/signin", login);

// MIDDLEWARE DE AUTORIZAÇÃO TEMPORÁRIA (ANTES DAS ROTAS!)
/*app.use((req, res, next) => {
  req.user = {
    _id: "6924be802b78f9c6ea42c848",
  };
  next();
}); */

// rota para a raiz do site
app.get("/", (req, res) => {
  res.json({ message: "Servidor rodando " });
});

// criando as rotas
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Middleware para recursos não encontrados (404)
app.use((req, res) => {
  res.status(404).json({
    message: "Recurso requisitado não encontrado",
  });
});

// Middleware de tratamento de erros (deve ser o último)
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Ocorreu um erro no servidor";
  res.status(statusCode).json({ message });
});

module.exports = app;