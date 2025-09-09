const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    workType: {
        type: String,
        enum: ['Personal', 'Professional', 'Fun', 'Time Pass', 'Urgent']
    },
    workDesc: {
        type: String,
        default: "No Work Description"
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    priority: {
        type: String,
        enum: ['HIGH', 'Low', 'Medium', 'Urgent']
    },
    status: {
        type: String,
        enum: ['TODO', 'Delayed', 'Give Up', 'In Progress', 'Completed']
    },
    links: [
        {
            type: String
        }
    ]
}, {timestamps: true})

const TODO = mongoose.model('TODO', todoSchema);
module.exports = TODO;
