const express = require("express");
const cors = require("cors");
const { createTables } = require("./createTables");
require("dotenv").config();

const userRoutes = require("./src/routes/userRoutes"); 
const upload = require("./src/middlewares/upload");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rotas de usuário
app.use("/api", userRoutes);

// Rota de upload para Cloudinary
app.post("/api/upload", upload.single("foto"), (req, res) => {
  try {
    res.json({
      message: "Upload realizado com sucesso 🚀",
      url: req.file.path, // URL pública da imagem no Cloudinary
    });
  } catch (error) {
    res.status(500).json({ error: "Erro no upload", details: error.message });
  }
});

// Rota simples de teste
app.get("/", (req, res) => {
  res.send("🚀 API rodando com sucesso!");
});

// Cria tabelas no start
createTables();

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
