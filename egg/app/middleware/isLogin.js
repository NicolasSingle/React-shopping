module.exports = function (opt, app) {
    return async (ctx, next) => {
        const arr = ['/register', '/login', '/resetPassword', '/data']
        if (arr.includes(ctx.url) || ctx.url.includes('/goods/one')) {
            await next()    // 没有登录也能请求

        } else {
            // 获取token
            const token = ctx.header.authorization
            if (!token) {
                console.log(1);
                
                beOverdue(ctx)
            } else {
                try {
                    let payload = await app.jwt.verify(token, app.config.secret)
                    if (payload) {
                        ctx.userName = payload
                        await next()
                    } else {
                        console.log(2);
                        
                        beOverdue(ctx)
                    }
                } catch (error) {
                    console.log(error);
                    // beOverdue(ctx)
                }
            }
        }
    }
}

// jwt过期
beOverdue = (ctx) => {
    ctx.status = 401;
    ctx.body = {
        msg: '登录过期，请重新登录',
        code: '20001'
    }
}