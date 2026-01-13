require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { createUser, login } = require("./controllers/users");
const cors = require("cors");
const auth = require("./middlewares/auth"); // 👈 IMPORTANTE

const app = express();

// CORS
app.use(cors({
  origin:true,
  credentials: true,
  methods: ['GET','POST','PATCH','DELETE','OPTIONS','PUT'],
  allowedHeaders: ['Content-Type','Authorization'],
}));

app.use(express.json());

// Rotas públicas
app.post("/signup", createUser);
app.post("/signin", login);

// 🔐 AQUI entra o middleware de autenticação
app.use(auth);

// Rota raiz (opcional estar protegida)
app.get("/", (req, res) => {
  res.json({ message: "Servidor rodando" });
});

// Rotas protegidas
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// 404
app.use((req, res) => {
  res.status(404).json({
    message: "Recurso requisitado não encontrado",
  });
});

// Erros
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Erro interno do servidor",
  });
});

module.exports = app;
