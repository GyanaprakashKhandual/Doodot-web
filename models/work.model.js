const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },

    projectName: {
        type: String,
        required: true,
    },
    
    projectDesc: {
        type: String,
        default: 'No Description Server'
    }
}, { timestamps: true, toJSON: { virtuals: true}, toObject: { virtuals: true}});


workSchema.virtual('url').get(function() {
    return `/works/${this._id}`;
});

const Work = mongoose.model('Work', workSchema);
module.exports = Work;