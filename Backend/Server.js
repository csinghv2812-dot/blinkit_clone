require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./Config/db');

require('./Models/OrderModel');
const Product = require('./Models/ProductModel');

const adminRoutes = require('./Routes/AdminRoutes');
const customerRoutes = require('./Routes/CustomerRoutes');
const productRoutes = require('./Routes/ProductRoutes');
const orderRoutes = require('./Routes/OrderRoutes');
const paymentRoutes = require('./Routes/PaymentRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Backend server is running' });
});

app.use('/api/admins', adminRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

const seedProducts = async () => {
    const existingProducts = await Product.count();
    if (existingProducts === 0) {
        await Product.bulkCreate([
            {
                id: 1,
                name: 'Premium Apple',
                description: 'Fresh and juicy apples picked from trusted farms.',
                price: 120,
                stock: 10,
                category: 'Fresh Fruits',
                image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=900&q=80',
            },
            {
                id: 2,
                name: 'Organic Banana',
                description: 'Naturally sweet bananas, perfect for daily nutrition.',
                price: 60,
                stock: 20,
                category: 'Fresh Fruits',
                image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=900&q=80',
            },
            {
                id: 3,
                name: 'Fresh Orange',
                description: 'Vitamin-rich oranges with bright citrus flavor.',
                price: 90,
                stock: 15,
                category: 'Fresh Fruits',
                image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?auto=format&fit=crop&w=900&q=80',
            },
            {
                id: 4,
                name: 'Green Grapes',
                description: 'Crisp seedless grapes for snacks, juices, and salads.',
                price: 140,
                stock: 8,
                category: 'Fresh Fruits',
                image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=900&q=80',
            },
        ]);
        console.log('Seeded default products.');
    }
};

const connectWithRetry = async (maxRetries = 10, delay = 3000) => {
    for (let i = 0; i < maxRetries; i++) {
        try {
            console.log(`Attempting to connect to database (attempt ${i + 1}/${maxRetries})...`);
            await sequelize.authenticate();
            console.log('Database connection established successfully.');
            return;
        } catch (error) {
            console.error(`Connection attempt ${i + 1} failed:`, error.message);
            if (i < maxRetries - 1) {
                console.log(`Retrying in ${delay / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    throw new Error('Failed to connect to database after maximum retries');
};

const startServer = async () => {
    try {
        await connectWithRetry();
        await sequelize.sync({ alter: true });
        await seedProducts();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Server start nahi hua:', error);
        process.exit(1);
    }
};

if (require.main === module) {
    startServer();
}

module.exports = app;

