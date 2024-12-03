// models/Station.js
import  mongoose from 'mongoose';

const stationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    line: { type: String, required: true },
    distanceFromStart: { type: Number, required: true }
});

export const Station =  mongoose.model('Station', stationSchema);
