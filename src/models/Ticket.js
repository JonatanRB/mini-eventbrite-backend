import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
    row: {type: Number, require: true},
    col: {type: Number, require: true},
}, {_id: false});

const ticketSchema = new mongoose.Schema({
    event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event', require: true, index: true},
    buyer: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true, index: true},
    seat: seatSchema,
    pricePaid: {type: Nomber, require: true},
    qrUrl: {type: String},
    checkedinAt: {type: Date, default: null},
}, {timestamps: true});

ticketSchema.index({event: 1, 'seat.row': 1, 'seat.col': 1}, {unique: true});

export const Ticket = mongoose.model('Ticket', ticketSchema);