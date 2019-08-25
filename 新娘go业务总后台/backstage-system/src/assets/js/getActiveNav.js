let navConfig = {
    'systemHome':'1-1',
    'systemSet':'1-2',
    'storeList':'2-1',//商户列表
    'addStore':'2-1',//添加商户
    'storeDetail':'2-1',//商户详情
    'storeInfo':'2-1',//商户简介
    'editInfo':'2-1',//编辑资料
    'caseList':'2-2',//案例列表
    'caseDetail':'2-2',//案例详情
    'caseEditInfo':'2-2',//编辑案例
    'goodsList':'2-3',//商品列表
    'goodDetail':'2-3',//商品详情
    'banquetHallList':'2-4',//婚宴厅列表
    'banquetDetail':'2-4',//婚宴厅详情
    'cookList':'2-5',//菜单列表
    'cookDetail':'2-5',//菜单详情
    'goodsRate':'2-6',//商品评价
    'goodRateDetail':'2-6',//商品评价详情
    'applyList':'2-7',
    'orderList':'3-1',//订单列表
    'orderDetail':'3-1',//订单详情
    'orderCancle':'3-1',//取消订单
    'refundApplyList':'3-2',//退款订单列表
    'refundDetail':'3-2',//退款订单详情
    'userList':'4-1',//用户列表
    'userDetail':'4-1',//用户详情
    'userEditInfo':'4-1',//编辑资料
    'goldCoinList':'4-2',//金币查询
    'goldCoinDetail':'4-2',//金币
    'taskRewardSet':'4-3',//任务奖励设置
    'moreRuleSet':'4-4',//更多规则设置
    // 'appPushMessage':'5-1',
    'appPushMessage':'5-2',
    'bannerSet':'5-3',
    'inviteFriendList':'5-4',
    'inviteUserList':'5-5',
    'infoList':'6-1',//文章列表
    'infoDetail':'6-1',//文章详情
    'publishArticles':'6-2',
    'newSayList':'6-3',//新人说列表
    'newSayDetail':'6-3',//新人说详情
    'transactionStatistics':'7-1',
    'commodityStatistics':'7-2',
    'membershipStatistics':'7-3',
    'searchStatistics':'7-4',
    'balanceList':'8-1',
    'balanceDetail':'8-1',
    'withdrawList':'8-2',
    'withdrawDetail':'8-2',
    'messageRemind':'9-1',
    'departmentList':'10-1',
    'memberList':'10-2'
};

function fucFn(str1,str2){
    let s = str1.indexOf(str2);

    if (s < 0){
        return false
    } else {
        return true
    }
}
function getActiveNav(href){
    let keys = href.split('/index/')[1];
    let key = '';

    if (fucFn(keys,'?')){
        key = keys.match(/(\S*)\?/)[1];
    } else {
        key = keys;
    }

    return navConfig[key]
}
export default getActiveNav;