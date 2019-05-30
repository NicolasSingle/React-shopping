import { fromJS } from 'immutable'
import * as types from './action_types'
const defauleState = fromJS({
    goods_details: {},
})

const reducer = (state = defauleState, action) => {
    if (action.type === types.GOODS_DETAILS) {
        return state.merge({
            goods_details: fromJS(action.data),
        });
    }
    return state
}

export default reducer



