import * as types from './action_types'
import Api from 'api/api'
import { toast } from 'js/utils'
const changeSignin = () => ({
    type: types.SIGNIN
})

const changeSegister = () => ({
    type: types.REGISTER
})

const changeRestorePassword = () => ({
    type: types.RESTORE_PASSWORD
})




const _login_fn = (data, that) => {
    toast(data.msg)
    localStorage.setItem('token', data.data)
    setTimeout(() => {
        that.props.history.push('/home');
    }, 1000);
}

// 登录方法
export const signin = (username, password, that) => {
    return async dispatch => {
        const data = await Api.login({
            username, password
        })
        if (data.code == 10000) {
            _login_fn(data, that)
        }
    }
}

// 注册
export const register = (state, that) => {
    return async dispatch => {
        const data = await Api.register(state)
        if (data.code == 10000) {
            _login_fn(data, that)
        }
    }
}

// 找回密码

export const restorePassword = (state, that) => {
    return async dispatch => {
        const data = await Api.restorePassword(state)
        if (data.code == 10000) {
            toast(data.msg)
            setTimeout(() => {
                that.props.history.push('/login/index');
            }, 1000);
        }
    }
}


