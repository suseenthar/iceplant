const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
    modelName: { type: String, required: true, unique: true }, 
    sequenceval: { type: Number, default: 105 }
});

const Sequence = mongoose.model('Sequence', sequenceSchema);
module.exports = Sequence;
 