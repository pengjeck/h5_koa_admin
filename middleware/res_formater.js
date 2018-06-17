/**
 * 在app.use(router)之前调用
 */
module.exports = async (ctx, next) => {
    //先去执行路由
    await next();

    //如果有返回数据，将返回数据添加到data中
    if (ctx.res.statusCode == 200) {
        if (ctx.body) {
            ctx.body = {
                code: 0,
                message: 'success',
                data: ctx.body
            }
        } else {
            ctx.body = {
                code: 0,
                message: 'success'
            }
        }
    } else {
        ctx.body = {
            code: 1,
            message: ctx.body,
        }
    }
}