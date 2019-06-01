import * as types from './action_types'
import Api from 'api/api'
import { toast } from 'js/utils'
const _getGoodsDetails = data => ({
    type: types.GOODS_DETAILS,
    data
})


// 获取单个商品列表
export const getGoodsDetails = (id, page = 1) => {
    return async dispatch => {
        dispatch(_getGoodsDetails({}))
        try {
            const data = await Api.goodsDetails({ id, page })
            if (data.code == 10000) {
                dispatch(_getGoodsDetails(data.data))
            }
        } catch (error) {

        }
    }
}

// 查询是否收藏
export const isCollection = (id, that) => {
    return async dispatch => {
        const data = await Api.isCollection({ id })
        if (data.code == 10000) {
            that.setState(prev => ({
                isCollection: data.data.isCollection
            }))
        }
    }
}

// 点击收藏

export const collection = (id, that) => {
    return async dispatch => {
        if (that.state.isCollection == 0) { // 未收藏
            const data = await Api.collection({ id })
            if (data.code == 10000) {
                toast('收藏成功')
                that.setState(prev => ({
                    isCollection: 1
                }))
            }
        } else {    //取消收藏
            const data = await Api.cancelCollection({ id })
            if (data.code == 10000) {
                toast('取消收藏成功')
                that.setState(prev => ({
                    isCollection: 0
                }))
            }
        }

    }
}