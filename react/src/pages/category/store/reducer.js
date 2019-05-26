import { fromJS } from 'immutable'
import * as types from './action_types'
const defauleState = fromJS({
    category: []
})

const reducer = (state = defauleState, action) => {

    if (action.type === types.CATEGORY_TABS) {
        return state.merge({
            category: fromJS(action.data),
        });

    }
    return state
}

export default reducer



