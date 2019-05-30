import * as types from './action_types'
import Api from 'api/api'
const _getGoodsDetails = data => ({
    type: types.GOODS_DETAILS,
    data
})


// 获取单个商品列表
export const getGoodsDetails = (id, page = 1) => {
    return async dispatch => {
        const data = await Api.goodsDetails({ id, page })
        console.log(data);
        if (data.code == 10000) {
            dispatch(_getGoodsDetails(data.data))
        }
    }
}


