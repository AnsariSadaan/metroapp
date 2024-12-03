// backend/controllers/payment.controller.js

import  { v4 as uuidv4 } from 'uuid';

// Dummy payment controller
const initiatePayment = (req, res) => {
    const { source, destination, amount } = req.body;

    if (!amount || !source || !destination) {
        return res.status(400).send('Missing required fields: source, destination, or amount');
    }

    try {
        // Simulate payment success
        const ticketToken = uuidv4(); // Unique ticket ID

        res.status(200).json({
            success: true,
            message: 'Payment successful',
            ticket: {
                token: ticketToken,
                source,
                destination,
                amount,
                issuedAt: new Date().toISOString(),
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Payment failed', error });
    }
};

export default  initiatePayment
