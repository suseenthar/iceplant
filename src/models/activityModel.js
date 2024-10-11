const mongoose = require('mongoose');
const activitySchema = new Schema({
    activityType: { type: String, required: true }, 
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
  });
 

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
