const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto'); 

 
const UserSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname:  { type: String, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    emergencycontact: { type: String, required: false },
    contactperson: { type: String, required: false },
    dob:  {type: String, required: true },
    blood: { type: String, required: true },
    profilepic: { type: String, required: true },
    joindate: { type: String, required: true },
    address: { type: String, required: true },
    email:  {type: String, unique: true, required: true },
    uid:  {type: String, unique: true },
    password: { type: String, required: true },
    drivinglicence: { type: String, required: false },
    passportno: { type: String, default: false },
    role: { type: String, required: true },
    status: { type: String, default: true },
    isAdmin: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isDeleted: { type: Boolean, default: false }, 
});
 
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
 
UserSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};
 

const User = mongoose.model('User', UserSchema);
module.exports = User;
