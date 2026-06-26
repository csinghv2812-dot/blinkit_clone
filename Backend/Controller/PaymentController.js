console.log("RAZORPAY_KEY_ID =", process.env.RAZORPAY_KEY_ID);
console.log("RAZORPAY_KEY_SECRET =", process.env.RAZORPAY_KEY_SECRET);
const Payment = require('../Models/PaymentModel');
const Order = require('../Models/OrderModel');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createPayment = async (req, res) => {
    try {
        const payment = await Payment.create(req.body);
        const paymentWithOrder = await Payment.findByPk(payment.id, { include: Order });
        res.status(201).json(paymentWithOrder);
    } catch (error) {
        res.status(500).json({ message: 'Payment create nahi hua', error: error.message });
    }
};

const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll({ include: Order });
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Payments fetch nahi hue', error: error.message });
    }
};

const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id, { include: Order });

        if (!payment) {
            return res.status(404).json({ message: 'Payment nahi mila' });
        }

        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: 'Payment fetch nahi hua', error: error.message });
    }
};

const updatePayment = async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);

        if (!payment) {
            return res.status(404).json({ message: 'Payment nahi mila' });
        }

        await payment.update(req.body);
        const updatedPayment = await Payment.findByPk(payment.id, { include: Order });
        res.status(200).json(updatedPayment);
    } catch (error) {
        res.status(500).json({ message: 'Payment update nahi hua', error: error.message });
    }
};

const deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);

        if (!payment) {
            return res.status(404).json({ message: 'Payment nahi mila' });
        }

        await payment.destroy();
        res.status(200).json({ message: 'Payment delete ho gaya' });
    } catch (error) {
        res.status(500).json({ message: 'Payment delete nahi hua', error: error.message });
    }
};

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
};

// Create a Razorpay order (server-side)
const createRazorpayOrder = async (req, res) => {
    try {
        const { amount } = req.body; // amount in rupees
        if (!amount) return res.status(400).json({ message: 'Amount is required' });

        const options = {
            amount: Math.round(Number(amount) * 100), // in paise
            currency: 'INR',
            receipt: `rcpt_${Date.now()}`,
        };

        const order = await razorpayInstance.orders.create(options);

        res.status(200).json({ order, key_id: process.env.RAZORPAY_KEY_ID });
    } catch (error) {
        res.status(500).json({ message: 'Razorpay order creation failed', error: error.message });
    }
};

// Verify Razorpay payment signature
const verifyRazorpayPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ message: 'Missing verification fields' });
        }

        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (generated_signature === razorpay_signature) {
            return res.status(200).json({ success: true });
        }

        return res.status(400).json({ success: false, message: 'Invalid signature' });
    } catch (error) {
        res.status(500).json({ message: 'Verification failed', error: error.message });
    }
};

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
    createRazorpayOrder,
    verifyRazorpayPayment,
};
