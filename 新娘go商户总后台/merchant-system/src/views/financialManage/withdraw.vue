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
                <div>提现</div>
            </div>
            <div class="content-two">
                <div class="two-item">
                    <div class="two-item-left">可提现金额：</div>
                    <div class="two-item-right">¥{{dataObj.cMoney}}</div>
                </div>
                <div class="two-item">
                    <div class="two-item-left">待到账金额：</div>
                    <div class="two-item-right">¥{{dataObj.wMoney}}</div>
                </div>
            </div>
            <div class="content-three">
                <el-form :model="ruleForm" :rules="rules" label-position="right" ref="ruleForm" label-width="100px" class="demo-ruleForm">   
                    <el-form-item label="金额" prop="value">
                        <el-input style="width:400px" v-model="ruleForm.value"></el-input> 元
                    </el-form-item>
                    <el-form-item label="支付宝姓名" prop="name">
                        <el-input style="width:400px" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="支付宝账号" prop="zfb">
                        <el-input style="width:400px" v-model="ruleForm.zfb"></el-input>
                    </el-form-item>
                    <div class="content-three-btn">
                        <el-button type="primary" @click="getWithdrawStoreWithZFBDraw(ruleForm)">确认</el-button>
                    </div>
                </el-form>
            </div>
            <div class="detail-title">
                <div class="squareFF739E"></div>
                <div>提现信息</div>
            </div>
            <div class="content-two">
                <el-table
                    ref="multipleTable"
                    :data="dataObj.logs"
                    tooltip-effect="dark"
                    border
                    style="width: 100%">
                    <el-table-column prop="zfb" label="支付宝账号"></el-table-column>
                    <el-table-column prop="date" label="提现时间"></el-table-column>
                    <el-table-column prop="status" label="提现状态"></el-table-column>
                    <el-table-column prop="money" label="提现金额"></el-table-column>
                </el-table>
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
            },//详情数据list:[{title:'今日',isFocus:false},{title:'本周',isFocus:false},{title:'本月',isFocus:false}]
            ruleForm:{
                value:'',
                name:'',
                zfb:''
            },
            rules:{//验证表单不可为空项
                value:[{required: true, message: '提现金额不能为空'}],
                name:[{required: true, message: '支付宝姓名不能为空'}],
                zfb:[{required: true, message: '支付宝账号不能为空'}]

            }
        }
    },
    computed:{
        ...mapGetters(['tk','headerChildTitle'])
    },
    mounted(){
        let ths = this;

        ths.xid = ths.$route.query.xid;
        ths.getWithdrawStoreDetail(ths.xid);
    },
    methods:{
        //获取详情数据
        getWithdrawStoreDetail(xid){
            let ths = this;
            let params = {
                tk:ths.tk
            };

            api.getWithdrawStoreDetail(params).then(res => {
                ths.dataObj = res.data;
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        getWithdrawStoreWithZFBDraw(ruleForm){
            let ths = this;
            let params = {
                tk:ths.tk,
                value:ruleForm.value,
                name:ruleForm.name,
                zfb:ruleForm.zfb
            };

            api.getWithdrawStoreDetail(params).then(res => {
                ths.$message({
                    message: '提现申请已提交',
                    type: 'error'
                });
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
    .content-three{
        padding-top: 22px;
        .content-three-btn{
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
        }
    }
}
</style>
