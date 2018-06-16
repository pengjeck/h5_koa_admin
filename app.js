// app.js
// 加载依赖
const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const apiRouter = require('./router');
const mongoose = require('mongoose');
const config = require('./config/common');
mongoose.connect(config.mongo.dbUrl);

const app = new koa();


app.use(bodyParser());
app.use(apiRouter.routes());

app.listen(3000, () => {
    console.log('server: 127.0.0.1:3000');
});
