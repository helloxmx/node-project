<template>
<div class="rate-box">
    <div><header-title :isParent="false" :title="headerChildTitle"></header-title></div>
    <div class="rate-detail">
        <div class="store-content backgroundfff p22">
            <div class="store-user mb22">
                <img :src="dataObj.avatar" alt="">
                <div class="mt22">{{dataObj.userName}}</div>
            </div>
            <div class="store-detail">
                <div class="item-detail">
                    <div class="item-title" style="width:68px;">商品：</div>
                    <div class="item-content">{{dataObj.commodityName}}</div>
                </div>
                <div class="item-detail">
                    <div class="item-title">商户：</div>
                    <div class="item-content">{{dataObj.storeName}}</div>
                </div>
                <div class="item-detail">
                    <div class="item-title">金额：</div>
                    <div class="item-content">{{dataObj.price}}</div>
                </div>
                <div class="item-detail">
                    <div class="item-title">评价：</div>
                    <star :starts="dataObj.star"></star>
                </div>
                <div class="item-detail">
                    <div class="item-title">日期：</div>
                    <div class="item-content">{{dataObj.date}}</div>
                </div>
            </div>

        </div>
        <div class="rate-content backgroundfff p22">
            <div class="date-title">评价内容：</div>
            <div class="date-content" v-html="dataObj.content"></div>
            <div v-if="dataObj.img !== null && dataObj.img !=''">
                <img v-for="item in dataObj.img" :key="item" :src="item" alt="">
            </div>
        </div>
    </div>
</div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import headerTitle from '@/components/common/headerTitle';
import star from '@/components/common/star';
import api from '@/http/api';
export default {
    components:{
        headerTitle,
        star
    },
    data(){
        return {
            xid:'',//xid
            dataObj:{}//详情数据
        }
    },
    computed:{
        ...mapGetters(['tk','headerChildTitle'])
    },
    mounted(){
        let ths = this;

        ths.xid = ths.$route.query.xid;
        ths.getCommentBackDetail()
    },
    methods:{
        //获取列表数据
        getCommentBackDetail(keyWord,type,page){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.xid
            };

            api.getCommentBackDetail(params).then(res => {
                ths.dataObj = res.data
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.rate-box{
    min-height: calc(100% - 52px);
}
.rate-detail{
    width: 100%;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    .store-content{
        width: 320px;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        margin-right: 12px;
        .store-user{
            display: -webkit-flex;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img{
                width: 120px;
            }
        }
        .store-detail{
            width: 100%;
            .item-detail{
                display: -webkit-flex;
                display: flex;
                flex-direction: row;
                width: 100%;
                margin-bottom: 12px;
                .item-title{

                }
                .item-content{
                    display: -webkit-flex;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                }
            }
        }

    }
    .rate-content{
        width:calc(100% - 332px);
        .date-title{
            width: 100%;
            border-bottom: 1px solid #d9d9d9;
            padding-bottom: 22px;
        }
        .date-content{
            padding: 22px 0px;
        }
    }
}
</style>
