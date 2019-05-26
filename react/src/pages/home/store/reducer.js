import { fromJS } from 'immutable'
import * as types from './action_types'
const defauleState = fromJS({
    recommend: {}
})

const reducer = (state = defauleState, action) => {

    if (action.type === types.HOME_RECOMMEND) {
        return state.merge({
            recommend: fromJS(action.data),
        });

    }
    return state
}

export default reducer



