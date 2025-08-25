
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const { createTables } = require('./createTables');
createTables();

app.use(cors({
    origin: 'https://medwise-front.vercel.app',
    credentials: true
}));
app.use(express.json());

// Rotas de usuário
const userRoutes = require('./src/routes/userRoutes');
app.use('/api', userRoutes);

app.get('/', (req, res) => {
        res.send('Hello word');
});

app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
});