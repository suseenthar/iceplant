const mongoose = require('mongoose'); 

const ProductionSchema = new mongoose.Schema({
    unit: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },
    round: { type: Number, required: true ,'default': "1" }, 
    bars: { type: Number, required: true }, 
    date : { type: Date, default: Date.now },   
    data: { type: Object, required: true }, 
    isDeleted: { type: Boolean, default: false }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
 });
 

const Production = mongoose.model('Production', ProductionSchema);
module.exports = Production;
