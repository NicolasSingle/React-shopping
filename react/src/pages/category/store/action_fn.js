import * as types from './action_types'
import Api from 'api/api'
import store from '@/store'
import { fromJS } from 'immutable'
const _category = data => ({
    type: types.CATEGORY_TABS,
    data
})

const _categoryGoodsItem = data => ({
    type: types.CATEGORY_GOODS_ITEM,
    data
})



export const getCategory = that => {
    // const state = store.getState()
    // const data = state.getIn(['home', 'recommend'])
    return async dispatch => {
        const data = await Api.recommend()
        if (data.code == 10000) {
            dispatch(_category(data.data.category))
            that.setState(prev => ({
                list: fromJS(data.data.category[0].bxMallSubDto)
            }))
            const defaultId = data.data.category[0].bxMallSubDto[0].mallSubId
            // 请求默认分类数据
            getGoodsList(defaultId)(dispatch)
        }
    }
}

// 获取商品列表
export const getGoodsList = mallSubId => {
    return async dispatch => {
        const data = await Api.classification({ mallSubId })
        if (data.code == 10000) {
            dispatch(_categoryGoodsItem(data.data))
        }
    }

}