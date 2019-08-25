import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import index from '@/views/index'

import home from '@/router/home'//系统首页
import info from '@/router/info'//内容
import wedStreet from '@/router/wedStreet'//婚街
import order from '@/router/order'//订单
import user from '@/router/user'//用户
import operate from '@/router/operate'//运营
import financial from '@/router/financial'//财务
import statistics from '@/router/statistics'//统计
import set from '@/router/set'//设置
import right from '@/router/right'//权限

Vue.use(Router)
let children = wedStreet.concat(home).concat(operate).concat(set).concat(statistics).concat(order).concat(info).concat(user).concat(financial).concat(right);
let routes = [
    {
        path: '/',
        name: 'login',
        component: login,
        meta: {
            title: '登录'
        }
    },
    {//导航栏页面
        path: '/index',
        name: 'index',
        component: index,
        meta: {
            title: '首页'
        },
        redirect:'/index/systemHome',
        children: children
    }
]

let router = new Router({routes : routes})

export default router;
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})