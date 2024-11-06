const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  customer: { type: String, required: true }, 
  person: { type: String},
  position: { type: String},
  aptdate: { type: String}, 
  contactno: { type: String},
  address: { type: String},
  arrivaltime:  { type: String},
  departuretime:  { type: String},
  worktype:  { type: Object},
  locationtype:  { type: Object}, 
  createdBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isDeleted: { type: Boolean, default: false },  
  createdAt: { type: Date, default: Date.now }
});

const Settings = mongoose.model('Settings', settingsSchema);
module.exports = Settings;
