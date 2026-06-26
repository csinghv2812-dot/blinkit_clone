
const Product = require('../Models/ProductModel');

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Customer create nahi hua', error: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Customers fetch nahi hue', error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Customer nahi mila' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Customer fetch nahi hua', error: error.message });
    }
};


const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Customer nahi mila' });
        }

        await product.update(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Customer update nahi hua', error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Customer nahi mila' });
        }

        await product.destroy();
        res.status(200).json({ message: 'Customer delete ho gaya' });
    } catch (error) {
        res.status(500).json({ message: 'Customer delete nahi hua', error: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
