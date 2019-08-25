const state = { // 初始化数据
    tk:localStorage.getItem('tk') || '',//登录的tk
    business:localStorage.getItem('business') || '',//商户类型
    userName:localStorage.getItem('userName') || '',//登录的用户名称
    userAvator:localStorage.getItem('userAvator') || '',//登录的用户头像
    headerTitle: localStorage.getItem('headerTitle') || '资讯列表',
    headerChildTitle: localStorage.getItem('headerChildTitle') || '资讯列表',
    editorContent:'',//富文本编辑器内容
    editorImgs:[],//富文本编辑器图片集合
    logoAddress:{},//添加商户-上传logo地址
    licenseAddress:{},//添加商户-上传营业执照地址
    coverAddress:{}//添加商户-上传封面地址
}

export default state
