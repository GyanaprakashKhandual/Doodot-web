const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    workType: {
        type: String,
        default: "No Work Type"
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
    links: [
        {
            type: String
        }
    ]
}, {timestamps: true})

const TODO = mongoose.model('TODO', todoSchema);
module.exports = TODO;
