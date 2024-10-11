const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  contactno: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isDeleted: { type: Boolean, default: false }, 
  createdAt: { type: Date, default: Date.now }
});

const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactno: { type: String, required: true },
    email:  {type: String, unique: true, required: true }, 
    password: { type: String, required: true },   
    status: { type: String, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isDeleted: { type: Boolean, default: false }, 
    createdAt: { type: Date, default: Date.now },
    locations: [locationSchema],  
});


CustomerSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
 
CustomerSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
}; 

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;
