const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const { createTables } = require('./createTables');
createTables();

const corsOptions = {
    origin: 'https://medwise-front.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // trata todas as requisições OPTIONS

app.use(express.json());

// Rotas de usuário
const userRoutes = require('./src/routes/userRoutes');
app.use('/api', userRoutes);

// Rota de teste
app.get('/', (req, res) => {
    res.send('Hello world ok');
});

// Inicia servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
