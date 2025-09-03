const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    workType: {
        type: mongoose.Types.ObjectId,
        ref: 'WorkType',
        required: true
    },
    workName: {
        type: String,
        default: 'No Work name'
    },
    workDesc: {
        type: String,
        default: 'No Work description'
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date
    },
    workLink: [
        {
            type: String,
            default: 'No Link Provided'
        }
    ],
    status: {
        type: String,
        enum: ['New', 'Open', 'Ongoing', 'Closed', 'Complete', 'Give Up', 'Delayed'],
        default: 'No Work Provided'
    }
}, { timestamps: true });

const Work = mongoose.model('Work', workSchema);
module.exports = Work;