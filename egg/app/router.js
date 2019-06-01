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
    router.get('/goods/one', controller.api.goods.goodsOne);                // 单个商品查询
    // router.post('/search', controller.api.goods.search);                    // 搜索
    router.post('/getCard', controller.api.user.getCard);                  // 查询是购物车
    router.post('/isCollection', controller.api.user.isCollection);                  // 查询是否已经收藏
    router.get('/collection/list', controller.api.user.collectionList);    // 查询收藏的商品


    router.post('/addShop', controller.api.operatingGoods.addShop);                     // 加入购物车
    router.post('/editCart', controller.api.operatingGoods.editCart);                     // 购物车增加减少
    router.post('/deleteShop', controller.api.operatingGoods.deleteShop);                     // 购物车删除
    router.post('/collection', controller.api.operatingGoods.collection);                     // 商品的收藏
    router.post('/cancelCollection', controller.api.operatingGoods.cancelCollection);                     // 商品的取消收藏

}
