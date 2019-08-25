<template>
<div>
    <div><header-title :isParent="false" :hasback="false" :title="headerChildTitle"></header-title></div>
    <div class="system-home p22">
        <!-- 第一部分 -->
        <div class="system-one">
            <div class="system-one-single">
                <div class="one-single-img"><img src="@/assets/img/icon/systemOne.png" alt=""></div>
                <div class="one-single-text">
                    <div class="text-title">今日订单总数</div>
                    <div class="value-box"><span class="text-value">{{dataObj.toTotal}}</span></div>
                </div>
            </div>
            <div class="system-one-single">
                <div class="one-single-img"><img src="@/assets/img/icon/systemTwo.png" alt=""></div>
                <div class="one-single-text">
                    <div class="text-title">今日销售总额</div>
                    <div class="value-box">¥<span class="text-value">{{dataObj.tsTotal}}</span></div>
                </div>
            </div>
            <div class="system-one-single">
                <div class="one-single-img"><img src="@/assets/img/icon/systemThree.png" alt=""></div>
                <div class="one-single-text">
                    <div class="text-title">昨日销售总额</div>
                    <div class="value-box">¥<span class="text-value">{{dataObj.ysTotal}}</span></div>
                </div>
            </div>
            <div class="system-one-single">
                <div class="one-single-img"><img src="@/assets/img/icon/systemFour.png" alt=""></div>
                <div class="one-single-text">
                    <div class="text-title">近7天销售总额</div>
                    <div class="value-box">¥<span class="text-value">{{dataObj.sevenTotal}}</span></div>
                </div>
            </div>
        </div>
        <!-- 第二部分 -->
        <div class="system-two">
            <div class="detail-title">
                <div class="tit-one">
                    <div class="squareFF739E"></div>
                    <div>待处理事务</div>
                </div>
            </div>
            <div class="two-content">
                <div class="two-item">
                    <div class="two-title">待付款订单</div>
                    <div class="two-text">{{dataObj.wFPay}}</div>
                </div>
                <div class="two-item">
                    <div class="two-title">待接订单</div>
                    <div class="two-text">{{dataObj.wFReceive}}</div>
                </div>
                <div class="two-item">
                    <div class="two-title">待操作退款订单</div>
                    <div class="two-text">{{dataObj.wFRefund}}</div>
                </div>
                <div class="two-item">
                    <div class="two-title">待处理提现</div>
                    <div class="two-text">{{dataObj.wFCash}}</div>
                </div>
            </div>
        </div>
        <!-- 第三部分 -->
        <div class="system-three">
            <div class="three-one">
                <div class="detail-title">
                    <div class="tit-one">
                        <div class="squareFF739E"></div>
                        <div>商户总览</div>
                    </div>
                </div>
                <div class="left-content">
                    <div class="two-item">
                        <div class="two-text">{{dataObj.sTIncrease}}</div>
                        <div class="two-title">今日新增</div>
                    </div>
                    <div class="two-item">
                        <div class="two-text">{{dataObj.sMIncrease}}</div>
                        <div class="two-title">本月新增</div>
                    </div>
                    <div class="two-item">
                        <div class="two-text">{{dataObj.sTotal}}</div>
                        <div class="two-title">商户总数</div>
                    </div>
                </div>
            </div>
            <div class="three-one">
                <div class="detail-title">
                    <div class="tit-one">
                        <div class="squareFF739E"></div>
                        <div>用户总览</div>
                    </div>
                </div>
                <div class="right-content">
                    <div class="two-item">
                        <div class="two-text">{{dataObj.uTIncrease}}</div>
                        <div class="two-title">今日新增</div>
                    </div>
                    <div class="two-item">
                        <div class="two-text">{{dataObj.uTLogin}}</div>
                        <div class="two-title">今日登录</div>
                    </div>
                    <div class="two-item">
                        <div class="two-text">{{dataObj.uMIncrease}}</div>
                        <div class="two-title">本月新增</div>
                    </div>
                    <div class="two-item">
                        <div class="two-text">{{dataObj.uTotal}}</div>
                        <div class="two-title">用户总数</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 第四部分 -->
        <div class="system-four">
            <div class="detail-title">
                <div class="tit-one">
                    <div class="squareFF739E"></div>
                    <div>订单统计</div>
                </div>
                <div class="tit-two">
                    <div v-for="(item,index) in list" :key="index" :class="{'pink-focus':item.isFocus,'default-focus':true}" @click="selectDate(index)">{{item.title}}</div>
                    <el-date-picker
                    v-model="orderTime"
                    type="daterange"
                    align="right"
                    unlink-panels
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions2"
                    @change="changeOrderTime">
                    </el-date-picker>
                </div>
            </div>
            <div class="four-content">
                <div class="four-left">
                    <div class="up">
                        <div class="title">本月订单总数</div>
                        <div class="count">{{upCount}}</div>
                        <div class="up-percent">
                            <div class="trigle-up"></div>
                            <span>{{upPercent}}%</span>同比上月
                        </div>
                    </div>
                    <div class="down">
                        <div class="title">本周订单数量</div>
                        <div class="count">{{downCount}}</div>
                        <div class="down-percent">
                            <div class="trigle-down"></div>
                            <span>{{downPercent}}%</span>同比上月
                        </div>
                    </div>
                </div>
                <div class="four-right">
                    <echart-line chartTitle="订单统计"></echart-line>
                </div>
            </div>
        </div>
        <!-- 第五部分 -->
        <div class="system-four">
            <div class="detail-title">
                <div class="tit-one">
                    <div class="squareFF739E"></div>
                    <div>销售统计</div>
                </div>
                <div class="tit-two">
                    <div v-for="(item,index) in list" :key="index" :class="{'pink-focus':item.isFocus,'default-focus':true}" @click="selectDate(index)">{{item.title}}</div>
                    <el-date-picker
                    v-model="saleTime"
                    type="daterange"
                    align="right"
                    unlink-panels
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions2"
                    @change="changeSaleTime">
                    </el-date-picker>
                </div>
            </div>
            <div class="four-content">
                <div class="four-left">
                    <div class="up">
                        <div class="title">本月销售总额</div>
                        <div class="count">{{upCount}}</div>
                        <div class="up-percent">
                            <div class="trigle-up"></div>
                            <span>{{upPercent}}%</span>同比上月
                        </div>
                    </div>
                    <div class="down">
                        <div class="title">本周销售总额</div>
                        <div class="count">{{downCount}}</div>
                        <div class="down-percent">
                            <div class="trigle-down"></div>
                            <span>{{downPercent}}%</span>同比上月
                        </div>
                    </div>
                </div>
                <div class="four-right">
                    <echart-line chartTitle="销售统计" themeColor="#389FFE"></echart-line>
                </div>
            </div>
        </div>
    </div>
