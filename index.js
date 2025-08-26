const express = require("express");
const cors = require("cors");
const { createTables } = require('./createTables');

const userRoutes = require('./src/routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Configura CORS
const corsOptions = {
    origin: 'https://medwise-front.vercel.app',
    credentials: true,
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

// Rotas
app.use('/api', userRoutes);

// Rota teste
app.get('/', (req, res) => res.send('Server is running'));

// Cria tabelas antes de subir o servidor
createTables()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Erro ao criar tabelas:', err);
    process.exit(1);
  });
