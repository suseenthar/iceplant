const mongoose = require('mongoose');
 
const SalesSchema = new mongoose.Schema({
    saleno: { type: String, required: true }, 
    production: { type: mongoose.Schema.Types.ObjectId, ref: 'Production' },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    billingno: { type: String, required: true },
    billingdate: { type: String, required: true },    
    drivername: { type: String, required: true },
    vehicleno: { type: String, required: true },
    mobileno: { type: String, required: true },
    products: { type: mongoose.Schema.Types.ObjectId, ref: 'Goods' },
    productqty: { type: Array, required: true },
    price: { type: Array, required: true },
    total: { type: Array, required: true },
    subtotal: { type: String, required: true },
    taxamount: { type: String, required: true },
    grandtotal: { type: String, required: true },
    narration: { type: String, required: false },   
    isDeleted: { type: Boolean, default: false }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
 });

 
const Sales = mongoose.model('Sales', SalesSchema);
module.exports = Sales;
