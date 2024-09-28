const mongoose = require('mongoose')

const rainInfoSchema = new mongoose.Schema ({
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'authenUser',
        required: true
    }
});

const rainInfo = mongoose.model('rainInfo', rainInfoSchema)
module.exports = rainInfo