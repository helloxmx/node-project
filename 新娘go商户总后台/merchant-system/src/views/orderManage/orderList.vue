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
                                    <el-form-item label="输入搜索">
                                        <el-input v-model="form.orderId" clearable :style="{width:formWidth}" placeholder="订单编号/商品货号"></el-input>
                                    </el-form-item>
                                    <el-form-item label="用户账号">
                                        <el-input v-model="form.rUser" clearable  :style="{width:formWidth}" placeholder="购买用户昵称/手机号"></el-input>
                                    </el-form-item>
                                    <el-form-item label="服务时间">
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
                        <div class="table-btns">
                            <my-button class="pl12" :isExportOrder="true" @exportOrderFn="exportOrderFn"></my-button>
                        </div>
                    </div>
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        @selection-change="batchSelect"
                        style="width: 100%">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="orderCode" label="序号" width="160"></el-table-column>
                        <el-table-column prop="createTime" label="提交时间"></el-table-column>
                        <el-table-column prop="userName" label="用户昵称" width="160"></el-table-column>
                        <el-table-column prop="commodityName" label="商品名称" width="120"></el-table-column>
                        <el-table-column prop="fee" label="订单金额" width="100"></el-table-column>
                        <el-table-column prop="createTime" label="服务时间"></el-table-column>
                        <el-table-column prop="status" label="订单状态" width="100"></el-table-column>
                        <el-table-column fixed="right" label="操作" width="150">
                            <template slot-scope="scope">
                                <!-- 待付款——0 待接单——1 服务中——2 待操作退款——3 待处理提"——4 待评价——5 已评价——6 已关闭——7 已拒绝——8 已取消——9 已删除——10-->
                                <el-button type="text" size="small" style=""
                                @click.native.prevent="showRow(scope.$index, tableData)">查看订单</el-button>
                                <el-button v-if="scope.row.statusId == 0" type="text" size="small" style=""
                                @click.native.prevent="closeRow(scope.$index, tableData)">关闭订单</el-button>
                                <el-button v-if="scope.row.statusId == 7" type="text" size="small" style=""
                                @click.native.prevent="closeRow(scope.$index, tableData)">删除订单</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="footer-page">
                         <div>
                            <el-select v-model="operate" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                            <el-button plain @click="openConfirm">确认</el-button>
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

            orderData:{},//订单统计数据
            lines:[],//批量选择对象数组
            ids:[],//批量选择id数组
            operate:'',//操作
            options:[//批量操作选项
                {//0删除 1隐藏 2显示
                    value:'',
                    label:'不操作'
                },{
                    value:'0',
                    label:'关闭'
                },{
                    value:'1',
                    label:'删除'
                }
            ],
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
        //二次确认
        openConfirm() {
            let ths = this;
            const h = this.$createElement;

            if ( ths.ids.length ===0 || ths.ids ===null){
                ths.$message.warning('请选择需要操作的行');
                return false
            }
            // 0关闭 1删除
            if (ths.operate ==''){
                ths.$message.warning('请选择需要执行的操作');
                return false
            } else if (ths.operate =='0'){
                for (let key in ths.lines){
                    if (ths.lines[key].statusId != 0){ // 待付款状态
                        ths.$message.warning('只能关闭待付款状态下的订单');
                        return false
                    }
                }
            } else if (ths.operate =='1'){
                for (let key in ths.lines){
                    if (ths.lines[key].statusId != 7){ // 已关闭状态
                        ths.$message.warning('只能删除已关闭状态下的订单');
                        return false
                    }
                }
            }

            this.$msgbox({
                title: '消息',
                message: h('p', null, [
                    h('span', null, '确定执行操作？')
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = '执行中...';
                        ths.orderBackBatchOperation();
                        setTimeout(() => {
                            done();
                            setTimeout(() => {
                                instance.confirmButtonLoading = false;
                            }, 200);
                        }, 1000);
                    } else {
                        done();
                    }
                }
            }).then(action => {
                ths.getOrderList()
            });
        },
        //批量选择
        batchSelect(selection){
            let ths = this;

            ths.lines = selection;
            ths.ids = [];
            for (let key in selection) {
                ths.ids.push(selection[key].orderId.toString());
            }
            
        },
        // 提交 0关闭 1删除
        orderBackBatchOperation(){
            let ths = this;
            let params = {
                tk:ths.tk,
                type:ths.operate,
                ids:ths.ids
            };

            api.orderBackBatchOperation(params).then(res => {
                ths.$message({
                    message: '操作成功',
                    type: 'success'
                });
            }).catch(e => {
                ths.$message({
                    message: e.msg,
                    type: 'error'
                });
            })
        },
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
                    orderId:row.orderId,
                    type:row.type
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
    },
    watch: {
        // screenHeight (val) {
        //     if (!this.timer) {
        //         this.screenHeight = val;
        //         this.timer = true
        //         let that = this

        //         setTimeout(function () {
        //             // that.screenWidth = that.$store.state.canvasWidth
        //             that.timer = false
        //         }, 400)
        //     }
        // }
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
        .table-btns{
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
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
