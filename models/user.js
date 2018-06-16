const mongoose = require('mongoose')
const schema = mongoose.Schema

let userSchema = new schema({
    id: String,
    passwd_hash: String
})

let User = mongoose.model('User', userSchema)

module.exports = User;