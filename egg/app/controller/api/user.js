const BaseController = require('../base')
const md5 = require('md5')
class UserController extends BaseController {
    async login() {
        // let userToken = '小白'
        // const token = await this.service.token.setToken(userToken)
        // // const aa = await this.app.jwt.verify(token, this.app.config.secret)
        // console.log(token);
        const { ctx } = this
        const { username, password, verify } = ctx.request.body
        if (!username || !password) {
            return this.error('请输入完整信息')
        }
        // if (this.ctx.session.code.toUpperCase() !== verify.toUpperCase()) {
        //     return ctx.body = {
        //         code: -2,
        //         msg: '验证码错误'
        //     }
        // }
        let data = await ctx.model.User.findOne({ username })
        if (!data || !data.username) {  //说明数据库没有这个名字
            this.error('用户名或邮箱错误')
        } else {
            if (data.password != md5(password)) {
                this.error('密码错误')
            } else {
                const token = await this.service.token.setToken(username)
                this.success('登录成功', token)
            }
        }
    }

    async register() {
        const { ctx } = this
        let { username, password, verify, email } = ctx.request.body
        if (!username || !password || !email) {
            return this.error('请输入完整信息')
        }
        // if (this.ctx.session.code.toUpperCase() !== verify.toUpperCase()) {
        //     return ctx.body = {
        //         code: -2,
        //         msg: '验证码错误'
        //     }
        // }
        let data = await ctx.model.User.findOne({ username })
        let data2 = await ctx.model.User.findOne({ email })
        if (!data && !data2) {
            password = md5(password)
            let user = await new ctx.model.User({ username, password, email })
            await user.save()
            // Token
            const token = await this.service.token.setToken(user.username)
            this.success('注册成功', token)
        } else {
            if (data && data.username === username) return this.error('用户名已存在')
            if (data2 && data2.email === email) return this.error('邮箱已存在')
        }
    }

    // 找回密码
    async resetPassword() {
        const { ctx } = this
        const { email, password } = ctx.request.body
        if (!email || !password) return this.error('请输入邮箱账号或密码')
        const user = await ctx.model.User.findOne({ email })
        if (user && email === user.email) {
            await ctx.model.User.findOneAndUpdate({ _id: user._id }, {
                $set: {
                    email,
                    password: md5(password)
                }
            })
            this.success('修改成功')
        } else {
            this.error('该邮箱未注册！')
        }
    }

    // 查询购物车
    async getCard() {
        const { ctx } = this
        const res = await ctx.model.ShopList.find({ userName: this.ctx.userName }).sort({ 'add_time': -1 })
        if (res) {
            this.success('查询成功', res)
        } else {
            this.error('查询失败')
        }

    }

}


module.exports = UserController;