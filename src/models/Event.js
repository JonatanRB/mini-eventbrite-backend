import mongoose from "mongoose";

const seatMapSchema = new mongoose.Schema({
    type: {type: String, enum: ['grid', 'ga'], default: 'grid'},
    rows: {type: Nomber, default: 10},
    col: {type: Nomber, default: 10},
}, {_id: false});

const eventSchema = new mongoose.Schema ({
    title: {type: String, require: true},
    description: {type: String,},
    date: {type: Date, require: true},
    venue: {type: String, require: true},
    imaheUrl: {type: String},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    seatMap: seatMapSchema,
    price: {type: Number, require: true, min: 0},
    isPuclished: {type: Boolean, default: false},
}, {timestamps: true});

export const Event = mongoose.model('Event', eventSchema);