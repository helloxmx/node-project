// 运营
import appPushMessage from '@/views/operateManage/appPushMessage'//app推送消息列表
//banner配置
import bannerSet from '@/views/operateManage/bannerSet'//banner配置
//其他查询
import inviteFriendList from '@/views/operateManage/inviteFriendList'//邀请好友
import inviteUserList from '@/views/operateManage/inviteUserList'//邀请用户

let res = [
    {
        path: '/index/appPushMessage',
        name: 'appPushMessage',
        component: appPushMessage,
        meta: {
            title: 'APP推送消息'
        }
    },
    {
        path: '/index/bannerSet',
        name: 'bannerSet',
        component: bannerSet,
        meta: {
            title: 'Banner配置'
        }
    },{
        path: '/index/inviteFriendList',
        name: 'inviteFriendList',
        component: inviteFriendList,
        meta: {
            title: '邀请好友记录'
        }
    },
    {
        path: '/index/inviteUserList',
        name: 'inviteUserList',
        component: inviteUserList,
        meta: {
            title: '邀请用户记录'
        }
    }
]

export default res