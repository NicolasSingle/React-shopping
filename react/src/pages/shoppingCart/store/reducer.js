import { fromJS } from 'immutable'
import * as types from './action_types'
const defauleState = fromJS({
    shopList: [],
    orderList: [],
    totalPrice:0,
})

const reducer = (state = defauleState, action) => {
    if (action.type === types.SHOP_LIST) {
        return state.merge({
            shopList: fromJS(action.data),
        });
    }
    if (action.type === types.ORDER_LIST) {
        return state.merge({
            orderList: fromJS(action.data),
        });
    }
    if (action.type === types.TOTAL_PRICE) {
        return state.merge({
            totalPrice: fromJS(action.data),
        });
    }
    return state
}

export default reducer



