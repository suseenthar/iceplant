const mongoose = require('mongoose');
 
const SalesSchema = new mongoose.Schema({
    saleno: { type: String, required: true }, 
    unit: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
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
    discount: { type: String, required: false },
    CGST: { type: String, required: false },
    SGST: { type: String, required: false },
    grandtotal: { type: String, required: true },
    narration: { type: String, required: false },   
    isDeleted: { type: Boolean, default: false }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
 });

 
const Sales = mongoose.model('Sales', SalesSchema);
module.exports = Sales;
