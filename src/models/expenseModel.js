const mongoose = require('mongoose'); 

const ExpenseSchema = new mongoose.Schema({
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    billno:  { type: String, required: true }, 
    date : { type: Date, required: true },  
    amount: { type: String, required: true }, 
    narration: { type: String, required: true }, 
    isDeleted: { type: Boolean, default: false }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
 });
 

const Expense = mongoose.model('Expense', ExpenseSchema);
module.exports = Expense;
