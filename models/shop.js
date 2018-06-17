const mongoose = require('mongoose')
const schema = mongoose.Schema


let shopSchema = new schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    url: String,
    logo_url: String,
    type: String,   // 类型
    tag: String,  // 标题右侧
    feature: String,  // 右上角
    describe: String,
    user_n: Number,
    custom_pos: {
        type: Number,
        unique: true,
        required: true
    }
})

let Shop = mongoose.model('Shop', shopSchema)

module.exports = Shop;