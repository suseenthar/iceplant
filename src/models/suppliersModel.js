const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  address: { type: String},
  contactno: { type: String},
  city: { type: String},  
  createdBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isDeleted: { type: Boolean, default: false },  
  createdAt: { type: Date, default: Date.now }
});

const Supplier = mongoose.model('Supplier', SupplierSchema);
module.exports = Supplier;
