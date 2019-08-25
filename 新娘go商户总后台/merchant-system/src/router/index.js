import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import index from '@/views/index'
import home from '@/router/home'//系统首页
import goods from '@/router/goods'//商品管理
import cases from '@/router/cases'//婚街
import order from '@/router/order'//订单
import financial from '@/router/financial'//财务

Vue.use(Router)
let children = cases.concat(home).concat(goods).concat(order).concat(financial);
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