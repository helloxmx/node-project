import * as types from './mutation-types.js'

// 存数据
export default {
    [types.STORE_TK] (state,params) { //储存token
        localStorage.setItem('tk', params);
        state.tk = params
    },
    [types.STORE_USERNAME] (state,params) { ////储存用户名称
        localStorage.setItem('userName', params);
        state.userName = params
    },
    [types.STORE_USERAVATOR] (state,params) { ////储存用户头像
        localStorage.setItem('userAvator', params);
        state.userAvator = params
    },
    [types.CHANGE_TITLE] (state,params) { //改变页面名称
        localStorage.setItem('headerTitle', params);
        state.headerTitle = params
    },
    [types.CHANGE_CHILDTITLE] (state,params) { //改变页面名称
        localStorage.setItem('headerChildTitle', params);
        state.headerChildTitle = params
    },
    [types.CHANGE_PINDEX] (state,params) { //一级菜单
        localStorage.setItem('pindex', params);
        state.pindex = params
    },
    [types.CHANGE_CINDEX] (state,params) { //二级菜单
        localStorage.setItem('cindex', params);
        state.cindex = params
    },
    [types.CHANGE_SINDEX] (state,params) { //三级菜单
        localStorage.setItem('sindex', params);
        state.sindex = params
    },
    [types.STORE_EDITOR_CONTENT] (state,params) { //富文本编辑器内容
        state.editorContent = params
    },
    [types.LOGO_LINK] (state,params) { //添加商户-上传logo地址
        state.logoAddress = params
    },
    [types.LICENSE_LINK] (state,params) { //添加商户-上传营业执照地址
        state.licenseAddress = params
    },
    [types.COVER_LINK] (state,params) { //添加商户-上传封面地址
        state.coverAddress = params
    }
}

