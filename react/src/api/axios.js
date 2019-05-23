import axios from 'axios';
import { toast } from 'js/utils'
const debug = process.env.NODE_ENV === 'production'
axios.interceptors.request.use(config => {
    try {
        let token = localStorage.getItem('token')
        // if (token) {
        //     if (!debug) {
        //         config.url = '/api' + config.url
        //     }
        //     config.headers.Authorization = token
        // } else {
        //     window.location.href = '/#/login'
        // }
        if (!debug) {
            config.url = '/api' + config.url
        }
        if (token) {
            config.headers.Authorization = token
        } else {
            // window.location.href = '/#/login'
        }
        return config;
    } catch (error) {
        window.location.href = '/#/login'
    }
}, (error) => {
    return Promise.reject(error);
});

axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response) {
            if (error.response.status == 401) {
                window.location.href = '/#/login'
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    })


// 默认请求成功状态
export default (url, type = 'post') => {
    // 返回axios
    return params => {
        return axios[type](url, params).then(res => {
            const { status, data } = res;
            // 正确状态处理
            if (status == 200 && data.code == 10000) {
                return data;
            } else if (data.code == 20001) {  // token过期或者未登录
                window.location.href = '/#/login'
            } else if (data.code == 10002) {    // 接口其他提示信息
                toast(data.msg)
                return data
            }
            // 错误物理请求处理
        }).catch(err => {
            toast('服务器超时')
            return Promise.reject(err)   // 返回接口返回的错误信息
        })
    }
}
