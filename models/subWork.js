const mongoose = require('mongoose');

const subWorkSchema = new mongoose.Schema({

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
    work: {
        type: mongoose.Types.ObjectId,
        ref: 'Work',
        required: true
    },
    subWorkName: {
        type: String,
        default: 'No Work name'
    },
    subWorkDesc: {
        type: String,
        default: 'No Work description'
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date
    },
    subWorkLink: [
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
}, {timestamps: true});

const SubWork = mongoose.model('SubWork', subWorkSchema);
module.exports = SubWork;