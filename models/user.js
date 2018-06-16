const mongoose = require('mongoose')
const schema = mongoose.Schema

let userSchema = new schema({
    id: {
        type: String,
        unique: true
    },
    passwd_hash: {
        type: String,
        required: true
    }
})

let User = mongoose.model('User', userSchema)

module.exports = User;