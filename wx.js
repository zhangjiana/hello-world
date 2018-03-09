import store from '@/store'

import qs from 'qs'

import config from '../../config'

const baseURL = (process.env.NODE_ENV !== 'production' ? config.dev.httpUrl : config.build.httpUrl)

const ajax = {
    get(url, params) {
        return new Promise(function (resolve,reject,) {
            wx.request({
                url: baseURL + url,
                method: 'GET',
                data: params,
                header: {
                    'token': store.state.token,
                    'openid':store.state.openid
                },
                success(res) {
                    resolve(res)
                },
                fail(error) {
                    reject(error)
                }
            })
        })        
    },
    post(url, data) {
        return new Promise(function (resolve,reject,) {
            wx.request({
                url: baseURL + url, 
                method: 'POST',
                data: qs.stringify(data),
                header: {
                    'token': store.state.token,
                    'openid':store.state.openid
                },
                success(res) {
                    resolve(res)
                },
                fail(error) {
                    reject(error)
                }
            })
        })  
    },
    all(ajaxArray) {
        return new Promise.all(ajaxArray)
    }
}
