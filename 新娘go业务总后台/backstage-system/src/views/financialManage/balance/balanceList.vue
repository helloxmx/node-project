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
                                    <el-form-item label="订单编号">
                                        <el-input v-model="form.xid" clearable placeholder="商户ID/账号"></el-input>
                                    </el-form-item>
                                    <el-form-item label="金额范围">
                                        <el-select v-model="form.money" style="width:220px;" placeholder="请选择分类">
                                            <el-option
                                            v-for="item in options1"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="对账状态">
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
                        <el-table-column prop="xid" label="订单编号" width="160"></el-table-column>
                        <el-table-column prop="fee" label="订单金额" width="160">
                            <template slot-scope="scope">
                                <div style="margin-left: 10px">¥{{scope.row.fee}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="payChannel" label="支付方式"></el-table-column>
                        <el-table-column prop="payTime" label="支付时间" width="100"></el-table-column>
                        <el-table-column prop="checkUser" label="对账人员" width="100"></el-table-column>
                        <el-table-column prop="checkTime" label="对账时间"></el-table-column>
                        <el-table-column prop="checkStatus" label="状态" width="100"></el-table-column>
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
import advancedSearch from '@/views/financialManage/balance/advancedSearch';
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
                xid:'',//订单编号
                money:'',//金额
                status:'',//对账状态
                payChannel:'',//支付方式
                day:'',// 支付时间
                cTime:''// 对账时间
            },
            options1: [ //金额范围1 100以下 2 100至200 以此类推
                {
                    value: null,
                    label: '全部'
                },{
                    value: '1',
                    label: '100元以下'
                },{
                    value: '2',
                    label: '100-200元'
                },{
                    value: '3',
                    label: '200-500元'
                },{
                    value: '4',
                    label: '500-1000元'
                },{
                    value: '5',
                    label: '1000元以上'
                }
            ],
            options2: [ // 0未对账 1已经对账 2异常 3已冲正
                {
                    value: null,
                    label: '全部'
                }, {
                    value: '0',
                    label: '未对账'
                }, {
                    value: '1',
                    label: '已对账'
                }, {
                    value: '2',
                    label: '异常'
                }, {
                    value: '3',
                    label: '已冲正'
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

        ths.getOrderBackCheckOrder();//获取列表数据 标题关键字/文章类型/文章当前页
    },
    methods: {
        ...mapActions([
            'changeChildTitle'//跳转到子页面title
        ]),
        //获取列表数据
        getOrderBackCheckOrder(){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.form.xid,//订单号
                money:ths.form.money,
                status:ths.form.status,
                payChannel:'',
                day:'',
                cTime:'',
                page:ths.page,
                pageSize:ths.pageSize
            };

            api.getOrderBackCheckOrder(params).then(res => {
                ths.tableData = res.data.data;
                ths.total = res.data.total;
                for (let key in ths.tableData) { //处理推荐或者不推荐数据
                    ths.tableData[key].fee = ths.tableData[key].fee ? ths.tableData[key].fee.toFixed(2) : '0.00';
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
            ths.getOrderBackCheckOrder();
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
            ths.getOrderBackCheckOrder();

        },
        handleSizeChange(val) {
            let ths = this;

            ths.pageSize = val;

            ths.getOrderBackCheckOrder();
        },
        handleCurrentChange(val) {
            let ths = this;

            ths.page = val;
            ths.getOrderBackCheckOrder();
        },
        //查看
        showRow(index, rows) {
            let ths = this;
            let row = rows.splice(index,1)[0];//当前选中行的数据[{}]

            this.$router.push({
                name: 'balanceDetail',
                query: {
                    xid:row.xid,
                    type:row.checkStatus
                }
            })
            ths.changeChildTitle('对账详情')//跳转的时候将header的值存入store中
        },
        // 是否展开搜索框
        openSelectBox(value){
            let ths = this;

            ths.isOpen = value;
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
