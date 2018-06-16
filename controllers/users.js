const User = require('../models/user')
const mongoose = require('mongoose')

class UserController {
    static async login(ctx, next) {
        const user = ctx.require.body;
        if (user && user.name && user.passwd_hash) {
            let userToken = {
                name: user.name,
                passwd_hash: user.passwd_hash
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
    static async valify(user) {
        User.find({ id: user.name, passwd_hash: user.passwd_hash }).then((res) => {
            if (res) {
                return true;
            } else {
                return false;
            }
        }).catch((err) => {
            return false;
        })
    }
}

module.exports = UserController;
