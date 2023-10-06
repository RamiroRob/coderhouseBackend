const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const ticketCollection = 'tickets';

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4
    },
    purchase_datetime: {
        type: Date,
        default: Date.now // Asigna la fecha y hora actual cuando se crea el ticket
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

module.exports = ticketModel;

