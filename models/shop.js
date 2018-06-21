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
    tags: [String],  // 标题右侧，同时作为筛选条件
    loan_range: [Number],  // 贷款额度
    feature: String,  // 右上角
    describe: String,
    user_n: Number,
    weight: Number   // 权重，客户端按照这个排序
})

let Shop = mongoose.model('Shop', shopSchema)

module.exports = Shop;