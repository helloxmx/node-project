<template>
    <div class="order-detail">
        <div><header-title :isParent="false" :title="headerChildTitle"></header-title></div>
        <div class="p22 backgroundfff">
            <!-- 提现信息 -->
            <div class="step-box">
                <div class="step-detail">
                    <div class="squareFF739E"></div>
                    <div>提现信息</div>
                </div>
                <div class="step-content">
                    <div class="step-row">
                        <div class="row-left">流水编号</div>
                        <div class="row-right">{{dataObj.id}}</div>
                    </div>
                    <div class="step-row">
                        <div class="row-left">用户类型</div>
                        <div class="row-right">{{dataObj.userType}}</div>
                    </div>
                    <div class="step-row">
                        <div class="row-left">支付宝姓名</div>
                        <div class="row-right">{{dataObj.userName}}</div>
                    </div>
                    <div class="step-row">
                        <div class="row-left">支付宝账号</div>
                        <div class="row-right">{{dataObj.zfb}}</div>
                    </div>
                    <div class="step-row">
                        <div class="row-left">提现金额</div>
                        <div class="row-right">{{dataObj.money}}</div>
                    </div>
                    <div class="step-row">
                        <div class="row-left">提现时间</div>
                        <div class="row-right">{{dataObj.createTime}}</div>
                    </div>
                    <div class="step-row">
                        <div class="row-left">到账时间</div>
                        <div class="row-right">{{dataObj.checkTime}}</div>
                    </div>
                    <div class="step-row">
                        <div class="row-left">提现状态</div>
                        <div class="row-right">{{dataObj.status}}</div>
                    </div>
                </div>
                <div v-if="dataObj.status=='待审核'" class="step-btn">
                    <!-- 类型 1审核通过 2审核驳回 -->
                    <el-button @click="openNotePop('2')">拒绝</el-button>
                    <el-button type="primary" @click="openNotePop('1')">通过</el-button>
                </div>
                <div v-if="dataObj.status=='待提现'" class="step-btn">
                    <!-- 类型 3通过 0不通过 -->
                    <el-button @click="openNotePop('0')">拒绝</el-button>
                    <el-button type="primary" @click="openNotePop('3')">提现</el-button>
                </div>
            </div>
            <div class="step-box">
                <div class="step-detail">
                    <div class="squareFF739E"></div>
                    <div>操作信息</div>
                </div>
                <div class="step-content">
                    <div class="step-row">
                        <el-table
                            ref="multipleTable"
                            border
                            :data="dataObj.logs"
                            tooltip-effect="dark"
                            style="width: 100%">
                            <el-table-column prop="name" label="操作者" width="160"></el-table-column>
                            <el-table-column prop="time" label="操作时间" width="200"></el-table-column>
                            <!-- <el-table-column prop="status" label="审核状态"></el-table-column> -->
                            <el-table-column prop="status" label="提现状态" width="100"></el-table-column>
                            <el-table-column prop="note" label="备注"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
        <note-pop v-if="isOpenNote" :operateType="operateType" @submitForm="submitNotePop" @closeFn="closeNotePop"></note-pop>
    </div>
</template>
<script>
import headerTitle from '@/components/common/headerTitle';
import notePop from '@/views/financialManage/withdraw/notePop';//操作备注
import api from '@/http/api';
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
    name: 'App',
    components:{
        headerTitle,//标题
        notePop
    },
    data(){
        return {
            xid:'',
            typeId:'',
            isOpenNote:false,//操作备注弹框
            operateType:'',//弹窗类型 0提现不通过 1审核通过 2审核不通过 3提现通过
            dataObj:{}
        }
    },
    computed:{
        ...mapGetters(['tk','headerChildTitle'])
    },
    mounted(){
        let ths = this;

        ths.xid = ths.$route.query.xid;//详情id
        ths.typeId = ths.$route.query.typeId;//类型
        ths.getWithdrawDetail();//获取详细信息
    },
    methods:{
        ...mapActions([
            'changeChildTitle'//跳转到子页面title
        ]),
        //获取详情数据
        getWithdrawDetail(){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.xid
            };

            api.getWithdrawDetail(params).then(res => {

                ths.dataObj = res.data;

            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //打开备注弹框
        openNotePop(type){
            let ths = this;

            ths.operateType = type;
            ths.isOpenNote = true;
        },
        //关闭弹框
        closeNotePop(){
            let ths = this;

            ths.isOpenNote = false;
        },
        //提交备注
        submitNotePop(form){
            let ths = this;

            switch (form.operateType){
            // 提现类型 1审核通过 2审核驳回
            case '0':
            case '3':
                ths.getWithdrawDoWithDraw(form);
                break;
            //审核类型 1审核通过 2审核驳回
            case '1':
            case '2':
                ths.getWithdrawCheck(form);
                break;
            default:
                break;
            }
            ths.isOpenNote = false;//关闭弹框
        },
        //审核金额
        getWithdrawCheck(form){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.xid,
                type:form.operateType,
                note:form.note
            };

            api.getWithdrawCheck(params).then(res => {

                ths.$message({
                    message: '操作提交成功',
                    type: 'error'
                });
                ths.getWithdrawDetail();//实时更新数据

            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //审核金额之后是否能提现
        getWithdrawDoWithDraw(form){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.xid,
                type:form.operateType,
                note:form.note
            };

            api.getWithdrawDoWithDraw(params).then(res => {

                ths.$message({
                    message: '操作提交成功',
                    type: 'error'
                });
                ths.getWithdrawDetail();//实时更新数据

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
            margin-left: 22px;
            .step-row{
                display: -webkit-flex;
                display: flex;
                flex-direction: row;
                border-top: solid 1px #ebeef5;
                border-left: solid 1px #ebeef5;
                border-right: solid 1px #ebeef5;
                &:last-child{
                    border-bottom: solid 1px #ebeef5;
                }
                .row-left{
                    display: -webkit-flex;
                    display: flex;
                    flex-direction: row-reverse;
                    border-right: solid 1px #ebeef5;
                    padding: 12px;
                    width:120px;
                }
                .row-right{
                    padding: 12px;
                }
            }
        }
        .step-btn{
            display: -webkit-flex;
            display: flex;
            justify-content: center;
            padding-top: 30px;
        }
    }
}
</style>
