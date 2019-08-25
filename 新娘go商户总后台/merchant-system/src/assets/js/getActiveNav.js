function fucFn(str1,str2){
    let s = str1.indexOf(str2);

    if (s < 0){
        return false
    } else {
        return true
    }
}

function getActiveNav(href,type){
    let keys = href.split('/index/')[1];
    let key = '';

    if (fucFn(keys,'?')){
        key = keys.match(/(\S*)\?/)[1];
    } else {
        key = keys;
    }
    let navConfig = {};
    let navConfig1 = {
        'systemHome':'1-1',
        'systemSet':'1-2',
        'goodsList':'2-1',
        'addGood':'2-1',
        'goodDetail':'2-1',
        'goodsRate':'2-2',
        'goodRateDetail':'2-2',
        'caseList':'3-1',
        'caseDetail':'3-1',
        'orderList':'4-1',
        'compositeStatistics':'5-1',
        'withdraw':'5-2'
    };
    let navConfig2 = {
        'systemHome':'1-1',
        'systemSet':'1-2',
        'goodsList':'2-1',
        'addGood':'2-1',
        'goodDetail':'2-1',
        'cookList':'2-2',
        'cookDetail':'2-2',
        'addCook':'2-2',
        'goodsRate':'2-3',
        'goodRateDetail':'2-3',
        'caseList':'3-1',
        'caseDetail':'3-1',
        'orderList':'4-1',
        'compositeStatistics':'5-1',
        'withdraw':'5-2'
    };
    let navConfig3 = {
        'systemHome':'1-1',
        'systemSet':'1-2',
        'goodsList':'2-1',
        'addGood':'2-1',
        'goodDetail':'2-1',
        'goodsRate':'2-2',
        'goodRateDetail':'2-2',
        'orderList':'3-1',
        'compositeStatistics':'4-1',
        'withdraw':'4-2'
    };

    // <!-- 0——婚礼策划 1——婚宴预订 2——婚礼摄影 3——婚礼摄像 4——婚礼造型 5——婚礼主持 6——环球旅拍 -->
    switch (type){
    case '0': case 0: case '2': case 2: case '3': case 3: case '4': case 4: case '5': case 5://婚礼策划 2——婚礼摄影 3——婚礼摄像 4——婚礼造型 5——婚礼主持
        navConfig = navConfig1;
        break;
    case '1':case 1:
        navConfig = navConfig2;
        break;
    case '6':case 6:
        navConfig = navConfig3;
        break;
    default:

        break;
    }

    return navConfig[key]
}
export default getActiveNav;