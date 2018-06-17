const config = require('../config/common');
const mongoose = require('mongoose');
const Shop = require('../models/shop');
const jwt = require('jsonwebtoken');
const util = require('util');

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
    // 删除商户
    static async delete(ctx, next) {
        const token = ctx.header.authorization  // 获取jwt
        let payload
        if (token) {
            try {
                payload = await jwt.verify(token, config.jwt.secret)  // // 解密，获取payload
                if (payload) {
                    let shop = ctx.request.body;
                    if (shop && shop.name) {
                        let res = await Shop.deleteOne({ name: shop.name });
                        if (res) {
                            ctx.status = 200;
                            ctx.body = util.format('deleted shop %s', shop.name);
                        } else {
                            ctx.status = 500;
                            ctx.body = '删除失败';
                        }
                    }
                }
            } catch (e) {
                if (e instanceof jwt.JsonWebTokenError) {
                    ctx.status = 400;
                    ctx.body = '认证失败，请重新登录'
                } else {
                    ctx.status = 500;
                    ctx.body = '删除失败';
                }
            }
        } else {
            ctx.status = 400;
            ctx.body = 'token错误'
        }
    }
    // 添加商户
    static async add(ctx, next) {
        const token = ctx.header.authorization  // 获取jwt
        let payload
        if (token) {
            try {
                payload = await jwt.verify(token, config.jwt.secret)  // // 解密，获取payload
                if (payload) {
                    let shop = ctx.request.body;
                    if (shop && shop.name) {
                        let n_shop = new Shop({
                            name: shop.name,
                            url: shop.url,
                            logo_url: shop.logo_url,
                            type: shop.type,
                            tag: shop.tag,
                            feature: shop.feature,
                            describe: shop.describe,
                            user_n: shop.user_n,
                            custom_pos: shop.custom_pos
                        })
                        let res = await n_shop.save();
                        if (!res) {
                            ctx.status = 500;
                            ctx.body = '添加失败';
                        } else {
                            ctx.status = 200;
                        }
                    } else {
                        ctx.status = 400;
                        ctx.body = '输入错误';
                    }
                }
            } catch (e) {
                if (e instanceof jwt.JsonWebTokenError) {
                    ctx.status = 400;
                    ctx.body = '认证失败，请重新登录'
                } else {
                    ctx.status = 500;
                    ctx.body = '添加失败';
                }
            }
        } else {
            ctx.status = 400;
            ctx.body = 'token错误'
        }
    }
    // 修改商户信息
    static async modify(ctx, next) {
        const token = ctx.header.authorization  // 获取jwt
        let payload
        if (token) {
            try {
                payload = await jwt.verify(token, config.jwt.secret)  // // 解密，获取payload
                if (payload) {
                    let shop = ctx.request.body;
                    if (shop && shop.name) {
                        let res = await Shop.updateOne({name: shop.name}, {
                            url: shop.url,
                            logo_url: shop.logo_url,
                            type: shop.type,
                            tag: shop.tag,
                            feature: shop.feature,
                            describe: shop.describe,
                            user_n: shop.user_n,
                            custom_pos: shop.custom_pos
                        });
                        if (res) {
                            ctx.status = 200;
                        } else {
                            ctx.status = 500;
                            ctx.body = '更新失败';
                        }
                    } else {
                        ctx.status = 400;
                        ctx.body = '参数错误';
                    }
                }
            } catch (e) {
                if (e instanceof jwt.JsonWebTokenError) {
                    ctx.status = 400;
                    ctx.body = '认证失败，请重新登录'
                } else {
                    ctx.status = 500;
                    ctx.body = '更新失败';
                }
            }
        } else {
            ctx.status = 400;
            ctx.body = '认证失败，请重新登录'
        }
    }
}

module.exports = ShopController;
