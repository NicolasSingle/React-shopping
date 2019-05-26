import ajax from './axios';

export default {
    register: ajax('/register'),          //注册
    restorePassword: ajax('/resetPassword'), // 修改密码
    login: ajax('/login'),  // 登录
    recommend: ajax('/recommend','get'),  // 首页商品查询
    classification: ajax('/classification','get'),  // 分类页商品
}