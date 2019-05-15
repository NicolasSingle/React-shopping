import axios from 'axios';
// import store from '../store/index'
// import router from '../router'
// import { loadings } from 'js/util'
// import { debug } from 'js/conf'
export const debug = process.env.NODE_ENV === 'production'
axios.interceptors.request.use((config) => {
    try {
        let token = (store.state.token && store.state.token.token) ? store.state.token.token : ''
        if (!config.url.includes('/index.php') && !config.url.includes('/p25.php')) {
            if (debug) {
                config.url = '/p20.php' + config.url
            } else {
                config.url = '/api' + config.url
            }
        }
        if (token) { 
            config.headers.token = token
            config.headers.role = 'Doctor'
            config.headers['Content-Type'] = 'application/json'
            if (config.data) {
                config.data.token = token;
            } else {
                config.data = { token: token };
            }
        }
        return config;
    } catch (error) {
        console.log(error);

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
                loadings('加载中', 1)
                store.dispatch('clearToken')
                store.dispatch('clearDoctor')
                router.currentRoute.path !== '/login' &&
                    router.replace({
                        path: '/login',
                    })

            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    })


// 默认请求成功状态
export default (url, type = 'post') => {
    // 返回axios
    return params => {
        return axios[type](url, params).then((res) => {
            const { status, data } = res;
            // 正确状态处理
            if (status == 200 && data.code == 10000) {

                return data;
            } else if (data.code == 20001 || data.code == 10002) {  // token过期
                if (data.msg == '请登录' || data.msg == '用户Token错误,或未登陆' || data.msg == '用户Token错误,或未登录') {
                    loadings('加载中', 1)
                    store.dispatch('clearToken')
                    store.dispatch('clearDoctor')
                    router.currentRoute.path !== '/login' &&
                        router.replace({
                            path: '/login',
                        })

                }
                return data;
            } else {
                return data
            }
            // 错误物理请求处理
        }).catch(err => {
            console.log(err);
        })
    }
}
