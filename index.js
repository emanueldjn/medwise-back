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

// ...rotas e restante do código...