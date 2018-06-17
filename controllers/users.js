const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/common');

class UserController {
    static async login(ctx, next) {
        const user = ctx.request.body;
        if (user && user.name && user.passwd_hash) {
            try {
                let res = UserController.valify(user);
                if (res) {
                    let userToken = {
                        id: user.name,
                        passwd_hash: user.passwd_hash
                    }
                    const token = jwt.sign(userToken, config.jwt.secret, {'expiresIn': '12h'});
                    ctx.body = {
                        token: token
                    }
                } else {
                    ctx.res.statusCode = 400;
                    ctx.body = '登录失败'
                }
            } catch (err) {
                ctx.res.statusCode = 500;
                ctx.body = '错误: ' + err.message;
            }
        }
    }
    static async register(ctx, next) {
        const user = ctx.request.body;
        if (user && user.name && user.passwd_hash) {
            var n_user = new User({
                id: user.name,
                passwd_hash: user.passwd_hash
            });
            try {
                let tmp = await n_user.save();
                console.log(tmp);
                ctx.body = {
                    message: 'success',
                    code: 0
                }
            } catch (e) {
                ctx.body = {
                    message: 'error, ' + e,
                    code: 1
                }
            }
        } else {
            ctx.body = {
                message: 'param err',
                code: -1
            }
        }
    }
    // 验证用户用户信息是否正确
    static async valify(user) {
        try {
            let res = await User.find({ id: user.name, passwd_hash: user.passwd_hash })
            if (res) {
                return true;
            } else {
                return false;
            }
        } catch(err) {
            return false;
        }
        
    }
}

module.exports = UserController;
