const mongoose = require('mongoose');
const {User} = require('../models/users.model');
const { Schema } = mongoose;
const TaskSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    status: {
        type: String,
        required: true,
        trim:true,
        enum : ['To Do','In Progress'],
        default:"To Do"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
    
}
);

const Task = new mongoose.model('Task',TaskSchema);
exports.Task = Task;