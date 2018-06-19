// app.js
// 加载依赖
const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const jwtkoa = require('koa-jwt');
// 系统依赖
const serve = require('koa-static');
// 加载中间件
const loggerMiddle = require('./middleware/logger');
const res_fomater = require('./middleware/res_formater');

const apiRouter = require('./router');
// 加载配置
const config = require('./config/common');
mongoose.connect(config.mongo.dbUrl);


const app = new koa();

app.use(bodyParser());
app.use(async (ctx, next) => {
    // 支持跨域访问
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set("Access-Control-Allow-Headers", "Content-Type,Access-Token,authorization");

    await next();
});
app.use(loggerMiddle);
app.use(res_fomater);
app.use(apiRouter.routes());
app.use(serve(__dirname + '/public'));
// 登录认证 jwt
app.use(jwtkoa({ secret: config.jwt.secret }).unless({
    path: ['/api/1.0/user/register',
        '/api/1.0/user/login',
        '/api/1.0/shop/findAll',
        '/api/1.0/upload',],
    method: 'OPTIONS'
}))

app.listen(3000, () => {
    console.log('server: 127.0.0.1:3000');
});
