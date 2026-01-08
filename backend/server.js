const app = require("./app")
const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
