/**
 * 在app.use(router)之前调用
 */
module.exports = async (ctx, next) => {
    //先去执行路由
    await next();
    console.log(ctx.type);
    if (ctx.type == 'image/png' || ctx.type == 'image/jpeg') {
    } else {
        if (ctx.status == 200) {
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
            ctx.status = 200;
            console.log(ctx.body);
            if (ctx.body) {
                ctx.body = {
                    code: 1,
                    message: ctx.body,
                }
            } else {
                ctx.body = {
                    code: 1,
                    message: 'error'
                }
            }

        }
    }
    // if (!(ctx.type == 'image/jpeg') || (ctx.type == 'image/png')) {
    //如果有返回数据，将返回数据添加到data中

    // }
}