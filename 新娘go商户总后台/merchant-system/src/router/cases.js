
//案例管理
import caseList from '@/views/caseManage/caseList'//案例列表
import caseDetail from '@/views/caseManage/caseDetail'//案例详情
import addCase from '@/views/caseManage/addCase'//编辑案例

let res = [
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
        path: '/index/addCase',
        name: 'addCase',
        component: addCase,
        meta: {
            title: '案例列表'
        }
    }
]

export default res