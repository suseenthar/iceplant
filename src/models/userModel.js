const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto'); 

 
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: false },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postcode: { type: String, required: true },
    email:  {type: String, unique: true, required: true },
    password: { type: String, required: true },
    profilepic: { type: String, required: false,default:'assets/images/faces/19.jpg' },
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
