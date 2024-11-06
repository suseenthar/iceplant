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
    subtotal: { type: Number, required: true },
    discount: { type: Number, required: false },
    CGST: { type: Number, required: false },
    SGST: { type: Number, required: false },
    grandtotal: { type: Number, required: true },
    narration: { type: String, required: false },   
    isDeleted: { type: Boolean, default: false }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
 });

 
const Sales = mongoose.model('Sales', SalesSchema);
module.exports = Sales;
