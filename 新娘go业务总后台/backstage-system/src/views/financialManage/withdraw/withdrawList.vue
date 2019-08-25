<template>
    <div>
        <div>
            <div><header-title :isParent="false" :hasback="false" :title="headerChildTitle"></header-title></div>
            <div class="p22">
                <div class="mb22">
                    <select-header
                    :isSelect="true" @openSelectBox="openSelectBox"
                    :hasAdvanced="true" @advancedFn="openAdvanced"></select-header>
                    <div v-if="isOpen" class="select-pulldown p22 backgroundfff">
                        <div class="my-select-items">
                            <div class="my-select-item">
                                <el-form :inline="true" ref="form" :model="form" label-width="80px">
                                    <el-form-item label="流水编号">
                                        <el-input v-model="form.xid" clearable placeholder="商户ID/账号"></el-input>
                                    </el-form-item>
                                    <el-form-item label="提现账号">
                                        <el-input v-model="form.xid" clearable placeholder="商户ID/账号"></el-input>
                                    </el-form-item>
                                    <el-form-item label="提现状态">
                                        <el-select v-model="form.status" style="width:220px;" placeholder="请选择分类">
                                            <el-option
                                            v-for="item in options2"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div style="width:98px;">
                                <my-button :isSearch="true" @searchFn="searchFn"></my-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list-table backgroundfff">
                    <div class="table-title">
                        <select-header title="数据列表" :isList="true"></select-header>
                        <!-- 批量对账暂时不做 -->
                        <!-- <el-button type="primary" :disabled="isBatchCheck" @click="orderBatchCheckOrder">批量对账</el-button> -->
                    </div>
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="id" label="流水编号" width="160"></el-table-column>
                        <el-table-column prop="userName" label="姓名" width="160"></el-table-column>
                        <el-table-column prop="money" label="提现金额">
                            <template slot-scope="scope">
                                <div style="margin-left: 10px">¥{{scope.row.money}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="userType" label="用户类型" width="100"></el-table-column>
                        <el-table-column prop="createTime" label="提现时间" width="100"></el-table-column>
                        <el-table-column prop="checker" label="核对人员"></el-table-column>
                        <el-table-column prop="checkTime" label="到账时间"></el-table-column>
                        <el-table-column prop="status" label="提现状态" width="100"></el-table-column>
                        <el-table-column fixed="right" label="操作" width="150">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" style=""
                                @click.native.prevent="showRow(scope.$index, tableData)">查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="footer-page">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-sizes="[10,20,30,40]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <advanced-search v-if="isAdvancedSearch" @submitForm="submitForm" @closeFn="closeFn"></advanced-search>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import selectHeader from '@/components/common/selectHeader';
import headerTitle from '@/components/common/headerTitle';
import myButton from '@/components/common/myButton';
import advancedSearch from '@/views/financialManage/withdraw/advancedSearch';
import api from '@/http/api';
export default {
    components:{
        selectHeader,
        myButton,
        headerTitle,
        advancedSearch
    },
    data(){
        return {
            isAdvancedSearch:false,//高级搜索
            isOpen:true,//是否打开筛选框

            form:{//搜索关键字
                id:'',//订单编号
                code:'',//
                status:''//对账状态
            },
            options2: [ // 状态:0提交未审核 1审核通过 2驳回 3已处理(退款已完成)
                {
                    value: null,
                    label: '全部'
                }, {
                    value: '0',
                    label: '提交未审核'
                }, {
                    value: '1',
                    label: '审核通过'
                }, {
                    value: '2',
                    label: '驳回'
                }, {
                    value: '3',
                    label: '已处理(退款已完成)'
                }
            ],

            isBatchCheck:true,
            tableData: [],
            pageSize:10,
            page: 1,
            total:0,
            screenHeight:500
            // screenHeight: document.body.clientHeight - 800
        }
    },
    computed:{
        ...mapGetters(['tk','headerChildTitle'])
    },
    mounted(){
        let ths = this;

        ths.getWithdrawListAdmin();//获取列表数据 标题关键字/文章类型/文章当前页
    },
    methods: {
        ...mapActions([
            'changeChildTitle'//跳转到子页面title
        ]),
        //获取列表数据
        getWithdrawListAdmin(){
            let ths = this;
            let params = {
                tk:ths.tk,
                id:ths.form.id,//流水号
                code:ths.form.code,
                status:ths.form.status,
                page:ths.page,
                pageSize:ths.pageSize
            };

            api.getWithdrawListAdmin(params).then(res => {
                ths.tableData = res.data.data;
                for (let key in ths.tableData) { //处理推荐或者不推荐数据
                    ths.tableData[key].money = ths.tableData[key].money ? ths.tableData[key].money.toFixed(2) : '0.00';
                }
                ths.total = res.data.total;
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //展开高级搜索
        openAdvanced(){
            let ths = this;

            ths.isAdvancedSearch = true;
        },
        //高级搜索开始检索
        submitForm(data){
            let ths = this;

            ths.form.xid = data.xid;//搜索关键字
            ths.form.money = data.money;//金额
            ths.form.status = data.status;//对账状态
            ths.form.payChannel = data.payChannel;//支付方式
            ths.form.day = data.day;// 支付时间
            ths.form.cTime = data.cTime;// 对账时间
            ths.getWithdrawListAdmin();
            ths.isAdvancedSearch = false;
        },
        closeFn(){
            let ths = this;

            ths.isAdvancedSearch = false;
        },
        //关键字获取列表对应数据
        searchFn(){
            let ths = this;

            ths.page = 1;
            ths.getWithdrawListAdmin();

        },
        handleSizeChange(val) {
            let ths = this;

            ths.pageSize = val;

            ths.getWithdrawListAdmin();
        },
        handleCurrentChange(val) {
            let ths = this;

            ths.page = val;
            ths.getWithdrawListAdmin();
        },
        //查看
        showRow(index, rows) {
            let ths = this;
            let row = rows.splice(index,1)[0];//当前选中行的数据[{}]

            this.$router.push({
                name: 'withdrawDetail',
                query: {
                    xid:row.id,
                    typeId:row.statusId
                }
            })
            ths.changeChildTitle('对账详情')//跳转的时候将header的值存入store中
        },
        // 是否展开搜索框
        openSelectBox(value){
            let ths = this;

            ths.isOpen = value;
        },
        //批量对账
        orderBatchCheckOrder(){
            let ths = this;
            let params = {
                tk:ths.tk,
                type:ths.form.xid,//1 已对账 2异常 3已冲正
                ids:[]
            };

            api.orderBatchCheckOrder(params).then(res => {
                ths.tableData = res.data;
                ths.total = res.data.total;
                for (let key in ths.tableData) { //处理推荐或者不推荐数据
                    if (ths.tableData[key].recommend == 0){
                        ths.tableData[key].recommend = false;
                    } else {
                        ths.tableData[key].recommend = true;
                    }
                }
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
.list-table{
    .table-title{
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-right: 22px;
        border-bottom: 1px solid #e9eaed;
    }
    .footer-page{
        padding: 16px;
        display: -webkit-flex;
        display: flex;
        flex-direction: row-reverse;
    }
}
.single-btn{
    width: 100px;
    height: 32px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    &:last-child{
        margin-right: 0px;
    }
}
.single-size{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
}
</style>
