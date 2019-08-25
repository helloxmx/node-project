// 订单
import orderList from '@/views/orderManage/orderList'//订单列表
import orderDetail from '@/views/orderManage/orderDetail'//订单详情
import orderCancle from '@/views/orderManage/orderCancle'//取消订单

import refundApplyList from '@/views/orderManage/refundApplyList'//退款申请列表
import refundDetail from '@/views/orderManage/refundDetail'//退款订单详情

let res = [
    {
        path: '/index/orderList',
        name: 'orderList',
        component: orderList,
        meta: {
            title: '订单列表'
        }
    },
    {
        path: '/index/orderDetail',
        name: 'orderDetail',
        component: orderDetail,
        meta: {
            title: '订单详情'
        }
    },
    {
        path: '/index/refundApplyList',
        name: 'refundApplyList',
        component: refundApplyList,
        meta: {
            title: '退款申请列表'
        }
    },
    {
        path: '/index/orderCancle',
        name: 'orderCancle',
        component: orderCancle,
        meta: {
            title: '取消订单'
        }
    },
    {
        path: '/index/refundDetail',
        name: 'refundDetail',
        component: refundDetail,
        meta: {
            title: '服务单信息'
        }
    }
]

export default res