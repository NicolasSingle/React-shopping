const BaseController = require('../base')
class operatingGoods extends BaseController {
    // 加入购物车
    async addShop() {
        const { id } = this.ctx.request.body
        const { ctx } = this
        if (!id) {
            return this.error('缺少重要参数id')
        }
        const user = await ctx.model.User.findOne({ username: ctx.userName })
        const goodsData = await ctx.model.ShopList.findOne({ cid: id, uid: user._id })

        // 购物车已经有了这条商品，商品默认+1
        if (goodsData && user) {
            await ctx.model.ShopList.findOneAndUpdate({ cid: id, uid: user._id }, {
                $set: {
                    count: goodsData.count += 1
                }
            })
        } else {  // 说明没有这条数据
            // 查到这条商品数据
            let goods = await ctx.model.Goods.findOne({ id: id })
            let newGoods = new ctx.model.ShopList({
                uid: user._id,
                userName: ctx.userName,
                present_price: goods.present_price,
                cid: goods.id,
                image_path: goods.image_path,
                name: goods.name,
                mallPrice: goods.present_price,
                check: false,
                count: 1,
                add_time: +new Date()
            })
            await newGoods.save()
        }
        this.success('加入购物车成功')
    }

    // 购物车增加减少
    async editCart() {
        const data = this.ctx.request.body
        const { ctx } = this
        if (!data) {
            return this.error('缺少重要参数')
        }
        await ctx.model.ShopList.findOneAndUpdate({ userName: this.ctx.userName, cid: data.id }, {
            $set: {
                'count': data.count,
                'mallPrice': data.mallPrice,
            }
        })
        this.success('修改成功')
    }

    // 购物车删除
    async deleteShop() {
        const data = this.ctx.request.body
        if (!data.length) {
            return this.error('缺少重要参数')
        }
        const { ctx } = this
        await ctx.model.ShopList.deleteMany({ userName: this.ctx.userName, cid: data })
        this.success('删除成功')
    }

    // 收藏商品
    async collection() {
        const { id } = this.ctx.request.body
        if (!id) {
            return this.error('缺少重要参数id')

        }
        let goods = await this.ctx.model.Goods.findOne({ id })
        let collection = new this.ctx.model.Collection({
            userName: this.ctx.userName,
            cid: goods.id,
            image_path: goods.image_path,
            name: goods.name,
            present_price: goods.present_price,
            add_time: +new Date()
        })
        await collection.save()
        this.success('收藏成功')
    }

    // 取消收藏
    async cancelCollection() {
        const { id } = this.ctx.request.body
        if (!id) {
            return this.error('缺少重要参数id')
        }
        await this.ctx.model.Collection.deleteOne({ userName: this.ctx.userName, cid: id })
        this.success('取消收藏成功')
    }
}

module.exports = operatingGoods;