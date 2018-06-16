const User = require('../models/user')

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
    static async valify(user) {
        User.find({id:user.name, passwd_hash:user.passwd_hash}).then((res) => {
            if(res) {
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
