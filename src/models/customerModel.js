const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  

const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    discount: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postcode: { type: String, required: true }, 
    phone: { type: String, required: true }, 
    status: { type: String, default: true },
    isDeleted: { type: Boolean, default: false }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
 });

 
const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;