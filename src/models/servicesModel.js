const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
  servicename: { type: String, required: true }, 
  serviceid: { type: String},
  status: { type: String},
  priority: { type: String},  
  createdBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isDeleted: { type: Boolean, default: false },  
  createdAt: { type: Date, default: Date.now }
});

const Service = mongoose.model('Services', servicesSchema);
module.exports = Service;
