const mongoose = require('mongoose');


const todoSchema  = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        workType: {
            type: String,
            enum: ['Professional', 'Personal', 'Hobby', 'Time Pass'],
            required: true,
        },
        workName: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true
        },
        startTime: {
            type: String,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        endTime: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['Working', 'Delayed', 'Paused', 'Canceled', 'Give up'],
            required: true,
        }
    },
    {
        timestamps: true
    }
);


const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;