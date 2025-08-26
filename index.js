const express = require("express");
const cors = require("cors");
const { createTables } = require("./createTables");
require("dotenv").config();

const userRoutes = require("./src/routes/userRoutes"); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rotas de usuário
app.use("/api", userRoutes);

// Rota simples de teste
app.get("/", (req, res) => {
  res.send("🚀 API rodando com sucesso!");
});

// Cria tabelas no start
createTables();

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
