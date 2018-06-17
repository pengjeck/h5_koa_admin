const config = require('../config/common')
const mongoose = require('mongoose')
const Shop = require('../models/shop')
const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密


class ShopController {
    static async findAll(ctx, next) {
        try {
            let query = Shop.find();
            let res = await query.exec();
            ctx.body = res;
        } catch (err) {
            ctx.res.statusCode = 500;
            ctx.body = '查找失败';
        }
    }
    static async delete(ctx, next) {
        const token = ctx.header.authorization  // 获取jwt
        let payload
        if (token) {
            payload = await verify(token.split(' ')[1], secret)  // // 解密，获取payload
            ctx.body = {
                payload
            }
        } else {
            ctx.res.statusCode = 401;
            ctx.body = 'token错误'
        }
    }
    static async add(ctx, next) {

    }
    static async modify(ctx, next) {

    }
}

module.exports = ShopController;
