//文章列表
import infoList from '@/views/infoManage/infoList'//文章列表
import infoDetail from '@/views/infoManage/infoDetail'//文章详情
//发布文章
import publishArticles from '@/views/publishArticles'//发布资讯文章
//新人说
import newSayList from '@/views/infoManage/newSayList'//新人说列表
import newSayDetail from '@/views/infoManage/newSayDetail'//新人说详情

let res = [
    {
        path: '/index/infoList',
        name: 'infoList',
        component: infoList,
        meta: {
            title: '资讯列表'
        }
    },
    {
        path: '/index/publishArticles',
        name: 'publishArticles',
        component: publishArticles,
        meta: {
            title: '发布资讯'
        }
    },
    {// 查看资讯详情
        path: '/index/infoDetail',
        name: 'infoDetail',
        component: infoDetail,
        meta: {
            title: '资讯详情'
        }
    },
    {// 查看资讯详情
        path: '/index/newSayList',
        name: 'newSayList',
        component: newSayList,
        meta: {
            title: '新人说列表'
        }
    },
    {// 查看资讯详情
        path: '/index/newSayDetail',
        name: 'newSayDetail',
        component: newSayDetail,
        meta: {
            title: '新人说详情'
        }
    }
]

export default res