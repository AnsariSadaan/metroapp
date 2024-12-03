// controllers/ticketController.js

import { Ticket } from "../models/payment.model.js";


const issueTicket = async (req, res) => {
    const { userId, source, destination, price } = req.body;

    try {
        const ticket = new Ticket({
            userId,
            source,
            destination,
            price,
        });

        await ticket.save();

        res.status(201).json({
            message: 'Ticket issued successfully',
            ticketToken: ticket.ticketToken,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to issue ticket' });
    }
};

export default issueTicket;