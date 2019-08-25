<template>
    <div class="business-detail">
        <!-- title按钮 -->
        <div class="parent-header">
            <div><header-title :isParent="false" :title="headerChildTitle"></header-title></div>
        </div>
        <!-- 第一部分 -->
        <div class="detail backgroundfff p22">
            <div class="detail-title">
                <div class="squareFF739E"></div>
                <div>基本信息</div>
            </div>
            <div class="detail-content detail-one">
                <div class="detail-item">
                    <div class="item-title">宴会厅名称:</div>
                    <div class="item-value">{{dataObj.hotelName}}</div>
                </div>
                <div class="detail-item">
                    <div class="item-title">最低消费:</div>
                    <div class="item-value">{{dataObj.price}}元</div>
                </div>
                <div class="detail-item">
                    <div class="item-title">可容纳桌数:</div>
                    <div class="item-value">{{dataObj.deskLow}}——{{dataObj.deskHigh}}</div>
                </div>
                <div class="detail-item-column">
                    <div class="item-title">宴会厅介绍:</div>
                    <div class="item-value" v-html="dataObj.description">{{dataObj.description}}</div>
                </div>
            </div>
        </div>
        <!-- 第二部分 -->
        <div class="detail backgroundfff p22">
            <div class="detail-title">
                <div class="squareFF739E"></div>
                <div>档期信息</div>
            </div>
            <div class="detail-content detail-two">
                <div class="left-narrow">
                    <img src="@/assets/img/icon/back.png" alt="">
                </div>
                <echart-calendar></echart-calendar>
                <div class="right-narrow">
                    <img src="@/assets/img/icon/back.png" alt="">
                </div>
            </div>
        </div>
        <!-- 第三部分 -->
        <div class="detail backgroundfff p22">
            <div class="detail-title">
                <div class="squareFF739E"></div>
                <div>商品元素</div>
            </div>
            <div class="detail-content detail-three">
                <div class="detail-item">
                    <div class="item-title">风格:</div>
                    <div class="item-value">{{dataObj.category}}</div>
                </div>
                <div class="detail-item">
                    <div class="item-title">颜色:</div>
                    <div class="item-value">{{dataObj.color}}</div>
                </div>
            </div>
        </div>
        <!-- 第四部分 -->
        <div class="detail backgroundfff p22">
            <div class="detail-title">
                <div class="squareFF739E"></div>
                <div>宴会厅参数</div>
            </div>
            <div class="detail-content detail-four">
                <div class="detail-item">
                    <div class="item-title">形状:</div>
                    <div class="item-value">{{type}}</div>
                </div>
                <div class="detail-item">
                    <div class="item-title">面积:</div>
                    <div class="item-value">宴会厅面积{{type}}㎡</div>
                </div>
                <div class="detail-item">
                    <div class="item-title">层高:</div>
                    <div class="item-value">宴会厅层高{{type}}m</div>
                </div>
                <div class="detail-item">
                    <div class="item-title">立柱:</div>
                    <div class="item-value">立柱数{{type}}个</div>
                </div>
            </div>
        </div>
        <!-- 第五部分 -->
        <div class="detail backgroundfff p22">
            <div class="detail-title">
                <div class="squareFF739E"></div>
                <div>商品封面</div>
            </div>
            <div class="detail-content detail-four">
                <img :src="dataObj.cover" alt="">
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import headerTitle from '@/components/common/headerTitle';
import api from '@/http/api';
export default {
    components:{
        headerTitle
    },
    data(){
        return {
            xid:'',//xid
            page: 2,//档期的分页
            total:0,
            type:'',
            dataObj:{},//详情数据
            scheduleObj:{}//档期数据
        }
    },
    computed:{
        ...mapGetters(['tk','headerChildTitle'])
    },
    mounted(){
        let ths = this;

        ths.xid = ths.$route.query.xid;
        ths.getCommodityHotelDetail(ths.xid);
        ths.getCommodityStocks(ths.xid);
    },
    methods:{
        //获取婚宴厅详情数据
        getCommodityHotelDetail(xid){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:xid//商户Id
            };

            api.getCommodityHotelDetail(params).then(res => {
                ths.dataObj = res.data;
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //获取婚宴厅档期
        getCommodityStocks(xid){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:xid,//商户Id
                page:ths.page
            };

            api.getCommodityStocks(params).then(res => {
                ths.scheduleObj = res.data;//档期数据
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
.business-detail{
    .detail{
        margin-bottom: 22px;
        .detail-title{
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            margin-bottom: 22px;
            .squareFF739E{
                width: 16px;
                height: 16px;
                background: #FF739E;
                margin-right: 8px;
            }
        }
    }
    .detail-content{
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        .detail-item{
            margin-left: 24px;
            margin-bottom: 12px;
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            .item-title{
                color: #999999;
            }
        }
        .detail-item-column{
            margin-left: 24px;
            margin-bottom: 12px;
            display: -webkit-flex;
            display: flex;
            flex-direction: column;
            .item-title{
                color: #999999;
            }
        }
    }
    //第一部分
    .detail-one{

    }
    //第二部分
    .detail-two{
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        align-items: center;
        img{
            width: 80px;
        }
    }
    //第三部分
    .detail-three{
    }
    // 第四部分
    .detail-four{
        img{
            width: 300px;
        }

    }
    // 第五部分
    .detail-five{

    }
}
</style>
