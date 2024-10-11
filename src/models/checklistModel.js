const mongoose = require('mongoose');

// Define checklist schema
const checklistSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  code: { type: String},
  person: { type: String},
  position: { type: String},
  aptdate: { type: Date}, 
  contactno: { type: String},
  address: { type: String},
  arrivaltime:  { type: String},
  departuretime:  { type: String},
  worktype:  { type: Object},
  locationtype:  { type: Object},
  goodsproduct: { type: Object},
  productquantity: { type: Object},
  productnote:  { type: Object},
  plannedjob:  { type: Object},
  plannedimplemented:  { type: Object},
  plannednote:  { type: Object}, 
  engineername:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  engineerdate: { type: Date},
  customername:  { type: String},
  customerdate:  { type: Date},
  egsign:  { type: Object},
  crsign:  { type: Object}, 
  status: { type: String, enum: ['Assign','Processing', 'Hold', 'Completed'], 'default': "Processing" },
  createdBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isDeleted: { type: Boolean, default: false },  
  createdAt: { type: Date, default: Date.now }
});

const Checklist = mongoose.model('Checklist', checklistSchema);

module.exports = Checklist;
