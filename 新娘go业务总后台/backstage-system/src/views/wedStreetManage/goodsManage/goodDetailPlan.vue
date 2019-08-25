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
                    <div class="item-title">商品类型:</div>
                    <div class="item-value">{{type}}</div>
                </div>
                <div class="detail-item">
                    <div class="item-title">套餐名称:</div>
                    <div class="item-value">{{type}}</div>
                </div>
                <div class="detail-item">
                    <div class="item-title">商家ID:</div>
                    <div class="item-value">{{type}}</div>
                </div>
                <div class="detail-item">
                    <div class="item-title">商品售价:</div>
                    <div class="item-value">{{type}}</div>
                </div>
                <div class="detail-item">
                    <div class="item-title">商品原价:</div>
                    <div class="item-value">{{type}}</div>
                </div>
                <div class="detail-item">
                    <div class="item-title">异地服务费:</div>
                    <div class="item-value">{{type}}</div>
                </div>
                <div class="detail-item">
                    <div class="item-title">商品介绍:</div>
                    <div class="item-value">{{type}}</div>
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
            </div>
            旅拍类型没有收藏项
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
                    <div class="item-value">{{type}}</div>
                </div>
                <div class="detail-item">
                    <div class="item-title">颜色:</div>
                    <div class="item-value">{{type}}</div>
                </div>
            </div>
        </div>
        <!-- 第四部分 -->
        <div class="detail backgroundfff p22">
            <div class="detail-title">
                <div class="squareFF739E"></div>
                <div>商品内容</div>
            </div>

        </div>
        <!-- 第五部分 -->
        <div class="detail backgroundfff p22">
            <div class="detail-title">
                <div class="squareFF739E"></div>
                <div>商品封面</div>
            </div>
            <div class="detail-content detail-five">
                <img src="" alt="">
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
            page: 1,
            pageSize:10,
            total:0,
            dataObj:{
                type:'哈哈哈哈哈哈'//类型
            }//详情数据

        }
    },
    computed:{
        ...mapGetters(['tk','headerChildTitle'])
    },
    mounted(){
        let ths = this;

        ths.xid = ths.$route.query.xid;
        ths.getStoreDetail(ths.xid);
    },
    methods:{
        //获取商户详情数据
        getStoreDetail(xid){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:xid//商户Id
            };

            api.getStoreDetail(params).then(res => {
                ths.dataObj = res.data.data;
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
    }
    //第一部分
    .detail-one{

    }
    //第二部分
    .detail-two{
    }
    //第三部分
    .detail-three{
    }
    // 第四部分
    .detail-four{

    }
    // 第五部分
    .detail-five{
        .img{
            width: 200px;
        }
    }
}
</style>
