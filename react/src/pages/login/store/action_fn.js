
import Api from 'api/api'
import { toast } from 'js/utils'
import * as types from './action_types'
import store from '@/store'

// 用户名和密码存入state
export const setInputVal = value => ({
    type: types.SET_INPUT_VAL,
    value
})

// 清空用户名
export const clearInputVal = (that, type2) => {
    if (type2 === 'restorePassword') {
        that.props.history.push('/login/index');
    } else {
        setTimeout(() => {
            that.props.history.push('/home');
        }, 1000);

    }
    return {
        type: types.CLEAR_INPUT_VAL,
    }
}


// 登录方法,注册和找回密码
export const signin = (that, type) => {
    const state = store.getState().get('login')
    return async dispatch => {
        const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        if (type === 'login') {
            if (!state.get('username') || !state.get('password')) {
                return toast('请填写用户名和密码', 'error')
            }
        } else if (type === 'register') {
            if (!state.get('username') || !state.get('password') || !state.get('email')) {
                return toast('请填写完整信息', 'error')
            }
            if (!reg.test(state.get('email'))) {
                return toast('邮箱格式错误', 'error')
            }
        } else {
            if (!state.get('password') || !state.get('email')) {
                return toast('请填写完整信息', 'error')
            }
            if (!reg.test(state.get('email'))) {
                return toast('邮箱格式错误', 'error')
            }
        }
        const page = type !== 'restorePassword' //false
        const data = await Api[type]({
            username: page ? state.get('username') : undefined,
            password: state.get('password'),
            email: type !== 'login' ? state.get('email') : undefined
        })
        if (data.code === window.SUCCESS) {
            localStorage.setItem('username', state.get('username'))
            // 登录成功，跳转页面
            dispatch(clearInputVal( that, !page ? 'restorePassword' : undefined))
        }
    }
}


