const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const { createTables } = require('./createTables');
createTables().catch(console.error);

const corsOptions = {
    origin: 'https://medwise-front.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

const userRoutes = require('./src/routes/userRoutes');
app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello world ok');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
