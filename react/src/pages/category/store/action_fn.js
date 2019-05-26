import * as types from './action_types'
import Api from 'api/api'
import store from '@/store'
const _category = data => ({
    type: types.CATEGORY_TABS,
    data
})

export const getCategory = () => {
    // const state = store.getState()
    // const data = state.getIn(['home', 'recommend'])
    return async dispatch => {
        const data = await Api.recommend()
        console.log(data);
        if (data.code == 10000) {
            dispatch(_category(data.data.category))
        }
    }
}