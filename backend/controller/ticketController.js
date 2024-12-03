import { Ticket } from '../models/ticket.model.js'; // Assuming a Ticket model exists

// Controller to handle ticket purchase
export const purchaseTicket = async (req, res) => {
    const { userId, source, destination, price } = req.body;

    if (!userId || !source || !destination || !price) {
        return res.status(400).json({ message: 'Missing required fields: userId, source, destination, or price' });
    }

    try {
        const newTicket = new Ticket({
            userId,
            source,
            destination,
            price,
            issuedAt: new Date(),
        });

        await newTicket.save();

        res.status(201).json({
            success: true,
            message: 'Ticket purchased successfully',
            ticket: newTicket,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to purchase ticket',
            error: error.message,
        });
    }
};

// Controller to fetch all tickets for a user
export const fetchUserTickets = async (req, res) => {
    const { userId } = req.params;

    try {
        const userTickets = await Ticket.find({ userId });

        if (userTickets.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No tickets found for this user',
            });
        }

        res.status(200).json({
            success: true,
            tickets: userTickets,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch tickets',
            error: error.message,
        });
    }
};
