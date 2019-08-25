//婚街
// 商户管理
import storeList from '@/views/wedStreetManage/storeManage/storeList'
import addStore from '@/views/wedStreetManage/storeManage/addStore'//添加商户
import storeDetail from '@/views/wedStreetManage/storeManage/storeDetail'//商户详情三级路由
import storeInfo from '@/views/wedStreetManage/storeManage/storeInfo'//商户简介
import editInfo from '@/views/wedStreetManage/storeManage/editInfo'//编辑资料
//案例管理
import caseList from '@/views/wedStreetManage/caseManage/caseList'//案例列表
import caseDetail from '@/views/wedStreetManage/caseManage/caseDetail'//案例详情
import caseEditInfo from '@/views/wedStreetManage/caseManage/caseEditInfo'//编辑案例
//商品管理
import goodsList from '@/views/wedStreetManage/goodsManage/goodsList'//商品列表
import goodDetail from '@/views/wedStreetManage/goodsManage/goodDetail'//商品详情
//婚宴管理
import banquetHallList from '@/views/wedStreetManage/wedBanquetManage/banquetHallList'//婚宴厅列表
import banquetDetail from '@/views/wedStreetManage/wedBanquetManage/banquetDetail'//婚宴厅详情
import cookList from '@/views/wedStreetManage/wedBanquetManage/cookList'//菜单列表
import cookDetail from '@/views/wedStreetManage/wedBanquetManage/cookDetail'//菜单列表
//商品评价
import goodsRate from '@/views/wedStreetManage/goodsRate/goodsRate'//商品评价
import goodRateDetail from '@/views/wedStreetManage/goodsRate/goodRateDetail'//商品评价详情
//商户入驻
import applyList from '@/views/wedStreetManage/merchantEntry/applyList'//申请列表

let res = [
    {// 婚街-商户列表
        path: '/index/storeList',
        name: 'storeList',
        component: storeList,
        meta: {
            title: '商户列表'
        }
    },
    {// 婚街-添加商户
        path: '/index/addStore',
        name: 'addStore',
        component: addStore,
        meta: {
            title: '添加商户'
        }
    },
    {// 婚街-商户详情
        path: '/index/storeDetail',
        name: 'storeDetail',
        component: storeDetail,
        meta: {
            title: '商户详情'
        }
    },
    {// 婚街-商户详情-编辑资料
        path: '/index/editInfo',
        name: 'editInfo',
        component: editInfo,
        meta: {
            title: '编辑'
        }
    },
    {// 婚街-商户简介
        path: '/index/storeInfo',
        name: 'storeInfo',
        component: storeInfo,
        meta: {
            title: '商户简介'
        }
    },
    {// 婚街-案例列表
        path: '/index/caseList',
        name: 'caseList',
        component: caseList,
        meta: {
            title: '案例列表'
        }
    },
    {// 婚街-案例详情
        path: '/index/caseDetail',
        name: 'caseDetail',
        component: caseDetail,
        meta: {
            title: '案例列表'
        }
    },
    {// 婚街-编辑案例
        path: '/index/caseEditInfo',
        name: 'caseEditInfo',
        component: caseEditInfo,
        meta: {
            title: '案例列表'
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
    },
    {// 婚街-商户入驻-申请列表
        path: '/index/applyList',
        name: 'applyList',
        component: applyList,
        meta: {
            title: '申请列表'
        }
    }


]

export default res