const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/authRoutes');
const productRoutes=require('./routes/productRoutes');
const cartRoutes=require('./routes/cartRoutes');
const orderRoutes =require('./routes/orderRoutes')
dotenv.config();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:3000", 
        methods: ["GET", "POST", "PUT", "DELETE"], 
        credentials: true, 
    })
);

app.get('/', (req, res) => {
    res.send('Server is running...');
});

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
