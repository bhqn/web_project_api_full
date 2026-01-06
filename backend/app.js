const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/aroundb');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

// MIDDLEWARE DE AUTORIZAÇÃO TEMPORÁRIA (ANTES DAS ROTAS!)
app.use((req, res, next) => {
  req.user = {
    _id: '6924be802b78f9c6ea42c848',
  };
  next();
});

// rota para a raiz do site
app.get("/", (req, res) => {
  res.json({ message: "Servidor rodando " });
});

// criando as rotas
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

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

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});