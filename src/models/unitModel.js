const mongoose = require('mongoose'); 

const UnitSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    code: { type: String, required: true }, 
    startdate : { type: Date, required: true },
    status : { type: String, enum: ['Active','Inactive'], 'default': "Active" }, 
    isDeleted: { type: Boolean, default: false }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
 });
 

const Unit = mongoose.model('Unit', UnitSchema);
module.exports = Unit;
