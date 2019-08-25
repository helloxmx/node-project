<template>
  <div class="content-index">
    <div class="menu-list-parent">
        <div class="list-logo">
            <img src="@/assets/img/icon/logoWhite.png" alt="">
            <div>商户后台管理系统</div>
        </div>
        <el-menu
        :default-active='activeNav'
        class="el-menu-vertical-demo"
        background-color="#000"
        text-color="#fff"
        active-text-color="#FF739E"
        unique-opened
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect">
            <el-submenu v-for="item in menuList" :key="item.id" :index="item.id">
                <template slot="title">
                    <img class="menu-icon" :src="item.menuIcon" alt="">
                    <span>{{item.name}}</span>
                </template>
                <el-menu-item-group v-for="itemIn in item.childBriefs" :key="itemIn.id">
                    <template slot="title">{{itemIn.type}}</template>
                    <el-menu-item v-for="itemInIn in itemIn.data" :key="itemInIn.id" :index="itemInIn.id">{{itemInIn.name}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
    <div class="content-container">
        <div class="parent-header">
           <div><header-title :isParent="true" :ptitle="headerTitle"></header-title></div>
        </div>
        <div class="content-box">
            <div class="router-container">
                <router-view/>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import headerTitle from '@/components/common/headerTitle';
import { mapState, mapGetters, mapActions } from 'vuex';
import getActiveNav from '@/assets/js/getActiveNav';
import api from '@/http/api';
export default {
    name: 'App',
    components:{
        headerTitle
    },
    data(){
        return {
            menuList:[],
            xid:'',
            activeNav:'1-1'
        }
    },
    computed:{
        ...mapGetters([
            'tk',
            'headerTitle',
            'business'//商家类型
        ])
    },
    mounted(){
        let ths = this;

        ths.activeNav = getActiveNav(window.location.href,ths.business) || '1-1';
        ths.xid = ths.$route.query.xid;
        ths.getAuthOrgMenus();
    },
    methods:{
        ...mapActions([
            'changeTitle',//跳转到页面
            'changeChildTitle'//跳转到子页面title
        ]),
        //后台菜单列表
        getAuthOrgMenus(){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.xid
            };

            api.getAuthOrgMenus(params).then(res => {
                let original = res.data;
                // let original = [
                //     {
                //         'id': 1,
                //         'name': '首页',
                //         'childBriefs': [{
                //             'id': 101,
                //             'name': '系统首页',
                //             'typeId': 1,
                //             'type': '系统首页'
                //         }, {
                //             'id': 102,
                //             'name': '账户设置',
                //             'typeId': 1,
                //             'type': '系统首页'
                //         }]
                //     }, {
                //         'id': 2,
                //         'name': '商品',
                //         'childBriefs': [{
                //             'id': 103,
                //             'name': '商品列表',
                //             'typeId': 2,
                //             'type': '商品列表'
                //         }, {
                //             'id': 104,
                //             'name': '宴会厅管理',
                //             'typeId': 2,
                //             'type': '商品列表'
                //         }, {
                //             'id': 105,
                //             'name': '添加商品',
                //             'typeId': 3,
                //             'type': '添加商品'
                //         }, {
                //             'id': 106,
                //             'name': '宴会菜单管理',
                //             'typeId': 4,
                //             'type': '宴会菜单管理'
                //         }, {
                //             'id': 107,
                //             'name': '添加菜单',
                //             'typeId': 4,
                //             'type': '宴会菜单管理'
                //         }, {
                //             'id': 108,
                //             'name': '商品评价',
                //             'typeId': 5,
                //             'type': '商品评价'
                //         }, {
                //             'id': 109,
                //             'name': '评价详情',
                //             'typeId': 5,
                //             'type': '商品评价'
                //         }]
                //     }, {
                //         'id': 3,
                //         'name': '案例',
                //         'childBriefs': [{
                //             'id': 110,
                //             'name': '案例列表',
                //             'typeId': 6,
                //             'type': '案例列表'
                //         }, {
                //             'id': 111,
                //             'name': '案例详情',
                //             'typeId': 7,
                //             'type': '案例详情'
                //         }, {
                //             'id': 112,
                //             'name': '编辑案例',
                //             'typeId': 8,
                //             'type': '编辑案例'
                //         }]
                //     }, {
                //         'id': 4,
                //         'name': '订单',
                //         'childBriefs': [{
                //             'id': 113,
                //             'name': '订单列表',
                //             'typeId': 9,
                //             'type': '订单列表'
                //         }]
                //     }, {
                //         'id': 5,
                //         'name': '财务',
                //         'childBriefs': [{
                //             'id': 114,
                //             'name': '综合统计',
                //             'typeId': 10,
                //             'type': '综合统计'
                //         }, {
                //             'id': 115,
                //             'name': '提现',
                //             'typeId': 11,
                //             'type': '提现'
                //         }]
                //     }
                // ];

                for (let key in original){
                    original[key].id = original[key].id.toString();
                    original[key].menuIcon = require('@/assets/img/icon/menu' + key +'.png');

                    for (let keyIn in original[key].childBriefs){
                        let temp = Number(keyIn) + 1;

                        // original[key].childBriefs[keyIn].id = original[key].id + '-' + temp;
                        let a = Number(key)+1;

                        original[key].childBriefs[keyIn].id = a + '-' + temp;
                    }
                    let map = {},
                        dest = [];

                    for (let i = 0; i < original[key].childBriefs.length; i++){
                        let ai = original[key].childBriefs[i];

                        if (!map[ai.typeId]){
                            dest.push({
                                typeId :ai.typeId,
                                type: ai.type,
                                data: [ai]
                            });
                            map[ai.typeId] = ai;
                        } else {
                            for (let j = 0; j < dest.length; j++){
                                let dj = dest[j];

                                if (dj.typeId == ai.typeId){
                                    dj.data.push(ai);
                                    break;
                                }
                            }
                        }
                    }
                    original[key].childBriefs = dest
                }
                ths.menuList = original;
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        handleOpen(key, keyPath) {
        },
        handleClose(key, keyPath) {
        },
        handleSelect(key,keyPath){
            let ths = this;
            let txt = '';
            let headTitle = '';

            // <!-- 0——婚礼策划 1——婚宴预订 2——婚礼摄影 3——婚礼摄像 4——婚礼造型 5——婚礼主持 6——环球旅拍 -->
            switch (ths.business){
            case '0': case 0: case '2': case 2: case '3': case 3: case '4': case 4: case '5': case 5://婚礼策划 2——婚礼摄影 3——婚礼摄像 4——婚礼造型 5——婚礼主持
                switch (keyPath[1]) {
                case '1-1':
                    txt = 'systemHome';
                    headTitle = '系统首页';
                    break;
                case '1-2':
                    txt = 'systemSet';
                    headTitle = '账户设置';
                    break;
                case '2-1':
                    txt = 'goodsList';
                    headTitle = '商品列表';
                    break;
                case '2-2':
                    txt = 'goodsRate';
                    headTitle = '商品评价';
                    break;
                case '3-1':
                    txt = 'caseList';
                    headTitle = '案例列表';
                    break;
                case '4-1':
                    txt = 'orderList';
                    headTitle = '订单列表';
                    break;
                case '5-1':
                    txt = 'compositeStatistics';
                    headTitle = '综合统计';
                    break;
                case '5-2':
                    txt = 'withdraw';
                    headTitle = '提现';
                    break;
                default:
                    break;
                }
                break;
            case '1':case 1:
                switch (keyPath[1]) {
                case '1-1':
                    txt = 'systemHome';
                    headTitle = '系统首页';
                    break;
                case '1-2':
                    txt = 'systemSet';
                    headTitle = '账户设置';
                    break;
                case '2-1':
                    txt = 'goodsList';
                    headTitle = '宴会厅管理';
                    break;
                case '2-2':
                    txt = 'cookList';
                    headTitle = '宴会菜单管理';
                    break;
                case '2-3':
                    txt = 'goodsRate';
                    headTitle = '商品评价';
                    break;
                case '3-1':
                    txt = 'caseList';
                    headTitle = '案例列表';
                    break;
                case '4-1':
                    txt = 'orderList';
                    headTitle = '订单列表';
                    break;
                case '5-1':
                    txt = 'compositeStatistics';
                    headTitle = '综合统计';
                    break;
                case '5-2':
                    txt = 'withdraw';
                    headTitle = '提现';
                    break;
                default:
                    break;
                }
                break;
            case '6':case 6:
                switch (keyPath[1]) {
                case '1-1':
                    txt = 'systemHome';
                    headTitle = '系统首页';
                    break;
                case '1-2':
                    txt = 'systemSet';
                    headTitle = '账户设置';
                    break;
                case '2-1':
                    txt = 'goodsList';
                    headTitle = '商品列表';
                    break;
                case '2-2':
                    txt = 'goodsRate';
                    headTitle = '商品评价';
                    break;
                case '3-1':
                    txt = 'orderList';
                    headTitle = '订单列表';
                    break;
                case '4-1':
                    txt = 'compositeStatistics';
                    headTitle = '综合统计';
                    break;
                case '4-2':
                    txt = 'withdraw';
                    headTitle = '提现';
                    break;
                default:
                    break;
                }
                break;
            default:
                break;
            }

            ths.$router.push({
                name:txt,
                query:{}
            });
            ths.changeChildTitle(headTitle)//跳转的时候将header的值存入store中
        }
    }
}
</script>

<style lang="scss">
.content-index{
    display: -webkit-flex;
    display: flex;
    flex: row;
    width: 100%;
    overflow-x: hidden;
    min-height: 100vh;
    height: auto;
    .menu-list-parent{
        width: 210px;
        background: #000000;
        color: #ffffff;
        .list-logo{
            display: -webkit-flex;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 36px;
            margin-bottom: 48px;
            img{
                width: 60px;
                margin-bottom: 16px;
            }
        }
        .el-menu-vertical-demo{
            border:1px solid #000000;
            .menu-icon{
                width: 15px;
                margin: 0px 5px;
            }
        }
    }
}
.content-container{
    position: relative;
    width:calc(100% - 210px);
    background: #f6f8fb;
    .content-box{
        position: relative;
        width: 100%;
        display: -webkit-flex;
        display: flex;
    }
    //主要内容routerview容器
    .router-container{
        width: 100%;
    }
}
</style>
