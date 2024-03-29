/**
 * Created by egoyau on 2018/1/14.
 */

// 0：本地， 1：测试环境， 2：生产环境
let environment = 2

let baseUrl = () => {
    switch (environment) {
    case 0:
        return 'http://116.62.22.57:8001/'
    case 1:
        return 'http://116.62.22.57:8001/'
    case 2:
        return 'http://api.bridegoing.com/'
    default:
        break
    }
}

let sessionInvalidToUrl = () => {
    switch (environment) {
    case 0:
        return 'http://192.168.50.74:8083/#/'
    case 1:
        return 'http://116.62.22.57:8999/#/'
    case 2:
        return 'http://bridegoing.com:8888/#/'
    default:
        break
    }
}

let jsOc = () => {
    switch (environment) {
    case 0:
        return 'http://192.168.50.74:8083/#/'
    case 1:
        return 'http://116.62.22.57:8999/#/'
    case 2:
        return 'http://bridegoing.com:8888/#/'
    default:
        break
    }
}

export default {
    environment: environment,
    baseUrl: baseUrl,
    sessionInvalidToUrl: sessionInvalidToUrl,
    jsOc: jsOc
}
