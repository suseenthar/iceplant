const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    code: { type: String, required: true },
    description: { type: String, required: true },
    engineers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    worktype: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Services' }], 
    targetdate : { type: Date, required: true },
    status : { type: String, enum: ['NEW','TODO', 'ONGOING', 'REVIEW', 'COMPLTED'], 'default': "NEW" },
    priority: { type: String, enum: ['Low','Medium','High',], 'default': "Medium" },
    project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },

    isDeleted: { type: Boolean, default: false }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