</div>

</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import echartLine from '@/components/common/echartLine'
import headerTitle from '@/components/common/headerTitle';
import api from '@/http/api';
export default {
    components:{
        echartLine,
        headerTitle
    },
    data(){
        return {
            dataObj:{},

            upCount:'10000',
            downCount:'1000',
            upPercent:'10',
            downPercent:'10',
            pickerOptions2: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();

                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();

                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();

                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            orderTime:'',
            saleTime:'',
            startTime: '',
            endTime:'',
            list:[{title:'今日',isFocus:false},{title:'本周',isFocus:false},{title:'本月',isFocus:false}],
            chartWidth:'100%',
            chartHeight:'400px'
        }
    },
    computed:{
        ...mapGetters(['tk','headerChildTitle'])
    },
    mounted(){
        let ths = this;

        ths.getOrderBackIndex();//获取首页数据
        // ths.getOrderListStastics('2018-10-01','2018-11-01',0);
        // ths.getOrderListStastics('2018-10-01','2018-11-01',1);
        //获取首页统计数据
    },
    methods:{
        selectDate(key){

        },
        //获取首页数据
        getOrderBackIndex(){
            let ths = this;
            let params = {
                tk:ths.tk
            };

            api.getOrderBackIndex(params).then(res => {
                ths.dataObj = res.data;
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //获取统计数据
        getOrderListStastics(startTime,endTime,type){
            let ths = this;
            let params = {
                tk:ths.tk,
                startTime:startTime,
                endTime:endTime,
                type:type//0-订单 1-销售
            };

            api.getOrderListStastics(params).then(res => {
                ths.dataObj = res.data;
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //订单统计时间
        changeOrderTime(date){
            let ths = this;

            ths.getOrderListStastics(date[0],date[1],'0');
        },
        //销售统计时间
        changeSaleTime(date){
            let ths = this;

            ths.getOrderListStastics(date[0],date[1],'1');
        }
    }
}
</script>

<style lang="scss" scoped>
.system-home{
    // 第一部分
    .system-one{
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        // flex-wrap: wrap;
        .system-one-single{
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            background: #ffffff;
            width:calc(25% - 12px) ;
            padding: 22px;
            margin-bottom: 22px;
            font-size: 18px;
        }
        .one-single-img{
            margin-right: 8px;
            img{
                width: 40px;
            }
        }
        .one-single-text{
            .value-box{
                padding: 12px 0px;
            }
            .text-value{
                font-size: 24px;
            }
        }
    }
    //第二部分
    .system-two{
        background:#ffffff;
        padding: 22px 0px;
        margin-bottom: 22px;
        .two-content{
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
            justify-content: space-around;
            padding: 0px 22px;
            .two-item{
                display: -webkit-flex;
                display: flex;
                flex-direction: column;
                font-size: 18px;
                .two-title{
                    margin-right: 12px;
                }
                .two-text{
                    padding-top: 22px;
                    font-size: 24px;
                }
            }
        }
    }
    //第三部分
    .system-three{
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        width: 100%;
        .three-one{
            width:50%;
            background: #ffffff;
            margin-right: 22px;
            padding: 22px 0px;
            font-size: 18px;
            &:last-child{
                margin-right: 0px;
            }
        }
        //左边
        .left-content{
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            padding: 0px 22px;
            .two-item{
                display: -webkit-flex;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .two-text{
                    font-size: 24px;
                }
                .two-title{
                    padding-top: 22px;
                }
            }
        }
        //右边
        .right-content{
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            padding: 0px 22px;
            .two-item{
                display: -webkit-flex;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .two-text{
                    font-size: 24px;
                }
                .two-title{
                    padding-top: 22px;
                }
            }
        }
    }
    // 第四部分 // 第五部分
    .system-four{
        background: #ffffff;
        padding: 22px 0px;
        margin-top: 22px;
        .four-content{
            display: -webkit-flex;
            display: flex;
            padding:0px 22px;
        }
        //左边部分
        .four-left{
            width:140px;
            padding-right: 22px;
            margin-top: 50px;
            font-size: 14px;
            color: #9b9b9b;
            .title{
                font-size: 18px;
                color: #4a4a4a;
            }
            .count{
                font-size: 48px;
                color: #4a4a4a;
                line-height: 1.5;
            }
            .up{
                position: relative;
                margin-bottom: 40px;
                .up-percent{
                    position: relative;
                }
                .trigle-up{
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-top: 0px;
                    border-bottom:8px;
                    border-left: 4px;
                    border-right: 4px;
                    border-style: solid;
                    top: 4px;
                    border-color: transparent transparent #599E0A transparent ;
                }
                span{
                    color: #599E0A;
                    padding-left: 12px;
                }
            }
            .down{
                position: relative;
                .down-percent{
                    position: relative;
                }
                .trigle-down{
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-top: 8px;
                    border-bottom:0px;
                    border-left: 4px;
                    border-right: 4px;
                    border-style: solid;
                    top: 4px;
                    border-color: #F63149 transparent transparent transparent;
                }
                span{
                    color: #F63149;
                    padding-left: 12px;
                }
            }
        }
        //右边部分
        .four-right{
            padding-left: 22px;
            width:calc(100% - 100px);
        }
    }
    //公共标题样式
    .detail-title{
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 22px;
        font-size: 18px;
        padding: 0px 22px 22px 22px;
        border-bottom: 1px solid #F3F3F3;
        .tit-one{
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            align-items: center;
            .squareFF739E{
                width: 16px;
                height: 16px;
                background: #FF739E;
                margin-right: 8px;
            }
        }
        .tit-two{
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            align-items: center;
            .default-focus{
                margin-right: 14px;
            }
        }
    }
}
</style>
