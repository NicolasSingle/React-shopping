import ajax from './axios';

export default {
    register: ajax('/register'),          //注册
    restorePassword: ajax('/resetPassword'), // 修改密码
    login: ajax('/login'),  // 登录
    recommend: ajax('/recommend', 'get'),  // 首页商品查询
    classification: ajax('/classification', 'get'),  // 分类页商品
    goodsDetails: ajax(`/goods/one`, 'get'),      //  获取商品详情
    addShop: ajax(`/addShop`,'post',false),  // 加入购物车
    getCard: ajax('/getCard'),  // 查询购物车
    editCart: ajax(`/editCart`,'post',false), // 购物车增加减少
    deleteShop: ajax(`/deleteShop`), // 购物车删除
}