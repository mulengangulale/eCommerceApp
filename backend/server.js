import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import productsRoutes from './routes/productRoutes.js';
import products from './data/products.js';
const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB
const app = express();

app.get('/', (req, res) => {
    res.send('API is running...')
});

app.use('/api/products', productsRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`))