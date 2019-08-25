<template>
    <div class="refund-detail">
        <div><header-title :isParent="false" :title="headerChildTitle"></header-title></div>
        <div class="p22 backgroundfff">
            <div class="refund-box">
                <el-form :model="ruleForm" label-position="right" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                    <div class="step-detail">
                        <div class="squareFF739E"></div>
                        <div>用户信息</div>
                    </div>
                    <div class="step-refund">
                        <el-form-item label="订单编号：">{{dataObj.xid}}</el-form-item>
                        <el-form-item label="申请状态：">{{dataObj.status}}</el-form-item>
                        <el-form-item label="申请时间：">{{dataObj.applyTime}}</el-form-item>
                        <el-form-item label="用户账号：">{{dataObj.userId}}</el-form-item>
                    </div>
                    <div class="step-detail">
                        <div class="squareFF739E"></div>
                        <div>订单信息</div>
                    </div>
                    <div class="step-refund">
                        <el-form-item label="订单金额：">{{dataObj.fee}}</el-form-item>
                        <el-form-item label="确认退款金额：">
                            <el-input type="number" v-model="ruleForm.refundFee" style="width:400px" placeholder="请确认退款金额"></el-input>
                        </el-form-item>
                        <el-form-item label="退款方式：">{{dataObj.refundWay}}</el-form-item>
                        <el-form-item label="退款类型：">{{dataObj.refundType}}</el-form-item>
                        <el-form-item label="退款原因：">{{dataObj.refundReason}}</el-form-item>
                    </div>
                    <div class="step-detail">
                        <div class="squareFF739E"></div>
                        <div>操作信息</div>
                    </div>
                    <div v-if="dataObj.status == '已完成'" class="step-refund">
                        <el-form-item label="处理人员：">{{dataObj.dealUser}}</el-form-item>
                        <el-form-item label="处理时间：">{{dataObj.dealTime}}</el-form-item>
                        <el-form-item label="操作备注：">{{dataObj.refundMoney}}</el-form-item>
                    </div>
                    <div v-if="dataObj.status == '待处理'" class="step-refund">
                        <el-form-item label="处理备注：">
                            <el-input v-model="ruleForm.note"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            type="textarea" style="width:400px" placeholder="请输入处理备注"></el-input>
                        </el-form-item>
                    </div>
                    <div v-if="dataObj.status == '待处理'" class="refund-btn">
                        <div>
                            <el-button @click="orderDealRefund('ruleForm','2')">拒绝退款</el-button>
                            <el-button type="primary" @click="orderDealRefund('ruleForm','1')">确认退款</el-button>
                        </div>
                    </div>
                </el-form>
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
            ruleForm:{
                note:'',
                refundFee:''
            },

            dataObj:{ //订单详情
                business:1,//订单状态
                readTimes:100,//点赞数
                title:'',//文章标题
                type:'',//文章分类
                userId:'',//商户ID
                cover:'',//封面
                statusName:'待付款'
            },
            tableData: [],//数据
            operatorTableData:[]//操作数据
        }
    },
    computed:{
        ...mapGetters(['tk','headerChildTitle'])
    },
    mounted(){
        let ths = this;

        ths.xid = ths.$route.query.xid;//详情id
        let type = ths.$route.query.type;//类型

        ths.orderRefundDetail();//获取详细信息
    },
    methods:{
        ...mapActions([
            'changeChildTitle'//跳转到子页面title
        ]),
        //获取详情数据
        orderRefundDetail(){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.xid
            };

            api.orderRefundDetail(params).then(res => {

                ths.dataObj = res.data;

            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            if (rowIndex % 2 === 0) {
                if (columnIndex === 0) {
                    return [1, 2];
                } else if (columnIndex === 1) {
                    return [0, 0];
                }
            }
        },
        // 打开---关闭订单窗口
        closeOrder(){
            let ths = this;

            ths.isClose = true;
        },
        //打开---取消订单窗口
        cancleOrder(){
            let ths = this;

            ths.$router.push({
                name:'orderCancle',
                query:{
                    orderId:ths.orderId,
                    payCash:ths.dataObj.infos.payCash
                }
            });
            ths.changeChildTitle('取消订单');//跳转后的页面title
        },
        //打开---删除订单窗口
        deleteOrder(){
            let ths = this;

            ths.isDelete = true;
        },
        //打开---备注订单窗口
        remarkOrder(){
            let ths = this;

            ths.isRemark = true;
        },
        // 关闭---关闭订单窗口
        CloseCloseFn(){
            let ths = this;

            ths.isClose = false;
        },
        //关闭---备注订单窗口
        remarkCloseFn(){
            let ths = this;

            ths.isRemark = false;
        },
        //提交---关闭订单窗口
        submitClose(content){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.orderId,
                note:content
            };

            api.orderClose(params).then(res => {
                ths.$message.success({
                    message: '提交成功',
                    type: 'success'
                });
                ths.isClose = false;//关闭弹窗

            }).catch(e => {
                ths.$message({
                    message: '提交失败',
                    type: 'error'
                });
            })
        },
        //提交---备注订单窗口
        submitRemark(content){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.orderId,
                note:content
            };

            api.orderRemark(params).then(res => {
                ths.$message.success({
                    message: '提交成功',
                    type: 'success'
                });
                ths.isRemark = false;//关闭弹窗

            }).catch(e => {
                ths.$message({
                    message: '提交失败',
                    type: 'error'
                });
            })
        },
        //拒绝或者通过退款
        orderDealRefund(ref,type){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.xid,
                status:type,//1 通过 2拒绝
                note:ths.ruleForm.note,
                refundFee:ths.ruleForm.refundFee
            };

            api.orderDealRefund(params).then(res => {
                ths.$message.success({
                    message: '提交成功',
                    type: 'success'
                });
                this.$refs[ref].resetFields();//清空数据
            }).catch(e => {
                ths.$message({
                    message: '提交失败',
                    type: 'error'
                });
            })
        }

    }
}
</script>

<style lang="scss">
.refund-detail{
    .refund-box{
        margin-bottom:40px;
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
        .step-refund{
            font-size: 16px;
            padding-left: 22px;
            .refund-title{

            }
            .refund-content{

            }
        }
        .refund-btn{
            width: 100%;
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            justify-content: center;
        }
    }
}
</style>
