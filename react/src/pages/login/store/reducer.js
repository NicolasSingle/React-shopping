import { fromJS } from 'immutable'
import * as types from './action_types'
const defauleState = fromJS({
    username: '',
    password: '',
    email: ''
})

const reducer = (state = defauleState, action) => {
    console.log(action);

    if (action.type === types.SET_INPUT_VAL) {
        const data = Object.keys(action.value)[0]
        return state.merge({
            [data]: action.value[data]
        });
    } else if (action.type === types.CLEAR_INPUT_VAL) {
        // 登录完毕之后清空input
        return state.merge({
            username: '',
            password: '',
            email: ''
        });



    }
    return state
}

export default reducer