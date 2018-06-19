const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/common');

class UserController {
  static async login(ctx, next) {
    const user = ctx.request.body;
    if (user && user.name && user.passwd_hash) {
      try {
        let res = UserController.valify(user);
        if (res.lenght == 0) {
          ctx.res.statusCode = 400;
          ctx.body = '登录失败';
        } else {
          let payload = {
            id: user.name,
            passwd_hash: user.passwd_hash
          }
          const token = jwt.sign(payload, config.jwt.secret, { 'expiresIn': '12h' });
          ctx.body = {
            token: token
          }
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
        if (!tmp) {
          ctx.status = 500;
          ctx.body = '注册失败';
        }
      } catch (e) {
        ctx.status = 500;
        ctx.body = '注册失败';
      }
    } else {
      ctx.status = 400;
      ctx.body = '参数错误';
    }
  }
  // 验证用户用户信息是否正确
  static async valify(user) {
    return await User.find({ id: user.name, passwd_hash: user.passwd_hash })
  }
}

module.exports = UserController;
