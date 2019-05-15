const proxy = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(proxy('/api',
        {
            target: 'https://api.douban.com/v2/movie',
            pathRewrite: {
                "^/api": ""
            },
            changeOrigin: true,
        }))
    // app.use(proxy('/*.svg', { target: 'http://localhost:5000/' }))
}