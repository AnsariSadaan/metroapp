import { metroData } from '../helper/metroData.js';
import { Ticket } from '../models/ticket.model.js';

const completeJourney = async (req, res) => {
    const { ticketToken, exitStation } = req.body;

    try {
        // Step 1: Retrieve ticket by token
        const ticket = await Ticket.findOne({ ticketToken });

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found or invalid token.' });
        }

        if (ticket.status !== 'In Journey') {
            return res.status(400).json({ message: 'Ticket is not in a valid state to complete the journey.' });
        }

        // Step 2: Find the metro line containing the source and destination
        const metroLine = metroData.find(line =>
            line.stations.some(station => station.name === ticket.source) &&
            line.stations.some(station => station.name === ticket.destination)
        );

        if (!metroLine) {
            return res.status(400).json({ message: 'Invalid source or destination on the ticket.' });
        }

        // Step 3: Ensure exitStation is within the valid range
        const stations = metroLine.stations.map(s => s.name);
        const sourceIndex = stations.indexOf(ticket.source);
        const destinationIndex = stations.indexOf(ticket.destination);
        const exitIndex = stations.indexOf(exitStation);

        if (exitIndex < sourceIndex || exitIndex > destinationIndex) {
            return res.status(400).json({ message: 'Invalid exit station for this ticket.' });
        }

        // Step 4: Mark ticket as completed
        ticket.status = 'Completed';
        await ticket.save();

        res.status(200).json({ message: 'Journey completed successfully.' });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while completing the journey.',
            error: error.message,
        });
    }
};


export default completeJourney;