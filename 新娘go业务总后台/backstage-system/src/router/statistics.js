// 统计分析
import transactionStatistics from '@/views/statistics/transaction'//交易统计
import commodityStatistics from '@/views/statistics/commodity'//商品统计
import membershipStatistics from '@/views/statistics/membership'//会员统计
import searchStatistics from '@/views/statistics/search'//搜索统计
let res = [
    {
        path: '/index/transactionStatistics',
        name: 'transactionStatistics',
        component: transactionStatistics,
        meta: {
            title: '交易统计'
        }
    },
    {
        path: '/index/commodityStatistics',
        name: 'commodityStatistics',
        component: commodityStatistics,
        meta: {
            title: '商品统计'
        }
    },{
        path: '/index/membershipStatistics',
        name: 'membershipStatistics',
        component: membershipStatistics,
        meta: {
            title: '会员统计'
        }
    },
    {
        path: '/index/searchStatistics',
        name: 'searchStatistics',
        component: searchStatistics,
        meta: {
            title: '搜索统计'
        }
    }
]

export default res