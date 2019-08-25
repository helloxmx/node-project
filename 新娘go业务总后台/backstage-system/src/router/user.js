// 订单
import userList from '@/views/userManage/userList'//用户列表
import userDetail from '@/views/userManage/userDetail'//用户详情
import userEditInfo from '@/views/userManage/userEditInfo'//编辑资料
//用户金币系统
import goldCoinList from '@/views/userManage/goldCoinManage/goldCoinList'//金币查询
import goldCoinDetail from '@/views/userManage/goldCoinManage/goldCoinDetail'//金币详情
//任务奖励设置
import taskRewardSet from '@/views/userManage/goldCoinManage/taskRewardSet'//任务奖励设置
//更多规则设置
import moreRuleSet from '@/views/userManage/goldCoinManage/moreRuleSet'//更多规则设置


let res = [
    {
        path: '/index/userList',
        name: 'userList',
        component: userList,
        meta: {
            title: '用户列表'
        }
    },
    {
        path: '/index/userDetail',
        name: 'userDetail',
        component: userDetail,
        meta: {
            title: '用户详情'
        }
    },
    {
        path: '/index/goldCoinList',
        name: 'goldCoinList',
        component: goldCoinList,
        meta: {
            title: '金币查询'
        }
    },
    {
        path: '/index/goldCoinDetail',
        name: 'goldCoinDetail',
        component: goldCoinDetail,
        meta: {
            title: '金币详情'
        }
    },
    {
        path: '/index/taskRewardSet',
        name: 'taskRewardSet',
        component: taskRewardSet,
        meta: {
            title: '奖励任务设置'
        }
    },
    {
        path: '/index/moreRuleSet',
        name: 'moreRuleSet',
        component: moreRuleSet,
        meta: {
            title: '更多规则设置'
        }
    },
    {
        path: '/index/userEditInfo',
        name: 'userEditInfo',
        component: userEditInfo,
        meta: {
            title: '编辑资料'
        }
    }
]

export default res