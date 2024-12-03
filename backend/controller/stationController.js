// controllers/stationController.js

import { Station } from '../models/station.model.js';

// Get all stations
const getStations = async (req, res) => {
    try {
        const stations = await Station.find();
        res.status(200).json(stations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default getStations;