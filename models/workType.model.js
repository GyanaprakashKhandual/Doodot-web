const mongoose = require('mongoose');

const workTypeSchema = new mongoose.Schema({

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },

    workTypeName: {
        type: String,
        required: true
    },
    workTypeDesc: {
        type: String,
        required: true
    }
}, { timestamps: true });

const WorkType = mongoose.model('WorkType', workTypeSchema);
module.exports = WorkType;
