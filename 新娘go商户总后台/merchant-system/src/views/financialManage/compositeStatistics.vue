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
                <div>订单统计</div>
            </div>
            <div class="content-one">
                <div class="tit-two">
                    <div class="export-btn">
                        <el-button plain>导出数据</el-button>
                    </div>
                    <div class="date-btns">
                        <el-button-group>
                            <el-button plain>全部</el-button>
                            <el-button plain>最近30天</el-button>
                            <el-button plain>最近90天</el-button>
                        </el-button-group>
                    </div>
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
            <div class="content-two">
                <div class="two-item">
                    <div class="two-item-left">销售总额：</div>
                    <div class="two-item-right">{{count}}</div>
                </div>
                <div class="two-item">
                    <div class="two-item-left">有效订单总数：</div>
                    <div class="two-item-right">{{count}}</div>
                </div>
                <div class="two-item">
                    <div class="two-item-left">无效订单总数(关闭或拒接)：</div>
                    <div class="two-item-right">{{count}}</div>
                </div>
                <div class="two-item">
                    <div class="two-item-left">无效订单总额：</div>
                    <div class="two-item-right">{{count}}</div>
                </div>
                <div class="two-item">
                    <div class="two-item-left">已成交订单总数：</div>
                    <div class="two-item-right">{{count}}</div>
                </div>
                <div class="two-item">
                    <div class="two-item-left">已成交订单总额：</div>
                    <div class="two-item-right">{{count}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import headerTitle from '@/components/common/headerTitle';
import myButton from '@/components/common/myButton';
import api from '@/http/api';
export default {
    components:{
        headerTitle,
        myButton
    },
    data(){
        return {
            xid:'',//xid
            page: 1,
            pageSize:10,
            total:0,
            count:'1000',
            dataObj:{
                type:'哈哈哈哈哈哈'//类型
            }//详情数据list:[{title:'今日',isFocus:false},{title:'本周',isFocus:false},{title:'本月',isFocus:false}]

        }
    },
    computed:{
        ...mapGetters(['tk','headerChildTitle'])
    },
    mounted(){
        let ths = this;

        ths.xid = ths.$route.query.xid;
        ths.getCommodityDetail(ths.xid);
    },
    methods:{
        //获取商户详情数据
        getCommodityDetail(xid){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:xid//商户Id
            };

            api.getCommodityDetail(params).then(res => {
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
    .content-one{
        display: -webkit-flex;
        display: flex;
        flex-direction: row-reverse;
        margin-bottom: 22px;
        .tit-two{
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            align-items: center;
            .export-btn{
                padding-right: 12px;
            }
            .date-btns{
                padding-right: 12px;
            }
            .default-focus{
                margin-right: 14px;
            }
        }
    }
    .content-two{
        .two-item{
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            align-items: center;
            border-top: 1px solid #dcdfe6;
            border-left: 1px solid #dcdfe6;
            border-right: 1px solid #dcdfe6;
            &:last-child{
                border-bottom: 1px solid #dcdfe6;
            }
            .two-item-left{
                width: 280px;
                padding: 22px;
                border-right: 1px solid #dcdfe6;
            }
            .two-item-right{
               padding: 22px;
            }
        }
    }
}
</style>
