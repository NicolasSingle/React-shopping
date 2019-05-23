import ajax from './axios';

export default {
    register: ajax('/register'),          //注册
    restorePassword: ajax('/resetPassword'), // 修改密码
    login: ajax('/login'),  // 登录

}