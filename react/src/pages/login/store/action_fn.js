
import Api from 'api/api'
import { toast } from 'js/utils'

const _login_fn = (data, that) => {
    toast(data.msg, data.code === 10002 ? 'error' : null)
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
        if (data.code === window.SUCCESS) {
            localStorage.setItem('username', that.state.username)
            _login_fn(data, that)
        } 
    }
}

// 注册
export const register = (state, that) => {
    
    return async dispatch => {
        const data = await Api.register(state)
        if (data.code === window.SUCCESS) {
            localStorage.setItem('username', state.username)
            _login_fn(data, that)
        }
    }
}

// 找回密码

export const restorePassword = (state, that) => {
    return async dispatch => {
        const data = await Api.restorePassword(state)
        if (data.code === window.SUCCESS) {
            toast(data.msg)
            setTimeout(() => {
                that.props.history.push('/login/index');
            }, 1000);
        }
    }
}


