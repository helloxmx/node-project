<template>
    <div>
        <div>
            <div><header-title :isParent="false" :hasback="false" :title="headerChildTitle"></header-title></div>
            <!-- 0-待付款 1-已付款待接订单 2-服务中 3-待操作退款 4-待处理提现 5-服务完待评价 6-服务完已评价 7-关闭 -->
            <div class="order-btns">
                <el-button type="primary" plain @click="orderStatusFn('全部订单')">全部订单({{orderData.all}})</el-button>
                <el-button type="primary" plain @click="orderStatusFn('待付款')">待付款({{orderData.waitPay}})</el-button>
                <el-button type="primary" plain @click="orderStatusFn('已完成')">已完成({{orderData.done}})</el-button>
                <el-button type="primary" plain @click="orderStatusFn('待接单')">待接单({{orderData.waitService}})</el-button>
                <el-button type="primary" plain @click="orderStatusFn('已关闭')">已关闭({{orderData.close}})</el-button>
            </div>
            <div class="p22">
                <div class="mb22">
                    <select-header :isSelect="true" @openSelectBox="openSelectBox" :hasAdvanced="true" @advancedFn="openAdvanced"></select-header>
                    <div v-if="isOpen" class="select-pulldown p22 backgroundfff">
                        <div class="my-select-items">
                            <div class="my-select-item">
                                <el-form :inline="true" ref="form" :model="form" label-width="80px">
                                    <el-form-item label="商户名称">
                                        <el-input v-model="form.storeName" clearable :style="{width:formWidth}" placeholder="商户ID/账号"></el-input>
                                    </el-form-item>
                                    <el-form-item label="收货人">
                                        <el-input v-model="form.rUser" clearable  :style="{width:formWidth}" placeholder="商户名称"></el-input>
                                    </el-form-item>
                                    <el-form-item label="提交时间">
                                        <el-date-picker
                                            v-model="form.cTime"
                                            type="date"
                                            placeholder="选择日期时间"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                            :style="{width:formWidth}" >
                                            </el-date-picker>
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
                        <!-- <my-button :isExportOrder="true" @exportOrderFn="exportOrderFn"></my-button> -->
                    </div>
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        @selection-change="handleSelectionChange"
                        style="width: 100%">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="orderCode" label="订单编号" width="160"></el-table-column>
                        <el-table-column prop="userId" label="用户账号" width="160"></el-table-column>
                        <el-table-column prop="type" label="订单类型"></el-table-column>
                        <el-table-column prop="storeName" label="商户名称" width="100"></el-table-column>
                        <el-table-column prop="fee" label="订单金额" width="100">
                            <template slot-scope="scope">
                                <div style="margin-left: 10px">¥{{scope.row.fee}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="status" label="订单状态" width="100"></el-table-column>
                        <el-table-column prop="createTime" label="提交时间"></el-table-column>
                        <el-table-column fixed="right" label="操作" width="150">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" style=""
                                @click.native.prevent="showRow(scope.$index, tableData)">查看订单</el-button>
                                <!-- 待付款状态的订单可以关闭 -->
                                <el-button v-if="scope.row.status == '待付款'" type="text" size="small" style=""
                                @click.native.prevent="orderCloseFn(scope.row.orderId)">关闭订单</el-button>
                                <!-- 待接单状态的订单可以取消 -->
                                <el-button v-if="scope.row.status == '待接单'" type="text" size="small" style=""
                                @click.native.prevent="orderCancleFn(scope.row)">取消订单</el-button>
                                <!-- 已关闭状态的订单可以删除 -->
                                <!-- <el-button v-if="scope.row.status == '已关闭'" type="text" size="small" style=""
                                @click.native.prevent="closeRow(scope.$index, tableData)">删除订单</el-button> -->
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="footer-page">
                        <div>
                           <el-button :disabled="!hasSelect" type="primary" @click="orderBackBatchOperation('0')">关闭订单</el-button>
                           <el-button :disabled="!hasSelect" type="primary" @click="orderBackBatchOperation('1')">删除订单</el-button>
                        </div>
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
        <order-bobm1 v-if="isClose" bobmTitle="关闭订单" listTitle="操作"
            @closeFn="closeCloseFn" @submitForm="submitClose"></order-bobm1>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import selectHeader from '@/components/common/selectHeader';
import headerTitle from '@/components/common/headerTitle';
import myButton from '@/components/common/myButton';
import advancedSearch from '@/views/orderManage/advancedSearch'
import orderBobm1 from '@/views/orderManage/orderBobm1';//关闭订单/备注订单
import api from '@/http/api';
export default {
    components:{
        selectHeader,
        myButton,
        headerTitle,
        advancedSearch,
        orderBobm1
    },
    data(){
        return {
            isAdvancedSearch:false,//高级搜索
            isClose:false,//待付款-关闭
            isOpen:true,//是否打开筛选框
            isSelectId:'',//关闭/取消 按钮选中行的id

            keyWord:'',//商户账号关键字
            orderData:{},//订单统计数据
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: '',

            //搜索条件
            form: {
                rUser: '',//收货人名字或手机
                orderId:'',//订单账号
                status:'',//订单状态
                type: '',//订单类型
                cTime: '',//下单时间
                storeName:''//商户名称
            },

            tableData: [],
            pageSize:10,
            page: 1,
            total:0,
            hasSelect:false,//是否有选中数据
            selectList:[],//批量选择选中的数据
            screenHeight:500,
            formWidth:'190px'
        }
    },
    computed:{
        ...mapGetters(['tk','headerChildTitle'])
    },
    mounted(){
        let ths = this;

        ths.getOrderList(ths.form);//获取列表数据
        ths.getBackOrderStaticsNum(); //订单数据统计
    },
    methods: {
        ...mapActions([
            'changeChildTitle'//跳转到子页面title
        ]),
        //获取列表数据
        getOrderList(data){
            let ths = this;
            let params = {
                tk:ths.tk,
                rUser: data.rUser,//收货人名字或手机
                orderId:data.orderId,//订单账号
                status:data.status,//订单状态
                type: data.type,//订单类型
                cTime: data.cTime,//下单时间
                storeName:data.storeName,//商户名称
                page:ths.page,
                pageSize:ths.pageSize
            };

            api.getOrderList(params).then(res => {
                ths.tableData = res.data.data;
                for (let key in ths.tableData) { //处理推荐或者不推荐数据
                    ths.tableData[key].fee = ths.tableData[key].fee ? ths.tableData[key].fee.toFixed(2) : '0.00';
                }
                ths.total = res.data.total;

                ths.isAdvancedSearch = false;//关闭弹框
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //获取订单统计数据
        getBackOrderStaticsNum(data){
            let ths = this;
            let params = {
                tk:ths.tk
            };

            api.getBackOrderStaticsNum(params).then(res => {
                ths.orderData = res.data;
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //订单统计数据按钮筛选列表
        orderStatusFn(status){
            let ths = this;

            switch (status){
            case '全部订单' :
                ths.form.status = '';
                break;
            case '待付款' :
                ths.form.status = '0'
                break;
            case '已完成' :
                ths.form.status = '6'
                break;
            case '待接单' :
                ths.form.status = '1'
                break;
            case '已关闭' :
                ths.form.status = '7'
                break;
            default:
                break;
            }
            ths.getOrderList(ths.form);//获取列表数据
        },
        //高级搜索
        submitForm(data){
            let ths = this;

            ths.getOrderList(data);
        },
        //展开高级搜索
        openAdvanced(){
            let ths = this;

            ths.isAdvancedSearch = true;
        },
        // 下拉选择事件
        selectChange(id){
            let ths = this;

            ths.typeId = id;
        },
        //导出订单
        exportOrderFn(){

        },
        //关闭高级搜索
        closeFn(){
            let ths = this;

            ths.isAdvancedSearch = false;
        },
        // 取消订单按钮
        orderCancleFn(row){
            let ths = this;

            ths.isSelectId = row.orderId;//选中行id
            ths.$router.push({
                name: 'orderCancle',
                query: {
                    orderId:row.orderId,
                    payCash:row.fee

                }
            })
        },
        // 打开 关闭订单弹窗
        orderCloseFn(id){
            let ths = this;

            ths.isClose = true;
            ths.isSelectId = id;//选中行id
        },
        //关闭 关闭订单操作弹框
        closeCloseFn(){
            let ths = this;

            ths.isClose = false;
        },
        //提交---关闭订单窗口
        submitClose(content){
            let ths = this;
            let params = {
                tk:ths.tk,
                xid:ths.isSelectId,
                note:content
            };

            api.orderClose(params).then(res => {
                ths.$message.success({
                    message: '提交成功',
                    type: 'success'
                });
                ths.isClose = false;//关闭弹窗
                ths.getOrderList(ths.form);//获取列表数据

            }).catch(e => {
                ths.$message({
                    message: '提交失败',
                    type: 'error'
                });
            })
        },
        //关键字获取列表对应数据
        searchFn(){
            let ths = this;

            ths.page = 1;
            ths.getOrderList(ths.form);

        },
        handleSizeChange(val) {
            let ths = this;

            ths.pageSize = val;
        },
        handleCurrentChange(val) {
            let ths = this;

            ths.page = val;
            ths.getOrderList(ths.form);
        },
        //批量选择
        handleSelectionChange(val){
            let ths = this ;

            ths.selectList = val;
            if (ths.selectList.length !=0){
                ths.hasSelect = true;
            } else {
                ths.hasSelect = false;
            }
        },
        //批量操作-0 关闭订单 1删除订单
        orderBackBatchOperation(type){
            let ths = this;
            let ids = [];

            switch (type){
            case '0'://关闭订单
                for (let key in ths.selectList){
                    if (ths.selectList.status == '待付款'){
                        ids.push(ths.selectList.orderId);
                    } else {
                        ths.$message({
                            message: '只有待付款状态的订单可关闭',
                            type: 'warning'
                        });
                        return false;
                    }
                }
                break;
            case '1'://删除订单
                for (let key in ths.selectList){
                    if (ths.selectList.status == '已关闭'){
                        ids.push(ths.selectList.orderId);
                    } else {
                        ths.$message({
                            message: '只有已关闭状态的订单可关闭',
                            type: 'warning'
                        });
                        return false;
                    }
                }
                break;
            default:
                break;
            }
            let params = {
                tk:ths.tk,
                ids:ids
            };

            api.orderBackBatchOperation(params).then(res => {
                ths.$message({
                    message: '提交成功',
                    type: 'success'
                });
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
        //推荐或者不推荐的操作按钮
        recommendSwitch(value){
            let recommend = 0;

            if (value === true) {
                recommend = 1;
            } else {
                recommend = 0;
            }
        },
        //查看订单
        showRow(index, rows) {
            let ths = this;
            let row = rows.splice(index,1)[0];//当前选中行的数据[{}]

            this.$router.push({
                name: 'orderDetail',
                query: {
                    orderId:row.orderId
                    // type:row.type
                }
            })
            ths.changeChildTitle('订单详情')//跳转的时候将header的值存入store中
        },
        //编辑
        editRow(index, rows) {
            let ths = this;
            let row = rows.splice(index, 1)[0];//当前选中行的数据[{}]

            this.$router.push({
                name: 'editInfo',
                query: {
                    xid:row.id
                }
            })
            ths.changeChildTitle('编辑信息')//跳转的时候将header的值存入store中
        },
        //删除
        closeRow(index, rows) {
            rows.splice(index, 1);
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
.order-btns{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    padding: 22px 22px 0px 22px;
}
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
        flex-direction: row;
        justify-content: space-between;
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
