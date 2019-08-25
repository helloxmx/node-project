import * as types from './mutation-types.js'

//储存token
export const storeTk = ({ commit },params) => {
    commit(types.STORE_TK,params)
}
//储存用户名称
export const storeUserName = ({ commit },params) => {
    commit(types.STORE_USERNAME,params)
}
//储存用户头像
export const storeUserAvator = ({ commit },params) => {
    commit(types.STORE_USERAVATOR,params)
}
//改变页面title
export const changeTitle = ({ commit },params) => {
    commit(types.CHANGE_TITLE,params)
}
//改变页面title
export const changeChildTitle = ({ commit },params) => {
    commit(types.CHANGE_CHILDTITLE,params)
}
//pindex
export const changePindex = ({ commit },params) => {
    commit(types.CHANGE_PINDEX,params)
}
//cindex
export const changeCindex = ({ commit },params) => {
    commit(types.CHANGE_CINDEX,params)
}
//sindex
export const changeSindex = ({ commit },params) => {
    commit(types.CHANGE_SINDEX,params)
}
//富文本编辑器内容
export const storeEditorContent = ({ commit },params) => {
    commit(types.STORE_EDITOR_CONTENT,params)
}
//添加商户-上传logo地址
export const logoLink = ({ commit },params) => {
    commit(types.LOGO_LINK,params)
}
//添加商户-上传营业执照地址
export const licenseLink = ({ commit },params) => {
    commit(types.LICENSE_LINK,params)
}
//添加商户-上传封面地址
export const coverLink = ({ commit },params) => {
    commit(types.COVER_LINK,params)
}

