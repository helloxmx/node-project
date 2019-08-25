/**
 * Created by egoyau on 2018/1/9.
 */
import axios from 'axios'
import qs from 'qs'
import baseConfig from '../config/baseConfig'

axios.defaults.timeout = 60000
axios.defaults.withCredentials = true
axios.defaults.baseURL = baseConfig.baseUrl()

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    config.headers = {
        'Accept': 'application/json, text/javascript, */*; q=0.01'
    // 'Content-Type': 'application/json;charset=UTF-8'
    }
    if (config.method === 'post') {
        config.headers = {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Content-Type': 'application/json;charset=UTF-8'
        }
        // 序列化
        config.data = JSON.stringify(config.data)
    // config.data = qs.stringify(config.data);
    // config.data = JSON.parse(config.data);
    } else {
        config.headers = {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    }
    return config
}, (error) => {
    // debugLog('Http error ------ ' + error.stack);
    return Promise.reject(error)
})

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
    // 对响应数据做些事
    // let code = res.data.responseCode;
    let code = res.data.code

    // 获取数据流
    if (!code) {
        if (res.data.length) {
            return Promise.resolve(res)
        } else {
            return Promise.reject(res)
        }
    } else {
    // 通用请求
        switch (code) {
        // case '100000':
        case '200':
        // return res;
            return Promise.resolve(res)
        case '680001':
            window.top.location.href = baseConfig.sessionInvalidToUrl()
            return Promise.reject(res)
        //token失效的时候重新登录
        case '745':
            window.location.href = baseConfig.sessionInvalidToUrl();
            localStorage.clear();
            return Promise.reject(res.data)
        default:
            return Promise.reject(res.data)
        }
    }
}, (error) => {
    let data = {
        data: {
            responseCode: error.response.status, //
            message: '网络异常，请稍后再试'
        }
    }

    // debugLog('Http error ------ ' + error.stack);
    return Promise.reject(data)
})

// 返回一个Promise(发送get请求)
export function get (url, params) {

    return new Promise((resolve, reject) => {
        axios.get(url, params)
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

// 返回一个Promise(发送post请求)
export function post (url, params) {

    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
