<template>
    <div class="order-detail">
        <div><header-title :isParent="false" :title="headerChildTitle"></header-title></div>
        <div class="p22 backgroundfff">
            <!-- 订单信息 -->
            <div class="step-box">
                <div class="step-detail">
                    <div class="squareFF739E"></div>
                    <div>订单信息</div>
                </div>
                <div class="step-content">
                    <div class="step-row">
                        <div class="row-left">订单编号:</div>
                        <div>{{dataObj.orderCode}}</div>
                    </div>
                    <div class="step-row">
                        <div class="row-left">订单金额:</div>
                        <div>{{dataObj.orderStatus}}</div>
                    </div>
                    <div class="step-row">
                        <div class="row-left">支付方式:</div>
                        <div>{{dataObj.payChannel}}</div>
                    </div>
                    <div class="step-row">
                        <div class="row-left">支付时间:</div>
                        <div>{{dataObj.payTime}}</div>
                    </div>
                    <div class="step-row">
                        <div class="row-left">订单状态:</div>
                        <div>{{dataObj.orderStatus}}</div>
                    </div>
                </div>
            </div>
            <div class="step-box">
                <div class="step-detail">
                    <div class="squareFF739E"></div>
                    <div>对账信息</div>
                </div>
                <div v-if="isType1" class="step-content">
                    <div class="step-row">
                        <div class="row-left">对账状态:</div>
                        <div>{{dataObj.checkStatus}}</div>
                    </div>
                </div>
                <div v-if="isType2" class="step-content">
                    <div class="step-row">
                        <div class="row-left">对账状态:</div>
                        <div>{{dataObj.checkStatus}}</div>
                    </div>
                    <div class="step-row">
                        <div class="row-left">对账人员:</div>
                        <div>{{dataObj.checkUser}}</div>
                    </div>
                    <div class="step-row">
                        <div class="row-left">对账时间:</div>
                        <div>{{dataObj.checkTime}}</div>
                    </div>
                </div>
                <div v-if="isType3" class="step-content">
                    <div class="step-row">
                        <div class="row-left">对账状态:</div>
                        <div>{{dataObj.checkStatus}}</div>
                    </div>
                    <div class="step-row">
                        <div class="row-left">处理备注:</div>
                        <div>{{dataObj.checkUser}}</div>
                    </div>
                    <div class="step-btn">
                        <el-button type="primary">冲正处理</el-button>
                    </div>
                </div>
                <div v-if="isType4" class="step-content">
                    <div class="step-row">
                        <div class="row-left">对账状态:</div>
                        <div>{{dataObj.checkStatus}}</div>
                    </div>
                    <div class="step-row">
                        <div class="row-left">对账人员:</div>
                        <div>{{dataObj.checkUser}}</div>
                    </div>
                    <div class="step-row">
                        <div class="row-left">对账时间:</div>
                        <div>{{dataObj.checkTime}}</div>
                    </div>
                    <div class="step-row">
                        <div class="row-left">处理备注:</div>
                        <div>{{dataObj.note}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import headerTitle from '@/components/common/headerTitle';
import api from '@/http/api';
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
    name: 'App',
    components:{
        headerTitle//标题
    },
    data(){
        return {
            xid:'',
            type:'',
            isType1:false,
            isType2:false,
            isType3:false,
            isType4:false,
            dataObj:{ //订单详情
                business:1,//订单状态
                readTimes:100,//点赞数
                title:'',//文章标题
                type:'',//文章分类
                userId:'',//商户ID
                cover:'',//封面
                statusName:'待付款'
            }
        }
    },
    computed:{
        ...mapGetters(['tk','headerChildTitle'])
    },
    mounted(){
        let ths = this;

        ths.xid = ths.$route.query.xid;//详情id
        ths.type = ths.$route.query.type;//类型
        ths.orderCheckOrderDetail();//获取详细信息
        // switch (ths.type) {
        // case '未对账':
        //     ths.isType1 = true;
        //     ths.isType2 = false;
        //     ths.isType3 = false;
        //     ths.isType4 = false;
        //     break;
        // case '已对账':
        //     ths.isType1 = false;
        //     ths.isType2 = true;
        //     ths.isType3 = false;
        //     ths.isType4 = false;
        //     break;
        // case '异常':
        //     ths.isType1 = false;
        //     ths.isType2 = false;
        //     ths.isType3 = true;
        //     ths.isType4 = false;
        //     break;
        // case '已冲正':
        //     ths.isType1 = false;
        //     ths.isType2 = false;
        //     ths.isType3 = true;
        //     ths.isType4 = false;
        //     break;
        // default:
        //     break;
        // }
    },
    methods:{
        ...mapActions([
            'changeChildTitle'//跳转到子页面title
        ]),
        //获取详情数据
        orderCheckOrderDetail(){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.xid
            };

            api.orderCheckOrderDetail(params).then(res => {

                ths.dataObj = res.data;

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

<style lang="scss">
.order-detail{
    .step-status-btns{
        margin-top: 22px;
        font-size: 16px;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        span{
            color: #FF739E;
        }
    }
    .step-box{
        margin: 22px 0px;
        .step-detail{
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
        .step-content{
            font-size: 16px;
            line-height: 2;
            .step-row{
                display: -webkit-flex;
                display: flex;
                flex-direction: row;
                .row-left{
                    width: 100px;
                    text-align: right;
                    margin-right: 12px;
                }
            }
            .step-btn{
                display: -webkit-flex;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
            }
        }
    }
}
</style>
