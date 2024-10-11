const mongoose = require('mongoose');
 
// Timeline Schema
const timelineSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }, 
    isDeleted: { type: Boolean, default: false }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },   
  });

const Timeline = mongoose.model('Timeline', timelineSchema);
module.exports = Timeline;
