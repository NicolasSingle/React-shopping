const BaseController = require('../base')
class GoodsController extends BaseController {
    // 首页商品查询
    async recommend() {
        const { ctx } = this
        const res = await ctx.model.Recommend.findOne({})
        if (res) {
            return this.success('操作成功', res)
        }
        this.error('查询失败')
    }

    // 分类商品查询
    async classification() {
        const { ctx } = this
        const { mallSubId } = ctx.query
        if (!mallSubId) {
            this.error('缺少参数mallSubId')
            return
        }
        const res = await ctx.model.Goods.find({ 'sub_id': mallSubId })
        if (res) {
            return this.success('操作成功', res)
        }
        this.error('查询失败')
    }
}

module.exports = GoodsController;