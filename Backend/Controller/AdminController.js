const Admin = require('../Models/AdminModel');
const { generateToken } = require('../middleware/auth');

const createAdmin = async (req, res) => {
    try {
        const admin = await Admin.create(req.body);
        const adminData = admin.toJSON ? admin.toJSON() : { ...admin };
        delete adminData.password;

        const token = generateToken({ id: admin.id, email: admin.email, role: 'admin' });
        res.status(201).json({ admin: adminData, token });
    } catch (error) {
        res.status(500).json({ message: 'Customer create nahi hua', error: error.message });
    }
};

const getAllAdmin = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Customers fetch nahi hue', error: error.message });
    }
};

const getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id);

        if (!admin) {
            return res.status(404).json({ message: 'Customer nahi mila' });
        }

        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Customer fetch nahi hua', error: error.message });
    }
};


const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ where: { email } });

        if (!admin || admin.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const adminData = admin.toJSON ? admin.toJSON() : { ...admin };
        delete adminData.password;

        const token = generateToken({ id: admin.id, email: admin.email, role: 'admin' });
        res.status(200).json({ message: 'Login successful', admin: adminData, token });
    } catch (error) {
        res.status(500).json({ message: 'Login nahi hua', error: error.message });
    }
};


const updateAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id);

        if (!admin) {
            return res.status(404).json({ message: 'Customer nahi mila' });
        }

        await admin.update(req.body);
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Customer update nahi hua', error: error.message });
    }
};

const deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id);

        if (!admin) {
            return res.status(404).json({ message: 'Customer nahi mila' });
        }

        await admin.destroy();
        res.status(200).json({ message: 'Customer delete ho gaya' });
    } catch (error) {
        res.status(500).json({ message: 'Customer delete nahi hua', error: error.message });
    }
};

module.exports = {
    createAdmin,
    getAllAdmin,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    loginAdmin,
};

  
 