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
    tags: [[String]],  // 标题右侧，同时作为筛选条件
    feature: String,  // 右上角
    describe: String,
    user_n: Number,
    // 暂不提供自定义排序功能
    custom_pos: Number
})

let Shop = mongoose.model('Shop', shopSchema)

module.exports = Shop;