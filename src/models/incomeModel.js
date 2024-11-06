const mongoose = require('mongoose'); 

const IncomeSchema = new mongoose.Schema({ 
    customer:  { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    billno:  { type: String, required: true }, 
    date : { type: Date, required: true },  
    amount: { type: Number, required: true }, 
    narration: { type: String, required: true }, 
    isDeleted: { type: Boolean, default: false }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
 });
 

const Income = mongoose.model('Income', IncomeSchema);
module.exports = Income;
