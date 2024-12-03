// models/Ticket.js
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const ticketSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    price: { type: Number, required: true },
    ticketToken: { type: String, default: uuidv4 },
    createdAt: { type: Date, default: Date.now },
});

export const Ticket = mongoose.model('Ticket', ticketSchema);
