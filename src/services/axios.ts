import axios from 'axios'
// import jsCookie from 'js-cookie'
// import { message } from 'ant-design-vue'
// import Vue from 'vue'
// eslint-disable-next-line @typescript-eslint/no-var-requires

const instance = axios.create()

// 配置请求地址，允许携带cookie
instance.defaults.withCredentials = true
instance.defaults.baseURL = feConfig.baseServerUrl
instance.interceptors.request.use(config => {
    return config
})
instance.interceptors.response.use(
    response => {
        // if (response.data && response.data.code === 2) {
        //     jsCookie.remove(feConfig.cookieInfo, { Domain: feConfig.domain })
        //     jsCookie.remove(feConfig.cookieId, { Domain: feConfig.domain })
        //     setTimeout(function () {
        //         if (window) {
        //             window.location.href = feConfig.qxLoginUrl
        //         }
        //     }, 2000)
        // }
        // if (!(response.config as any).noAutoErrorTip) {
        //     const msgObj = {
        //         1: '接口异常：' + response.data.msg,
        //         3: response.data.msg || '参数异常！',
        //         4: response.data.msg || '服务异常！',
        //         5: response.data.msg || '数据校验错误'
        //     }
        //     if (msgObj[response.data.code]) {
        //         message.warning(msgObj[response.data.code])
        //     }
        // }
        // return response.data
        return response

    },
    err => {
        const response = err.response
        if (response && !response.config.noAutoErrorTip) {
            // message.error('服务异常！')
            console.error('服务异常！')
        }
        return Promise.resolve({ code: 4, message: '服务异常！' })
    }
)

export default instance
