const mongoose = require('mongoose')

const authUserSchema = new mongoose.Schema ({
    userName: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

const authUser = mongoose.model('authUser', authUserSchema);
module.exports = authUser