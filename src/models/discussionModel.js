const mongoose = require('mongoose');
 
const DiscussionSchema = new mongoose.Schema({
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: { type: String, required: false },
    mediaurl: String,
    mediatype: String,
    timestamp: { type: Date, default: Date.now }
  });

const Discussion = mongoose.model('Discussion', DiscussionSchema);
module.exports = Discussion;
