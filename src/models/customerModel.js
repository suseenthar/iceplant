const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  

const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    email:  {type: String, unique: true, required: true }, 
    password: { type: String, required: true },  
    address: { type: String, required: true },
    city: { type: String, required: true },
    postcode: { type: String, required: true }, 
    phone: { type: String, required: true }, 
    status: { type: String, default: true },
    isDeleted: { type: Boolean, default: false }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
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