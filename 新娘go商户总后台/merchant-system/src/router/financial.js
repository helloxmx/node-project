// 财务
import compositeStatistics from '@/views/financialManage/compositeStatistics'//综合统计
import withdraw from '@/views/financialManage/withdraw'//提现列表
let res = [
    {
        path: '/index/compositeStatistics',
        name: 'compositeStatistics',
        component: compositeStatistics,
        meta: {
            title: '综合统计'
        }
    },
    {
        path: '/index/withdraw',
        name: 'withdraw',
        component: withdraw,
        meta: {
            title: '提现列表'
        }
    }
]

export default res