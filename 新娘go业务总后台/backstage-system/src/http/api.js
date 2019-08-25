/**
 * Created by egoyau on 2018/1/9.
 */
import {get, post} from './httpConfig'

// let pageSize = 15,
//     pageNum = 1;


export default {
    /** **********************  通用  /************************/
    // packageParams(params){
    //     params = params || {};
    //     let size = params.pageSize ? params.pageSize : pageSize,
    //         num = params.pageNum ? params.pageNum : pageNum;
    //     params = {...params,pageSize:size, pageNum:num};
    //     return params
    // },
    // 后台登陆
    login (params) {
        return post('/user/webLogin', params)
    },
    // 图片上传到七牛云需要token值，从后台获取token
    getToken () {
        return get('/qiniu/generateUploadKey')
    },
    getUserLoginLog(params){
        return post('/user/loginLog', params)
    },
    //后台菜单列表
    getAuthOrgMenus(params){
        return post('/user/dynamicMenu', params)
    },
    getArticleComment(params){
        return post('/article/comment', params)
    },
    // 获取省
    getRegionH5List(params){
        return post('/region/h5list', params)
    },
    //删除或者隐藏评论
    opreateComment(params){
        return post('/comment/uComment', params)
    },
    /** **********************  首页  /************************/
    //首页数据
    getOrderBackIndex(params){
        return post('/order/backIndex', params)
    },
    //修改账户密码
    getUserModifyPwd(params){
        return post('/user/modifyPwd', params)
    },
    //获取首页统计表数据
    getOrderListStastics(params){
        return post('/order/orderListStastics', params)
    },
    /** **********************  婚街管理  /************************/
    /** ******  通用  /*****/
    // 类型
    getTypeList(params){
        return post('/commodity/type', params)
    },
    /** ******  商户管理  /*****/
    //商户列表
    getStoreList(params){
        return post('/store/list', params)
    },
    //商户批量操作
    getStoreUpdateBatch(params){
        return post('/store/updateBatch', params)
    },
    //修改商户简要信息
    getStoreUStore(params){
        return post('/store/uStore', params)
    },
    //商户详情
    getStoreDetail(params){
        return post('/store/detail', params)
    },
    //商户简介
    getStoreSummary(params){
        return post('/store/summary', params)
    },
    //创建商户
    getStoreGenerate(params){
        return post('/store/generate', params)
    },
    //导出商户
    getReportStore(params){
        return post('/report/store', params)
    },
    /** ******  订单管理  /*****/
    //订单列表
    getOrderList(params){
        return post('/order/orderList', params)
    },
    //订单统计
    getBackOrderStaticsNum(params){
        return post('/order/backOrderStaticsNum', params)
    },
    // 订单详情
    getOrderDetail(params){
        return post('/order/orderDetail', params)
    },
    //关闭订单
    orderClose(params){
        return post('/order/orderClose', params)
    },
    //取消订单
    orderCancle(params){
        return post('/order/orderCancel', params)
    },
    //备注订单
    orderRemark(params){
        return post('/order/orderRemark', params)
    },
    //批量操作-0 关闭订单 1删除订单
    orderBackBatchOperation(params){
        return post('/order/backBatchOperation', params)
    },
    //申请退款列表
    orderRefundList(params){
        return post('/order/refundList', params)
    },
    //申请退款详情
    orderRefundDetail(params){
        return post('/order/refundDetail', params)
    },
    //处理退款（确认或者拒绝）
    orderDealRefund(params){
        return post('/order/dealRefund', params)
    },
    /** ******  用户管理  /*****/
    //用户列表
    userBackUserList(params){
        return post('/user/backUserList', params)
    },
    //用户详情
    userBackUserDetail(params){
        return post('/user/backUserDetail', params)
    },
    //修改用户简要信息
    getUserUserSummary(params){
        return post('/user/userSummary', params)
    },
    //用户金币列表
    userBackUserCoinList(params){
        return post('/user/backUserCoinList', params)
    },
    //用户金币详情
    userCoinDetail(params){
        return post('/user/coinDetail', params)
    },
    //更多规则设置
    userCoinReasonExt(params){
        return post('/user/coinReasonExt', params)
    },
    /** ******  运营管理  /*****/
    //消息列表
    getMessageList(params){
        return post('/message/list', params)
    },
    //banner设置列表
    getBannerList(params){
        return post('/banner/backList', params)
    },
    //邀请的好友列表
    getUserInviteByUser(params){
        return post('/user/inviteByUser', params)
    },
    //商户邀请的用户列表
    getUserInviteByStore(params){
        return post('/user/inviteByStore', params)
    },
    /** ******  案例管理  /*****/
    //案例列表
    getStoreWorkBackList(params){
        return post('/storeWork/backList', params)
    },
    //案例详情
    getStoreWorkDetail(params){
        return post('/storeWork/detail', params)
    },
    //删除案例
    storeDeleteWork(params){
        return post('/store/deleteWork', params)
    },
    /** ******  商品管理  /*****/
    //商品列表
    getStoreCommodities(params){
        return post('/store/commodities', params)
    },
    //商品详情
    getCommodityDetail(params){
        return post('/commodity/commodityDetail', params)
    },
    //更新商品信息
    getStoreUpdateCommodities(params){
        return post('/store/updateCommodity', params)
    },
    //获取档期信息
    commodityStocks(params){
        return post('/commodity/stocks', params)
    },
    /** ******  婚宴管理  /*****/
    //婚宴厅列表
    getCommodityStoreCommodities(params){
        return post('/commodity/storeCommodities', params)
    },
    //婚宴厅详情
    getCommodityHotelDetail(params){
        return post('/commodity/hotelDetail', params)
    },
    //婚宴厅档期
    getCommodityStocks(params){
        return post('/commodity/stocks', params)
    },
    //菜单列表
    getCbookStoreBackList(params){
        return post('/cbook/backList', params)
    },
    //菜单详情
    getCbookGroupDetail(params){
        return post('/cbook/groupDetail', params)
    },
    //宴会菜单批量处理
    cbookGroupBatchOperation(params){
        return post('/cbook/groupBatchOperation', params)
    },
    /** ******  商户入驻  /*****/
    //申请列表
    getStoreJoinList(params){
        return post('/store/waitJoinList', params)
    },
    /** ******  评价管理  /*****/
    //评价列表
    getCommentCommodity(params){
        return post('/comment/commodity', params)
    },
    //评价的批量操作
    getCommentBatchOperation(params){
        return post('/comment/batchOperation', params)
    },
    //评价详情
    getCommentBackDetail(params){
        return post('/comment/backDetail', params)
    },
    /** **********************  内容 资讯列表  /************************/
    //资讯文章类型列表数据
    getArticleTypeList (params){
        return post('/article/typeList', params)
    },
    //资讯列表数据
    getArticleLists (params){
        return post('/article/lists', params)
    },
    //资讯文章详情数据
    getArticleDetail (params){
        return post('/article/detailAll', params)
    },
    //资讯文章详情数据
    articleSetArticle (params){
        return post('/article/setArticle', params)
    },
    // 新人说 说说类型下拉列表
    getNewSayTypeList(params){
        return post('/newSay/typeList', params)
    },
    //新人说列表
    getNewSayList (params){
        return post('/newSay/list', params)
    },
    //新人说隐藏推荐或者删除
    getNewSayDetail (params){
        return post('/newSay/detail', params)
    },
    //新人说详情
    getNewSayBatch (params){
        return post('/newSay/batch', params)
    },
    /** ***  发布资讯  /*********/
    //发布资讯页面查询商品
    searchCommodity (params){
        return post('/commodity/searchCommodity', params)
    },
    // 编辑好文章之后提交
    articleInsert (params) {
        return post('/article/insert', params)
    },
    /** **********************  财务管理  /************************/
    // 对账列表
    getOrderBackCheckOrder (params) {
        return post('/order/backCheckOrder', params)
    },
    // //对账详情
    orderCheckOrderDetail (params) {
        return post('/order/checkOrderDetail', params)
    },
    //批量对账
    orderBatchCheckOrder (params) {
        return post('/order/batchCheckOrder', params)
    },
    //提现列表
    getWithdrawListAdmin (params) {
        return post('/withdraw/listAdmin', params)
    },
    //提现详情
    getWithdrawDetail (params) {
        return post('/withdraw/withDrawDetail', params)
    },
    //审核金额
    getWithdrawCheck (params) {
        return post('/withdraw/check', params)
    },
    //审核之后是否允许提现
    getWithdrawDoWithDraw (params) {
        return post('/withdraw/doWithDraw', params)
    },
    /** **********************  权限管理  /************************/
    //部门列表
    getAuthList (params) {
        return post('/auth/list', params)
    },
    //新增或者更新部门
    upDateAuthIOrg (params) {
        return post('/auth/iOrg', params)
    },
    //用户列表
    getAuthUserList (params) {
        return post('/auth/userList', params)
    },
    //新增或者更新用户
    upDateAuthIUser (params) {
        return post('/auth/iUser', params)
    },
    //获取部门列表
    getAuthOrgList(params) {
        return post('/auth/orgList', params)
    }
}
