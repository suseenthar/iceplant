const mongoose = require('mongoose'); 

const ProductionSchema = new mongoose.Schema({
    unit1bars: { type: Number, required: true }, 
    unit2bars: { type: Number, required: true }, 
    totalbars: { type: Number, required: true }, 
    date : { type: Date, required: true },    
    data: { type: Array, required: true }, 
    isDeleted: { type: Boolean, default: false }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
 });
 

const Production = mongoose.model('Production', ProductionSchema);
module.exports = Production;
