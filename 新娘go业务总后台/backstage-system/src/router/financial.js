// 对账列表
import balanceList from '@/views/financialManage/balance/balanceList'//对账列表
import balanceDetail from '@/views/financialManage/balance/balanceDetail'//对账详情
//提现列表
import withdrawList from '@/views/financialManage/withdraw/withdrawList'//提现列表
import withdrawDetail from '@/views/financialManage/withdraw/withdrawDetail'
let res = [
    {
        path: '/index/balanceList',
        name: 'balanceList',
        component: balanceList,
        meta: {
            title: '对账列表'
        }
    },
    {
        path: '/index/balanceDetail',
        name: 'balanceDetail',
        component: balanceDetail,
        meta: {
            title: '对账详情'
        }
    },
    {
        path: '/index/withdrawList',
        name: 'withdrawList',
        component: withdrawList,
        meta: {
            title: '提现列表'
        }
    },{
        path: '/index/withdrawDetail',
        name: 'withdrawDetail',
        component: withdrawDetail,
        meta: {
            title: '提现详情'
        }
    }
]

export default res