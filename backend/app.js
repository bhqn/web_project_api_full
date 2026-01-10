require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { createUser, login } = require("./controllers/users");
const cors = require("cors");
const auth = require("./middlewares/auth"); // 👈 ADICIONADO

const app = express();

// CORS
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    /\.vercel\.app$/,
  ],
  credentials: true,
  methods: ['GET','POST','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));

app.use(express.json());

// 🔓 ROTAS PÚBLICAS
app.post("/signup", createUser);
app.post("/signin", login);

// 🔐 AUTH TEM QUE VIR AQUI
app.use(auth);

// rota raiz
app.get("/", (req, res) => {
  res.json({ message: "Servidor rodando" });
});

// 🔒 ROTAS PROTEGIDAS
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// 404
app.use((req, res) => {
  res.status(404).json({
    message: "Recurso requisitado não encontrado",
  });
});

// erro
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Ocorreu um erro no servidor";
  res.status(statusCode).json({ message });
});

module.exports = app;
