const express = require('express');
const cors = require('cors');
const { createTables } = require('./createTables');
require('dotenv').config();

const userRoutes = require('./src/routes/userRoutes'); // <-- esta linha deve existir!

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rotas de usuário
app.use('/api', userRoutes);


// rota simples de teste
app.get('/', (req, res) => {
  res.send('🚀 API rodando com sucesso!');
});

// cria tabelas no start
createTables();

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
