const mongoose = require('mongoose');
 
const SalesSchema = new mongoose.Schema({
    name: { type: String, required: true },    
    status: { type: String, default: true },
    isDeleted: { type: Boolean, default: false }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
 });

 
const Sales = mongoose.model('Sales', SalesSchema);
module.exports = Sales;
