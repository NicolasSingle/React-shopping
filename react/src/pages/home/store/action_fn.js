import * as types from './action_types'
import Api from 'api/api'
import store from '@/store'
const _recommend = data => ({
    type: types.HOME_RECOMMEND,
    data
})

export const getRecommend = () => {
    const state = store.getState()
    const data = state.getIn(['home', 'recommend'])
    return async dispatch => {
        if (!data.size) {    //  判断如果已经有数据了就不去请求接口了
            const data = await Api.recommend()
            if (data.code == 10000) {
                dispatch(_recommend(data.data))
            }
        } else {
            dispatch(_recommend(data))
        }
    }
}