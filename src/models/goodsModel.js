const mongoose = require('mongoose');

const goodsSchema = new mongoose.Schema({
  productname: { type: String, required: true }, 
  price: { type: String},
  status: { type: String},
  priority: { type: String},  
  createdBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isDeleted: { type: Boolean, default: false },  
  createdAt: { type: Date, default: Date.now }
});

const Goods = mongoose.model('Goods', goodsSchema);
module.exports = Goods;
