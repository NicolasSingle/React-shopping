'use strict';
module.exports = app => {
    const { router, controller } = app;
    app.router.get('/data', app.controller.importData.index); // 往数据库导入数据
    router.post('/register', controller.api.user.register);
    router.post('/resetPassword', controller.api.user.resetPassword);
    router.post('/login', controller.api.user.login);


    // 商品展示相关
    router.get('/recommend', controller.api.goods.recommend);               // 首页商品展示
    router.get('/classification', controller.api.goods.classification);     // 商品分类查询
    // router.get('/goods/one', controller.api.goods.goodsOne);                // 单个商品查询
    // router.post('/search', controller.api.goods.search);                    // 搜索
};
