<template>
    <div class="order-detail">
        <div><header-title :isParent="false" :title="headerChildTitle"></header-title></div>
        <div class="p22 backgroundfff">
            <el-form :model="ruleForm" :rules="rules" label-position="right" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <div class="doubleColumn">
                    <el-form-item label="操作" prop="note">
                        <el-input :autosize="{ minRows: 5, maxRows: 10}" type="textarea" v-model="ruleForm.note"></el-input>
                    </el-form-item>
                    <el-form-item label="取消原因" prop="reason">
                        <el-input :autosize="{ minRows: 5, maxRows: 10}" type="textarea" v-model="ruleForm.reason"></el-input>
                    </el-form-item>
                    <!-- <div>会记录在订单备注中</div> -->
                    <el-form-item label="订单金额">{{payCash}}</el-form-item>
                    <el-form-item label="退款方式">
                        <el-radio-group v-model="ruleForm.type">
                            <el-radio :label="0">退回到原支付渠道（全额退款）</el-radio>
                            <el-radio :label="1">生成退款申请（部分退款）</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="确认退款金额" prop="refund">
                        <el-input type="text" v-model="ruleForm.refund"></el-input>
                    </el-form-item>
                    <el-form-item label="退款原因" prop="refundReason">
                        <el-input :autosize="{ minRows: 5, maxRows: 10}" type="textarea" v-model="ruleForm.refundReason"></el-input>
                    </el-form-item>
                </div>
                <div class="order-btn">
                    <el-button @click="cancleOperate('ruleForm')">取消</el-button>
                    <el-button type="primary" @click="orderCancle(ruleForm,'ruleForm')">确认</el-button>
                </div>
            </el-form>
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
            orderId:'',//id
            payCash:'',//订单金额
            ruleForm:{
                note:'',//操作备注
                reason:'',//取消原因
                refundReason:'',//退款原因
                type:1,//0表示全款 1表示部分退款
                refund:''//应返回金额
            },
            rules:{//验证表单不可为空项
                note:[{required: true, message: '操作备注不能为空'}],
                reason:[{required: true, message: ' 取消原因不能为空'}],
                refundReason:[{required: true, message: ' 退款原因不能为空'}],
                refund:[{required: true, message: '金额确认不能为空'}]
            }
        }
    },
    computed:{
        ...mapGetters(['tk','headerChildTitle'])
    },
    mounted(){
        let ths = this;

        ths.orderId = ths.$route.query.orderId;//详情id
        ths.payCash = ths.$route.query.payCash;//订单金额

    },
    methods:{
        ...mapActions([
            'changeChildTitle'//跳转到子页面title
        ]),
        //获取详情数据
        getOrderDetail(){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.orderId
            };

            api.getOrderDetail(params).then(res => {

                let result = res.data;

                ths.dataObj = result;

                ths.tableData = [];//清除原来的数据

                let infos = result.infos;

                if (result.orderCookBook){
                    infos.cookName = result.orderCookBook.name;
                    infos.cookPrice = result.orderCookBook.price;
                    infos.cookTotal = result.orderCookBook.total;
                    infos.hotelcommodityName = result.orderHotel.commodityName;
                    infos.hotelcover = result.orderHotel.cover;
                    infos.hotelname = result.orderHotel.name;
                }
                ths.tableData.push(infos);
                ths.operatorTableData = result.logs;

            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //取消操作
        cancleOperate(){
            let ths = this;

            ths.$router.go(-1);
        },
        //提交 取消的订单
        orderCancle(form,ruleForm){
            let ths = this;

            let params = {
                tk:ths.tk,
                xid:ths.orderId,
                note:form.note,
                reason:form.reason,
                refundReason:form.refundReason,
                type:form.type,
                refund:form.refund
            };


            api.orderCancle(params).then(res => {
                ths.$message({
                    message: '提交成功',
                    type: 'success'
                });
                this.$refs[ruleForm].resetFields();
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
    .order-btn{
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
}
</style>
