const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const productRoutes = require('./routes/product');
const loginRoutes = require('./routes/login');
const { isAuthenticated } = require('./middleware/authMiddleware');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


app.use(express.json());

app.use('/login', loginRoutes);
app.use('/products',isAuthenticated, productRoutes);








