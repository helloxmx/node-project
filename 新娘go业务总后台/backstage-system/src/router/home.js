// 首页
import systemHome from '@/views/home/systemHome'//系统首页
import systemSet from '@/views/home/systemSet'//账户设置
//登录日志
import loginLog from '@/views/loginLog'//登录日志

import test from '@/components/common/test'//测试组件

let res = [
    {
        path: '/index/systemHome',
        name: 'systemHome',
        component: systemHome,
        meta: {
            title: '系统首页'
        }
    },
    {
        path: '/index/systemSet',
        name: 'systemSet',
        component: systemSet,
        meta: {
            title: '账户设置'
        }
    },
    {// 婚街-商户详情-编辑资料
        path: '/index/loginLog',
        name: 'loginLog',
        component: loginLog,
        meta: {
            title: '日志'
        }
    },
    {
        path: '/index/test',
        name: 'test',
        component: test,
        meta: {
            title: '测试组件'
        }
    }
]

export default res