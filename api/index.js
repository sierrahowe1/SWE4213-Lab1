const express = require('express');
const cors = require('cors'); // 1. Import it
const app = express();

// 2. Enable CORS for your React dev server
app.use(cors({
    origin: 'http://localhost:5173', // Allow only your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Your routes go below here
const authRoutes = require('./endpoints/auth');
app.use('/', authRoutes);

const productRoutes = require('./endpoints/products');
app.use('/', productRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));