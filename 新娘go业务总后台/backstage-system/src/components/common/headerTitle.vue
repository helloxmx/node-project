<template>
<div>
    <!-- 父标题 -->
    <div v-if="isParent" class="header-titlep color4a">
        <div class="header-icons">
            <div class="user-icon">
                <img :src="userIcon" alt="">
                <div>{{userName}}</div>
            </div>
            <div class="login-out" @click="loginOut">退出</div>
        </div>
    </div>
    <!-- 子标题 -->
    <div v-else class="header-title1 color4a">
        <div>
            <div v-if="!isBtns">{{title}}</div>
            <div v-else>
                <!-- 标题按钮集合，部分标题带有数值参数 -->
                <el-button v-for="(item,index) in btns" :autofocus="item.autofocus" :key="index" plain @click="btnFn(item.key)">
                    {{item.name}}<span v-if="item.params">({{item.params}})</span>
                </el-button>
            </div>
        </div>
        <!-- 返回和刷新 -->
        <div v-if="hasback" class="header-icons">
            <div class="goBack" @click="goBack">
                <img src="@/assets/img/icon/clickBack.png" alt="">
                返回
            </div>
            <div class="refresh">
                <img src="@/assets/img/icon/refresh.png" alt="">
                刷新
            </div>
        </div>
    </div>
</div>

</template>
<script>
export default {
    props:{
        'ptitle':{//一级标题
            type:String,
            default:'ptitle'
        },
        'title':{//二级标题
            type:String,
            default:'title'
        },
        'isParent':{//是否为一级标题
            type:Boolean,
            default:false
        },
        'isBtns':{//二级标题可能是按钮，不是标题
            type:Boolean,
            default:false
        },
        'btns':{
            type:null,
            default:function (){
                return [{
                    key:'allGoods',
                    name:'全部商品'
                }]
            }
        },
        'hasback':{//返回刷新按钮是否展示
            type:Boolean,
            default:false
        },
        'userIcon':{
            type:null,
            default:require('@/assets/img/userIcon.jpg')
        },
        'userName':{
            type:String,
            default:'userName'
        }
    },
    data () {
        return {}
    },
    methods:{
        btnFn(name){
            let ths = this;

            ths.$emit('btnFn',name)
        },
        loginOut(){
            let ths = this;

            ths.$router.push({
                name:'login',
                query:{}
            });
            ths.localStorage.clear();
        },
        goBack(){
            let ths = this;

            ths.$router.go(-1);
            ths.$emit('goBack')
        }
    }
}
</script>
<style lang="scss" scoped>
//一级title
.header-titlep{
    font-size: 14px;
    display: -webkit-flex;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    padding:0px 24px;
    height: 58px;
    width: 100%;
    background: #ffffff;
    box-shadow: 0 1px 4px 0 rgba(0,21,41,0.12);
    margin-bottom: 4px;
    .header-icons{
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        .user-icon,.login-out{
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding-left: 22px;

        }
        img{
            width: 20px;
            height: 20px;
            border: 1px solid #d9d9d9;
            border-radius: 50%;
            margin-right: 4px;
        }
    }
}
//二级title
.header-title1{
    font-size: 14px;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding:0px 24px;
    height: 52px;
    width: 100%;
    background: #f3f3f3;
    .header-icons{
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        .goBack,.refresh{
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding-left: 22px;
        }
        img{
            width: 20px;
            height: 20px;
            margin-right: 4px;
        }
    }
}
</style>
