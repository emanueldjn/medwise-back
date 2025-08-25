const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const { createTables } = require('./createTables');
createTables();

// Configuração CORS
const corsOptions = {
    origin: 'https://medwise-front.vercel.app', // origem permitida
    credentials: true, // permite envio de cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // headers permitidos
};

// Middlewares
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // trata requisições OPTIONS automaticamente
app.use(express.json());

// Rotas de usuário
const userRoutes = require('./src/routes/userRoutes');
app.use('/api', userRoutes);

// Rota de teste
app.get('/', (req, res) => {
    res.send('Hello world');
});

// Inicia servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
