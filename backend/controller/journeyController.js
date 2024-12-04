import { Ticket } from "../models/ticket.model.js";


// POST /api/start-journey
const startJourney = async (req, res) => {
    const { ticketToken, source } = req.body;

    try {
        // Find the ticket by token
        const ticket = await Ticket.findOne({ ticketToken });

        if (!ticket) {
            return res.status(404).json({ message: 'Invalid ticket token.' });
        }

        // Validate ticket status
        if (ticket.status !== 'Active') {
            return res.status(400).json({ message: 'Ticket is not active or already used.' });
        }

        // Validate the source station
        if (ticket.source !== source) {
            return res.status(400).json({ message: 'Invalid source station for this ticket.' });
        }

        // Change ticket status to 'In Journey'
        ticket.status = 'In Journey';
        await ticket.save();

        res.status(200).json({ message: 'Journey started successfully.', ticket });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while starting the journey.', error: error.message });
    }
};

export default startJourney 