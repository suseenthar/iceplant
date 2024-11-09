const mongoose = require('mongoose'); 

const ProductionSchema = new mongoose.Schema({
    unit:  { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },
    date : { type: Date, required: true },
    quantity: { type: String, required: true }, 
    bars: { type: String, required: true }, 
    time: { type: [String], required: true }, 
    ampm: { type: [String], required: true }, 
    qty: { type: [Number], required: true }, 
    tot: { type: [Number], required: true }, 
    isDeleted: { type: Boolean, default: false }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
 });
 

const Production = mongoose.model('Production', ProductionSchema);
module.exports = Production;
