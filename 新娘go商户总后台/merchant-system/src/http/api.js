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
        return post('/user/webStoreLogin', params)
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
    /** ******  评价管理  /*****/
    //评价列表
    getCommentCommodity(params){
        return post('/comment/storeCommodity', params)
    },
    //评价的批量操作
    getCommentBatchOperation(params){
        return post('/comment/batchOperation', params)
    },
    //评价详情
    getCommentBackDetail(params){
        return post('/comment/webStoreDetail', params)
    },
    /** ******  商品管理  /*****/
    //商品列表
    webStoreGetCommodityList(params){
        return post('/webStore/getCommodityList', params)
    },
    //商品分状态统计数据
    getCommodityComStatusStatistics(params){
        return post('/commodity/comStatusStatistics', params)
    },
    //商品详情
    getCommodityDetail(params){
        return post('/commodity/commodityDetail', params)
    },
    //新增或更新商品信息
    submitCommodityI(params){
        return post('/commodity/i', params)
    },
    //删除上架下架推荐不推荐
    commodityBatchOperation(params){
        return post('/commodity/batchOperation', params)
    },
    //更新档期信息
    commodityUpdateStocks(params){
        return post('/commodity/updateStocks', params)
    },
    //获取档期信息
    commodityStocks(params){
        return post('/commodity/stocks', params)
    },
    /** **********************  婚街管理  /************************/
    /** ******  通用  /*****/
    // 类型
    getTypeList(params){
        return post('/commodity/type', params)
    },
    /** **********************  首页  /************************/
    //首页数据
    getOrderBackIndex(params){
        return post('/order/storeUserStatics', params)
    },
    //修改账户密码
    getUserModifyPwd(params){
        return post('/user/modifyPwd', params)
    },
    //获取首页统计表数据
    getOrderListStastics(params){
        return post('/order/orderListStastics', params)
    },
    /** ******  商户管理  /*****/
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
        return post('/order/webList', params)
    },
    //订单统计
    getBackOrderStaticsNum(params){
        return post('/order/backOrderStaticsNum', params)
    },
    // 订单详情
    getOrderDetail(params){
        return post('/order/webOrderDetail', params)
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
    //订单处理
    orderDealOrder(params){
        return post('/order/dealOrder', params)
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
    /** ******  案例管理  /*****/
    //案例列表
    getStoreWorkBackList(params){
        return post('/storeWork/webList', params)
    },
    //添加案例
    storeWorkUpsert(params){
        return post('/storeWork/upsert', params)
    },
    //案例详情
    getStoreWorkDetail(params){
        return post('/storeWork/detail', params)
    },
    //批量删除案例
    storeDeleteWork(params){
        return post('/storeWork/batchOperation', params)
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
    //宴会菜单列表
    getCbookGroupList(params){
        return post('/cbook/groupList', params)
    },
    //宴会菜单详情
    getCbookGroupDetail(params){
        return post('/cbook/groupDetail', params)
    },
    //宴会菜单批量处理
    cbookGroupBatchOperation(params){
        return post('/cbook/groupBatchOperation', params)
    },
    //新增或者更新宴会菜单
    cbookUpsert(params){
        return post('/cbook/upsert', params)
    },
    /** **********************  财务管理  /************************/
    //提现
    getWithdrawStoreDetail (params) {
        return post('/withdraw/storeDetail', params)
    },
    //提现申请
    getWithdrawStoreWithZFBDraw (params) {
        return post('/withdraw/storeWithZFBDraw', params)
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
