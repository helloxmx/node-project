
//商品管理
import goodsList from '@/views/goodsManage/goodManage/goodsList'//商品列表
import goodDetail from '@/views/goodsManage/goodManage/goodDetail'//商品详情
//添加商品
import addGood from '@/views/goodsManage/goodManage/addGood'// 添加商品
//婚宴管理
import banquetHallList from '@/views/goodsManage/wedBanquetManage/banquetHallList'//婚宴厅列表
import banquetDetail from '@/views/goodsManage/wedBanquetManage/banquetDetail'//婚宴厅详情
import cookList from '@/views/goodsManage/wedBanquetManage/cookList'//菜单列表
import cookDetail from '@/views/goodsManage/wedBanquetManage/cookDetail'//菜单列表
import addCook from '@/views/goodsManage/wedBanquetManage/addCook'//菜单列表
//商品评价
import goodsRate from '@/views/goodsManage/goodsRate/goodsRate'//商品评价
import goodRateDetail from '@/views/goodsManage/goodsRate/goodRateDetail'//商品评价详情
import test from '@/views/publishArticles'//商品评价详情

let res = [
    {// 婚街-商品列表
        path: '/index/test',
        name: 'test',
        component: test,
        meta: {
            title: '商品列表'
        }
    },
    {// 婚街-商品列表
        path: '/index/goodsList',
        name: 'goodsList',
        component: goodsList,
        meta: {
            title: '商品列表'
        }
    },
    {// 婚街-商品详情
        path: '/index/goodDetail',
        name: 'goodDetail',
        component: goodDetail,
        meta: {
            title: '商品详情'
        }
    },
    {// 婚街-婚宴厅列表
        path: '/index/banquetHallList',
        name: 'banquetHallList',
        component: banquetHallList,
        meta: {
            title: '婚宴厅列表'
        }
    },
    {// 婚街-婚宴厅详情
        path: '/index/banquetDetail',
        name: 'banquetDetail',
        component: banquetDetail,
        meta: {
            title: '婚宴厅详情'
        }
    },
    {// 婚街-添加商品
        path: '/index/addGood',
        name: 'addGood',
        component: addGood,
        meta: {
            title: '添加商品'
        }
    },
    {// 婚街-菜单列表
        path: '/index/cookList',
        name: 'cookList',
        component: cookList,
        meta: {
            title: 'cookList'
        }
    },
    {// 婚街-菜单详情
        path: '/index/cookDetail',
        name: 'cookDetail',
        component: cookDetail,
        meta: {
            title: 'cookDetail'
        }
    },
    {// 婚街-添加菜单
        path: '/index/addCook',
        name: 'addCook',
        component: addCook,
        meta: {
            title: 'addCook'
        }
    },
    {// 婚街-商品评价
        path: '/index/goodsRate',
        name: 'goodsRate',
        component: goodsRate,
        meta: {
            title: '商品评价'
        }
    },
    {// 婚街-商品评价
        path: '/index/goodRateDetail',
        name: 'goodRateDetail',
        component: goodRateDetail,
        meta: {
            title: '商品评价详情'
        }
    }

]

export default res