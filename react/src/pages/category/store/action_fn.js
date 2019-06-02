import * as types from './action_types'
import Api from 'api/api'
import { fromJS } from 'immutable'
const _category = data => ({
    type: types.CATEGORY_TABS,
    data
})

const _categoryGoodsItem = data => ({
    type: types.CATEGORY_GOODS_ITEM,
    data
})


// 获取tab栏
export const getCategory = (that, id = null) => {
    console.log(id);
    
    // const state = store.getState()
    // const data = state.getIn(['home', 'recommend'])
    return async dispatch => {
        // 每次点击之前先清空
        dispatch({
            type: types.CATEGORY_GOODS_CLEAR,
        })
        // 然后再请求数据
        const data = await Api.recommend()
        if (data.code == 10000) {
            dispatch(_category(data.data.category))
            that.setState(prev => ({
                list: fromJS(data.data.category[0].bxMallSubDto)
            }))
            const defaultId = data.data.category[0].bxMallSubDto[0].mallSubId
            // 请求默认分类数据
            getGoodsList(id && id || defaultId)(dispatch)
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

