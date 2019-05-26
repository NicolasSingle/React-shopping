module.exports = function (opt, app) {
    return async (ctx, next) => {
        const arr = ['/register', '/login','/resetPassword','/data']
        if (arr.includes(ctx.url)) {
            await next()    // 没有登录也能请求

        } else {
            // 获取token
            const token = ctx.header.authorization
            if (!token) {
                beOverdue(ctx)
            } else {
                try {
                    let payload = await app.jwt.verify(token, app.config.secret)
                    if (payload) {
                        await next()
                    } else {
                        beOverdue(ctx)
                    }
                } catch (error) {
                    beOverdue(ctx)
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