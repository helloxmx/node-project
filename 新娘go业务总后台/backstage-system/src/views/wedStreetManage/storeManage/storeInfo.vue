<template>
    <div class="store-box">
        <div><header-title :isParent="false" :title="headerChildTitle"></header-title></div>
        <div class="store-content">
            <div class="detail-content p22 backgroundfff">
                <div class="store-title">{{name}}</div>
                <div class="content">
                    <div v-html="dataObj.summary"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import headerTitle from '@/components/common/headerTitle';
import singleGood from '@/components/common/singleGood';
import api from '@/http/api';
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
    name: 'App',
    components:{
        headerTitle,//标题栏
        singleGood//列表单个元素
    },
    data(){
        return {
            dataObj:{},
            name:'',//商户名称

            pubTime:'',//发布时间
            content:'',//文章内容
            pageSize:10,
            page: 1,
            total:100,
            lists:[{
                cover:require('@/assets/img/userIcon.jpg'),
                storeName:'杭州JW万号酒店婚宴预订',
                price:9999
            }]
        }
    },
    computed:{
        ...mapGetters(['headerTitle','headerChildTitle','tk'])
    },
    mounted(){
        let ths = this;
        let xid = ths.$route.query.xid;

        ths.name = ths.$route.query.name;
        ths.getStoreSummary(xid);
    },
    methods:{
        // ...mapActions([
        //     'changeTitle'//跳转到页面
        // ]),
        //获取dataObj
        getStoreSummary(xid){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:xid
            };

            api.getStoreSummary(params).then(res => {
                ths.dataObj = res.data;
            }).catch(e => {
                // alert(e.msg)
            })
        }
    }
}
</script>

<style lang="scss">
.store-box{
    height: 100%;
    min-height: 100vh;
}
.store-content{
    width: 100%;
    min-height: 100vh;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    .detail-content{
        width: 100%;
        color: #4a4a4a;
        .store-title{
            font-size: 24px;
            padding-bottom: 22px;
        }
        .title{
            font-size: 24px;
            padding-bottom: 22px;
        }
        .content{
            font-size: 16px;
            padding: 22px 0px;
            display: -webkit-flex;
            display: flex;
            flex-direction: column;
            img{
                width: 100%;
            }
        }
    }
}

</style>
