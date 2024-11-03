const mongoose = require('mongoose'); 

const IncomeSchema = new mongoose.Schema({
    incomeno: { type: String, required: true }, 
    billno:  { type: String, required: true }, 
    date : { type: Date, required: true }, 
    customer:  { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    amount: { type: String, required: true }, 
    narration: { type: String, required: true }, 
    isDeleted: { type: Boolean, default: false }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
 });
 

const Income = mongoose.model('Income', IncomeSchema);
module.exports = Income;
