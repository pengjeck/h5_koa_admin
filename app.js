'use strict';
var books = require('./controllers/books');
// 压缩中间件
var compress = require('koa-compress');
// 日志中间件
var logger = require('koa-logger');
// 静态文件服务中间件
var serve = require('koa-static');
// 路由中间件
var route = require('koa-route');
// koa
var koa = require('koa');
var path = require('path');
var app = module.exports = koa();

// 日志中间件，没有进行单独的配置
app.use(logger());

app.use(route.get('/books/', books.all));
app.use(route.get('/books/:id', books.fetch));
app.use(route.post('/books/', books.add));
app.use(route.put('/books/:id', books.modify));
app.use(route.delete('/books/:id', books.remove));
app.use(route.options('/', books.options));
app.use(route.trace('/', books.trace));
app.use(route.head('/', books.head));

// Serve static files
app.use(serve(path.join(__dirname, 'public')));

// 使用文件压缩中间件
app.use(compress());

if (!module.parent) {
  app.listen(1337);
  console.log('listening on port 1337');
}
