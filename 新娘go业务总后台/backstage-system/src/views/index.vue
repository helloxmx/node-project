<template>
  <div class="content-index">
    <div class="menu-list-parent">
        <div class="list-logo">
            <img src="@/assets/img/icon/logoWhite.png" alt="">
            <div>后台业务管理系统</div>
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
            <!-- <el-submenu index="1">
                <template slot="title">
                    <img class="menu-icon" src="@/assets/img/icon/menu0.png" alt="">
                    <span>首页</span>
                </template>
                <el-menu-item-group>
                <template slot="title">系统首页</template>
                <el-menu-item index="1-1">系统首页</el-menu-item>
                <el-menu-item index="1-2">账户设置</el-menu-item>
                <el-menu-item index="1-3">测试组件</el-menu-item>
                </el-menu-item-group>
            </el-submenu> -->
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
            <!-- <el-submenu index="2">
                <template slot="title">
                    <img class="menu-icon" src="@/assets/img/icon/menu1.png" alt="">
                    <span>婚街</span>
                </template>
                <el-menu-item-group>
                    <template slot="title">商户管理</template>
                    <el-menu-item index="2-1">商户列表</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <template slot="title">案例管理</template>
                    <el-menu-item index="2-2">案例列表</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <template slot="title">商品管理</template>
                    <el-menu-item index="2-3">商品列表</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <template slot="title">婚宴管理</template>
                    <el-menu-item index="2-4">婚宴厅列表</el-menu-item>
                    <el-menu-item index="2-5">菜单列表</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <template slot="title">商品评价</template>
                    <el-menu-item index="2-6">商品评价</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <template slot="title">商户入驻</template>
                    <el-menu-item index="2-7">申请列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <img class="menu-icon" src="@/assets/img/icon/menu2.png" alt="">
                    <span>订单</span>
                </template>
                <el-menu-item-group>
                    <template slot="title">订单管理</template>
                    <el-menu-item index="3-1">订单列表</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <template slot="title">退款处理</template>
                    <el-menu-item index="3-2">退款申请处理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <img class="menu-icon" src="@/assets/img/icon/menu3.png" alt="">
                    <span>用户</span>
                </template>
                <el-menu-item-group>
                    <template slot="title">用户管理</template>
                    <el-menu-item index="4-1">用户列表</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <template slot="title">用户金币系统</template>
                    <el-menu-item index="4-2">金币查询</el-menu-item>
                    <el-menu-item index="4-3">任务奖励设置</el-menu-item>
                    <el-menu-item index="4-4">更多规则设置</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">
                    <img class="menu-icon" src="@/assets/img/icon/menu4.png" alt="">
                    <span>运营</span>
                </template>
                <el-menu-item-group>
                    <template slot="title">消息查询</template>
                    <el-menu-item index="5-1">站内信消息</el-menu-item>
                    <el-menu-item index="5-2">APP推送消息</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <template slot="title">Banner配置</template>
                    <el-menu-item index="5-3">Banner配置</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <template slot="title">其他查询</template>
                    <el-menu-item index="5-4">邀请好友查询</el-menu-item>
                    <el-menu-item index="5-5">邀请用户查询</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title">
                    <img class="menu-icon" src="@/assets/img/icon/menu5.png" alt="">
                    <span>内容</span>
                </template>
                <el-menu-item-group>
                    <template slot="title">文章管理</template>
                    <el-menu-item index="6-1">文章列表</el-menu-item>
                    <el-menu-item index="6-2">发布文章</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <template slot="title">新人说管理</template>
                    <el-menu-item index="6-3">新人说列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="7">
                <template slot="title">
                    <img class="menu-icon" src="@/assets/img/icon/menu6.png" alt="">
                    <span>统计</span>
                </template>
                <el-menu-item-group>
                    <template slot="title">统计分析</template>
                    <el-menu-item index="7-1">交易统计</el-menu-item>
                    <el-menu-item index="7-2">商品统计</el-menu-item>
                    <el-menu-item index="7-3">会员统计</el-menu-item>
                    <el-menu-item index="7-4">搜索统计</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="8">
                <template slot="title">
                    <img class="menu-icon" src="@/assets/img/icon/menu7.png" alt="">
                    <span>财务</span>
                </template>
                <el-menu-item-group>
                    <template slot="title">对账管理</template>
                    <el-menu-item index="8-1">对账列表</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <template slot="title">提现管理</template>
                    <el-menu-item index="8-2">提现列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="9">
                <template slot="title">
                    <img class="menu-icon" src="@/assets/img/icon/menu8.png" alt="">
                    <span>设置</span>
                </template>
                <el-menu-item-group>
                    <template slot="title">平台设置</template>
                    <el-menu-item index="9-1">消息提醒</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="10">
                <template slot="title">
                    <img class="menu-icon" src="@/assets/img/icon/menu9.png" alt="">
                    <span>权限</span>
                </template>
                <el-menu-item-group>
                    <template slot="title">权限管理</template>
                    <el-menu-item index="10-1">部门管理</el-menu-item>
                    <el-menu-item index="10-2">成员管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu> -->
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
        ...mapGetters(['tk','headerTitle','pindex','cindex','sindex'])
    },
    mounted(){
        let ths = this;

        // //初始化侧边菜单
        // for (let key in ths.menuPList) {
        //     if (key == ths.pindex){
        //         ths.menuPList[key].isFocus = true;// 如果是isAcitve
        //         ths.menuCList = ths.menuPList[key].child;
        //         for (let keyIn in ths.menuCList){
        //             if (keyIn == ths.cindex){
        //                 ths.menuCList[keyIn].isFocus = true;// 如果是isAcitve
        //                 for (let keyInIn in ths.menuCList[keyIn].grandson) {
        //                     if (keyInIn == ths.sindex) {
        //                         ths.menuCList[keyIn].grandson[keyInIn].isFocus = true;// 如果是isAcitve
        //                     } else {
        //                         ths.menuCList[keyIn].grandson[keyInIn].isFocus = false;
        //                     }
        //                 }
        //             } else {
        //                 ths.menuCList[keyIn].isFocus = false;
        //             }
        //         }
        //     } else {
        //         ths.menuPList[key].isFocus = false;
        //     }
        // }

        ths.activeNav = getActiveNav(window.location.href) || '1-1';
        ths.xid = ths.$route.query.xid;
        ths.getAuthOrgMenus();
    },
    methods:{
        ...mapActions([
            'changeTitle',//跳转到页面
            'changeChildTitle',//跳转到子页面title
            'changePindex',//一级菜单
            'changeCindex',//二级菜单
            'changeSindex'//二级菜单
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

                for (let key in original){
                    original[key].id = original[key].id.toString();
                    original[key].menuIcon = require('@/assets/img/icon/menu' + key +'.png');

                    for (let keyIn in original[key].childBriefs){
                        let temp = Number(keyIn) + 1;

                        original[key].childBriefs[keyIn].id = original[key].id + '-' + temp;
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

            switch (keyPath[1]) {
            case '1-1':
                txt = 'systemHome';
                headTitle = '系统首页';
                break;
            case '1-2':
                txt = 'systemSet';
                headTitle = '系统设置';
                break;
            // case '1-3':
            //     txt = 'test';
            //     headTitle = '测试组件';
            //     break;
            case '2-1':
                txt = 'storeList';
                headTitle = '商户列表';
                break;
            case '2-2':
                txt = 'caseList';
                headTitle = '案例列表';
                break;
            case '2-3':
                txt = 'goodsList';
                headTitle = '商品列表';
                break;
            case '2-4':
                txt = 'banquetHallList';
                headTitle = '婚宴厅列表';
                break;
            case '2-5':
                txt = 'cookList';
                headTitle = '菜单列表';
                break;
            case '2-6':
                txt = 'goodsRate';
                headTitle = '商品评价';
                break;
            case '2-7':
                txt = 'applyList';
                headTitle = '申请列表';
                break;
            case '3-1':
                txt = 'orderList';
                headTitle = '订单列表';
                break;
            case '3-2':
                txt = 'refundApplyList';
                headTitle = '退款申请处理';
                break;
            case '4-1':
                txt = 'userList';
                headTitle = '用户列表';
                break;
            case '4-2':
                txt = 'goldCoinList';
                headTitle = '金币查询';
                break;
            case '4-3':
                txt = 'taskRewardSet';
                headTitle = '任务奖励设置';
                break;
            case '4-4':
                txt = 'moreRuleSet';
                headTitle = '更多规则设置';
                break;
            case '5-1':
                txt = 'appPushMessage';
                headTitle = '站内新消息';
                break;
            case '5-2':
                txt = 'appPushMessage';
                headTitle = 'APP推送消息';
                break;
            case '5-3':
                txt = 'bannerSet';
                headTitle = 'Banner配置';
                break;
            case '5-4':
                txt = 'inviteFriendList';
                headTitle = '邀请好友查询';
                break;
            case '5-5':
                txt = 'inviteUserList';
                headTitle = '邀请用户查询';
                break;
            case '6-1':
                txt = 'infoList';
                headTitle = '文章列表';
                break;
            case '6-2':
                txt = 'publishArticles';
                headTitle = '发布文章';
                break;
            case '6-3':
                txt = 'newSayList';
                headTitle = '新人说列表';
                break;
            case '7-1':
                txt = 'transactionStatistics';
                headTitle = '交易统计';
                break;
            case '7-2':
                txt = 'commodityStatistics';
                headTitle = '商品统计';
                break;
            case '7-3':
                txt = 'membershipStatistics';
                headTitle = '成员统计';
                break;
            case '7-4':
                txt = 'searchStatistics';
                headTitle = '搜索统计';
                break;
            case '8-1':
                txt = 'balanceList';
                headTitle = '对账列表';
                break;
            case '8-2':
                txt = 'withdrawList';
                headTitle = '提现列表';
                break;
            case '9-1':
                txt = 'messageRemind';
                headTitle = '消息提醒';
                break;
            case '10-1':
                txt = 'departmentList';
                headTitle = '部门管理';
                break;
            case '10-2':
                txt = 'memberList';
                headTitle = '成员管理';
                break;
            default:
                break;
            }

            ths.$router.push({
                name:txt,
                query:{}
            });
            ths.changeChildTitle(headTitle)//跳转的时候将header的值存入store中
        },
        // 跳转到一级页面
        linkToPages(item,index){ //title标题名称 name 跳转路径
            let ths = this;

            for (let key in ths.menuPList){
                if (index == key) {
                    ths.menuPList[key].isFocus = true;
                } else {
                    ths.menuPList[key].isFocus = false;
                }
            }
            ths.menuCList = item.child;
            //清除其他选中数据
            for (let key in ths.menuCList){
                if (index !== key) {
                    ths.menuCList[key].isFocus = false;
                    for (let keyInIn in ths.menuCList[key].grandson) {
                        ths.menuCList[key].grandson[keyInIn].isFocus = false
                    }
                }
            }
            for (let keyIn in ths.menuCList){
                if (keyIn == 0){
                    ths.menuCList[keyIn].isFocus = true;// 初始化
                    for (let keyInIn in ths.menuCList[keyIn].grandson) {
                        if (keyInIn == 0) {
                            ths.menuCList[keyIn].grandson[keyInIn].isFocus = true;// 如果是isAcitve
                        } else {
                            ths.menuCList[keyIn].grandson[keyInIn].isFocus = false;
                        }
                    }
                } else {
                    ths.menuCList[keyIn].isFocus = false;
                }
            }

            ths.$router.push({
                name:item.linkPath,
                query:{}
            });
            ths.changeTitle(item.chinese)//跳转的时候将header的值存入store中
            ths.changeChildTitle(ths.menuCList[0].title)//子页面的title存入默认第一个菜单
            ths.changePindex(index)//存入一级菜单的index
            ths.changeCindex(0)//存入二级菜单的第一个菜单
            ths.changeSindex(0)//存入三级菜单的第一个菜单

        },
        //跳转到二级页面
        linkToChildPages(item,index1,index2){
            let ths = this;

            //清除其他选中数据
            for (let key in ths.menuCList){
                if (index1 !== key) {
                    ths.menuCList[key].isFocus = false;
                    for (let keyInIn in ths.menuCList[key].grandson) {
                        ths.menuCList[key].grandson[keyInIn].isFocus = false
                    }
                }
            }
            // 选中数据
            for (let key in ths.menuCList){
                if (index1 == key) {
                    ths.menuCList[key].isFocus = true;
                    for (let keyInIn in ths.menuCList[key].grandson) {
                        if (keyInIn == index2) {
                            ths.menuCList[key].grandson[keyInIn].isFocus = true;// 如果是isAcitve
                        } else {
                            ths.menuCList[key].grandson[keyInIn].isFocus = false;
                        }
                    }
                } else {
                    ths.menuCList[key].isFocus = false;
                }
            }

            ths.$router.push({
                name:item.linkPath,
                query:{}
            });
            ths.changeChildTitle(item.title)
            ths.changeCindex(index1)//存入二级级菜单的index
            ths.changeSindex(index2)//存入二级级菜单的index
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
