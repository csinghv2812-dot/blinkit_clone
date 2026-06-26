const Customer = require('../Models/CustomerModel');
const { generateToken } = require('../middleware/auth');



const createCustomer = async (req, res) => {
    try {
        const email = req.body.email?.trim().toLowerCase();

        if (!req.body.name || !email || !req.body.password) {
            return res.status(400).json({ message: 'Name, email and password are required' });
        }

        const existingCustomer = await Customer.findOne({ where: { email } });
        if (existingCustomer) {
            return res.status(409).json({ message: 'Email already registered. Please login.' });
        }

        const customer = await Customer.create({
            ...req.body,
            email,
        });

        const customerData = customer.toJSON ? customer.toJSON() : { ...customer };
        delete customerData.password;

        const token = generateToken({ id: customer.id, email: customer.email, role: 'customer' });
        res.status(201).json({ customer: customerData, token });
    } catch (error) {
        res.status(500).json({ message: 'Customer create nahi hua', error: error.message });
    }
};

const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Customers fetch nahi hue', error: error.message });
    }
};

const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);

        if (!customer) {
            return res.status(404).json({ message: 'Customer nahi mila' });
        }

        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: 'Customer fetch nahi hua', error: error.message });
    }
};


const loginCustomer = async (req, res) => {
    try {
        const email = req.body.email?.trim().toLowerCase();
        const { password } = req.body;
        const customer = await Customer.findOne({ where: { email } });

        if (!customer || customer.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const customerData = customer.toJSON ? customer.toJSON() : { ...customer };
        delete customerData.password;

        const token = generateToken({ id: customer.id, email: customer.email, role: 'customer' });
        res.status(200).json({ message: 'Login successful', customer: customerData, token });
    } catch (error) {
        res.status(500).json({ message: 'Login nahi hua', error: error.message });
    }
};


const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);

        if (!customer) {
            return res.status(404).json({ message: 'Customer nahi mila' });
        }

        await customer.update(req.body);
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: 'Customer update nahi hua', error: error.message });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);

        if (!customer) {
            return res.status(404).json({ message: 'Customer nahi mila' });
        }

        await customer.destroy();
        res.status(200).json({ message: 'Customer delete ho gaya' });
    } catch (error) {
        res.status(500).json({ message: 'Customer delete nahi hua', error: error.message });
    }
};

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    loginCustomer,
};
