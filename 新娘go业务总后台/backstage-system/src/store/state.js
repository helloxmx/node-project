const state = { // 初始化数据
    tk:localStorage.getItem('tk') || '',//登录的tk
    userName:localStorage.getItem('userName') || '',//登录的用户名称
    userAvator:localStorage.getItem('userAvator') || '',//登录的用户头像
    headerTitle: localStorage.getItem('headerTitle') || '资讯列表',
    headerChildTitle: localStorage.getItem('headerChildTitle') || '资讯列表',
    myInfo: JSON.parse(localStorage.getItem('myInfo')) || {}, //这里使用JSON.parse是因为我localStorage中保存的是一个对象字符串
    pindex: localStorage.getItem('pindex') || 0,//一级菜单
    cindex: localStorage.getItem('cindex') || 0,//二级菜单
    sindex: localStorage.getItem('sindex') || 0,//三级菜单
    editorContent:'',//富文本编辑器内容
    logoAddress:{},//添加商户-上传logo地址
    licenseAddress:{},//添加商户-上传营业执照地址
    coverAddress:{}//添加商户-上传封面地址
}

export default state
